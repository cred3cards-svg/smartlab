import Link from "next/link";
import { ArrowRight, Check, Sparkles, Star, Users } from "lucide-react";
import { MEMBERSHIP_PLANS } from "@/data/index";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function MembershipSection() {
  const featured = MEMBERSHIP_PLANS.find((p) => p.popular)!;
  const others = MEMBERSHIP_PLANS.filter((p) => !p.popular);

  return (
    <section className="section bg-brand-blue relative overflow-hidden" aria-labelledby="membership-heading">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #00A8A8, transparent)", transform: "translate(40%, -40%)" }} />
      <div className="absolute bottom-0 left-20 w-64 h-64 rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #4CAF50, transparent)", transform: "translateY(40%)" }} />

      <div className="container-site relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4 text-sm text-white/90 font-medium">
            <Sparkles size={14} className="text-yellow-300" />
            Annual Health Membership
          </div>
          <h2 id="membership-heading" className="font-heading font-bold text-white mb-3"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
            SMARTPASS247 — Your Health, All Year
          </h2>
          <p className="text-white/70 max-w-xl mx-auto text-base leading-relaxed">
            Free home collections, extra discounts, priority slots, and AI trend reports — for you and your whole family.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Side plans */}
          {others.map((plan) => (
            <div key={plan.id} className="bg-white/8 border border-white/15 rounded-2xl p-6 flex flex-col">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: plan.color + "30" }}>
                <Users size={20} style={{ color: plan.color === "#4CAF50" ? "#4CAF50" : "white" }} />
              </div>
              <h3 className="font-heading font-bold text-white text-lg mb-1">{plan.name}</h3>
              <p className="text-white/60 text-sm mb-4">{plan.tagline}</p>

              <div className="mb-5">
                <div className="flex items-end gap-2">
                  <span className="font-heading font-bold text-3xl text-white">{formatPrice(plan.price)}</span>
                  <span className="text-white/50 text-sm mb-1">/ year</span>
                </div>
                <p className="text-white/40 text-xs line-through">{formatPrice(plan.originalPrice)}</p>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.benefits.slice(0, 5).map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-white/75">
                    <Check size={14} className="text-brand-green flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
                {plan.benefits.length > 5 && (
                  <li className="text-xs text-white/50 pl-5">+{plan.benefits.length - 5} more benefits</li>
                )}
              </ul>

              <Link href="/smartpass247">
                <Button variant="outline" fullWidth className="border-white/30 text-white hover:bg-white hover:text-brand-blue">
                  Get {plan.name.split(" ")[1]}
                </Button>
              </Link>
            </div>
          ))}

          {/* Featured / popular plan */}
          <div className="bg-white rounded-2xl p-6 flex flex-col relative overflow-hidden lg:order-first lg:order-none"
            style={{ order: -1 }}>
            <div className="absolute top-0 left-0 right-0 bg-brand-teal text-white text-xs font-bold text-center py-1.5 tracking-wider">
              ⭐ MOST POPULAR — BEST VALUE
            </div>

            <div className="mt-6">
              <div className="w-10 h-10 rounded-xl bg-brand-teal-pale flex items-center justify-center mb-4">
                <Star size={20} className="text-brand-teal fill-brand-teal" />
              </div>
              <h3 className="font-heading font-bold text-brand-blue text-xl mb-1">{featured.name}</h3>
              <p className="text-text-muted text-sm mb-4">{featured.tagline}</p>

              <div className="mb-5">
                <div className="flex items-end gap-2">
                  <span className="font-heading font-bold text-4xl text-brand-blue">{formatPrice(featured.price)}</span>
                  <span className="text-text-muted text-sm mb-1">/ year</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-text-muted text-xs line-through">{formatPrice(featured.originalPrice)}</span>
                  <span className="badge-discount text-xs">Save {formatPrice(featured.originalPrice - featured.price)}</span>
                </div>
                <p className="text-xs text-brand-green font-semibold mt-1">
                  Covers up to {featured.memberCount} family members
                </p>
              </div>

              <ul className="space-y-2.5 mb-6">
                {featured.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-text-secondary">
                    <Check size={14} className="text-brand-green flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <Link href="/smartpass247">
                <Button variant="secondary" fullWidth size="lg">
                  <Sparkles size={16} />
                  Get SMARTPASS247 Family
                </Button>
              </Link>

              <p className="text-xs text-text-muted text-center mt-3">
                ₹{Math.round(featured.price / 12)}/month · Cancel anytime
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/smartpass247" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1 justify-center">
            Compare all plans <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
