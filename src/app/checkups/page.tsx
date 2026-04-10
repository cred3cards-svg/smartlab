import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, SlidersHorizontal, Search } from "lucide-react";
import { PACKAGES } from "@/data/packages";
import PackageCard from "@/components/cards/PackageCard";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Health Checkup Packages in Kolkata — Full Body Checkups Online",
  description:
    "Book comprehensive health checkup packages online in Kolkata. Full body checkup, women's wellness, cardiac risk, and more. Home sample collection. Up to 75% off.",
};

const FILTER_TABS = [
  { label: "All Packages", value: "all" },
  { label: "Full Body", value: "full-body" },
  { label: "Women's Health", value: "womens-health" },
  { label: "Cardiac", value: "cardiac" },
  { label: "Diabetes", value: "diabetes" },
  { label: "Senior Care", value: "senior" },
];

const GENDER_FILTERS = ["All", "Men", "Women"];
const BUDGET_FILTERS = ["Under ₹500", "₹500–₹1,000", "₹1,000–₹2,000", "₹2,000+"];

export default function CheckupsPage() {
  return (
    <>
      {/* Page hero */}
      <div className="bg-gradient-to-br from-brand-blue to-[#0F5280] text-white">
        <div className="container-site py-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/50 mb-4">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <ChevronRight size={13} />
            <span className="text-white/80">Health Checkups</span>
          </nav>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-white mb-2">
            Health Checkup Packages
          </h1>
          <p className="text-white/70 text-base mb-6 max-w-xl">
            All-inclusive diagnostic packages with home collection, AI-enhanced reports, and savings of up to 81%.
          </p>

          {/* Search */}
          <div className="relative max-w-lg">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search packages, e.g. full body, women's health..."
              className="w-full pl-11 pr-4 h-12 rounded-xl bg-white text-sm text-text-primary placeholder:text-text-muted outline-none focus:ring-2 focus:ring-brand-teal/30"
            />
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="bg-white border-b border-surface-border">
        <div className="container-site">
          <div className="flex items-center gap-2 overflow-x-auto scroll-x py-3">
            {FILTER_TABS.map((tab, i) => (
              <button
                key={tab.value}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${
                  i === 0
                    ? "bg-brand-blue text-white border-brand-blue"
                    : "bg-white text-text-secondary border-surface-border hover:border-brand-teal hover:text-brand-teal"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site py-8">
        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-surface-border p-5 sticky top-20 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-text-primary text-sm flex items-center gap-2">
                  <SlidersHorizontal size={15} className="text-brand-teal" />
                  Filters
                </h2>
                <button className="text-xs text-brand-teal font-medium hover:underline">Reset</button>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Gender</h3>
                <div className="flex gap-2">
                  {GENDER_FILTERS.map((g) => (
                    <button key={g} className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all ${g === "All" ? "bg-brand-blue text-white border-brand-blue" : "bg-white text-text-secondary border-surface-border hover:border-brand-teal"}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Budget</h3>
                <div className="space-y-2">
                  {BUDGET_FILTERS.map((b) => (
                    <label key={b} className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer hover:text-text-primary">
                      <input type="checkbox" className="rounded border-surface-border text-brand-teal focus:ring-brand-teal" />
                      {b}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Preferences</h3>
                <div className="space-y-2">
                  {["Recommended", "Popular", "No Fasting", "SMARTPASS247 Eligible"].map((p) => (
                    <label key={p} className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer hover:text-text-primary">
                      <input type="checkbox" className="rounded border-surface-border text-brand-teal focus:ring-brand-teal" />
                      {p}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-text-muted">
                <span className="font-semibold text-text-primary">{PACKAGES.length} packages</span> available
              </p>
              <select className="text-sm border border-surface-border rounded-xl px-3 py-2 bg-white focus:outline-none focus:border-brand-teal">
                <option>Sort: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Parameters</option>
                <option>Most Booked</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {PACKAGES.map((pkg, i) => (
                <PackageCard key={pkg.id} pkg={pkg} featured={pkg.popular} />
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* SEO content */}
      <div className="bg-surface-soft border-t border-surface-border py-10">
        <div className="container-site max-w-3xl">
          <h2 className="font-heading font-semibold text-xl text-text-primary mb-4">
            Full Body Health Checkup Packages in Kolkata
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            SMARTLAB247 brings the power of AI-assisted diagnostics directly to your home in Kolkata. Our health checkup packages are designed for modern India — digital-first, convenient, and accessible. Available across Kolkata: Salt Lake, New Town, Park Street, Ballygunge, Behala, Dumdum, Howrah, and more.
          </p>
        </div>
      </div>
    </>
  );
}
