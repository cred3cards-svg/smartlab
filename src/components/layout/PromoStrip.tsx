"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Tag, ArrowRight, Sparkles } from "lucide-react";

export default function PromoStrip() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="promo-strip text-white text-sm font-medium py-2.5 px-4 relative overflow-hidden">
      <div className="container-site flex items-center justify-center gap-3 text-center">
        <Tag size={14} className="flex-shrink-0 text-white/80" />
        <p className="flex items-center gap-2 flex-wrap justify-center">
          <span className="font-semibold">🎉 LAUNCH OFFER:</span>
          <span>Up to </span>
          <span className="font-bold text-yellow-300">75% OFF</span>
          <span>on all tests &</span>
          <span className="font-bold text-yellow-300">FREE</span>
          <span>home collection above ₹499</span>
        </p>
        <Link
          href="/smartpass247"
          className="hidden sm:flex items-center gap-1 bg-white/15 hover:bg-white/25 transition-colors rounded-full px-3 py-0.5 text-xs font-semibold flex-shrink-0 whitespace-nowrap border border-white/20"
        >
          <Sparkles size={11} />
          Get SMARTPASS247
          <ArrowRight size={11} />
        </Link>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10 transition-colors"
        aria-label="Dismiss offer"
      >
        <X size={14} />
      </button>
    </div>
  );
}
