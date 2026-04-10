import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { status } = await request.json();

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const reward = await db.rewardLedger.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json(reward);
  } catch (error) {
    console.error("Failed to update reward status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
