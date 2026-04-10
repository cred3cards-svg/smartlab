"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { TESTS } from "@/data/tests";
import { PACKAGES } from "@/data/packages";
import Link from "next/link";

const QUICK_LINKS = [
  { label: "Complete Blood Count", slug: "/tests/complete-blood-count", type: "test" },
  { label: "Thyroid Profile", slug: "/tests/thyroid-profile-total", type: "test" },
  { label: "SmartScreen Essential", slug: "/checkups/smartscreen-essential", type: "package" },
  { label: "Vitamin D", slug: "/tests/vitamin-d-25-oh", type: "test" },
  { label: "Lipid Profile", slug: "/tests/lipid-profile", type: "test" },
];

interface SearchBarProps {
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
  size = "md",
  placeholder = "Search tests, symptoms, packages...",
  className,
  autoFocus,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState<{ label: string; slug: string; type: string; price?: number }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const testResults = TESTS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.shortDescription.toLowerCase().includes(q) ||
        t.categories.some((c) => c.toLowerCase().includes(q))
    )
      .slice(0, 4)
      .map((t) => ({ label: t.name, slug: `/tests/${t.slug}`, type: "test", price: t.price }));

    const pkgResults = PACKAGES.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q)
    )
      .slice(0, 3)
      .map((p) => ({ label: p.name, slug: `/checkups/${p.slug}`, type: "package", price: p.price }));

    setResults([...testResults, ...pkgResults]);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sizeClasses = {
    sm: "h-10 text-sm pl-9 pr-4",
    md: "h-12 text-sm pl-11 pr-4",
    lg: "h-14 text-base pl-14 pr-6",
  };

  const iconSize = { sm: 16, md: 18, lg: 22 }[size];
  const iconLeft = { sm: "left-2.5", md: "left-3", lg: "left-4" }[size];

  const showDropdown = focused && (query.length === 0 || results.length > 0);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <Search
          size={iconSize}
          className={cn("absolute top-1/2 -translate-y-1/2 text-text-muted pointer-events-none z-10", iconLeft)}
        />
        <input
          ref={inputRef}
          autoFocus={autoFocus}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border border-surface-border bg-white outline-none transition-all duration-200",
            "placeholder:text-text-muted text-text-primary font-body",
            "focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10",
            sizeClasses[size]
          )}
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-surface-border shadow-modal z-50 overflow-hidden">
          {query.length === 0 ? (
            <div className="p-3">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 px-2">
                <TrendingUp size={12} className="inline mr-1" />
                Most Searched
              </p>
              {QUICK_LINKS.map((item) => (
                <Link
                  key={item.slug}
                  href={item.slug}
                  onClick={() => setFocused(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-soft text-sm text-text-primary transition-colors"
                >
                  <Clock size={14} className="text-text-muted flex-shrink-0" />
                  <span>{item.label}</span>
                  <span className="ml-auto text-xs text-text-muted capitalize">{item.type}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-2">
              {results.map((r) => (
                <Link
                  key={r.slug}
                  href={r.slug}
                  onClick={() => { setFocused(false); setQuery(""); }}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-surface-soft transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-text-primary">{r.label}</p>
                    <p className="text-xs text-text-muted capitalize mt-0.5">{r.type}</p>
                  </div>
                  {r.price && (
                    <span className="text-sm font-bold text-brand-teal ml-4">₹{r.price}</span>
                  )}
                </Link>
              ))}
              <Link
                href={`/tests?q=${query}`}
                onClick={() => setFocused(false)}
                className="flex items-center gap-2 px-3 py-2.5 mt-1 text-sm text-brand-teal font-semibold border-t border-surface-border hover:bg-brand-teal-pale rounded-b-lg transition-colors"
              >
                <Search size={14} />
                See all results for &ldquo;{query}&rdquo;
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
