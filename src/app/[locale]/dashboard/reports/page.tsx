import { prisma } from "@/lib/db";
import { FileText, Search, Filter, Download, Activity, ExternalLink, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function ReportsListPage() {
  const patientPhone = "9830000000"; 
  
  const reports = await prisma.testReport.findMany({
    where: { booking: { patient: { phone: patientPhone } } },
    include: { booking: { include: { tests: true } } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-1">Health Reports</h1>
          <p className="text-text-secondary text-sm">Access and analyze your diagnostic history.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-xl border-surface-border bg-white font-bold">
              <Filter size={18} className="mr-2" /> Filter By Date
           </Button>
           <Button className="bg-brand-blue hover:bg-brand-blue-light transition-all rounded-xl font-bold shadow-lg shadow-brand-blue/20">
              Download All (ZIP)
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-[2.5rem] border border-surface-border shadow-sm overflow-hidden">
           <div className="p-8 border-b border-surface-border flex items-center justify-between bg-surface-soft/30">
              <div className="relative flex-1 max-w-md">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                 <input 
                    type="text" 
                    placeholder="Search by test name or ID..." 
                    className="w-full bg-white border-transparent rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                 />
              </div>
           </div>

           <div className="divide-y divide-surface-border">
              {reports.length > 0 ? reports.map((report) => (
                <div key={report.id} className="group p-8 hover:bg-surface-soft transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-brand-blue-pale text-brand-blue flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-500 shadow-sm">
                        <FileText size={28} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                           <h3 className="text-lg font-bold text-text-primary group-hover:text-brand-blue transition-colors">
                             {report.booking.tests.map(t => t.name).join(", ")}
                           </h3>
                           <span className="px-2 py-0.5 rounded-full bg-green-50 text-status-success text-[9px] font-extrabold uppercase tracking-tight">Verified</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted font-medium">
                           <span className="flex items-center gap-1.5"><Activity size={12} className="text-brand-teal" /> 12 Parameters Analyzed</span>
                           <span className="flex items-center gap-1.5"><ExternalLink size={12} className="text-brand-teal" /> ID: {report.booking.bookingId}</span>
                           <span className="flex items-center gap-1.5">Date: {new Date(report.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                        </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-3 self-end md:self-center">
                      <Link href={`/dashboard/reports/${report.id}`}>
                        <Button variant="outline" className="rounded-xl font-bold bg-white hover:bg-brand-blue/5 border-surface-border transition-all">
                           Smart Insight
                        </Button>
                      </Link>
                      <Link href={report.reportUrl || "#"} target="_blank">
                        <Button variant="primary" className="rounded-xl font-bold px-6 bg-brand-blue shadow-md hover:shadow-lg transition-all">
                           <Download size={18} />
                        </Button>
                      </Link>
                   </div>
                </div>
              )) : (
                <div className="p-20 text-center space-y-4">
                  <div className="w-20 h-20 bg-surface-soft rounded-full flex items-center justify-center mx-auto text-text-muted">
                    <FileText size={40} />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-text-primary">No reports yet</h3>
                  <p className="text-text-secondary text-sm max-w-xs mx-auto leading-relaxed">Your diagnostic history will appear here once your tests are processed in the lab.</p>
                  <Button variant="primary" className="rounded-2xl px-8 mt-4">Book Your First Test</Button>
                </div>
              )}
           </div>
        </div>

        {/* Info Banner */}
        <div className="bg-brand-blue-pale rounded-[2.5rem] p-8 border border-brand-blue/10 flex flex-col md:flex-row items-center gap-8">
           <div className="w-16 h-16 rounded-2xl bg-white text-brand-blue flex items-center justify-center shrink-0 shadow-sm animate-bounce">
              <Zap size={32} fill="currentColor" />
           </div>
           <div className="flex-1 text-center md:text-left">
              <h4 className="text-lg font-bold text-brand-blue mb-1">Instant Smart Insights</h4>
              <p className="text-brand-blue/70 text-sm leading-relaxed">
                 Every report at SMARTLAB247 comes with a plain-English AI summary. No more searching for medical terms — we explain your health in a way that actually makes sense.
              </p>
           </div>
           <Button variant="outline" className="rounded-xl border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all font-bold px-8">
              Learn More
           </Button>
        </div>
      </div>
    </div>
  );
}
