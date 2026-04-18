"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getSignupOffer() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: "signup_reward_amount" }
  });
  return setting ? Number(setting.value) : 500;
}

export async function updateSignupOffer(amount: number) {
  const session = await auth();
  if (!session || (session.user as any).role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  await prisma.siteSetting.upsert({
    where: { key: "signup_reward_amount" },
    update: { value: amount.toString() },
    create: { key: "signup_reward_amount", value: amount.toString() }
  });

  // Create audit log
  await prisma.auditLog.create({
    data: {
      action: "UPDATE_SIGNUP_OFFER",
      entityType: "SITE_SETTING",
      entityId: "signup_reward_amount",
      metadata: { newAmount: amount },
      userId: (session.user as any).id
    }
  });

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}
