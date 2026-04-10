"use client";

import Link from "next/link";
import { ArrowRight, Droplets, Heart, Activity, Filter, Zap, FlaskConical, Sun, Bone } from "lucide-react";

const ORGAN_CATS = [
  { name: "Blood", Icon: Droplets, slug: "blood", color: "#E53E3E", bg: "#FFF5F5", count: 12 },
  { name: "Heart", Icon: Heart, slug: "heart", color: "#E53E3E", bg: "#FFF5F5", count: 8 },
  { name: "Liver", Icon: Activity, slug: "liver", color: "#F59E0B", bg: "#FFFBEB", count: 6 },
  { name: "Kidney", Icon: Filter, slug: "kidney", color: "#3182CE", bg: "#EBF8FF", count: 9 },
  { name: "Thyroid", Icon: Zap, slug: "thyroid", color: "#00A8A8", bg: "#E6F7F7", count: 8 },
  { name: "Hormones", Icon: FlaskConical, slug: "hormones", color: "#8B5CF6", bg: "#F5F3FF", count: 11 },
  { name: "Vitamins", Icon: Sun, slug: "vitamins", color: "#F59E0B", bg: "#FFFBEB", count: 6 },
  { name: "Bone", Icon: Bone, slug: "bone", color: "#6B7280", bg: "#F9FAFB", count: 4 },
];

const CATEGORIES = [
  { label: "Full Body", slug: "full-body" },
  { label: "Women's Health", slug: "womens-health" },
  { label: "Thyroid", slug: "thyroid" },
  { label: "Diabetes", slug: "diabetes" },
  { label: "Heart Health", slug: "heart-health" },
  { label: "Vitamins", slug: "vitamins" },
  { label: "Allergy", slug: "allergy" },
  { label: "Sexual Health", slug: "sexual-health" },
];

export default function CategorySection() {
  return (
    <section className="section bg-surface-soft" aria-labelledby="category-heading">
      <div className="container-site">
        {/* Category pills */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto scroll-x pb-2">
          <span className="text-sm font-semibold text-text-secondary whitespace-nowrap">Browse by:</span>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/tests?category=${cat.slug}`}
              className="flex-shrink-0 px-4 py-2 rounded-full border border-surface-border bg-white text-sm font-medium text-text-secondary hover:border-brand-teal hover:text-brand-teal hover:bg-brand-teal-pale transition-all duration-200 whitespace-nowrap"
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Organ discovery grid */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 id="category-heading" className="font-heading font-bold text-2xl text-text-primary">
              Browse by Organ
            </h2>
            <p className="text-text-muted text-sm mt-1">Find tests relevant to your specific health concern</p>
          </div>
          <Link
            href="/tests"
            className="text-sm font-semibold text-brand-teal hover:text-brand-teal-dark flex items-center gap-1 transition-colors"
          >
            All Tests <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {ORGAN_CATS.map(({ name, Icon, slug, color, bg, count }) => (
            <Link
              key={slug}
              href={`/tests?organ=${slug}`}
              className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-surface-border hover:border-opacity-50 hover:shadow-card transition-all duration-200 hover:-translate-y-0.5 group"
              style={{ "--hover-border": color } as React.CSSProperties}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: bg }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <p className="text-xs font-semibold text-text-primary leading-snug">{name}</p>
              <p className="text-[10px] text-text-muted mt-0.5">{count} tests</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
