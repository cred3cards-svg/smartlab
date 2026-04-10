import db from "@/lib/db";
import { BookingStatus, PaymentStatus, Gender } from "@prisma/client";
import { CouponService } from "./coupon.service";
import { SlotService } from "./slot.service";
import { ReferralService } from "./referral.service";

export interface CreateBookingInput {
  patient: {
    name: string;
    age: number;
    gender: "MALE" | "FEMALE" | "OTHER";
    phone: string;
    email?: string;
    relation?: string;
  };
  address: {
    street: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    areaId?: string;
  };
  slotId: string;
  testIds: string[];
  packageIds: string[];
  couponCode?: string;
  referralCode?: string;
  notes?: string;
  membershipId?: string; // Placeholder for future logic
}

export class BookingService {
  /**
   * Orchestrates the entire booking creation process.
   */
  static async createBooking(input: CreateBookingInput) {
    // 1. Fetch all items to calculate price
    const tests = await db.test.findMany({
      where: { id: { in: input.testIds } }
    });

    const packages = await db.checkupPackage.findMany({
      where: { id: { in: input.packageIds } }
    });

    const subtotal = tests.reduce((sum, t) => sum + t.price, 0) + 
                     packages.reduce((sum, p) => sum + p.price, 0);

    // 2. Handle Coupon
    let discountAmount = 0;
    if (input.couponCode) {
      const couponRes = await CouponService.validateCoupon(input.couponCode, subtotal);
      if (couponRes.valid) {
        discountAmount = couponRes.discountAmount;
        await CouponService.incrementUsage(input.couponCode);
      }
    }

    // 3. Membership logic (Placeholder)
    if (input.membershipId) {
      // Future: fetch plan and apply extra discount
      // For now, let's assume it adds an extra 5% trust discount
      discountAmount += (subtotal * 0.05);
    }

    const netAmount = Math.max(0, subtotal - discountAmount);

    // 4. Handle Referral (Validation check)
    let referralEventData = null;
    if (input.referralCode) {
      const refVal = await ReferralService.validateReferral(input.referralCode, input.patient.phone);
      if (refVal.valid) {
        // Ensure the referred user has an account too
        const referredAccount = await ReferralService.getOrCreateAccount(input.patient.phone, input.patient.name);
        referralEventData = {
          referrerId: refVal.referrerId!,
          referredUserId: referredAccount.id,
          status: "PENDING"
        };
      }
    }

    // 5. Create internal dependencies (Patient, Address)
    const patient = await db.bookingPatient.create({
      data: {
        name: input.patient.name,
        age: input.patient.age,
        gender: input.patient.gender as any,
        phone: input.patient.phone,
        email: input.patient.email,
        relation: input.patient.relation || "self",
      }
    });

    const address = await db.address.create({
      data: {
        ...input.address,
      }
    });

    // 5. Generate Human Readable ID (e.g., SMB-1001)
    const count = await db.testBooking.count();
    const readableId = `SMB-${(1000 + count + 1).toString()}`;

    // 6. Final Booking Transaction
    const booking = await db.testBooking.create({
      data: {
        bookingId: readableId,
        status: BookingStatus.BOOKED,
        paymentStatus: PaymentStatus.UNPAID,
        totalAmount: subtotal,
        discountAmount: discountAmount,
        netAmount: netAmount,
        patientId: patient.id,
        addressId: address.id,
        slotId: input.slotId,
        notes: input.notes,
        couponCode: input.couponCode,
        referralCode: input.referralCode,
        tests: {
          connect: input.testIds.map(id => ({ id }))
        },
        packages: {
          connect: input.packageIds.map(id => ({ id }))
        },
        // Link referral event if valid
        referral: referralEventData ? {
          create: referralEventData
        } : undefined
      },
      include: {
        patient: true,
        address: true,
        slot: true,
        tests: true,
        packages: true
      }
    });

    // 7. Mark slot as reserved
    await SlotService.reserveSlot(input.slotId);

    return booking;
  }

  static async getBooking(idOrReadableId: string) {
    return db.testBooking.findFirst({
      where: {
        OR: [
          { id: idOrReadableId },
          { bookingId: idOrReadableId }
        ]
      },
      include: {
        patient: true,
        address: true,
        slot: true,
        tests: true,
        packages: true,
        reports: true
      }
    });
  }

  static async updateBookingStatus(id: string, status: BookingStatus) {
    const updated = await db.testBooking.update({
      where: { id },
      data: { status }
    });

    // Trigger Referral Processing if delivered
    if (status === BookingStatus.DELIVERED) {
      await ReferralService.processBookingCompletion(id);
    }

    return updated;
  }
}
