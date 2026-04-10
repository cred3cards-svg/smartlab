import { NextResponse } from "next/server";
import { BookingService } from "@/services/booking.service";
import { BookingStatus } from "@prisma/client";
import { z } from "zod";

const UpdateStatusSchema = z.object({
  status: z.nativeEnum(BookingStatus),
});

/**
 * GET /api/bookings/[id]
 * Fetch detailed booking information.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const booking = await BookingService.getBooking(id);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("API Error - /api/bookings/[id]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * PATCH /api/bookings/[id]
 * Updates the booking status (Administrative).
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = UpdateStatusSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await BookingService.updateBookingStatus(id, result.data.status);
    return NextResponse.json({
      message: "Status updated",
      status: updated.status
    });
  } catch (error) {
    console.error("API Error - /api/bookings/[id] PATCH:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
