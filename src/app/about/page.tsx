import type { Metadata } from "next";
import { Heart, Zap, Users, Brain, MapPin, ArrowRight, FlaskConical } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About SMARTLAB247 — Our Story, Mission & Team",
  description:
    "Learn about SMARTLAB247 — India's first AI-assisted pathology lab. Our mission, story, values, and the team building the future of accessible, accurate diagnostics.",
};

const TEAM = [
  { name: "Dr. Arvind Krishnamurthy", role: "Founder & CEO", bg: "bg-brand-blue", initials: "AK", note: "Ex-Apollo Diagnostics, IIT Bombay · 18 years in pathology & health-tech" },
  { name: "Dr. Sunitha Rao", role: "Chief Pathologist", bg: "bg-brand-teal", initials: "SR", note: "MBBS, MD Pathology · Former HOD, CMC Vellore · 22 years clinical pathology" },
  { name: "Vikram Anand", role: "CTO", bg: "bg-purple-600", initials: "VA", note: "Ex-Flipkart Engineering, Top Tier Institute · Built AI infrastructure at scale" },
  { name: "Priya Menon", role: "VP Operations", bg: "bg-brand-green", initials: "PM", note: "Ex-1mg, Practo · Led logistics across 12 cities" },
];

const VALUES = [
  { icon: Heart, title: "Patient First", desc: "Every product decision starts with the question: does this make the patient's experience better, faster, or more dignified?", color: "text-red-500", bg: "bg-red-50" },
  { icon: FlaskConical, title: "Clinical Rigor", desc: "No compromise on accuracy. We believe affordability and precision are not opposites — and we prove it daily.", color: "text-brand-teal", bg: "bg-brand-teal-pale" },
  { icon: Brain, title: "Intelligent Innovation", desc: "Technology at SMARTLAB247 serves one purpose: helping clinicians work better and patients live healthier.", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: Users, title: "Inclusive Access", desc: "Quality diagnostics should not be a privilege. We priced our tests to reach every aspiring middle-class family in India.", color: "text-brand-blue", bg: "bg-blue-50" },
  { icon: Zap, title: "Speed as Care", desc: "When a patient waits two days for a CBC result, that's two days of anxiety. Speed is a form of compassion.", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: MapPin, title: "Local + National", desc: "We build deep trust in each city before expanding — understanding every market's specific needs.", color: "text-brand-green", bg: "bg-green-50" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0B3C5D 0%, #082D46 100%)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container-site relative z-10 max-w-3xl">
          <p className="text-brand-teal font-semibold text-sm mb-3 uppercase tracking-wider">Our Story</p>
          <h1 className="font-heading font-bold text-white mb-5" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            We Built SMARTLAB247 Because Quality Diagnostics Deserved Better.
          </h1>
          <p className="text-white/75 text-lg leading-relaxed mb-6">
            In 2024, a team of pathologists, technologists, and healthcare operators came together with a simple but powerful belief: getting a blood test in India should be as easy as ordering food online — precise, fast, and at a fair price.
          </p>
          <p className="text-white/60 leading-relaxed">
            Three years of R&D, lab partnerships, and AI development later — SMARTLAB247 makes its inaugural debut in Kolkata, bringing precision diagnostics to every household.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-brand-teal-pale border border-brand-teal/20 rounded-2xl p-8">
              <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Our Mission</h2>
              <p className="text-text-secondary leading-relaxed">
                To deliver the most accurate, fastest, most affordable diagnostic services in India — using technology to remove barriers between patients and actionable health information.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
              <h2 className="font-heading font-bold text-2xl text-brand-blue mb-3">Our Vision</h2>
              <p className="text-text-secondary leading-relaxed">
                A future where every Indian family has a complete, AI-powered health intelligence picture — enabling preventive care, not just reactive treatment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-surface-soft">
        <div className="container-site">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-text-primary mb-2">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {VALUES.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="bg-white rounded-2xl border border-surface-border p-6 shadow-card">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="font-heading font-semibold text-base text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-white">
        <div className="container-site max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-2xl text-text-primary mb-2">Our Journey</h2>
          </div>
          <div className="space-y-6 relative before:absolute before:left-6 before:top-0 before:bottom-0 before:w-0.5 before:bg-surface-border">
            {[
              { year: "Jan 2024", event: "SMARTLAB247 incorporated. Research and platform development begins." },
              { year: "Jun 2024", event: "AI pattern-flagging module finalized. Lab infrastructure audits completed." },
              { year: "Dec 2024", event: "Partnership with NABL-accredited diagnostic networks finalized for Kolkata & Districts." },
              { year: "Apr 2026", event: "SMARTLAB247 Kolkata Launch: Salt Lake, New Town, and 20+ other areas." },
              { year: "2026 Q3", event: "Expansion planned for Goa and Belagavi." },
              { year: "2026 Q4", event: "Launch across North East India hubs (Guwahati, Shillong, Agartala)." },
            ].map(({ year, event }) => (
              <div key={year} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-blue text-white font-bold text-xs flex items-center justify-center flex-shrink-0 z-10 text-center leading-tight">
                  {year.split(" ")[0]}<br />{year.split(" ")[1]}
                </div>
                <div className="flex-1 pt-3">
                  <p className="text-sm text-text-secondary leading-relaxed">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-surface-soft">
        <div className="container-site">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-2xl text-text-primary mb-2">Leadership Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {TEAM.map(({ name, role, bg, initials, note }) => (
              <div key={name} className="bg-white rounded-2xl border border-surface-border p-6 text-center shadow-card">
                <div className={`w-16 h-16 rounded-2xl ${bg} text-white font-bold text-xl flex items-center justify-center mx-auto mb-4`}>
                  {initials}
                </div>
                <h3 className="font-heading font-semibold text-text-primary">{name}</h3>
                <p className="text-brand-teal text-sm font-medium mb-2">{role}</p>
                <p className="text-xs text-text-muted leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-brand-blue text-white text-center">
        <div className="container-site max-w-xl">
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-3">
            Join the SMARTLAB247 Movement
          </h2>
          <p className="text-white/70 mb-8">
            Whether you&apos;re a patient, doctor, partner, or investor — there&apos;s a place for you in the future of diagnostics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tests"><Button variant="secondary" size="lg" rightIcon={<ArrowRight size={16} />}>Book a Test</Button></Link>
            <Link href="/careers"><Button size="lg" className="bg-white/10 border border-white/20 text-white hover:bg-white/20">Join Our Team</Button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
