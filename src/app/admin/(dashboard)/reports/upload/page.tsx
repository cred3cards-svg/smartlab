import { prisma } from "@/lib/db";
import { ChevronLeft, FlaskConical, Upload } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import ReportUploadForm from "./ReportUploadForm";

export default async function AdminReportUploadPage() {
  // Fetch bookings that are COLLECTED or COMPLETED but don't have a report yet
  const pendingBookings = await prisma.testBooking.findMany({
    where: {
      status: { in: ["COLLECTED", "ASSIGNED"] },
      reports: { none: {} }
    },
    include: {
      patient: true,
      tests: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/admin/reports" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-brand-teal transition-colors font-medium">
        <ChevronLeft className="h-4 w-4" />
        Back to Reports
      </Link>

      <div className="bg-white rounded-[2.5rem] border border-surface-border p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <FlaskConical size={120} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-brand-teal-pale text-brand-teal rounded-2xl flex items-center justify-center">
              <Upload size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-black text-text-primary">Upload Diagnostic Result</h1>
              <p className="text-text-secondary font-medium">Link a digital report to a patient's booking record.</p>
            </div>
          </div>

          <ReportUploadForm bookings={pendingBookings} />
        </div>
      </div>
      
      <div className="bg-surface-soft/50 rounded-[2.5rem] p-8 border border-dashed border-surface-border">
         <h3 className="text-sm font-black text-text-primary uppercase tracking-widest mb-4">How it works</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
               <div className="w-6 h-6 rounded-full bg-brand-teal text-white flex items-center justify-center text-[10px] font-bold">1</div>
               <p className="text-xs font-bold text-text-primary">Select Booking</p>
               <p className="text-[10px] text-text-muted leading-relaxed">Choose a confirmed collection order from the list.</p>
            </div>
            <div className="space-y-2">
               <div className="w-6 h-6 rounded-full bg-brand-teal text-white flex items-center justify-center text-[10px] font-bold">2</div>
               <p className="text-xs font-bold text-text-primary">Attach PDF</p>
               <p className="text-[10px] text-text-muted leading-relaxed">Provide the secure URL of the processed PDF report.</p>
            </div>
            <div className="space-y-2">
               <div className="w-6 h-6 rounded-full bg-brand-teal text-white flex items-center justify-center text-[10px] font-bold">3</div>
               <p className="text-xs font-bold text-text-primary">AI Processing</p>
               <p className="text-[10px] text-text-muted leading-relaxed">System will automatically parse results and generate insights.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
