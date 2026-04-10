import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const rewards = await db.rewardLedger.findMany({
      include: {
        account: {
          select: {
            name: true,
            phone: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(rewards);
  } catch (error) {
    console.error("Failed to fetch admin referrals:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
