import type { Metadata } from "next";
import Link from "next/link";
import { Search, Filter, SlidersHorizontal, Clock, Home, ChevronRight } from "lucide-react";
import { TESTS } from "@/data/tests";
import TestCard from "@/components/cards/TestCard";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Lab Tests in Kolkata — Book Blood Tests Online | Home Sample Collection",
  description:
    "Browse 500+ lab tests in Kolkata. Book blood tests, urine tests, and diagnostic panels online with home sample collection. Reports in 4–24 hours. Up to 75% off.",
};

const FILTER_CATEGORIES = [
  "All", "Blood", "Thyroid", "Diabetes", "Vitamins", "Liver", "Kidney", "Heart", "Hormones", "Allergy",
];

const SORT_OPTIONS = [
  { label: "Popularity", value: "popular" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Report Time", value: "report-time" },
  { label: "Discount", value: "discount" },
];

export default function TestsPage() {
  return (
    <>
      {/* Page header */}
      <div className="bg-white border-b border-surface-border">
        <div className="container-site py-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-text-muted mb-4">
            <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
            <ChevronRight size={13} />
            <span className="text-text-primary font-medium">Lab Tests</span>
          </nav>

          <h1 className="font-heading font-bold text-2xl md:text-3xl text-text-primary mb-2">
            Book Lab Tests Online
          </h1>
          <p className="text-text-muted text-base mb-6">
            500+ tests available with home sample collection. Reports in 4–24 hours. NABL-certified results.
          </p>

          {/* Search row */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              <input
                type="text"
                placeholder="Search tests, symptoms, parameters..."
                className="w-full pl-10 pr-4 h-11 rounded-xl border border-surface-border bg-surface-soft text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 outline-none transition-all"
              />
            </div>
            <Button variant="outline" size="md" leftIcon={<SlidersHorizontal size={16} />} className="md:hidden">
              Filter
            </Button>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 mt-4 overflow-x-auto scroll-x pb-1">
            {FILTER_CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  i === 0
                    ? "bg-brand-blue text-white border-brand-blue"
                    : "bg-white text-text-secondary border-surface-border hover:border-brand-teal hover:text-brand-teal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar filters */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-surface-border p-5 sticky top-20">
              <div className="flex items-center gap-2 mb-5">
                <Filter size={16} className="text-brand-teal" />
                <h2 className="font-semibold text-text-primary text-sm">Filters</h2>
                <button className="ml-auto text-xs text-brand-teal hover:underline font-medium">Reset all</button>
              </div>

              {/* Price range */}
              <div className="mb-5 pb-5 border-b border-surface-border">
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Price Range</h3>
                <div className="space-y-2">
                  {["Under ₹200", "₹200–₹500", "₹500–₹1,000", "₹1,000+"].map((r) => (
                    <label key={r} className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer hover:text-text-primary">
                      <input type="checkbox" className="rounded border-surface-border text-brand-teal focus:ring-brand-teal" />
                      {r}
                    </label>
                  ))}
                </div>
              </div>

              {/* Report time */}
              <div className="mb-5 pb-5 border-b border-surface-border">
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Report Time</h3>
                <div className="space-y-2">
                  {["Within 6 hours", "6–12 hours", "12–24 hours", "24+ hours"].map((r) => (
                    <label key={r} className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer hover:text-text-primary">
                      <input type="checkbox" className="rounded border-surface-border text-brand-teal focus:ring-brand-teal" />
                      {r}
                    </label>
                  ))}
                </div>
              </div>

              {/* Other filters */}
              <div>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Preferences</h3>
                <div className="space-y-2">
                  {["Home Collection Available", "No Fasting Required", "Popular Tests", "AI-Assisted Report"].map((r) => (
                    <label key={r} className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer hover:text-text-primary">
                      <input type="checkbox" className="rounded border-surface-border text-brand-teal focus:ring-brand-teal" />
                      {r}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Sort + count bar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <p className="text-sm text-text-muted">
                Showing <span className="font-semibold text-text-primary">{TESTS.length}</span> tests
                <span className="mx-1.5 text-surface-border">·</span>
                <span className="font-medium text-brand-teal">Kolkata</span>
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-muted hidden sm:inline">Sort:</span>
                <select className="text-sm border border-surface-border rounded-xl px-3 py-2 bg-white text-text-primary focus:outline-none focus:border-brand-teal">
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Home collection badge */}
            <div className="bg-brand-teal-pale border border-brand-teal/20 rounded-xl p-3 flex items-center gap-3 mb-6">
              <Home size={16} className="text-brand-teal flex-shrink-0" />
              <p className="text-sm text-brand-teal-dark">
                <span className="font-semibold">Free home collection</span> on orders above ₹499.
                SkillMedic™ arrives within 60 minutes.
              </p>
              <div className="ml-auto flex items-center gap-1 text-xs text-brand-teal">
                <Clock size={12} />
                <span className="font-medium whitespace-nowrap">6 AM–6 PM</span>
              </div>
            </div>

            {/* Test grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TESTS.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>

            {/* Load more pagination */}
            <div className="text-center mt-10">
              <Button variant="outline" size="lg">
                Load More Tests
              </Button>
              <p className="text-xs text-text-muted mt-2">Showing {TESTS.length} of 500+ tests</p>
            </div>
          </main>
        </div>
      </div>

      {/* SEO content */}
      <div className="bg-surface-soft border-t border-surface-border py-10">
        <div className="container-site max-w-3xl">
          <h2 className="font-heading font-semibold text-xl text-text-primary mb-4">
            Book Lab Tests at Home in Kolkata
          </h2>
          <div className="prose prose-sm text-text-secondary max-w-none">
            <p>
              SMARTLAB247 offers 500+ diagnostic lab tests with home sample collection across Kolkata, including Salt Lake, New Town, Park Street, Ballygunge, Behala, Dumdum, Howrah, and more. Our trained SkillMedic™ agents collect samples from your home — no queues, no travel.
            </p>
            <p className="mt-3">
              Every test is processed in our NABL-accredited labs using premium automated analysers. AI-assisted pathology ensures high-quality and reliable reports with the fastest turnaround time in Kolkata. Most routine tests like CBC, HbA1c, and Thyroid are reported within 6 hours.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
