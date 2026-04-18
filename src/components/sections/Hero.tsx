"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Clock, Home, Shield, Star, Search } from "lucide-react";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Hero");
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
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-20 animate-pulse-slow"
          style={{ 
            background: "radial-gradient(circle, #00A8A8, transparent 70%)", 
            transform: "translate(20%, -30%)",
            filter: "blur(60px)",
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

      <div className="container-site pt-20 pb-16 lg:pt-24 lg:pb-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Copy & Search */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Premium Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 mb-8 shadow-modal opacity-0 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
            </span>
            <span className="text-xs uppercase tracking-widest text-white/90 font-bold">{t("eyebrow")}</span>
          </div>

          {/* Headline */}
          <h1
            id="hero-headline"
            className="font-heading font-black text-white mb-6 leading-[1.1] max-w-2xl tracking-tight opacity-0 animate-fade-in-up [animation-delay:0.1s]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            dangerouslySetInnerHTML={{ __html: t("headline").replace('Delivered Home.', '<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal-pale to-brand-teal">Delivered Home.</span>') }}
          />
          
          <p className="text-white/80 text-lg md:text-xl font-medium mb-10 max-w-xl opacity-0 animate-fade-in-up [animation-delay:0.2s]">
            {t("subheadline")}
          </p>

          {/* Central Search / Action Box */}
          <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl md:rounded-[2rem] shadow-modal mb-10 opacity-0 animate-fade-in-up [animation-delay:0.3s] flex flex-col sm:flex-row gap-2">
            <form onSubmit={handleSearch} className="flex-1 relative flex items-center">
              <Search className="absolute left-4 text-white/50" size={20} />
              <input 
                type="text" 
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 text-white placeholder:text-white/40 rounded-xl md:rounded-[1.5rem] py-3.5 pl-12 pr-4 outline-none focus:bg-white/10 focus:ring-2 focus:ring-brand-teal transition-all font-medium text-base md:text-lg"
              />
            </form>
            <Button 
              size="lg" 
              variant="secondary" 
              className="rounded-xl md:rounded-[1.5rem] shadow-teal flex-shrink-0 py-3.5"
              onClick={handleSearch}
            >
              {t("findTests")} <ArrowRight size={18} className="ml-1" />
            </Button>
          </div>

          {/* Trust elements row */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-6 opacity-0 animate-fade-in [animation-delay:0.5s]">
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

        {/* Right Column: Image */}
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-modal opacity-0 animate-fade-in [animation-delay:0.6s]">
          <Image 
            src="/images/smartlab_image_1.png" 
            alt="SMARTLAB247 Premium Healthcare" 
            fill 
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
          />
        </div>

      </div>

    </section>
  );
}
