"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Home, Shield, Star, Search } from "lucide-react";
import Button from "@/components/ui/Button";

const TRUST_PILLS = [
  { icon: Clock, label: "6Hr Reports" },
  { icon: Home, label: "Home Collection" },
  { icon: Shield, label: "NABL Labs" },
  { icon: Star, label: "4.9★ Rated" },
];

const QUICK_STATS = [
  { value: "2L+", label: "Patients" },
  { value: "500+", label: "Tests" },
  { value: "75%", label: "Up to Savings" },
  { value: "6hrs", label: "Turnaround" },
];

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/tests?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section
      className="relative overflow-hidden w-full"
      aria-labelledby="hero-headline"
    >
      {/* Premium Animated Gradient Background */}
      <div 
        className="absolute inset-0 z-0 bg-brand-blue"
        style={{
          background: "linear-gradient(135deg, #0B3C5D 0%, #082D46 40%, #0A6064 100%)",
        }}
      >
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-20"
          style={{ 
            background: "radial-gradient(circle, #00A8A8, transparent 70%)", 
            transform: "translate(20%, -30%)",
            filter: "blur(60px)",
            animation: "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite"
          }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ 
            background: "radial-gradient(circle, #E6F7F7, transparent 70%)", 
            transform: "translate(-20%, 20%)",
            filter: "blur(60px)"
          }} />
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")" }} />
      </div>

      <div className="container-site pt-20 pb-16 lg:pt-32 lg:pb-24 relative z-10 flex flex-col items-center">
        
        {/* Premium Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 mb-8 shadow-modal opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
          </span>
          <span className="text-xs uppercase tracking-widest text-white/90 font-bold">Smart Diagnostics, Instant Care</span>
        </div>

        {/* Headline */}
        <h1
          id="hero-headline"
          className="font-heading font-black text-white text-center mb-6 leading-[1.1] max-w-4xl tracking-tight opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          Premium Healthcare, <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal-pale to-brand-teal">Delivered Home.</span>
        </h1>
        
        <p className="text-white/80 text-center text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
          AI-powered pathology with NABL certified accuracy. Book home sample collection in <span className="text-white font-bold">60 minutes</span> and get reports in <span className="text-white font-bold">6 hours</span>.
        </p>

        {/* Central Search / Action Box */}
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-2 md:p-3 rounded-2xl md:rounded-[2rem] shadow-modal mb-10 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.3s_forwards] flex flex-col md:flex-row gap-2">
          <form onSubmit={handleSearch} className="flex-1 relative flex items-center">
            <Search className="absolute left-4 text-white/50" size={20} />
            <input 
              type="text" 
              placeholder="Search tests (e.g. CBC, Vitamin D)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 text-white placeholder:text-white/40 rounded-xl md:rounded-[1.5rem] py-4 pl-12 pr-4 outline-none focus:bg-white/10 focus:ring-2 focus:ring-brand-teal transition-all font-medium text-lg"
            />
          </form>
          <Button 
            size="xl" 
            variant="secondary" 
            className="rounded-xl md:rounded-[1.5rem] shadow-teal flex-shrink-0"
            onClick={handleSearch}
          >
            Find Tests <ArrowRight size={18} className="ml-1" />
          </Button>
        </div>

        {/* Trust elements row */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 opacity-0 animate-[fadeIn_0.8s_ease-out_0.5s_forwards]">
          {TRUST_PILLS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/90">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <Icon size={12} className="text-brand-teal" />
              </div>
              <span className="text-xs md:text-sm font-semibold">{label}</span>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
