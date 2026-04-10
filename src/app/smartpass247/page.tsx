import type { Metadata } from "next";
import Link from "next/link";
import { Check, Star, Sparkles, Users, Clock, Home, Shield, ArrowRight, Zap } from "lucide-react";
import { MEMBERSHIP_PLANS } from "@/data/index";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "SMARTPASS247 — Annual Health Membership | Free Home Collections & Extra Savings",
  description:
    "SMARTPASS247 annual membership: free home collections, 20–25% extra off tests, priority slots, AI trend reports, and family coverage. Starting ₹999/year.",
};

const COMPARE_FEATURES = [
  { label: "Home Collection Charges", without: "₹99 per visit", solo: "12 free/year", family: "48 free/year", senior: "24 free/year" },
  { label: "Test Discounts", without: "Listed price", solo: "+20% off", family: "+25% off", senior: "+20% off" },
  { label: "Priority Morning Slots", without: "❌", solo: "✓", family: "✓", senior: "✓" },
  { label: "Members Covered", without: "1", solo: "1", family: "Up to 4", senior: "Up to 2" },
  { label: "AI Trend Reports", without: "Basic", solo: "✓ Full AI", family: "✓ Full AI", senior: "✓ Full AI" },
  { label: "Annual Reminders", without: "❌", solo: "✓", family: "✓ per member", senior: "✓" },
  { label: "Dedicated Support", without: "General", solo: "Priority line", family: "Relationship manager", senior: "Priority line" },
  { label: "Report SLA", without: "Standard", solo: "6 hrs max", family: "6 hrs max", senior: "8 hrs max" },
];

export default function SmartPassPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-20"
        style={{ background: "linear-gradient(135deg, #0B3C5D 0%, #082D46 60%, #00565A 100%)" }}
      >
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="container-site relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/30 rounded-full px-5 py-2 mb-6 text-sm font-semibold text-yellow-300">
            <Sparkles size={16} />
            Annual Health Membership
          </div>
          <h1 className="font-heading font-bold text-white mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            SMARTPASS<span className="text-brand-teal">247</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-3 leading-relaxed">
            Your complete annual health partner. Free home collections, extra discounts, priority slots, AI trend reports — for you or your whole family.
          </p>
          <p className="text-brand-teal font-bold text-xl mb-10">Starting at just ₹999/year</p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Free Home Collections", "Extra 20–25% Off", "Priority Slots", "AI Trend Reports", "Family Coverage"].map((f) => (
              <span key={f} className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/85 font-medium">
                <Check size={13} className="text-brand-green" />
                {f}
              </span>
            ))}
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl overflow-hidden ${plan.popular
                  ? "bg-white shadow-2xl scale-[1.03] border-2 border-brand-teal"
                  : "bg-white/8 border border-white/15"
                }`}
              >
                {plan.popular && (
                  <div className="bg-brand-teal text-white text-xs font-bold text-center py-2 tracking-wider">
                    ⭐ MOST POPULAR
                  </div>
                )}
                <div className={`p-6 ${plan.popular ? "" : ""}`}>
                  <h2 className={`font-heading font-bold text-lg mb-1 ${plan.popular ? "text-brand-blue" : "text-white"}`}>
                    {plan.name}
                  </h2>
                  <p className={`text-sm mb-4 ${plan.popular ? "text-text-muted" : "text-white/60"}`}>{plan.tagline}</p>

                  <div className="mb-5">
                    <div className="flex items-end gap-2">
                      <span className={`font-heading font-bold text-3xl ${plan.popular ? "text-brand-blue" : "text-white"}`}>
                        {formatPrice(plan.price)}
                      </span>
                      <span className={`text-sm mb-1 ${plan.popular ? "text-text-muted" : "text-white/50"}`}>/year</span>
                    </div>
                    <p className={`text-xs line-through mt-0.5 ${plan.popular ? "text-text-muted" : "text-white/30"}`}>
                      {formatPrice(plan.originalPrice)}
                    </p>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {plan.benefits.slice(0, 6).map((b) => (
                      <li key={b} className={`flex items-start gap-2 text-sm ${plan.popular ? "text-text-secondary" : "text-white/70"}`}>
                        <Check size={14} className="text-brand-green flex-shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "secondary" : "outline"}
                    fullWidth
                    size="md"
                    className={!plan.popular ? "border-white/30 text-white hover:bg-white/10" : ""}
                  >
                    <Sparkles size={15} />
                    Get {plan.name.replace("SMARTPASS247 ", "")}
                  </Button>

                  <p className={`text-xs text-center mt-3 ${plan.popular ? "text-text-muted" : "text-white/40"}`}>
                    ₹{Math.round(plan.price / 12)}/month · Cancel anytime
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits detail */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-text-primary mb-3">
              Everything a SMARTPASS247 Member Gets
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              More than just discounts — SMARTPASS247 is your proactive health partnership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Home, title: "Free Home Collections", desc: "Up to 48 free home collection visits per year. No ₹99 fee every time.", color: "text-brand-teal", bg: "bg-brand-teal-pale" },
              { icon: Star, title: "Extra 20–25% Off Tests", desc: "Every test and package gets an additional member-only discount on top of listed savings.", color: "text-orange-500", bg: "bg-orange-50" },
              { icon: Clock, title: "Priority Morning Slots", desc: "6–8 AM slots reserved for SMARTPASS247 members before general availability opens.", color: "text-brand-blue", bg: "bg-blue-50" },
              { icon: Zap, title: "AI Trend Reports", desc: "Longitudinal trend charts for all repeat parameters. See how your health moves over time.", color: "text-purple-600", bg: "bg-purple-50" },
              { icon: Users, title: "Family Coverage", desc: "Family plan covers up to 4 members. Individual dashboards, reminders, and benefits per person.", color: "text-pink-600", bg: "bg-pink-50" },
              { icon: Shield, title: "Wellness Calendar", desc: "Personalized annual health calendar with smart reminders for when to repeat each test.", color: "text-brand-green", bg: "bg-green-50" },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="bg-surface-soft rounded-2xl p-6 border border-surface-border">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="font-semibold text-text-primary text-base mb-2">{title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section bg-surface-soft">
        <div className="container-site">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-2xl text-text-primary mb-2">
              Compare Plans
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-surface-border shadow-card">
            <table className="w-full bg-white text-sm" role="table">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="text-left p-4 text-text-muted font-semibold text-xs uppercase tracking-wider w-40">Feature</th>
                  <th className="p-4 text-center text-text-secondary font-semibold">Without PASS</th>
                  {MEMBERSHIP_PLANS.map((p) => (
                    <th key={p.id} className={`p-4 text-center font-bold ${p.popular ? "text-brand-teal bg-brand-teal-pale" : "text-brand-blue"}`}>
                      {p.popular && <span className="block text-[10px] mb-1 text-brand-teal">POPULAR</span>}
                      {p.name.replace("SMARTPASS247 ", "")}
                      <span className="block text-xs font-normal text-text-muted mt-0.5">{formatPrice(p.price)}/yr</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_FEATURES.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-surface-soft/50"}>
                    <td className="p-4 font-medium text-text-primary text-xs">{row.label}</td>
                    <td className="p-4 text-center text-text-muted text-xs">{row.without}</td>
                    <td className="p-4 text-center text-brand-blue font-semibold text-xs">{row.solo}</td>
                    <td className="p-4 text-center text-brand-teal font-semibold text-xs bg-brand-teal-pale/30">{row.family}</td>
                    <td className="p-4 text-center text-brand-green font-semibold text-xs">{row.senior}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-brand-blue text-center">
        <div className="container-site max-w-2xl">
          <Sparkles size={36} className="text-yellow-300 mx-auto mb-4" />
          <h2 className="font-heading font-bold text-white text-2xl md:text-3xl mb-3">
            Start Your SMARTPASS247 Journey
          </h2>
          <p className="text-white/70 mb-8">
            Join 50,000+ members who get smarter, faster, more affordable diagnostics — year-round.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="xl" leftIcon={<Sparkles size={18} />}>
              Get Solo Plan — ₹999/yr
            </Button>
            <Button size="xl" className="bg-white text-brand-blue hover:bg-white/90">
              Get Family Plan — ₹2,499/yr
            </Button>
          </div>
          <p className="text-white/40 text-sm mt-5">Cancel anytime · No auto-renewal without consent · Full refund within 7 days</p>
        </div>
      </section>
    </>
  );
}
