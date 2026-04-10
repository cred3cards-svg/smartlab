import { NextResponse } from "next/server";
import { ReferralService } from "@/services/referral.service";

/**
 * GET /api/referral/stats?phone=XXXXXXXXXX
 * Fetches the progress toward reward tiers and the ledger of earned rewards.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const stats = await ReferralService.getReferralStats(phone);
    if (!stats) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error("API Error - /api/referral/stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
