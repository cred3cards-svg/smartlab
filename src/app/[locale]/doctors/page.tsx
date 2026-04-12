import type { Metadata } from "next";
import Link from "next/link";
import { 
  Stethoscope, 
  FlaskConical, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  ArrowRight,
  ClipboardList,
  UserCheck,
  Building2,
  Phone
} from "lucide-react";
import Button from "@/components/ui/Button";
import { BRAND, CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: `For Doctors & Clinics — Partner with SMARTLAB247 | ${BRAND.name}`,
  description: "Join the diagnostic revolution. Partner with SMARTLAB247 for faster reports, seamless home collections, and doctor-verified AI-assisted pathology for your patients.",
};

export default function DoctorsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-surface-soft border-b border-surface-border">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/5 pointer-events-none skew-x-12 translate-x-1/2" />
        
        <div className="container-site relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 bg-brand-blue-pale border border-brand-blue/10 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-blue">
              <Stethoscope size={14} />
              Partner Program
            </div>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight italic">
              Empowering Doctors with <span className="text-brand-teal">Precision & Speed</span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed italic max-w-2xl">
               Join <span className="text-brand-blue font-bold">{BRAND.name}</span> in delivering a superior diagnostic experience to your patients through AI-assisted pathology and painless home collection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
               <Button size="lg" className="px-10 h-14 text-lg">Send Enquiry</Button>
               <Link href={`tel:${CONTACT.phone}`}>
                 <Button variant="outline" size="lg" className="px-10 h-14 text-lg">Call Partner Support</Button>
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Partners */}
      <section className="py-24">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: Clock,
                title: "Accelerated TAT",
                desc: "Reports typically delivered within 6 hours. Help your patients start treatment faster with our optimized diagnostic pipeline."
              },
              {
                icon: FlaskConical,
                title: "Quality You Can Trust",
                desc: "Every report is authorized by MD Pathologists after multi-level AI validation, ensuring clinical precision for every parameter."
              },
              {
                icon: UserCheck,
                title: "Seamless Experience",
                desc: "Zero travel for patients. Our SkillMedics™ ensure professional, painless collection at home, increasing patient compliance."
              },
              {
                icon: Building2,
                title: "Integrated Workflows",
                desc: "Specialized dashboards for clinics to track patient samples and access reports instantly upon verification."
              },
              {
                icon: Zap,
                title: "AI-Powered Insights",
                desc: "Access longitudinal trend charts for chronic cases to monitor patient progress over months and years."
              },
              {
                icon: ShieldCheck,
                title: "Ethical & Transparent",
                desc: "Complete transparency in process, logistics, and pricing. No hidden costs or complex referral schemes."
              }
            ].map((benefit, i) => (
              <div key={i} className="group">
                <div className="w-14 h-14 rounded-2xl bg-surface-soft text-brand-blue flex items-center justify-center mb-6 group-hover:bg-brand-blue group-hover:text-white transition-all transform group-hover:rotate-3">
                  <benefit.icon size={26} />
                </div>
                <h3 className="font-heading font-bold text-xl text-text-primary mb-3 italic">{benefit.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote / Proof Section */}
      <section className="py-24 bg-brand-blue text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        
        <div className="container-site relative z-10 max-w-4xl text-center mx-auto">
          <Stethoscope size={48} className="text-brand-teal mx-auto mb-8 opacity-50" />
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-8 leading-relaxed italic">
            &quot;The AI-flagged insights in {BRAND.name} reports help me focus on critical parameters immediately. It&apos;s a significant step forward for pathology in India.&quot;
          </h2>
          <div className="space-y-1">
             <p className="font-bold text-xl italic">— Dr. Kavitha Rajan</p>
             <p className="text-white/60 text-sm uppercase tracking-widest font-bold">Internal Medicine, Kolkata</p>
          </div>
        </div>
      </section>

      {/* Enquiry Form Landing */}
      <section className="py-24">
        <div className="container-site max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
               <h2 className="font-heading font-bold text-3xl text-text-primary italic">Request a Partnership</h2>
               <p className="text-text-secondary italic leading-relaxed">
                 Fill out the form to scheduled a digital walkthrough or a physical demonstration at your clinic. Our partner relations team will reach out within 24 hours.
               </p>
               
               <div className="space-y-4 pt-4">
                  {[
                    "Standardized panel for clinics",
                    "Customized B2B pricing model",
                    "Dedicated account manager",
                    "Clinic dashboard access"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-text-primary font-bold italic">
                       <CheckCircle2 size={20} className="text-brand-teal" />
                       {item}
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-white rounded-3xl border border-surface-border p-8 shadow-xl">
               <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Full Name</label>
                       <input type="text" className="w-full bg-surface-soft border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-teal/20" placeholder="Dr. John Doe" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Specialty</label>
                       <input type="text" className="w-full bg-surface-soft border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-teal/20" placeholder="Cardiologist" />
                    </div>
                  </div>
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Clinic/Hospital Name</label>
                     <input type="text" className="w-full bg-surface-soft border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-teal/20" placeholder="City Health Clinic" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Work Email</label>
                     <input type="email" className="w-full bg-surface-soft border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-teal/20" placeholder="doctor@example.com" />
                  </div>
                   <div className="space-y-1">
                     <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Phone Number</label>
                     <input type="tel" className="w-full bg-surface-soft border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-teal/20" placeholder="+91-0000000000" />
                  </div>
                  <Button fullWidth size="lg" className="mt-4">Submit Interest</Button>
               </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <section className="py-20 border-t border-surface-border bg-surface-soft">
        <div className="container-site text-center">
          <p className="text-text-muted text-sm italic mb-4">Direct helpline for diagnostic partners:</p>
          <a href={`tel:${CONTACT.phone}`} className="inline-flex items-center gap-2 text-2xl font-bold text-brand-blue hover:text-brand-teal transition-colors">
            <Phone size={24} />
            {CONTACT.phone_display}
          </a>
        </div>
      </section>
    </div>
  );
}
