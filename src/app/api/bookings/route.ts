import { NextResponse } from "next/server";
import { BookingService } from "@/services/booking.service";
import { z } from "zod";

const CreateBookingSchema = z.object({
  patient: z.object({
    name: z.string().min(2),
    age: z.number().int().min(0).max(120),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    phone: z.string().min(10),
    email: z.string().email().optional(),
    relation: z.string().optional(),
  }),
  address: z.object({
    street: z.string().min(5),
    landmark: z.string().optional(),
    city: z.string(),
    state: z.string(),
    pincode: z.string().length(6),
    areaId: z.string().optional(),
  }),
  slotId: z.string().cuid(),
  testIds: z.array(z.string()).min(0),
  packageIds: z.array(z.string()).min(0),
  couponCode: z.string().optional(),
  referralCode: z.string().optional(),
  notes: z.string().optional(),
  membershipId: z.string().optional(),
}).refine(data => data.testIds.length > 0 || data.packageIds.length > 0, {
  message: "At least one test or package must be selected",
  path: ["testIds"],
});

/**
 * POST /api/bookings
 * Orchestrates patient/address persistence and booking creation.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = CreateBookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ 
        error: "Validation failed", 
        details: result.error.format() 
      }, { status: 400 });
    }

    const booking = await BookingService.createBooking(result.data as any);
    
    return NextResponse.json({
      message: "Booking successful",
      bookingId: booking.bookingId,
      booking,
    });
  } catch (error: any) {
    console.error("API Error - /api/bookings:", error);
    return NextResponse.json({ 
      error: "Failed to create booking", 
      message: error.message 
    }, { status: 500 });
  }
}

/**
 * GET /api/bookings?phone=XXXXXXXXXX
 * Lists bookings for a specific patient.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");

    // In a real app, this would be secured via session/auth
    if (!phone) {
      return NextResponse.json({ error: "Phone number required" }, { status: 400 });
    }

    const bookings = await (global as any).prisma.testBooking.findMany({
      where: { patient: { phone } },
      include: { tests: true, packages: true, slot: true },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("API Error - /api/bookings GET:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
