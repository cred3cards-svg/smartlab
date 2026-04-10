import Link from "next/link";
import { Brain, TrendingUp, Clock, MessageSquareHeart, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

const AI_FEATURES = [
  {
    icon: Brain,
    title: "AI Anomaly Detection",
    description: "Our AI scans every result against thousands of validated patterns — flagging subtle anomalies that might otherwise be missed.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    icon: TrendingUp,
    title: "Trend Analysis",
    description: "When you repeat tests, our AI overlays a trend graph showing how your parameters have moved over time — giving you a complete health story.",
    color: "#00A8A8",
    bg: "#E6F7F7",
  },
  {
    icon: Clock,
    title: "Faster Workflows",
    description: "AI optimises our lab queue, pre-processes QC checks, and routes critical results immediately — cutting report time significantly.",
    color: "#0B3C5D",
    bg: "#EBF4FF",
  },
  {
    icon: MessageSquareHeart,
    title: "Plain Language Reports",
    description: "Complex lab jargon translated into clear, patient-friendly explanations. Understand your results without a medical degree.",
    color: "#4CAF50",
    bg: "#E8F5E9",
  },
];

export default function AISection() {
  return (
    <section
      className="section relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0B3C5D 0%, #082D46 100%)" }}
      aria-labelledby="ai-section-heading"
    >
      {/* Decorative circuit pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5 text-sm text-white/90 font-medium">
              <Brain size={14} className="text-brand-teal" />
              AI-Assisted Pathology
            </div>
            <h2 id="ai-section-heading" className="font-heading font-bold text-white mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
              Smart Labs That{" "}
              <span className="text-brand-teal">Think With You</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-8 text-base">
              SMARTLAB247 combines certified human pathology with intelligent AI assistance — delivering reports that are faster, clearer, and clinically sharper than standard diagnostics.
            </p>

            <div className="space-y-4 mb-8">
              {AI_FEATURES.map(({ icon: Icon, title, description, color, bg }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: bg + "20", border: `1px solid ${color}40` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm mb-0.5">{title}</p>
                    <p className="text-white/60 text-xs leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/ai-diagnostics">
                <Button variant="secondary" rightIcon={<ArrowRight size={16} />}>
                  How AI Works
                </Button>
              </Link>
              <Link href="/tests">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Book a Test
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: visual dashboard mockup */}
          <div className="relative">
            <div className="bg-white/8 border border-white/15 rounded-3xl p-6 backdrop-blur-sm">
              {/* Mock report card */}
              <div className="bg-white rounded-2xl p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-text-muted">AI Report Summary · CBC</p>
                    <p className="text-sm font-bold text-text-primary">Rahul Mehta · 12 Apr 2026</p>
                  </div>
                  <span className="badge-report">⚡ 6 hrs</span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { name: "Haemoglobin", value: "14.2", unit: "g/dL", status: "normal", width: "72%" },
                    { name: "WBC Count", value: "11.8", unit: "K/μL", status: "high", width: "94%" },
                    { name: "Platelets", value: "185", unit: "K/μL", status: "normal", width: "60%" },
                  ].map(({ name, value, unit, status, width }) => (
                    <div key={name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-secondary">{name}</span>
                        <span className={`font-semibold ${status === "high" ? "text-orange-500" : "text-brand-green"}`}>
                          {value} {unit} {status === "high" ? "↑" : "✓"}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${status === "high" ? "bg-orange-400" : "bg-brand-green"}`}
                          style={{ width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI insight card */}
              <div className="bg-purple-900/40 border border-purple-400/20 rounded-xl p-3.5">
                <div className="flex items-start gap-2.5">
                  <Brain size={16} className="text-purple-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-purple-200 mb-1">AI Insight</p>
                    <p className="text-xs text-purple-300/80 leading-relaxed">
                      WBC count is mildly elevated. This pattern may suggest a mild infection or physiological stress. Combined with your CRP history, monitoring at 2 weeks is suggested. Consult your doctor.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trend mini-chart */}
              <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-xs font-medium text-white/70 mb-3">Haemoglobin trend — last 6 months</p>
                <div className="flex items-end gap-2 h-12">
                  {[12.8, 13.2, 13.9, 14.1, 13.8, 14.2].map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t bg-brand-teal/60"
                        style={{ height: `${((v - 12) / 4) * 100}%` }}
                      />
                      <span className="text-[9px] text-white/30">{["O", "N", "D", "J", "F", "M"][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-white/30 text-center mt-4 max-w-sm mx-auto">
              AI flags are reviewed by qualified pathologists before reports are released. AI assists — it does not replace medical diagnosis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
