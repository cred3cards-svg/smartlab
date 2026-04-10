import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, TrendingUp, Heart, Zap, Users, Briefcase } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Careers at SMARTLAB247 — Join India's AI-First Diagnostics Lab",
  description:
    "Join the SMARTLAB247 team. Open roles in engineering, operations, pathology, marketing, and SkillMedic™ collection. Build the future of diagnostics in India.",
};

const OPEN_ROLES = [
  { title: "Senior Backend Engineer (Node.js / Go)", dept: "Engineering", location: "Kolkata (Hybrid)", type: "Full-time" },
  { title: "React / Next.js Frontend Engineer", dept: "Engineering", location: "Kolkata (Hybrid)", type: "Full-time" },
  { title: "AI/ML Engineer — Healthcare", dept: "AI & Data", location: "Kolkata / Remote", type: "Full-time" },
  { title: "Product Manager — Patient Experience", dept: "Product", location: "Kolkata", type: "Full-time" },
  { title: "Registered Pathologist (MD)", dept: "Clinical", location: "Kolkata", type: "Full-time" },
  { title: "SkillMedic™ — Home Collection Agent", dept: "Field Operations", location: "Kolkata / All Areas", type: "Full-time / Part-time" },
  { title: "Digital Marketing Manager", dept: "Growth", location: "Kolkata", type: "Full-time" },
  { title: "B2B Sales Lead — East India", dept: "Sales", location: "Kolkata / North-East", type: "Full-time" },
];

const PERKS = [
  { icon: Heart, title: "Health Benefits", desc: "Comprehensive health insurance for you and your family — including free SMARTPASS247 membership." },
  { icon: TrendingUp, title: "Growth & Learning", desc: "₹50,000/year learning budget, conference access, and a culture of continuous upskilling." },
  { icon: Zap, title: "Pace & Impact", desc: "Work at startup speed with the satisfaction of improving real patient outcomes every day." },
  { icon: Users, title: "Diverse Team", desc: "A team of doctors, engineers, operators and designers — all working toward one goal." },
  { icon: MapPin, title: "Flexible Location", desc: "Hybrid options for most roles. Remote-first for select positions." },
  { icon: Briefcase, title: "ESOPs", desc: "Employee stock options for all full-time roles. You build it, you own it." },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20"
        style={{ background: "linear-gradient(135deg, #0B3C5D 0%, #082D46 100%)" }}>
        <div className="container-site max-w-3xl">
          <p className="text-brand-teal font-semibold text-sm mb-3 uppercase tracking-wider">We&apos;re Hiring</p>
          <h1 className="font-heading font-bold text-white mb-5" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            Build the Future of Diagnostics in India
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            SMARTLAB247 is scaling fast. We need passionate engineers, operators, clinicians, and marketers who believe healthcare deserves world-class technology — and world-class empathy.
          </p>
          <a href="#open-roles">
            <Button variant="secondary" size="lg" rightIcon={<ArrowRight size={16} />}>
              See Open Roles
            </Button>
          </a>
        </div>
      </section>

      {/* Perks */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-2xl text-text-primary mb-2">Why Work at SMARTLAB247?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-surface-soft rounded-2xl border border-surface-border p-6">
                <div className="w-11 h-11 rounded-xl bg-brand-teal-pale flex items-center justify-center mb-4">
                  <Icon size={20} className="text-brand-teal" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="section bg-surface-soft" id="open-roles">
        <div className="container-site">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-heading font-bold text-2xl text-text-primary mb-1">Open Positions</h2>
              <p className="text-text-muted text-sm">{OPEN_ROLES.length} roles across Engineering, Clinical, Operations & Growth</p>
            </div>
          </div>

          <div className="space-y-3 max-w-4xl">
            {OPEN_ROLES.map((role) => (
              <div key={role.title} className="bg-white rounded-2xl border border-surface-border shadow-card p-5 flex items-center justify-between gap-4 hover:border-brand-teal hover:shadow-card-hover transition-all group">
                <div>
                  <h3 className="font-semibold text-text-primary group-hover:text-brand-teal transition-colors">{role.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    <span className="text-xs bg-brand-teal-pale text-brand-teal rounded-full px-2.5 py-0.5 font-medium">{role.dept}</span>
                    <span className="text-xs text-text-muted flex items-center gap-1">
                      <MapPin size={11} /> {role.location}
                    </span>
                    <span className="text-xs text-text-muted">{role.type}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" rightIcon={<ArrowRight size={14} />} className="flex-shrink-0">
                  Apply
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white rounded-2xl border border-surface-border p-6 max-w-4xl">
            <h3 className="font-semibold text-text-primary mb-2">Don&apos;t see your role?</h3>
            <p className="text-sm text-text-muted mb-4">We&apos;re always looking for exceptional people. Send your resume and we&apos;ll reach out when there&apos;s a match.</p>
            <a href="mailto:careers@smartlab247.com">
              <Button variant="teal" size="md">
                Send Open Application
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
