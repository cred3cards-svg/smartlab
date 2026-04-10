import { NextResponse } from "next/server";
import { ReferralService } from "@/services/referral.service";

/**
 * GET /api/referral/code?phone=XXXXXXXXXX
 * Retrieves or initializes a referral code for a patient.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const account = await ReferralService.getOrCreateAccount(phone);
    return NextResponse.json({
      code: account.referralCode?.code,
      phone: account.phone
    });
  } catch (error) {
    console.error("API Error - /api/referral/code:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
