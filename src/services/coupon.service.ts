import db from "@/lib/db";
import { isAfter } from "date-fns";

export interface CouponValidationResult {
  valid: boolean;
  discountAmount: number;
  message: string;
  coupon?: any;
}

export class CouponService {
  /**
   * Validates a coupon code against a current order total.
   */
  static async validateCoupon(code: string, subtotal: number): Promise<CouponValidationResult> {
    try {
      const coupon = await db.coupon.findUnique({
        where: { code: code.toUpperCase() }
      });

      if (!coupon || !coupon.active) {
        return { valid: false, discountAmount: 0, message: "Invalid or inactive coupon code" };
      }

      // Check Expiry
      if (isAfter(new Date(), coupon.expiryDate)) {
        return { valid: false, discountAmount: 0, message: "This coupon has expired" };
      }

      // Check Minimum Order Value
      if (subtotal < coupon.minOrderValue) {
        return { 
          valid: false, 
          discountAmount: 0, 
          message: `Minimum order value of ₹${coupon.minOrderValue} required for this coupon` 
        };
      }

      // Check Usage Limit
      if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
        return { valid: false, discountAmount: 0, message: "Coupon usage limit reached" };
      }

      // Calculate Discount
      let discount = 0;
      if (coupon.discountType === "PERCENTAGE") {
        discount = (subtotal * coupon.value) / 100;
        if (coupon.maxDiscount) {
          discount = Math.min(discount, coupon.maxDiscount);
        }
      } else {
        discount = coupon.value;
      }

      return {
        valid: true,
        discountAmount: Math.round(discount),
        message: "Coupon applied successfully",
        coupon
      };
    } catch (error) {
      console.error("Coupon validation error:", error);
      return { valid: false, discountAmount: 0, message: "Error validating coupon" };
    }
  }

  static async incrementUsage(code: string) {
    return db.coupon.update({
      where: { code: code.toUpperCase() },
      data: { usageCount: { increment: 1 } }
    });
  }
}
