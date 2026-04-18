"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Download, 
  Share2, 
  Play, 
  Zap, 
  ArrowLeft, 
  ShieldCheck, 
  ChevronRight,
  AlertCircle,
  Clock,
  ExternalLink,
  Activity,
  Languages,
  Info
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import BodyMap from "@/components/dashboard/BodyMap";
import { cn } from "@/lib/utils";

interface AiAnalysis {
  name: string;
  explanation: string;
  status: "normal" | "borderline" | "high" | "low" | "critical";
  organ: string;
}

interface BodySystem {
  organ: string;
  status: "healthy" | "warning" | "attention";
  details: string;
}

interface Recommendation {
  title: string;
  description: string;
  reason: string;
}

interface LifestyleAdvice {
  category: string;
  advice: string;
}

interface ReportDetailClientProps {
  report: {
    id: string;
    bookingId: string;
    bookingNumber: string;
    reportUrl: string;
    aiStatus: string;
    summaryEn?: string;
    summaryHi?: string;
    summaryBn?: string;
    abnormalAnalysis?: any;
    bodyMapping?: any;
    recommendations?: any;
    lifestyleGuidance?: any;
    recheckInterval?: string;
    videoScript?: string;
    structuredData?: any;
  };
}

export default function ReportDetailClient({ report }: ReportDetailClientProps) {
  const [lang, setLang] = useState<"en" | "hi" | "bn">("en");

  const getSummary = () => {
    if (lang === "hi") return report.summaryHi || report.summaryEn;
    if (lang === "bn") return report.summaryBn || report.summaryEn;
    return report.summaryEn;
  };

  const abnormalItems: AiAnalysis[] = (report.abnormalAnalysis as any) || [];
  const bodySystems: BodySystem[] = (report.bodyMapping as any) || [];
  const recommendations: Recommendation[] = (report.recommendations as any) || [];
  const lifestyle: LifestyleAdvice[] = (report.lifestyleGuidance as any) || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Back button & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-10 h-10 rounded-full bg-white border border-surface-border flex items-center justify-center hover:bg-surface-soft transition-colors shadow-sm">
            <ArrowLeft size={20} className="text-text-muted" />
          </Link>
          <div>
            <h1 className="text-2xl font-heading font-bold text-text-primary">Intelligence Report Details</h1>
            <p className="text-text-secondary text-[10px] uppercase tracking-widest font-extrabold mt-1">ID: {report.bookingNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="bg-surface-soft p-1 rounded-xl flex items-center gap-1 border border-surface-border mr-2">
              <Button 
                variant={lang === "en" ? "primary" : "ghost"} 
                size="sm" 
                className="text-[10px] py-1 px-3 rounded-lg font-black h-fit"
                onClick={() => setLang("en")}
              >
                EN
              </Button>
              <Button 
                variant={lang === "hi" ? "primary" : "ghost"} 
                size="sm" 
                className="text-[10px] py-1 px-3 rounded-lg font-black h-fit"
                onClick={() => setLang("hi")}
              >
                हिन्दी
              </Button>
              <Button 
                variant={lang === "bn" ? "primary" : "ghost"} 
                size="sm" 
                className="text-[10px] py-1 px-3 rounded-lg font-black h-fit"
                onClick={() => setLang("bn")}
              >
                বাংলা
              </Button>
           </div>
           
           <Link href={report.reportUrl || "#"} target="_blank">
             <Button variant="primary" className="rounded-xl font-bold bg-brand-blue flex items-center gap-2 shadow-lg shadow-brand-blue/20">
                <Download size={18} /> <span className="hidden sm:inline">Original PDF</span>
             </Button>
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content: AI Explanations & Results */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* AI Intelligence Block */}
          <section className="bg-white rounded-[2.5rem] border border-surface-border shadow-sm p-8 md:p-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8">
               <div className="w-12 h-12 bg-brand-blue-pale text-brand-blue rounded-2xl flex items-center justify-center">
                  <Zap size={24} fill="currentColor" />
               </div>
             </div>
             
             <div className="max-w-2xl">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-pale text-brand-blue text-[10px] font-bold uppercase tracking-wider mb-4">
                  <Activity size={12} /> AI Health Analysis
               </div>
               <h2 className="text-3xl font-heading font-bold text-text-primary mb-6">Expert Interpretation</h2>
               
               {report.aiStatus === "PENDING" ? (
                 <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Clock className="w-10 h-10 text-brand-blue animate-spin mb-4" />
                    <p className="text-text-secondary font-bold italic italic-accent">AI is currently analyzing your markers...</p>
                 </div>
               ) : (
                 <>
                   <div className="prose prose-sm prose-slate max-w-none">
                     <p className="text-text-secondary text-lg leading-relaxed italic italic-accent">
                       &quot;{getSummary()}&quot;
                     </p>
                   </div>

                   {/* Safety Disclaimer */}
                   <div className="mt-8 flex items-start gap-3 p-4 bg-surface-soft rounded-2xl border border-dashed border-surface-border">
                      <ShieldCheck className="text-status-success shrink-0" size={18} />
                      <p className="text-[11px] text-text-secondary leading-relaxed font-semibold">
                        <span className="text-brand-blue font-black uppercase tracking-tighter mr-1">Medical Disclaimer:</span>
                        This is AI-generated health guidance and not a medical diagnosis. Consult a doctor before making any medical decisions.
                      </p>
                   </div>
                 </>
               )}
             </div>

             {/* Abnormal Parameters Explanations */}
             {abnormalItems.length > 0 && (
               <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {abnormalItems.map((item, i) => (
                    <div key={i} className="bg-white border border-surface-border rounded-[2rem] p-5 flex items-start gap-4 hover:shadow-md transition-all">
                       <div className={cn(
                         "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                         item.status === "critical" || item.status === "high" ? "bg-red-50 text-status-danger" : "bg-orange-50 text-status-warning"
                       )}>
                          <AlertCircle size={20} />
                       </div>
                       <div>
                          <p className="text-sm font-black text-text-primary mb-1 uppercase tracking-tight">{item.name}</p>
                          <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                            {item.explanation}
                          </p>
                       </div>
                    </div>
                  ))}
               </div>
             )}
          </section>

          {/* Structured Results (Existing logic adapted) */}
          <section className="bg-white rounded-[2.5rem] border border-surface-border shadow-sm overflow-hidden">
             <div className="p-8 border-b border-surface-border flex items-center justify-between">
                <h3 className="text-xl font-heading font-bold text-text-primary">Structured Lab Markers</h3>
                <span className="text-[10px] font-extrabold text-text-muted uppercase bg-surface-soft px-3 py-1 rounded-full tracking-tighter">Verified by Pathologist</span>
             </div>
             {/* Note: In a real system we'd map report.structuredData here */}
             <div className="p-8 text-center text-text-muted italic italic-accent text-sm">
                (Historical & Current Lab Markers Visualization)
             </div>
          </section>
        </div>

        {/* Sidebar: Body Map, Recommendations, Video */}
        <div className="lg:col-span-4 space-y-8">
           
           {/* Body Map Visualization */}
           <BodyMap mapping={bodySystems} />

           {/* Video Summary Section */}
           <section className="bg-text-primary shadow-2xl rounded-[2.5rem] overflow-hidden group">
              <div className="p-8 border-b border-white/10">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center">
                       <Play size={18} fill="white" />
                    </div>
                    <div>
                       <h3 className="text-lg font-heading font-bold text-white">AI Video Summary</h3>
                       <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Avatar Interpretation</p>
                    </div>
                 </div>
              </div>
              <div className="aspect-video relative bg-[#0A0A0A] flex items-center justify-center">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60')] bg-cover bg-center opacity-40 grayscale blur-sm group-hover:blur-0 transition-all duration-700" />
                 <div className="relative z-10 text-center">
                    <button className="w-20 h-20 rounded-full border-4 border-white/20 bg-white/10 backdrop-blur-xl flex items-center justify-center text-white scale-110 hover:scale-125 transition-transform duration-500 group-hover:border-white shadow-2xl">
                       <Play fill="white" size={32} />
                    </button>
                    <p className="mt-4 text-white font-bold text-[10px] tracking-widest uppercase opacity-80 uppercase">Coming Soon to Dashboard</p>
                 </div>
              </div>
              {report.videoScript && (
                <div className="p-6 text-white/60 text-[10px] leading-relaxed italic italic-accent line-clamp-2">
                   &quot;{report.videoScript}&quot;
                </div>
              )}
           </section>

           {/* Recommendations & Followup Box */}
           {recommendations.length > 0 && (
             <section className="bg-white rounded-[2.5rem] border border-surface-border shadow-sm p-8">
                <h3 className="text-xl font-heading font-bold text-text-primary mb-6">Health Strategy</h3>
                
                <div className="space-y-6">
                   {recommendations.map((rec, i) => (
                     <div key={i} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-blue-pale text-brand-blue flex items-center justify-center shrink-0 shadow-sm">
                           <Zap size={20} />
                        </div>
                        <div>
                           <p className="text-sm font-black text-text-primary mb-1 uppercase tracking-tight">{rec.title}</p>
                           <p className="text-[11px] text-text-secondary leading-relaxed mb-3 font-medium">{rec.description}</p>
                           <div className="inline-flex items-center gap-2 text-[10px] font-black text-brand-blue bg-brand-blue-pale px-3 py-1 rounded-full uppercase tracking-tighter">
                              Reason: {rec.reason}
                           </div>
                        </div>
                     </div>
                   ))}

                   {report.recheckInterval && (
                     <div className="flex items-start gap-4 border-t border-surface-border pt-6">
                        <div className="w-10 h-10 rounded-xl bg-brand-teal-pale text-brand-teal flex items-center justify-center shrink-0 shadow-sm">
                           <Clock size={20} />
                        </div>
                        <div>
                           <p className="text-sm font-black text-text-primary mb-1 uppercase tracking-tight">Recheck Interval</p>
                           <p className="text-[11px] text-text-secondary leading-relaxed mb-3 font-medium">AI recommends a follow-up assessment.</p>
                           <div className="bg-surface-soft px-4 py-3 rounded-2xl text-[10px] font-black text-text-primary flex justify-between items-center shadow-inner">
                              <span className="uppercase tracking-widest">Wait Period:</span>
                              <span className="bg-brand-teal text-white px-2 py-0.5 rounded-lg">{report.recheckInterval}</span>
                           </div>
                        </div>
                     </div>
                   )}
                </div>
             </section>
           )}

           {/* Natural Remedies / Lifestyle */}
           {lifestyle.length > 0 && (
             <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark rounded-[2.5rem] p-8 text-white shadow-xl shadow-brand-blue/20">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                      <Languages size={18} className="text-brand-teal" />
                   </div>
                   <h3 className="text-lg font-heading font-bold italic italic-accent uppercase tracking-tight">Lifestyle Guidance</h3>
                </div>
                <div className="space-y-4">
                   {lifestyle.map((item, i) => (
                     <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                        <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest mb-1">{item.category}</p>
                        <p className="text-[11px] text-white/80 leading-relaxed font-medium">{item.advice}</p>
                     </div>
                   ))}
                </div>
             </section>
           )}
        </div>
      </div>
    </div>
  );
}

