import db from "@/lib/db";
import { addDays, format, startOfDay, setHours, setMinutes, isAfter } from "date-fns";

export class SlotService {
  /**
   * Fetches available slots for a given date.
   * If no slots exist in DB for that date, it auto-generates them (rolling 7 days).
   */
  static async getAvailableSlots(dateStr: string) {
    const targetDate = startOfDay(new Date(dateStr));
    
    // 1. Fetch existing slots
    let slots = await db.timeSlot.findMany({
      where: {
        date: {
          gte: targetDate,
          lt: addDays(targetDate, 1),
        },
        available: true,
      },
      orderBy: { time: "asc" },
    });

    // 2. If no slots and date is within next 7 days, generate them
    const now = new Date();
    const maxDate = addDays(now, 7);
    
    if (slots.length === 0 && isAfter(maxDate, targetDate)) {
      await this.generateSlotsForDate(targetDate);
      
      // Re-fetch after generation
      slots = await db.timeSlot.findMany({
        where: {
          date: targetDate,
          available: true,
        },
        orderBy: { time: "asc" },
      });
    }

    return slots;
  }

  /**
   * Generates hourly slots from 6:00 AM to 8:00 PM
   */
  static async generateSlotsForDate(date: Date) {
    const slotsData = [];
    const startHour = 6;
    const endHour = 20;

    for (let hour = startHour; hour <= endHour; hour++) {
      const timeStr = `${hour.toString().padStart(2, "0")}:00`;
      slotsData.push({
        date: startOfDay(date),
        time: timeStr,
        available: true,
      });
    }

    // Use createMany to insert slots
    return db.timeSlot.createMany({
      data: slotsData,
      skipDuplicates: true,
    });
  }

  static async reserveSlot(slotId: string) {
    return db.timeSlot.update({
      where: { id: slotId },
      data: { available: false },
    });
  }
}
