import { NextResponse } from "next/server";
import { CouponService } from "@/services/coupon.service";
import { z } from "zod";

const ApplyCouponSchema = z.object({
  code: z.string().min(1),
  subtotal: z.number().positive(),
});

/**
 * POST /api/coupons/apply
 * Validates a coupon and returns the discount amount.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = ApplyCouponSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid request payload", details: result.error.format() }, { status: 400 });
    }

    const { code, subtotal } = result.data;
    const validation = await CouponService.validateCoupon(code, subtotal);

    return NextResponse.json(validation);
  } catch (error) {
    console.error("API Error - /api/coupons/apply:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
