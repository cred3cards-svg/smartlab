import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.patientAccount.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email or phone already exists" },
        { status: 400 }
      );
    }

    // Hash password
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get signup reward amount from SiteSettings
    console.log("Fetching signup reward amount...");
    const signupRewardSetting = await prisma.siteSetting.findUnique({
      where: { key: "signup_reward_amount" }
    });
    
    const rewardAmount = signupRewardSetting ? Number(signupRewardSetting.value) : 500;
    console.log("Reward amount determined:", rewardAmount);

    // Create user
    console.log("Creating user in database...");
    const newUser = await prisma.patientAccount.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: "PATIENT",
        rewards: {
          create: {
            amount: rewardAmount,
            type: "WALLET_CREDIT",
            notes: "Signup Welcome Bonus",
            status: "COMPLETED"
          }
        }
      },
    });

    console.log("User created successfully:", newUser.id);

    return NextResponse.json(
      { message: "User created successfully", userId: newUser.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("DEBUG: Signup error details:", error);
    return NextResponse.json(
      { message: "Internal server error", debug: error.message },
      { status: 500 }
    );
  }
}
