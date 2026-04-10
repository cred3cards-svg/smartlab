import { Star, CheckCircle2 } from "lucide-react";
import { Testimonial } from "@/types";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-2xl border border-surface-border shadow-card p-5 flex flex-col gap-4 h-full">
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-surface-border"}
          />
        ))}
      </div>

      {/* Review text */}
      <p className="text-sm text-text-secondary leading-relaxed flex-1">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Test taken */}
      <div className="bg-surface-soft rounded-lg px-3 py-2">
        <p className="text-[11px] text-text-muted">Test taken</p>
        <p className="text-xs font-semibold text-brand-blue mt-0.5">{testimonial.testTaken}</p>
      </div>

      {/* Reviewer */}
      <div className="flex items-center gap-3 pt-2 border-t border-surface-border">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: testimonial.avatarColor }}
        >
          {testimonial.initials}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-text-primary truncate">{testimonial.name}</p>
            {testimonial.verified && (
              <CheckCircle2 size={13} className="text-brand-teal flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-text-muted">{testimonial.city} · {testimonial.date}</p>
        </div>
      </div>
    </div>
  );
}
