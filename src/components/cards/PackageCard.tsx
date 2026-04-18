"use client";

import Link from "next/link";
import { Clock, Home, Users, Check, ShoppingCart, Star } from "lucide-react";
import { Package } from "@/types";
import { formatPrice } from "@/lib/utils";
import { DiscountBadge, FastingBadge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useState } from "react";

interface PackageCardProps {
  pkg: Package;
  featured?: boolean;
}

const GENDER_LABEL: Record<string, string> = { 
  all: "For Everyone", male: "For Men", female: "For Women",
  ALL: "For Everyone", MALE: "For Men", FEMALE: "For Women" 
};
const GENDER_COLOR: Record<string, string> = { 
  all: "text-brand-teal", male: "text-blue-600", female: "text-pink-600",
  ALL: "text-brand-teal", MALE: "text-blue-600", FEMALE: "text-pink-600"
};

export default function PackageCard({ pkg, featured = false }: PackageCardProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const savings = pkg.originalPrice - pkg.price;

  return (
    <Link href={`/checkups/${pkg.slug}`} className="block group">
      <div className={`bg-white rounded-[2rem] border shadow-card premium-hover flex flex-col h-full overflow-hidden relative transition-all duration-300 ${
        featured ? "border-brand-teal ring-2 ring-brand-teal/20" : "border-surface-border"
      }`}>
        {/* Recommended ribbon */}
        {pkg.recommended && (
          <div className="absolute top-0 right-0">
            <div className={`text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl tracking-wide ${
              featured ? "bg-brand-teal text-white" : "bg-brand-blue text-white"
            }`}>
              ⭐ RECOMMENDED
            </div>
          </div>
        )}
        {pkg.popular && !pkg.recommended && (
          <div className="absolute top-0 right-0">
            <div className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl tracking-wide">
              🔥 MOST BOOKED
            </div>
          </div>
        )}

        {/* Card body */}
        <div className="p-5 flex flex-col flex-1">
          {/* Category */}
          <p className={`text-xs font-semibold mb-2 ${GENDER_COLOR[pkg.gender]}`}>
            {GENDER_LABEL[pkg.gender]}
          </p>

          {/* Name */}
          <h3 className="font-heading font-bold text-text-primary text-base leading-snug mb-1.5 group-hover:text-brand-blue transition-colors pr-10">
            {pkg.name}
          </h3>
          <p className="text-xs text-text-muted leading-relaxed mb-4 line-clamp-2">{pkg.tagline}</p>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-surface-soft rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-brand-blue">{pkg.parameterCount}+</p>
              <p className="text-[11px] text-text-muted">Parameters</p>
            </div>
            <div className="bg-surface-soft rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-brand-blue">{pkg.testCount}</p>
              <p className="text-[11px] text-text-muted">Tests</p>
            </div>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="flex items-center gap-1 text-[11px] text-text-secondary bg-surface-soft rounded-full px-2 py-0.5">
              <Clock size={11} className="text-brand-teal" />
              {pkg.reportTime}
            </span>
            {pkg.homeCollection && (
              <span className="flex items-center gap-1 text-[11px] text-text-secondary bg-surface-soft rounded-full px-2 py-0.5">
                <Home size={11} className="text-brand-teal" />
                Home Collection
              </span>
            )}
            <FastingBadge required={pkg.fasting} hours={pkg.fastingHours ?? undefined} />
            {pkg.membershipEligible && (
              <span className="flex items-center gap-1 text-[11px] text-brand-teal font-semibold bg-brand-teal-pale rounded-full px-2 py-0.5">
                <Star size={11} />
                PASS247
              </span>
            )}
          </div>

          {/* Savings callout */}
          <div className="bg-green-50 border border-green-100 rounded-xl p-3 mb-4">
            <p className="text-xs text-green-700 font-semibold">
              💰 You save {formatPrice(savings)} ({pkg.discountPercent}% off)
            </p>
            <p className="text-[11px] text-green-600 mt-0.5">{pkg.frequency}</p>
          </div>

          {/* Purpose tags */}
          <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
            {pkg.purpose.slice(0, 3).map((p) => (
              <span key={p} className="text-[11px] text-text-muted border border-surface-border rounded-full px-2 py-0.5">
                {p}
              </span>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-surface-border">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-brand-blue text-xl">
                  {formatPrice(pkg.price)}
                </span>
                <DiscountBadge percent={pkg.discountPercent} />
              </div>
              <span className="text-xs text-text-muted line-through">{formatPrice(pkg.originalPrice)}</span>
            </div>

            <Button
              size="sm"
              variant={added ? "secondary" : "primary"}
              onClick={handleAdd}
              leftIcon={added ? <Check size={14} /> : <ShoppingCart size={14} />}
            >
              {added ? "Added!" : "Book"}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
