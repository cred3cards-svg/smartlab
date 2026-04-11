"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/data/index";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { DOCTOR_ENDORSEMENTS } from "@/data/index";
import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const total = TESTIMONIALS.length;

  const start = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 4000);
  };

  useEffect(() => {
    start();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prev = () => { setCurrent((c) => (c - 1 + total) % total); };
  const next = () => { setCurrent((c) => (c + 1) % total); };

  return (
    <section className="section bg-white" aria-labelledby="testimonials-heading">
      <div className="container-site">
        {/* Testimonials */}
        <div className="text-center md:text-left mb-12 max-w-2xl">
          <p className="text-brand-teal text-sm font-bold mb-3 uppercase tracking-widest">Patient Stories</p>
          <h2 id="testimonials-heading" className="font-heading font-bold text-3xl md:text-4xl text-text-primary">
            Trusted by Patients Across India
          </h2>
          <div className="flex items-center justify-center md:justify-start gap-1 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg drop-shadow-sm">★</span>
            ))}
            <span className="text-sm font-semibold text-text-secondary ml-2">4.9 / 5 — 12,000+ reviews</span>
          </div>
        </div>

        {/* Carousel — desktop: 3 cards; mobile: 1 */}
        <div className="relative">
          {/* Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>

          {/* Mobile: single slide */}
          <div className="md:hidden">
            <TestimonialCard testimonial={TESTIMONIALS[current]} />
            <div className="flex items-center justify-center gap-4 mt-5">
              <button onClick={prev} className="p-2 rounded-full bg-white border border-surface-border shadow-sm hover:border-brand-teal transition-colors" aria-label="Previous">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all ${i === current ? "w-5 h-2 bg-brand-teal" : "w-2 h-2 bg-surface-border"}`}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={next} className="p-2 rounded-full bg-white border border-surface-border shadow-sm hover:border-brand-teal transition-colors" aria-label="Next">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Doctor endorsements */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <p className="text-brand-teal text-sm font-semibold mb-2 uppercase tracking-wider">Medical Trust</p>
            <h3 className="font-heading font-bold text-xl text-text-primary">Recommended by Doctors</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DOCTOR_ENDORSEMENTS.map((doc) => (
              <div key={doc.id} className="bg-white rounded-[2rem] border border-surface-border p-6 md:p-8 shadow-card premium-hover">
                <Quote size={28} className="text-brand-teal/20 mb-4" />
                <p className="text-sm md:text-base text-text-secondary leading-relaxed italic mb-6">
                  &ldquo;{doc.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-surface-border">
                  <div className="w-12 h-12 rounded-full bg-surface-soft flex items-center justify-center text-brand-teal font-bold text-lg flex-shrink-0 border border-surface-border">
                    {doc.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">{doc.name}</p>
                    <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mt-0.5">{doc.specialty}</p>
                    <p className="text-xs text-text-muted mt-0.5">{doc.hospital}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
