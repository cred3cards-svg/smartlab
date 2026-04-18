"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { ReportStatus, AiStatus } from "@prisma/client";
import { AiService } from "@/services/ai.service";

/**
 * Creates a new TestReport and links it to a booking.
 */
export async function uploadReport(data: {
  bookingId: string;
  reportUrl: string;
  pathologistId?: string;
  verifiedAt?: Date;
}) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const report = await prisma.testReport.create({
    data: {
      bookingId: data.bookingId,
      reportUrl: data.reportUrl,
      pathologistId: data.pathologistId,
      verifiedAt: data.verifiedAt,
      status: ReportStatus.PENDING,
      aiStatus: AiStatus.PENDING
    }
  });

  // Update booking status to REPORT_READY
  await prisma.testBooking.update({
    where: { id: data.bookingId },
    data: { status: "REPORT_READY" } 
  });

  // Log audit trail
  await prisma.auditLog.create({
    data: {
      action: "UPLOAD_REPORT",
      entityType: "REPORT",
      entityId: report.id,
      userId: (session.user as any).id,
      metadata: { bookingId: data.bookingId }
    }
  });

  // Trigger AI enrichment in the background
  // Note: In production we might use a queue, here we just invoke it
  AiService.enrichReport(report.id).catch(err => {
    console.error(`[AdminActions] AI Enrichment failed for ${report.id}:`, err);
  });

  revalidatePath("/admin/reports");
  revalidatePath("/admin/bookings");
  return { success: true, reportId: report.id };
}

/**
 * Manually re-trigger AI analysis for a report.
 */
export async function retryAiAnalysis(reportId: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.testReport.update({
    where: { id: reportId },
    data: { aiStatus: AiStatus.PENDING }
  });

  AiService.enrichReport(reportId).catch(err => {
    console.error(`[AdminActions] AI Retry failed for ${reportId}:`, err);
  });

  revalidatePath("/admin/reports");
  return { success: true };
}

/**
 * Publicly publish a report.
 */
export async function publishReport(reportId: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.testReport.update({
    where: { id: reportId },
    data: { status: ReportStatus.PUBLISHED }
  });

  revalidatePath("/admin/reports");
  return { success: true };
}
