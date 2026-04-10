import { NextResponse } from "next/server";
import { SlotService } from "@/services/slot.service";

/**
 * GET /api/slots?date=2024-10-10
 * Fetches available hourly time slots for a specific date.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ error: "Date parameter is required" }, { status: 400 });
    }

    const slots = await SlotService.getAvailableSlots(date);
    return NextResponse.json(slots);
  } catch (error) {
    console.error("API Error - /api/slots:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
