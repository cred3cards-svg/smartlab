import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Home, Shield, Award, Zap, Users, CheckCircle2, ArrowRight, Thermometer, FlaskConical } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Why SMARTLAB247 — India's Most Trusted Home Diagnostics",
  description:
    "Discover why 2 lakh+ patients trust SMARTLAB247. NABL-certified labs, fastest report turnaround, trained SkillMedic™ agents, AI-assisted pathology, and 75% savings.",
};

const VS_ITEMS = [
  { feature: "Home Sample Collection", smartlab: "✓ Available everywhere we operate", traditional: "Often not available" },
  { feature: "Report Speed", smartlab: "4–36 hours (most < 8 hrs)", traditional: "1–3 days typical" },
  { feature: "Pricing", smartlab: "Up to 75% below market MRP", traditional: "MRP or marginally below" },
  { feature: "AI-Assisted Reporting", smartlab: "✓ Pattern flagging + trend analysis", traditional: "Manual only" },
  { feature: "Report Delivery", smartlab: "WhatsApp, email, app, PDF", traditional: "Physical copy or portal" },
  { feature: "Lab Accreditation", smartlab: "NABL + ISO 15189", traditional: "Varies widely" },
  { feature: "Plain Language Summary", smartlab: "✓ Included with every report", traditional: "Rarely available" },
  { feature: "Booking", smartlab: "60-second online booking", traditional: "Walk-in / phone" },
  { feature: "Family management", smartlab: "✓ Multi-member profiles + wellness calendar", traditional: "Not available" },
];

export default function WhySmartlabPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue to-[#0F5280] py-20 text-white">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="text-brand-teal font-semibold text-sm mb-3 uppercase tracking-wider">Why SMARTLAB247</p>
            <h1 className="font-heading font-bold text-white mb-5" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              The Standard for Diagnostics Has Changed.
              <br />
              <span className="text-brand-teal">We Changed It.</span>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-2xl">
              We built SMARTLAB247 because quality diagnostics in India were too expensive, too slow, and too inconvenient. We fixed all three — without compromising on clinical accuracy.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tests"><Button variant="secondary" size="lg">Book a Test</Button></Link>
              <Link href="/checkups"><Button size="lg" className="bg-white/10 border border-white/20 text-white hover:bg-white/20">View Packages</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-surface-border py-12">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "2 Lakh+", label: "Patients Served", sub: "Across 6 cities" },
              { value: "4.9 ★", label: "Average Rating", sub: "12,000+ reviews" },
              { value: "75%", label: "Average Savings", sub: "vs. market pricing" },
              { value: "6 hrs", label: "Average Report Time", sub: "Most routine tests" },
            ].map(({ value, label, sub }) => (
              <div key={label} className="text-center">
                <p className="font-heading font-bold text-3xl md:text-4xl text-brand-blue mb-1">{value}</p>
                <p className="font-semibold text-text-primary text-sm">{label}</p>
                <p className="text-xs text-text-muted mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience pillars */}
      <section className="section bg-surface-soft">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-text-primary mb-3">
              6 Pillars of the SMARTLAB247 Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Home, color: "text-brand-teal", bg: "bg-brand-teal-pale",
                title: "SkillMedic™ Home Collection",
                points: [
                  "Verified, background-checked agents",
                  "Single-prick, painless technique",
                  "Bio-safe sterile equipment",
                  "Arrives within 60 minutes of slot",
                  "Paediatric and senior-friendly approach",
                ],
              },
              {
                icon: Thermometer, color: "text-blue-600", bg: "bg-blue-50",
                title: "Temperature-Controlled Logistics",
                points: [
                  "Samples transported in certified cold-chain containers",
                  "Real-time temperature monitoring",
                  "QR-coded chain-of-custody tracking",
                  "BMWM-compliant bio-safety disposal",
                  "Direct lab receipt within 2 hours of collection",
                ],
              },
              {
                icon: FlaskConical, color: "text-purple-600", bg: "bg-purple-50",
                title: "NABL-Certified Lab Processing",
                points: [
                  "NABL accredited, ISO 15189 certified",
                  "Premium automated analysers (Roche, Sysmex, Abbott)",
                  "Mandatory Internal Quality Control (IQC) every run",
                  "External Quality Assurance Scheme (EQAS) participation",
                  "Dual validation for critical parameters",
                ],
              },
              {
                icon: Zap, color: "text-brand-blue", bg: "bg-blue-50",
                title: "AI-Enhanced Pathology",
                points: [
                  "AI monitors QC and flags anomalies in real time",
                  "Pattern-matching against clinical reference databases",
                  "Longitudinal trend analysis across repeat tests",
                  "Critical value auto-escalation to pathologist",
                  "Plain-language summary generation",
                ],
              },
              {
                icon: Clock, color: "text-orange-500", bg: "bg-orange-50",
                title: "Fastest Report Turnaround",
                points: [
                  "Most routine tests: 4–8 hours",
                  "Full-body panels: 24–36 hours",
                  "Automated dispatch on pathologist sign-off",
                  "No manual delays in report delivery",
                  "WhatsApp + email + PDF available instantly",
                ],
              },
              {
                icon: Shield, color: "text-brand-green", bg: "bg-green-50",
                title: "Privacy & Data Security",
                points: [
                  "End-to-end encrypted patient data",
                  "Secure report access via OTP / login",
                  "No sharing with third parties without consent",
                  "PDPA / IT Act compliant data handling",
                  "Right to delete data at any time",
                ],
              },
            ].map(({ icon: Icon, color, bg, title, points }) => (
              <div key={title} className="bg-white rounded-2xl border border-surface-border p-6 shadow-card">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="font-heading font-semibold text-base text-text-primary mb-3">{title}</h3>
                <ul className="space-y-2">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-text-secondary">
                      <CheckCircle2 size={13} className="text-brand-green flex-shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-2xl text-text-primary mb-2">
              SMARTLAB247 vs. Traditional Labs
            </h2>
          </div>

          <div className="overflow-x-auto max-w-3xl mx-auto rounded-2xl border border-surface-border shadow-card">
            <table className="w-full bg-white text-sm">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="text-left p-4 text-text-muted font-semibold text-xs uppercase tracking-wider">Feature</th>
                  <th className="p-4 text-center font-bold text-brand-teal bg-brand-teal-pale">SMARTLAB247</th>
                  <th className="p-4 text-center font-semibold text-text-muted">Traditional Lab</th>
                </tr>
              </thead>
              <tbody>
                {VS_ITEMS.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-surface-soft/50"}>
                    <td className="p-4 font-medium text-text-primary text-xs">{row.feature}</td>
                    <td className="p-4 text-center text-brand-teal font-medium text-xs bg-brand-teal-pale/20">{row.smartlab}</td>
                    <td className="p-4 text-center text-text-muted text-xs">{row.traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-brand-teal text-white text-center">
        <div className="container-site max-w-xl">
          <Award size={36} className="mx-auto mb-4 opacity-80" />
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-3">
            Experience the Difference Yourself
          </h2>
          <p className="text-white/80 mb-8">
            Book your first test with SMARTLAB247. We think the report will do the convincing.
          </p>
          <Link href="/tests">
            <Button size="xl" className="bg-white text-brand-teal font-bold hover:bg-white/90" rightIcon={<ArrowRight size={18} />}>
              Browse All Tests
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
