import type { Metadata } from "next";
import Link from "next/link";
import { Brain, Zap, TrendingUp, Clock, Shield, MessageSquareHeart, CheckCircle2, AlertTriangle, ArrowRight, Database, Cpu } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "AI-Assisted Diagnostics — How AI Improves Your Lab Reports",
  description:
    "Learn how SMARTLAB247 uses AI to deliver faster, clearer, and smarter pathology reports — while keeping all diagnostic decisions in the hands of qualified pathologists.",
};

const AI_WORKFLOW = [
  { step: "01", title: "Sample Arrives at Lab", desc: "Temperature-controlled sample from your home arrives. QR tracking confirms chain of custody." },
  { step: "02", title: "Automated Analysis", desc: "Premium analysers process your sample using enzymatic, immunoassay, or HPLC methods depending on the test." },
  { step: "03", title: "AI Quality Check", desc: "Our AI layer runs a multi-point internal quality control pass — flagging any instrument drift or sample integrity concerns." },
  { step: "04", title: "AI Pattern Flagging", desc: "Results are compared against validated clinical reference patterns. Borderline values, unusual combinations, and trend deviations are flagged for pathologist attention." },
  { step: "05", title: "Pathologist Review", desc: "A qualified, registered pathologist reviews every report. AI flags are accepted, modified, or dismissed. Final authorisation is always human." },
  { step: "06", title: "Plain Language Summary", desc: "AI generates a plain-language summary of what your results mean. This accompanies the clinical report — not replacing it." },
  { step: "07", title: "Report Delivered", desc: "Digitally signed report + AI summary + trend chart delivered via WhatsApp, email, and dashboard." },
];

export default function AIDiagnosticsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20"
        style={{ background: "linear-gradient(135deg, #0B3C5D 0%, #1a2060 100%)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container-site relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-brand-teal/20 border border-brand-teal/40 rounded-full px-5 py-2 mb-6 text-sm font-bold text-brand-teal uppercase tracking-wider shadow-lg shadow-brand-teal/10">
              <Shield size={16} />
              Trusted Diagnostics, Faster Results
            </div>
            <h1 className="font-heading font-black text-white mb-5" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1 }}>
              Smarter Labs.{" "}
              <span className="text-brand-teal drop-shadow-sm">Faster Reports.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              SMARTLAB247 is India&apos;s first pathology lab to integrate AI at every stage of the diagnostic workflow — from quality control to report generation. Here&apos;s exactly what that means for you.
            </p>
            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-4 text-left max-w-xl mx-auto">
              <div className="flex gap-3">
                <AlertTriangle size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-200/80 leading-relaxed">
                  <strong className="text-yellow-300">Important:</strong> AI at SMARTLAB247 supports operational efficiency and pattern highlighting. All diagnostic reports are authorised by qualified, registered pathologists. AI does not replace medical diagnosis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What AI does */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-text-primary mb-3">
              What AI Actually Does at SMARTLAB247
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              No hype. Just the real, operational role our AI plays at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Cpu, title: "Quality Control Automation", desc: "AI runs continuous IQC (Internal Quality Control) checks on our analysers — detecting calibration drift, reagent issues, and sample quality problems faster than manual tracking.", color: "text-brand-teal", bg: "bg-brand-teal-pale" },
              { icon: Brain, title: "Anomaly Pattern Flagging", desc: "Our AI compares every result against thousands of clinically validated patterns — automatically drawing pathologist attention to values that warrant closer review.", color: "text-purple-600", bg: "bg-purple-50" },
              { icon: TrendingUp, title: "Longitudinal Trend Analysis", desc: "When a patient has prior tests on record, AI automatically overlays trend graphs showing parameter movement over time — helping doctors spot slow-evolving changes.", color: "text-brand-blue", bg: "bg-blue-50" },
              { icon: MessageSquareHeart, title: "Plain Language Translation", desc: "Medical jargon simplified. AI generates a plain-language interpretation of each report that patients can actually read and understand — without replacing clinical opinion.", color: "text-brand-green", bg: "bg-green-50" },
              { icon: Zap, title: "Workflow Optimisation", desc: "AI routes samples intelligently through the lab, prioritises critical results, and alerts the team to urgent flags — reducing average report time significantly.", color: "text-orange-500", bg: "bg-orange-50" },
              { icon: Shield, title: "Critical Value Alerting", desc: "Panic value detection is automated. When a result falls in a clinically critical range, the system immediately escalates it — ensuring fastest possible pathologist attention.", color: "text-red-500", bg: "bg-red-50" },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="border border-surface-border bg-white rounded-2xl p-6 shadow-card card-hover">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI workflow */}
      <section className="section bg-surface-soft">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-text-primary mb-3">
              The AI-Enhanced Lab Workflow
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              From sample receipt to report delivery — every step powered by technology, validated by humans.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {AI_WORKFLOW.map(({ step, title, desc }, i) => (
              <div key={step} className="flex gap-4 bg-white rounded-2xl border border-surface-border p-5 shadow-card">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {step}
                  </div>
                  {i < AI_WORKFLOW.length - 1 && (
                    <div className="w-0.5 h-6 bg-surface-border mt-2" />
                  )}
                </div>
                <div className="pt-1.5">
                  <h3 className="font-semibold text-text-primary mb-1">{title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What AI does NOT do */}
      <section className="section bg-white">
        <div className="container-site max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-2xl text-text-primary mb-3">
              What AI Does <em>Not</em> Do at SMARTLAB247
            </h2>
            <p className="text-text-muted">Clarity matters. Here&apos;s where we draw the line.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "AI does not diagnose disease or medical conditions",
              "AI does not replace pathologist review of any report",
              "AI does not make treatment recommendations",
              "AI-generated summaries are supplementary, not clinical opinion",
              "AI trend insights are informational — consult your doctor",
              "Final report sign-off is always by a registered pathologist",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
                <AlertTriangle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future AI roadmap */}
      <section className="section bg-surface-soft">
        <div className="container-site max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-2xl text-text-primary mb-3">
              What&apos;s Coming Next
            </h2>
            <p className="text-text-muted">Our AI roadmap — developed in partnership with clinical advisors.</p>
          </div>
          <div className="space-y-3">
            {[
              { label: "Personalised health risk scoring per patient profile", status: "In development" },
              { label: "Smart recommendations for preventive tests based on results", status: "Beta" },
              { label: "Doctor-facing AI summary dashboard for clinic partners", status: "Planned Q3 2026" },
              { label: "Multi-parameter co-relation analysis across test history", status: "In development" },
              { label: "Integration with wearable health data for holistic trends", status: "Planned 2027" },
            ].map(({ label, status }) => (
              <div key={label} className="flex items-center justify-between gap-4 bg-white rounded-xl border border-surface-border p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <Database size={16} className="text-brand-teal flex-shrink-0" />
                  <p className="text-sm text-text-primary">{label}</p>
                </div>
                <span className="flex-shrink-0 text-xs bg-brand-teal-pale text-brand-teal border border-brand-teal/20 rounded-full px-3 py-1 font-medium">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-brand-blue text-white text-center">
        <div className="container-site max-w-2xl">
          <Brain size={36} className="text-brand-teal mx-auto mb-4" />
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-3">
            Experience AI-Assisted Pathology Today
          </h2>
          <p className="text-white/70 mb-8">
            Book any test or package. Your report will include our AI-enhanced analysis layer — at no extra cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tests">
              <Button variant="secondary" size="lg" rightIcon={<ArrowRight size={16} />}>Book a Test</Button>
            </Link>
            <Link href="/why-smartlab247">
              <Button size="lg" className="bg-white/10 border border-white/20 hover:bg-white/20 text-white">
                Why SMARTLAB247
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
