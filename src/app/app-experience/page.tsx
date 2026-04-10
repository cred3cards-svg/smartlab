import type { Metadata } from "next";
import Link from "next/link";
import { 
  Smartphone, 
  Bell, 
  FileText, 
  TrendUp, 
  Users, 
  ShieldCheck, 
  Download,
  Zap,
  CheckCircle2,
  ArrowRight,
  MessageSquare
} from "lucide-react";
import Button from "@/components/ui/Button";
import { BRAND, CONTACT, APP_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Mobile App & Patient Dashboard — Your Health on Auto-pilot | ${BRAND.name}`,
  description: "Manage your medical reports, track health trends, book home collections, and add family members with the SMARTLAB247 app. Available on iOS and Android.",
};

export default function AppExperiencePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-brand-blue text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-teal/5 pointer-events-none skew-x-12 translate-x-1/4" />
        
        <div className="container-site relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-teal">
                <Smartphone size={14} />
                The Future of Diagnostics
              </div>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight italic">
                Your Health, in <span className="text-brand-teal underline decoration-white/20">Your Pocket</span>
              </h1>
              <p className="text-xl text-white/70 max-w-lg leading-relaxed italic">
                Track every sample, view historical trends, and manage family reports with our enterprise-grade mobile experience.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href={APP_LINKS.play_store} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="px-8 h-14 bg-white text-brand-blue hover:bg-white/90">
                    Play Store
                  </Button>
                </a>
                <a href={APP_LINKS.app_store} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="px-8 h-14 border-white/20 hover:bg-white/10">
                    App Store
                  </Button>
                </a>
              </div>
            </div>

            {/* App Mockup Placeholder */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="w-64 h-[520px] bg-slate-800 rounded-[3rem] border-8 border-slate-700 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-700 rounded-b-2xl z-20" />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-teal p-6 flex flex-col pt-12">
                   {/* Mock App Content */}
                   <div className="w-10 h-10 rounded-xl bg-white/20 mb-6" />
                   <div className="w-full h-4 bg-white/20 rounded-full mb-2" />
                   <div className="w-2/3 h-4 bg-white/10 rounded-full mb-8" />
                   
                   <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white/10 rounded-2xl p-4 border border-white/10">
                           <div className="w-1/2 h-3 bg-white/20 rounded-full mb-2" />
                           <div className="w-full h-8 bg-white/5 rounded-xl" />
                        </div>
                      ))}
                   </div>

                   <div className="mt-auto flex justify-around py-4 border-t border-white/10">
                      {[1, 2, 3, 4].map(i => <div key={i} className="w-6 h-6 rounded-full bg-white/20" />)}
                   </div>
                </div>
                <div className="absolute inset-0 bg-brand-teal/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-8 text-center text-xs font-bold leading-tight">
                  <div className="bg-white text-brand-blue p-4 rounded-2xl shadow-xl">
                    SMARTLAB247 v2.4 (Live)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-surface-soft">
        <div className="container-site">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-heading font-bold text-3xl text-text-primary mb-4 italic">Everything you should expect from a 2024 healthcare app</h2>
            <p className="text-text-muted">Built for speed, accuracy, and absolute patient privacy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Report Management",
                desc: "Never lose a report again. Every test you've ever taken at SMARTLAB247 is available for instant download."
              },
              {
                icon: TrendUp,
                title: "Smart Health Trends",
                desc: "See how your parameters (like Cholesterol or HbA1c) have moved over the years with AI trend charts."
              },
              {
                icon: Bell,
                title: "Live Order Tracking",
                desc: "Track your SkillMedic™ in real-time, know exactly when they reach, and see the sample journey to the lab."
              },
              {
                icon: Users,
                title: "Family Profiles",
                desc: "Add your parents, spouse, and kids. Manage all their health records from a single secure account."
              },
              {
                icon: MessageSquare,
                title: "WhatsApp Delivery",
                desc: "No need to open the app for quick updates. Get your final reports delivered instantly to your WhatsApp."
              },
              {
                icon: ShieldCheck,
                title: "Secure Access",
                desc: "Enterprise-level encryption for all medical data. Your reports are private and only accessible by you."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] border border-surface-border shadow-sm hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-2xl bg-brand-teal-pale text-brand-teal flex items-center justify-center mb-6">
                  <feature.icon size={28} />
                </div>
                <h3 className="font-heading font-bold text-xl text-text-primary mb-3 italic">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Screenshots / Highlight Section */}
      <section className="py-24">
        <div className="container-site">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-text-primary leading-tight italic">
                Advanced Analytics for <span className="text-brand-blue underline decoration-brand-teal">Serious Health Monitoring</span>
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed italic">
                Reports are just the beginning. Our dashboard provides simple-language summaries and highlights what needs your attention immediately.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Visual trend lines for repeat parameters",
                  "Normal ranges explained in simple terms",
                  "One-tap rebooking for regular monitoring tests",
                  "Secure sharing with your doctor"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-text-primary font-medium italic">
                    <CheckCircle2 size={20} className="text-brand-teal" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="pt-6">
                <Link href="/smartpass247">
                  <Button variant="outline" size="lg" rightIcon={<ArrowRight size={18} />}>
                    Member Benefits Preview
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex-1 bg-surface-soft rounded-[48px] p-8 md:p-12 border border-surface-border">
              <div className="bg-white rounded-3xl p-6 shadow-card border border-surface-border/50">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="font-bold text-text-primary italic uppercase tracking-wider text-xs">Sample Trends (Daily View)</h4>
                  <Zap size={16} className="text-brand-teal" fill="currentColor" />
                </div>
                <div className="h-48 w-full bg-surface-soft rounded-2xl flex items-end justify-between p-4 gap-2">
                   {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                      <div key={i} className="flex-1 bg-brand-teal/20 rounded-t-lg relative group transition-all" style={{ height: `${h}%` }}>
                         <div className="absolute inset-0 bg-brand-teal opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" />
                      </div>
                   ))}
                </div>
                <p className="text-[10px] text-text-muted mt-4 text-center font-bold tracking-widest uppercase italic">AI Trend Analysis — Verified by {BRAND.name}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-brand-blue border-t border-brand-teal/20 text-white">
        <div className="container-site text-center">
          <h2 className="font-heading font-bold text-3xl mb-8 italic">Ready to Switch to Smart Diagnostics?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button size="lg" className="px-10 h-14 bg-white text-brand-blue hover:bg-white/90">Book First Test Online</Button>
             <Link href={`tel:${CONTACT.phone}`}>
                <Button size="lg" variant="outline" className="px-10 h-14 border-white/20 hover:bg-white/10 italic">Call for Support</Button>
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
