import { prisma } from "@/lib/db";
import { FileText, Plus, Search, Filter, RefreshCw, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ReportStatus, AiStatus } from "@prisma/client";

export default async function AdminReportsPage() {
  const reports = await prisma.testReport.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      booking: {
        include: {
          patient: true
        }
      }
    },
    take: 50
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Diagnostic Reports</h1>
          <p className="text-text-secondary">Manage pathologist uploads and AI enrichment.</p>
        </div>
        <Link href="/admin/reports/upload">
          <Button variant="teal" leftIcon={<Plus className="h-4 w-4" />}>
            Upload Report
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-surface-border shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search by Patient Name or Booking ID..." 
            className="w-full pl-10 pr-4 py-2 bg-surface-soft border-transparent rounded-lg text-sm focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-surface-border rounded-lg text-sm font-medium hover:bg-surface-soft">
          <Filter className="h-4 w-4" />
          More Filters
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-surface-border shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-soft border-b border-surface-border">
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase">Patient / Booking</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase">AI Enrichment</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report.id} className="hover:bg-surface-soft/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-text-primary">{report.booking.patient.name}</div>
                    <div className="text-xs text-brand-blue font-bold flex items-center gap-1 mt-0.5">
                      <FileText className="h-3 w-3" />
                      {report.booking.bookingId}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={report.status === ReportStatus.PUBLISHED ? "success" : "warning"}>
                      {report.status}
                    </Badge>
                    <div className="text-[10px] text-text-muted mt-1">
                      Uploaded {format(report.createdAt, 'PPp')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={
                          report.aiStatus === AiStatus.COMPLETED ? "success" : 
                          report.aiStatus === AiStatus.FAILED ? "destructive" : "info"
                        }
                      >
                        {report.aiStatus === AiStatus.PENDING && (
                           <RefreshCw className="h-3 w-3 animate-spin mr-1" />
                        )}
                        {report.aiStatus}
                      </Badge>
                      {report.aiStatus === AiStatus.COMPLETED && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      {report.status === ReportStatus.PENDING && (
                        <Button size="sm" variant="teal">Publish</Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                   <div className="flex flex-col items-center gap-2 text-text-muted font-medium">
                      <FileText size={32} className="opacity-20" />
                      <p>No reports found. Start by uploading one.</p>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
