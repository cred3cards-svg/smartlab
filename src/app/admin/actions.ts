"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";

/**
 * Validates if the current session has admin privileges.
 */
async function validateAdmin() {
  const session = await auth();
  if (!session || !session.user) throw new Error("Unauthorized");
  
  const user = await prisma.adminUser.findUnique({
    where: { email: session.user.email! }
  });

  if (!user || !user.active) throw new Error("Unauthorized");
  return user;
}

/**
 * Updates a Test's pricing or description.
 */
export async function updateTest(id: string, data: any) {
  const admin = await validateAdmin();

  const test = await prisma.test.update({
    where: { id },
    data: {
      name: data.name,
      shortDescription: data.shortDescription,
      price: parseFloat(data.price),
      originalPrice: parseFloat(data.originalPrice),
      reportTime: data.reportTime,
      active: data.active,
      preparation: data.preparation,
    }
  });

  // Log audit trail
  await prisma.auditLog.create({
    data: {
      action: "UPDATE",
      entityType: "TEST",
      entityId: id,
      userId: admin.id,
      userEmail: admin.email,
      metadata: { description: `Updated test ${test.name}: Price set to ${test.price}` }
    }
  });

  revalidatePath("/admin/tests");
  revalidatePath("/tests");
  return test;
}

/**
 * Updates a Package's pricing or description.
 */
export async function updatePackage(id: string, data: any) {
  const admin = await validateAdmin();

  const pkg = await prisma.checkupPackage.update({
    where: { id },
    data: {
      name: data.name,
      tagline: data.tagline,
      price: parseFloat(data.price),
      originalPrice: parseFloat(data.originalPrice),
      active: data.active,
      preparation: data.preparation,
    }
  });

  await prisma.auditLog.create({
    data: {
      action: "UPDATE",
      entityType: "PACKAGE",
      entityId: id,
      userId: admin.id,
      userEmail: admin.email,
      metadata: { description: `Updated package ${pkg.name}: Price set to ${pkg.price}` }
    }
  });

  revalidatePath("/admin/packages");
  revalidatePath("/checkups");
  return pkg;
}

/**
 * Updates dynamic referral tiers in SiteSettings.
 */
export async function updateReferralTiers(tiers: any[]) {
  const admin = await validateAdmin();
  if (admin.role !== UserRole.SUPER_ADMIN) throw new Error("Only Super Admins can update schemes");

  await prisma.siteSetting.upsert({
    where: { key: "referral_tiers" },
    update: { value: JSON.stringify(tiers) },
    create: {
      key: "referral_tiers",
      value: JSON.stringify(tiers),
    }
  });

  await prisma.auditLog.create({
    data: {
      action: "UPDATE",
      entityType: "SETTING",
      entityId: "referral_tiers",
      userId: admin.id,
      userEmail: admin.email,
      metadata: { description: "Updated Referral Schemes and Tier Thresholds" }
    }
  });

  revalidatePath("/admin/settings");
  revalidatePath("/profile/referrals");
  return { success: true };
}
