"use client";

import Link from "next/link";
import { Clock, Home, FlaskConical, ShoppingCart, Check } from "lucide-react";
import { Test } from "@/types";
import { formatPrice } from "@/lib/utils";
import { DiscountBadge, FastingBadge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useState } from "react";

interface TestCardProps {
  test: Test;
  compact?: boolean;
}

export default function TestCard({ test, compact = false }: TestCardProps) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link href={`/tests/${test.slug}`} className="block group">
      <div className="bg-white rounded-2xl md:rounded-[2rem] border border-surface-border shadow-card premium-hover p-5 flex flex-col h-full relative overflow-hidden transition-all duration-300">
        {/* Popular badge */}
        {test.popular && (
          <div className="absolute top-0 right-0">
            <div className="bg-brand-teal text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl tracking-wide">
              🔥 POPULAR
            </div>
          </div>
        )}
        {test.isNew && !test.popular && (
          <div className="absolute top-0 right-0">
            <div className="bg-brand-blue text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl tracking-wide">
              NEW
            </div>
          </div>
        )}

        {/* Test icon */}
        <div className="w-10 h-10 rounded-xl bg-brand-teal-pale flex items-center justify-center mb-3">
          <FlaskConical size={18} className="text-brand-teal" />
        </div>

        {/* Name */}
        <h3 className="font-heading font-semibold text-text-primary text-sm leading-snug mb-1 group-hover:text-brand-blue transition-colors pr-12">
          {test.name}
        </h3>

        {!compact && (
          <p className="text-xs text-text-muted leading-relaxed mb-3 line-clamp-2">
            {test.shortDescription}
          </p>
        )}

        {/* Metadata pills */}
        <div className="flex items-center flex-wrap gap-1.5 mb-4 mt-auto">
          <span className="flex items-center gap-1 text-[11px] text-text-secondary bg-surface-soft rounded-full px-2 py-0.5">
            <Clock size={11} className="text-brand-teal" />
            {test.reportTime}
          </span>
          {test.homeCollection && (
            <span className="flex items-center gap-1 text-[11px] text-text-secondary bg-surface-soft rounded-full px-2 py-0.5">
              <Home size={11} className="text-brand-teal" />
              Home
            </span>
          )}
          <FastingBadge required={test.fasting} hours={test.fastingHours ?? undefined} />
        </div>

        {/* Parameters */}
        <p className="text-[11px] text-text-muted mb-3">
          {test.parameterCount} {test.parameterCount === 1 ? "parameter" : "parameters"} · {test.sampleType}
        </p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-surface-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-brand-blue text-lg">
                {formatPrice(test.price)}
              </span>
              <DiscountBadge percent={test.discountPercent} />
            </div>
            <span className="text-xs text-text-muted line-through">{formatPrice(test.originalPrice)}</span>
          </div>

          <Button
            size="sm"
            variant={added ? "secondary" : "teal"}
            onClick={handleAddToCart}
            leftIcon={added ? <Check size={14} /> : <ShoppingCart size={14} />}
            className="flex-shrink-0"
          >
            {added ? "Added!" : "Add"}
          </Button>
        </div>
      </div>
    </Link>
  );
}
