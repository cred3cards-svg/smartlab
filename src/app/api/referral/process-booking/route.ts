import { NextResponse } from "next/server";
import { ReferralService } from "@/services/referral.service";

export async function POST(request: Request) {
  try {
    const { bookingId } = await request.json();

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    await ReferralService.processBookingCompletion(bookingId);

    return NextResponse.json({ success: true, message: "Booking processed for referrals" });
  } catch (error) {
    console.error("Failed to process referral for booking:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
