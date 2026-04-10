import { NextResponse } from "next/server";
import { ReferralService } from "@/services/referral.service";

export async function POST(request: Request) {
  try {
    const { referralCode, phone } = await request.json();

    if (!referralCode || !phone) {
      return NextResponse.json({ 
        valid: false, 
        message: "Referral code and phone are required" 
      }, { status: 400 });
    }

    const result = await ReferralService.validateReferral(referralCode, phone);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to apply referral:", error);
    return NextResponse.json({ 
      valid: false, 
      message: "Something went wrong. Please try again." 
    }, { status: 500 });
  }
}
