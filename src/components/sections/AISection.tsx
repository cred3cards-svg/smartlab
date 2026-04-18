"use client";

import Image from "next/image";
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

          {/* Right: Feature Image */}
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square xl:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-modal opacity-0 animate-fade-in [animation-delay:0.6s]">
            <Image 
              src="/images/smartlab_image_3.png" 
              alt="SMARTLAB247 Features" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
