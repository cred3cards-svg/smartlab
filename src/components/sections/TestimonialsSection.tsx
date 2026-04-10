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
    <section className="section bg-surface-soft" aria-labelledby="testimonials-heading">
      <div className="container-site">
        {/* Testimonials */}
        <div className="text-center mb-8">
          <p className="text-brand-teal text-sm font-semibold mb-2 uppercase tracking-wider">Patient Stories</p>
          <h2 id="testimonials-heading" className="font-heading font-bold text-2xl md:text-3xl text-text-primary">
            Trusted by Patients Across India
          </h2>
          <div className="flex items-center justify-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">★</span>
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
              <div key={doc.id} className="bg-white rounded-2xl border border-surface-border p-5 shadow-card">
                <Quote size={24} className="text-brand-teal/30 mb-3" />
                <p className="text-sm text-text-secondary leading-relaxed italic mb-4">
                  &ldquo;{doc.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-surface-border">
                  <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {doc.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{doc.name}</p>
                    <p className="text-xs text-text-muted">{doc.specialty} · {doc.hospital}</p>
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
