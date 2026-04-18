import { Suspense } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  Activity, 
  Clock, 
  FileText, 
  AlertCircle,
  Calendar,
  ChevronRight,
  Zap
} from "lucide-react";
import { prisma } from "@/lib/db";
import { InsightService } from "@/services/insight.service";
import { formatPrice, cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function DashboardPage() {
  // In real implementation, get patient phone from session
  const patientPhone = "9830000000"; 
  
  const [healthScore, recommendations, reports, reminders] = await Promise.all([
    InsightService.getHealthScore("self"),
    InsightService.getRecommendations("self"),
    prisma.testReport.findMany({
      where: { booking: { patient: { phone: patientPhone } } },
      include: { booking: { include: { tests: true } } },
      orderBy: { createdAt: "desc" },
      take: 5
    }),
    InsightService.getReminders(patientPhone)
  ]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-1">Welcome back, Rajesh</h1>
          <p className="text-text-secondary text-sm">Here is your health summary for today, April 16, 2026.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="bg-white rounded-2xl px-4 py-2 border border-surface-border flex items-center gap-3 shadow-sm">
             <div className="w-8 h-8 rounded-xl bg-brand-teal-pale text-brand-teal flex items-center justify-center font-bold text-xs uppercase">
               Pass
             </div>
             <div>
                <p className="text-[10px] text-brand-teal font-bold uppercase tracking-wider">Pass247 Active</p>
                <p className="text-[11px] text-text-muted">7 months remaining</p>
             </div>
           </div>
        </div>
      </div>

      {/* Top Stats & Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Indicators Slider/Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-[2rem] p-6 border border-surface-border shadow-sm group hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue-pale text-brand-blue flex items-center justify-center">
                <Activity size={24} />
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-status-danger bg-red-50 px-2 py-0.5 rounded-full">
                  <TrendingUp size={10} /> +12%
                </span>
              </div>
            </div>
            <p className="text-sm font-bold text-text-secondary mb-1">Fasting Glucose</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-heading font-bold text-text-primary">112</span>
              <span className="text-sm text-text-muted mb-1.5 font-medium">mg/dL</span>
            </div>
            <p className="text-[10px] text-status-warning font-bold uppercase tracking-tight mt-3">⚠️ Boundary High</p>
          </div>

          <div className="bg-white rounded-[2rem] p-6 border border-surface-border shadow-sm group hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-teal-pale text-brand-teal flex items-center justify-center">
                <Activity size={24} />
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-status-success bg-green-50 px-2 py-0.5 rounded-full">
                  <TrendingDown size={10} /> -4%
                </span>
              </div>
            </div>
            <p className="text-sm font-bold text-text-secondary mb-1">HbA1c</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-heading font-bold text-text-primary">6.1</span>
              <span className="text-sm text-text-muted mb-1.5 font-medium">%</span>
            </div>
            <p className="text-[10px] text-status-success font-bold uppercase tracking-tight mt-3">✅ Normal Range</p>
          </div>
        </div>

        {/* Health Score Widget */}
        <div className="lg:col-span-4 bg-gradient-to-br from-brand-blue to-[#0F5280] rounded-[2rem] p-6 text-white relative overflow-hidden flex flex-col justify-between shadow-xl shadow-brand-blue/20">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-white/70">Health Score</p>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <TrendingUp size={14} />
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 flex items-center justify-center">
                 <svg className="w-full h-full -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                    <circle cx="48" cy="48" r="40" stroke="white" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * healthScore / 100)} strokeLinecap="round" className="transition-all duration-1000" />
                 </svg>
                 <span className="absolute text-2xl font-bold font-heading">{healthScore}</span>
              </div>
              <div>
                <p className="text-lg font-bold leading-tight">Your health is improving</p>
                <p className="text-xs text-white/70 mt-1">Consistency pays off. You are in the top 15% of your age group.</p>
              </div>
            </div>
          </div>
          
          <button className="relative z-10 mt-8 w-full py-3 bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2">
            View Analytics <ChevronRight size={14} />
          </button>
          
          {/* Decorative background circle */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Reports Table */}
        <div className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between px-4">
              <h2 className="text-xl font-heading font-bold text-text-primary flex items-center gap-2">
                <FileText className="text-brand-blue" size={20} />
                Recent Reports
              </h2>
              <Link href="/dashboard/reports" className="text-xs font-bold text-brand-blue hover:underline">View All</Link>
           </div>
           
           <div className="bg-white rounded-[2rem] border border-surface-border shadow-sm overflow-hidden">
             {reports.length > 0 ? (
               <div className="divide-y divide-surface-border">
                {reports.map((report) => (
                  <div key={report.id} className="group p-5 hover:bg-surface-soft transition-all grid grid-cols-1 sm:grid-cols-12 items-center gap-4">
                    <div className="sm:col-span-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-soft text-text-muted flex items-center justify-center group-hover:bg-brand-blue-pale group-hover:text-brand-blue transition-colors">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-primary truncate">{report.booking.tests.map(t => t.name).join(", ")}</p>
                        <p className="text-[10px] text-text-muted uppercase font-medium">{new Date(report.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="sm:col-span-4 flex justify-center sm:justify-start">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                        report.aiStatus === 'COMPLETED' ? "bg-green-50 text-status-success" : 
                        report.aiStatus === 'PENDING' ? "bg-blue-50 text-brand-blue" :
                        "bg-orange-50 text-status-warning"
                      )}>
                        {report.aiStatus === 'COMPLETED' ? 'AI Analyzed' : 
                         report.aiStatus === 'PENDING' ? 'AI Pending' : 
                         report.aiStatus === 'FAILED' ? 'AI Failed' : 'Ready'}
                      </span>
                    </div>
                    
                    <div className="sm:col-span-4 flex items-center justify-end gap-3">
                       <Link href={`/dashboard/reports/${report.id}`} className="p-2 text-text-muted hover:text-brand-blue transition-colors">
                          <Activity size={18} />
                       </Link>
                       <Link href={report.reportUrl} target="_blank" className="p-2 text-text-muted hover:text-brand-blue transition-colors">
                          <Clock size={18} />
                       </Link>
                       <Link href={`/dashboard/reports/${report.id}`}>
                         <Button variant="outline" size="sm" className="rounded-xl font-bold group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue transition-all">
                           Insight
                         </Button>
                       </Link>
                    </div>
                  </div>
                ))}
               </div>
             ) : (
               <div className="p-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-surface-soft rounded-full flex items-center justify-center mx-auto text-text-muted">
                    <FileText size={32} />
                  </div>
                  <p className="text-text-secondary text-sm">No reports found for this profile.</p>
                  <Button variant="primary" className="rounded-xl">Book a Test Now</Button>
               </div>
             )}
           </div>

           {/* Trend graph Placeholder */}
           <div className="bg-white rounded-[2rem] p-8 border border-surface-border shadow-sm min-h-[300px] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 flex items-center gap-4">
                 <select className="bg-surface-soft border-none text-[11px] font-bold rounded-lg px-3 py-1 outline-none">
                    <option>HbA1c Tracking</option>
                    <option>Cholesterol</option>
                    <option>Vitamin D</option>
                 </select>
              </div>
              <h3 className="text-xl font-heading font-bold text-text-primary mb-1">Health Trends</h3>
              <p className="text-xs text-text-muted mb-8">Tracking your markers over the last 12 months.</p>
              
              <div className="w-full h-48 flex items-end justify-between gap-1 px-4 mb-4">
                 {[40, 60, 45, 70, 55, 65, 80, 75, 90, 85, 95, 100].map((val, i) => (
                    <div key={i} className="flex-1 group relative">
                       <div 
                         style={{ height: `${val}%` }} 
                         className={`w-full rounded-t-lg transition-all duration-1000 delay-${i*50} ${i === 11 ? 'bg-brand-blue shadow-lg shadow-brand-blue/20' : 'bg-brand-blue/10 group-hover:bg-brand-blue/30'}`} 
                       />
                       <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-text-primary text-white text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap">
                          {6.0 + (val/100)}%
                       </div>
                    </div>
                 ))}
              </div>
              <div className="flex justify-between px-4 text-[10px] text-text-muted font-bold uppercase tracking-widest mt-6">
                 <span>Apr 2025</span>
                 <span>Jul 2025</span>
                 <span>Oct 2025</span>
                 <span>Jan 2026</span>
                 <span>Apr 2026</span>
              </div>
           </div>
        </div>

        {/* Right: Insights & Recommendations */}
        <div className="lg:col-span-4 space-y-6">
           <h2 className="text-xl font-heading font-bold text-text-primary flex items-center gap-2 px-2">
              <Zap className="text-brand-orange" size={20} />
              AI Insights
           </h2>

           <div className="space-y-4">
              {recommendations.map((rec, i) => (
                <div key={i} className="bg-white rounded-[2rem] p-6 border border-surface-border shadow-sm relative group cursor-pointer hover:border-brand-blue transition-all">
                   <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-orange-50 text-status-warning flex items-center justify-center">
                        <AlertCircle size={18} />
                      </div>
                      <p className="text-sm font-extrabold text-text-primary">{rec.title}</p>
                   </div>
                   <p className="text-xs text-text-secondary leading-relaxed mb-4">{rec.description}</p>
                   <div className="flex items-center justify-between pt-4 border-t border-surface-border">
                      <span className="text-[10px] font-bold text-text-muted uppercase italic">Due in {rec.dueInDays} days</span>
                      <button className="text-[11px] font-bold text-brand-blue hover:underline">{rec.cta} →</button>
                   </div>
                </div>
              ))}
           </div>

           {/* Reminders list */}
           <div className="bg-surface-soft/50 rounded-[2rem] p-6 border border-dashed border-surface-border">
              <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Upcoming Screenings</h3>
              <div className="space-y-4">
                {reminders.map((rem, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${rem.critical ? 'bg-status-danger' : 'bg-brand-blue'}`} />
                        <p className="text-sm font-medium text-text-primary">{rem.testName}</p>
                     </div>
                     <p className="text-[10px] font-bold text-text-muted uppercase">{rem.dueDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</p>
                  </div>
                ))}
              </div>
           </div>

           {/* Referral Progress integration */}
           <div className="bg-brand-teal/5 rounded-[2rem] p-6 border border-brand-teal/10">
              <div className="flex items-center justify-between mb-4">
                 <p className="text-xs font-bold uppercase tracking-widest text-brand-teal">Referral Milestone</p>
                 <TrendingUp size={16} className="text-brand-teal" />
              </div>
              <p className="text-lg font-bold text-text-primary mb-1">Step closer to Bronze Tier</p>
              <p className="text-xs text-text-muted mb-4">Refer 1 more friend to unlock ₹250 wallet credits.</p>
              <div className="w-full h-1.5 bg-brand-teal/10 rounded-full overflow-hidden mb-6">
                 <div className="w-1/2 h-full bg-brand-teal rounded-full" />
              </div>
              <Link href="/dashboard/referrals">
                <Button fullWidth variant="primary" size="sm" className="bg-brand-teal hover:bg-brand-teal-dark border-none rounded-xl">Share Referral Link</Button>
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
