import type { Metadata } from "next";
import Link from "next/link";
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Cpu, 
  Search, 
  LineChart, 
  AlertCircle,
  Stethoscope,
  Microscope,
  FileText,
  Activity,
  ArrowRight,
  MapPin,
  Home
} from "lucide-react";
import Button from "@/components/ui/Button";
import { BRAND, CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: `AI-Assisted Diagnostics — Faster, More Accurate Reports | ${BRAND.name}`,
  description: "Learn how SMARTLAB247 uses AI to optimize pathology workflows, highlight critical markers, and deliver faster, doctor-verified reports in Kolkata.",
};

export default function AIDiagnosticsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-surface-soft">
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300A8A8' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        
        <div className="container-site relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-brand-teal-pale border border-brand-teal/20 rounded-full px-4 py-2 mb-8 text-sm font-bold uppercase tracking-widest text-brand-teal animate-pulse">
              <Cpu size={16} />
              India&apos;s First AI-Assisted Lab
            </div>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6 leading-tight italic">
              Where Technology Meets <span className="text-brand-teal">Trust</span>
            </h1>
            <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed italic">
              Discover how AI-optimized workflows ensure the fastest report turnaround and deep clinical insights, <span className="text-brand-blue font-bold">verified by expert pathologists.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-10 h-14 text-lg">See the Workflow</Button>
              <Link href="/tests">
                <Button size="lg" variant="outline" className="px-10 h-14 text-lg">Book a Test</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section: 3 Pillars */}
      <section className="py-24">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Clock,
                title: "Operational Speed",
                desc: "Our AI engine optimizes the entire path from home collection to lab processing, removing manual bottlenecks to deliver reports in as little as 6 hours."
              },
              {
                icon: Microscope,
                title: "Marker Highlighting",
                desc: "AI highlights critical or abnormal markers for priority pathologist review, ensuring that significant findings are never buried in large panels."
              },
              {
                icon: LineChart,
                title: "Patient Insight Trends",
                desc: "Understand your health over time. Members get AI-powered trend analysis across historical reports to see how their health markers are moving."
              }
            ].map((pillar, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 rounded-3xl bg-surface-soft text-brand-teal flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-teal group-hover:text-white transition-all transform group-hover:-translate-y-2">
                  <pillar.icon size={32} />
                </div>
                <h3 className="font-heading font-bold text-2xl text-text-primary mb-4 italic">{pillar.title}</h3>
                <p className="text-text-secondary leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-brand-blue text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-teal/5 pointer-events-none skew-x-12 translate-x-1/2" />
        
        <div className="container-site relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl mb-4 italic">The AI-Powered Sample Journey</h2>
            <p className="text-white/60 max-w-xl mx-auto italic uppercase tracking-wider text-xs">Standardized | Validated | Optimized</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
             {/* Connection Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 hidden md:block -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { step: "01", icon: MapPin, label: "Digital Booking", desc: "Slots optimized for your location." },
                { step: "02", icon: Zap, label: "Smart Routing", desc: "Fastest collection pathing." },
                { step: "03", icon: Cpu, label: "Rapid Analysis", desc: "Automated analysis pipelines." },
                { step: "04", icon: ShieldCheck, label: "QA Check", desc: "AI + Pathologist dual verification." }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm text-center">
                  <div className="w-12 h-12 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold text-lg mx-auto mb-4 border-4 border-brand-blue">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-lg mb-2 italic">{item.label}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer / Trust Section */}
      <section className="py-24">
        <div className="container-site max-w-4xl">
          <div className="bg-white rounded-[40px] border border-surface-border p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-teal" />
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-16 h-16 rounded-2xl bg-brand-teal-pale text-brand-teal flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={32} />
              </div>
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-3xl text-text-primary italic">Clinical Governance Above All</h2>
                <div className="prose prose-sm text-text-secondary leading-relaxed space-y-4 font-medium italic">
                  <p>
                    While AI powers our speed and highlights patterns, <span className="text-brand-blue font-extrabold uppercase tracking-tight underline decoration-brand-teal">Diagnostic decisions remain 100% medically governed.</span>
                  </p>
                  <p>
                    Every single pathology report generated at SMARTLAB247 is reviewed, authorized, and digitally signed by a qualified, registered Pathologist. AI assistance is used as a sophisticated operational support tool to ensure:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                       <CheckCircle2 size={16} className="text-brand-teal mt-0.5 flex-shrink-0" />
                       Higher consistency in pre-analytical and analytical phases.
                    </li>
                    <li className="flex items-start gap-2">
                       <CheckCircle2 size={16} className="text-brand-teal mt-0.5 flex-shrink-0" />
                       Faster identification of critical alerts for immediate notification.
                    </li>
                    <li className="flex items-start gap-2">
                       <CheckCircle2 size={16} className="text-brand-teal mt-0.5 flex-shrink-0" />
                       Reduction in turnaround time through workload optimization.
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-surface-border">
                   <p className="text-xs text-text-muted mt-4">
                     Compliance: Our AI tools are used in accordance with health data privacy and diagnostic platform regulatory guidelines in India.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-surface-soft border-t border-surface-border">
        <div className="container-site text-center">
          <h2 className="font-heading font-bold text-3xl text-text-primary mb-6 italic">Ready to Experience the Future?</h2>
          <Link href="/tests">
            <Button size="lg" className="px-10 shadow-teal" rightIcon={<ArrowRight size={18} />}>
              Explore our Tests in Kolkata
            </Button>
          </Link>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
             <div className="flex items-center gap-2 text-xs text-text-muted font-bold uppercase tracking-widest">
                <CheckCircle2 size={14} className="text-brand-teal" /> NABL Certified Labs
             </div>
             <div className="flex items-center gap-2 text-xs text-text-muted font-bold uppercase tracking-widest">
                <CheckCircle2 size={14} className="text-brand-teal" /> Expert Pathologists
             </div>
             <div className="flex items-center gap-2 text-xs text-text-muted font-bold uppercase tracking-widest">
                <CheckCircle2 size={14} className="text-brand-teal" /> 100% Secure Reports
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
