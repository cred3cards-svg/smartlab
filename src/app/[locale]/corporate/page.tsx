import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Users, MapPin, CheckCircle2, ShieldCheck, FileText, BarChart3, Calendar, Zap, ArrowRight, TrendingUp, Award, Home } from "lucide-react";
import Button from "@/components/ui/Button";
import { BRAND, CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Corporate Wellness & B2B Diagnostics — Smart Health for Teams | ${BRAND.name}`,
  description: "Enterprise-grade health checkup camps, employee wellness programs, and diagnostic analytics dashboards for modern organizations. Powered by AI-assisted pathology.",
};

export default function CorporatePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-brand-blue text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-teal/5 pointer-events-none skew-x-12 translate-x-1/4" />
        
        <div className="container-site relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-teal">
              <Building2 size={14} />
              Enterprise Solutions
            </div>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight italic">
               Smart Wellness for <span className="text-brand-teal underline decoration-white/20">Modern Workforces</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl leading-relaxed italic">
               Deliver the best-in-class health benefits with {BRAND.name}. We specialize in high-efficiency wellness camps, at-home executive checkups, and workforce health analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
               <Button size="lg" className="px-10 h-14 text-lg shadow-teal">Request Proposal</Button>
               <Link href="/doctors">
                 <Button variant="outline" size="lg" className="px-10 h-14 text-lg border-white/20 hover:bg-white/10">Medical Partners</Button>
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Features */}
      <section className="py-24 bg-surface-soft">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Calendar,
                title: "On-site Health Camps",
                desc: "Efficient, standardized blood collection camps at your office premises with pre-arranged slots."
              },
              {
                icon: Home,
                title: "At-Home Coverage",
                desc: "Home sample collection for remote employees and executives across Kolkata and 6 other major cities."
              },
              {
                icon: BarChart3,
                title: "Wellness Analytics",
                desc: "Anonymized workforce health insights to help you design better insurance and wellness programs."
              },
              {
                icon: Award,
                title: "Customized Panels",
                desc: "Tailor-made health packages focusing on specific industry risks like stress, posture, or metabolic health."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] border border-surface-border shadow-sm hover:shadow-xl transition-all">
                <div className="w-14 h-14 rounded-2xl bg-brand-blue-pale text-brand-blue flex items-center justify-center mb-6">
                  <feature.icon size={28} />
                </div>
                <h3 className="font-heading font-bold text-xl text-text-primary mb-3 italic">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed italic">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Preview Section */}
      <section className="py-24 overflow-hidden">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
               <h2 className="font-heading font-bold text-4xl text-text-primary leading-tight italic decoration-brand-teal decoration-4 underline-offset-8 underline">
                  Anonymized Data for <span className="text-brand-blue">Strategic Wellness</span>
               </h2>
               <p className="text-lg text-text-secondary italic leading-relaxed">
                  Go beyond the PDF. Our B2B dashboard gives HR & Medical teams a macro view of organization health trends without compromising individual employee privacy.
               </p>
               
               <div className="space-y-4 pt-4">
                  {[
                    "Department-wise health risk analysis (Anonymized)",
                    "Trend comparison over annual checkups",
                    "Customized doctor sessions based on aggregate findings",
                    "Seamless report distribution via app/email/WhatsApp"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-text-primary font-bold italic">
                       <TrendingUp size={20} className="text-brand-teal" />
                       {item}
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-brand-blue rounded-[48px] p-8 md:p-12 border border-white/10 relative shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 relative z-10">
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                         <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Enterprise Analytics Live</span>
                      </div>
                      <Zap size={16} className="text-brand-teal" fill="currentColor" />
                   </div>
                   
                   <div className="space-y-6">
                      <div className="h-4 bg-white/10 rounded-full w-full" />
                      <div className="h-32 bg-white/5 rounded-2xl flex items-end justify-between p-4 gap-2">
                         {[40, 90, 60, 100, 70, 80].map((h, i) => (
                            <div key={i} className="flex-1 bg-brand-teal/40 rounded-lg group hover:bg-brand-teal transition-all" style={{ height: `${h}%` }} />
                         ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="h-10 bg-white/10 rounded-xl" />
                         <div className="h-10 bg-white/10 rounded-xl" />
                      </div>
                   </div>
                </div>
                <div className="mt-8 text-center">
                   <p className="text-[10px] text-white/40 uppercase font-bold tracking-[0.2em] italic">Proprietary AI Trend Architecture</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Trust Points */}
      <section className="py-24 bg-surface-soft border-y border-surface-border">
         <div className="container-site">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
               <div>
                  <div className="text-4xl font-extrabold text-brand-blue mb-2 italic">100+</div>
                  <p className="text-sm font-bold text-text-muted uppercase tracking-wider">Corporate Partners</p>
               </div>
               <div>
                  <div className="text-4xl font-extrabold text-brand-blue mb-2 italic">15k+</div>
                  <p className="text-sm font-bold text-text-muted uppercase tracking-wider">Employees Screened</p>
               </div>
               <div>
                  <div className="text-4xl font-extrabold text-brand-blue mb-2 italic">7-City</div>
                  <p className="text-sm font-bold text-text-muted uppercase tracking-wider">Operational Presence</p>
               </div>
            </div>
         </div>
      </section>

      {/* CTA / Contact */}
      <section className="py-24">
        <div className="container-site max-w-4xl text-center">
           <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-text-primary mb-6 italic">Transform Your Employee Experience</h2>
           <p className="text-lg text-text-secondary italic mb-10">
              Join the new standard of corporate wellness. Reliable diagnostics, painless experience, and expert medical oversight.
           </p>
           
           <div className="bg-white rounded-[32px] border border-surface-border p-8 md:p-12 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left italic">
                 <div className="space-y-2">
                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Email Us</p>
                    <p className="text-xl font-bold text-brand-blue">{CONTACT.email}</p>
                 </div>
                 <div className="space-y-2">
                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider">B2B Helpline</p>
                    <p className="text-xl font-bold text-brand-blue">{CONTACT.phone_display}</p>
                 </div>
              </div>
              <Button size="lg" className="w-full mt-10 rounded-2xl h-14 text-lg shadow-teal" rightIcon={<ArrowRight size={18} />}>
                Request Corporate Brochure
              </Button>
           </div>
        </div>
      </section>
    </div>
  );
}
