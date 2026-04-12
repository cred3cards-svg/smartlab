import type { Metadata } from "next";
import Link from "next/link";
import { 
  Check, 
  Zap, 
  Users, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Gift
} from "lucide-react";
import { MEMBERSHIP_PLANS } from "@/data";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { BRAND, CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: `SMARTPASS247 Health Membership — Save More on Every Test | ${BRAND.name}`,
  description: "Join India's most rewarding health membership. Extra 20% off on all tests, free home collections, priority slots, and AI-powered health trends.",
};

const COMPARISON_FEATURES = [
  { label: "Home Collection Charges", guest: "₹99 per visit", member: "Always FREE" },
  { label: "Additional Discount", guest: "None", member: "Extra 20-25% OFF" },
  { label: "Booking Slots", guest: "Standard", member: "Priority Morning Slots" },
  { label: "Report Turnaround", guest: "Standard", member: "Fast-Track (6 hrs)" },
  { label: "Health Insights", guest: "Standard PDF", member: "AI Trends & Insights" },
  { label: "Family Coverage", guest: "Individual only", member: "Up to 4 Members" },
];

export default function SmartPassPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-brand-blue text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-teal/20 via-transparent to-transparent pointer-events-none" />

        <div className="container-site relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8 text-sm font-bold uppercase tracking-widest text-brand-teal">
            <Zap size={14} fill="currentColor" />
            Priority Health Access
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            Meet <span className="text-brand-teal italic">SMARTPASS247</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed italic">
            India&apos;s most rewarding health membership. Designed to make high-quality diagnostics <span className="text-white font-bold underline decoration-brand-teal">unbelievably affordable.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-10 h-14 text-lg shadow-teal">View Plans ↓</Button>
            <Button size="lg" variant="outline" className="px-10 h-14 text-lg border-white/20 hover:bg-white/10">Why Join?</Button>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-surface-soft">
        <div className="container-site">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl text-text-primary mb-4 italic">Exclusive Member Benefits</h2>
            <p className="text-text-muted max-w-2xl mx-auto">One membership, countless reasons to choose SMARTLAB247 for your family wellness.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Gift, title: "FREE Home Collection", desc: "Save ₹99 on every single visit. Zero minimum order value for members." },
              { icon: TrendingUp, title: "Extra 20-25% OFF", desc: "Over and above our daily discounts. The lowest prices in the market, guaranteed." },
              { icon: Clock, title: "Priority Slots", desc: "Get early morning slots (6-8 AM) even during peak seasons for the fastest reporting." },
              { icon: Sparkles, title: "AI Health Trends", desc: "Advanced report analysis with historical trend charts and lifestyle insight markers." },
              { icon: MessageSquare, title: "Report Helpline", desc: "Dedicated dietitian and doctor-support line to help explain your report findings." },
              { icon: Users, title: "Family Sharing", desc: "One pass for your entire family (up to 4 members) including parents and children." },
              { icon: ShieldCheck, title: "Lab Excellence", desc: "Priority processing in our NABL-certified automated diagnostic pipelines." },
              { icon: Calendar, title: "Wellness Reminders", desc: "Personalized health calendar that alerts you when it's time for repeat tests." },
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-surface-border hover:shadow-xl transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-brand-teal-pale text-brand-teal flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <benefit.icon size={24} />
                </div>
                <h3 className="font-bold text-lg text-text-primary mb-2 italic">{benefit.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24" id="plans">
        <div className="container-site">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl text-text-primary mb-4 italic">Choose Your SMARTPASS247</h2>
            <p className="text-text-muted">Flexible plans designed for individuals, seniors, and families.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div 
                key={plan.id} 
                className={`relative flex flex-col p-8 rounded-[40px] border shadow-sm transition-all hover:shadow-2xl ${
                  plan.popular ? "border-brand-teal ring-4 ring-brand-teal/5 bg-white" : "border-surface-border bg-white"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-teal text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="font-heading font-bold text-2xl text-text-primary mb-2 italic">{plan.name}</h3>
                  <p className="text-sm text-text-muted h-10">{plan.tagline}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-brand-blue italic">{formatPrice(plan.price)}</span>
                    <span className="text-text-muted font-medium italic">/year</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-text-muted line-through">{formatPrice(plan.originalPrice)}</span>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-lg italic">Save {(100 - (plan.price/plan.originalPrice*100)).toFixed(0)}%</span>
                  </div>
                </div>

                <div className="flex-1 space-y-4 mb-8">
                  {plan.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-sm text-text-secondary leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  fullWidth 
                  size="lg" 
                  variant={plan.popular ? "teal" : "outline"}
                  className="rounded-2xl h-14 text-base font-bold italic"
                >
                  Get Started <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-surface-soft border-t border-surface-border">
        <div className="container-site max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-text-primary italic">Member vs Guest</h2>
            <p className="text-text-muted mt-2 uppercase tracking-widest text-[10px] font-bold">The smart choice for diagnostics</p>
          </div>

          <div className="bg-white rounded-3xl border border-surface-border overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-soft border-b border-surface-border">
                  <th className="px-6 py-5 text-left text-sm font-bold text-text-primary italic">Feature</th>
                  <th className="px-6 py-5 text-center text-sm font-bold text-text-muted uppercase tracking-wider">Guest</th>
                  <th className="px-6 py-5 text-center text-sm font-bold text-brand-teal uppercase tracking-wider bg-brand-teal/5">Member</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border text-sm">
                {COMPARISON_FEATURES.map((feature, i) => (
                  <tr key={i} className="hover:bg-surface-soft transition-colors font-medium italic">
                    <td className="px-6 py-4 text-text-secondary">{feature.label}</td>
                    <td className="px-6 py-4 text-center text-text-muted">{feature.guest}</td>
                    <td className="px-6 py-4 text-center text-brand-blue font-bold bg-brand-teal/5">{feature.member}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-text-muted mt-8 max-w-md mx-auto leading-relaxed">
            *Memberships are valid for 12 months from the date of purchase. Extra discounts apply on top of prevailing website prices.
          </p>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-20">
        <div className="container-site text-center">
          <p className="text-text-muted mb-6 italic">Still have questions about SMARTPASS247?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/faq">
              <Button variant="outline" size="lg" className="px-8 italic">Read Membership FAQs</Button>
            </Link>
            <Link href={`tel:${CONTACT.phone}`}>
              <Button variant="ghost" size="lg" className="px-8 italic">Call Concierge: {CONTACT.phone_display}</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
