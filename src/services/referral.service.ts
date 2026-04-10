import db from "@/lib/db";
import { ReferralStatus, RewardType, BookingStatus, PaymentStatus } from "@prisma/client";

export class ReferralService {
  /**
   * Generates or fetches a PatientAccount and its ReferralCode.
   */
  static async getOrCreateAccount(phone: string, name?: string) {
    let account = await db.patientAccount.findUnique({
      where: { phone },
      include: { referralCode: true }
    });

    if (!account) {
      account = await db.patientAccount.create({
        data: {
          phone,
          name,
        },
        include: { referralCode: true }
      });
    }

    if (!account.referralCode) {
      const code = this.generateRandomCode();
      await db.referralCode.create({
        data: {
          code,
          accountId: account.id
        }
      });
      account = await db.patientAccount.findUnique({
        where: { id: account.id },
        include: { referralCode: true }
      });
    }

    return account;
  }

  /**
   * Validates a referral code for a new booking.
   * Rules: 
   * 1. Cannot refer self (compare phones)
   * 2. Referred user must be new (no prior delivered bookings)
   */
  static async validateReferral(code: string, referredPhone: string) {
    const referralCode = await db.referralCode.findUnique({
      where: { code: code.toUpperCase() },
      include: { account: true }
    });

    if (!referralCode || !referralCode.active) {
      return { valid: false, message: "Invalid or inactive referral code" };
    }

    if (referralCode.account.phone === referredPhone) {
      return { valid: false, message: "You cannot refer yourself" };
    }

    // Check if referred user is new
    const priorBookings = await db.testBooking.count({
      where: { 
        patient: { phone: referredPhone },
        status: { in: [BookingStatus.DELIVERED, BookingStatus.REPORT_READY] }
      }
    });

    if (priorBookings > 0) {
      return { valid: false, message: "Referral only valid for new users" };
    }

    return { valid: true, referrerId: referralCode.accountId, message: "Referral code applied" };
  }

  /**
   * Triggered when a booking is completed (hits DELIVERED).
   * Validates the ReferralEvent and checks for reward tiering.
   */
  static async processBookingCompletion(bookingId: string) {
    const booking = await db.testBooking.findUnique({
      where: { id: bookingId },
      include: { 
        patient: true 
      }
    });

    if (!booking || !booking.referralCode) return;

    // Check if a PENDING referral event exists for this booking
    const referralEvent = await db.referralEvent.findUnique({
      where: { bookingId }
    });

    if (!referralEvent || referralEvent.status !== ReferralStatus.PENDING) return;

    // Final Validation: Confirm payment is successful
    if (booking.paymentStatus !== PaymentStatus.PAID) {
      console.warn(`Referral validation skipped for ${bookingId}: Payment not successful.`);
      return;
    }

    // Mark as VALIDATED
    await db.referralEvent.update({
      where: { id: referralEvent.id },
      data: { status: ReferralStatus.VALIDATED }
    });

    // Check reward tiers for the referrer
    await this.processRewardsForUser(referralEvent.referrerId);
  }

  /**
   * Reward Logic:
   * 2 referrals -> Wallet
   * 5 referrals -> Free Package
   * 10 referrals -> Cash Reward request
   */
  private static async processRewardsForUser(referrerId: string) {
    const validatedCount = await db.referralEvent.count({
      where: { 
        referrerId, 
        status: { in: [ReferralStatus.VALIDATED, ReferralStatus.REWARDED] } 
      }
    });

    const unrewardedEvents = await db.referralEvent.findMany({
      where: { referrerId, status: ReferralStatus.VALIDATED }
    });

    if (unrewardedEvents.length === 0) return;

    // Check for Tier thresholds
    if (validatedCount === 2) {
      await this.issueReward(referrerId, RewardType.WALLET_CREDIT, 250, "Earned for 2 successful referrals");
    } else if (validatedCount === 5) {
      await this.issueReward(referrerId, RewardType.FREE_PACKAGE, 0, "Earned for 5 successful referrals");
    } else if (validatedCount === 10) {
      await this.issueReward(referrerId, RewardType.CASH_REWARD, 1000, "Eligible for cash reward - pending admin approval");
    }

    // Mark these specific events as REWARDED to prevent double-counting
    await db.referralEvent.updateMany({
      where: { 
        id: { in: unrewardedEvents.map(e => e.id) } 
      },
      data: { status: ReferralStatus.REWARDED }
    });
  }

  private static async issueReward(accountId: string, type: RewardType, amount: number, notes: string) {
    await db.rewardLedger.create({
      data: {
        accountId,
        type,
        amount,
        notes,
        status: type === RewardType.CASH_REWARD ? "PENDING" : "APPROVED"
      }
    });
  }

  static async getReferralStats(phone: string) {
    const account = await db.patientAccount.findUnique({
      where: { phone },
      include: { 
        referralCode: true,
        referralsMade: {
          include: { referredUser: true }
        },
        rewards: true
      }
    });

    if (!account) return null;

    const successfulCount = account.referralsMade.filter(
      r => r.status === ReferralStatus.VALIDATED || r.status === ReferralStatus.REWARDED
    ).length;

    return {
      code: account.referralCode?.code,
      totalReferrals: account.referralsMade.length,
      successfulCount,
      rewards: account.rewards,
      nextMilestone: successfulCount < 2 ? 2 : successfulCount < 5 ? 5 : successfulCount < 10 ? 10 : null,
      progress: (successfulCount / (successfulCount < 2 ? 2 : successfulCount < 5 ? 5 : 10)) * 100
    };
  }

  private static generateRandomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
}
