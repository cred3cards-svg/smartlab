import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ReportDetailClient from "./ReportDetailClient";

interface ReportDetailPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function ReportDetailPage({ params }: ReportDetailPageProps) {
  const { id } = await params;

  const report = await prisma.testReport.findUnique({
    where: { id },
    include: { 
      booking: { 
        include: { 
          tests: true, 
          patient: true 
        } 
      } 
    }
  });

  if (!report) {
    notFound();
  }

  // Pre-process fields for the client component
  const clientReport = {
    id: report.id,
    bookingId: report.bookingId,
    bookingNumber: report.booking.bookingId,
    reportUrl: report.reportUrl,
    aiStatus: report.aiStatus,
    summaryEn: report.summaryEn || undefined,
    summaryHi: report.summaryHi || undefined,
    summaryBn: report.summaryBn || undefined,
    abnormalAnalysis: report.abnormalAnalysis,
    bodyMapping: report.bodyMapping,
    recommendations: report.recommendations,
    lifestyleGuidance: report.lifestyleGuidance,
    recheckInterval: report.recheckInterval || undefined,
    videoScript: report.videoScript || undefined,
    structuredData: report.structuredData,
  };

  return <ReportDetailClient report={clientReport} />;
}
