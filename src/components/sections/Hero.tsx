"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Home, Shield, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";

const TRUST_PILLS = [
  { icon: Clock, label: "Reports in 6 hours" },
  { icon: Home, label: "Home collection in 60 min" },
  { icon: Shield, label: "NABL Certified Labs" },
  { icon: Star, label: "4.9★ rated" },
];

const QUICK_STATS = [
  { value: "2L+", label: "Patients Served" },
  { value: "500+", label: "Tests Available" },
  { value: "75%", label: "Average Savings" },
  { value: "6hrs", label: "Report Turnaround" },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"tests" | "checkups">("tests");

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="hero-headline"
      style={{
        background: "linear-gradient(135deg, #0B3C5D 0%, #082D46 60%, #00565A 100%)",
      }}
    >
      {/* Background decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #00A8A8, transparent)", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #4CAF50, transparent)", transform: "translate(-30%, 30%)" }} />
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="container-site py-16 lg:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-sm text-white/90 font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            India&apos;s First AI-Assisted Pathology Lab
          </div>

          {/* Headline */}
          <h1
            id="hero-headline"
            className="font-heading font-bold text-white mb-4 leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            SMARTLAB247 – <span style={{ color: "#00A8A8" }}>Kolkata</span>
          </h1>
          <p className="text-white/90 text-xl font-bold mb-2">AI-Assisted At-Home Lab Tests & Health Checkups</p>
          <p className="text-white/70 text-sm mb-6 uppercase tracking-widest font-bold">Fast Home Sample Collection | Fastest Reports Delivery</p>

          {/* Sub-headline */}
          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            AI-powered pathology with home sample collection — reports in hours, not days.{" "}
            <span className="text-yellow-300 font-semibold">Up to 75% lower</span> than clinic rates.
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {TRUST_PILLS.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-xs text-white/85 font-medium">
                <Icon size={12} className="text-brand-teal" />
                {label}
              </span>
            ))}
          </div>

          {/* Search section */}
          <div className="bg-white rounded-2xl p-4 shadow-modal mb-6">
            {/* Tab toggle */}
            <div className="flex bg-surface-soft rounded-xl p-1 mb-3">
              <button
                onClick={() => setActiveTab("tests")}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === "tests"
                    ? "bg-brand-blue text-white shadow-sm"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                🧪 Lab Tests
              </button>
              <button
                onClick={() => setActiveTab("checkups")}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === "checkups"
                    ? "bg-brand-blue text-white shadow-sm"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                📋 Checkup Packages
              </button>
            </div>

            <SearchBar
              size="lg"
              placeholder={
                activeTab === "tests"
                  ? "Search tests, symptoms, parameters..."
                  : "Search full body checkup, women's health..."
              }
            />

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-border">
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <MapPin size={13} className="text-brand-teal" />
                <span>Collecting in Kolkata: Salt Lake, New Town, Park Street, Ballygunge...</span>
                <button className="text-brand-teal font-semibold hover:underline">Change</button>
              </div>
              <div className="flex gap-2">
                <Link href={activeTab === "tests" ? "/tests" : "/checkups"}>
                  <Button size="sm" variant="ghost" rightIcon={<ArrowRight size={14} />}>
                    Browse All
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Popular searches */}
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-xs text-white/50">Popular:</span>
            {["CBC", "Thyroid", "Vitamin D", "Full Body", "HbA1c", "Lipid Profile"].map((tag) => (
              <Link
                key={tag}
                href={`/tests?q=${tag}`}
                className="text-xs text-white/70 hover:text-white transition-colors underline underline-offset-2 decoration-white/30 hover:decoration-white"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
          {QUICK_STATS.map(({ value, label }) => (
            <div key={label} className="text-center bg-white/8 rounded-2xl py-5 px-4 border border-white/10">
              <p className="font-heading font-bold text-3xl text-white mb-1">{value}</p>
              <p className="text-xs text-white/60 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
