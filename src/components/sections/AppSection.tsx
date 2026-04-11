"use client";

import Image from "next/image";
import Link from "next/link";
import { Smartphone, Download, Bell, TrendingUp, Users, FileText, ArrowRight } from "lucide-react";

const APP_FEATURES = [
  { icon: FileText, label: "Digital Reports", desc: "Download & share anytime" },
  { icon: TrendingUp, label: "Health Trends", desc: "AI trend charts per parameter" },
  { icon: Users, label: "Family Profiles", desc: "Manage up to 6 members" },
  { icon: Bell, label: "Smart Reminders", desc: "Annual test reminders" },
];

export default function AppSection() {
  return (
    <section className="section bg-white" aria-labelledby="app-section-heading">
      <div className="container-site">
        <div className="bg-gradient-to-br from-brand-blue to-[#0F5280] rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
            {/* Left: content */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 mb-5 text-sm text-white/90 font-medium w-fit">
                <Smartphone size={14} className="text-brand-teal" />
                SMARTLAB247 App
              </div>
              <h2 id="app-section-heading" className="font-heading font-bold text-white mb-3"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}>
                Your Health Dashboard,{" "}
                <span className="text-brand-teal">In Your Pocket</span>
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-6">
                Track reports, view trends, manage family health profiles, and book repeat tests — all from one beautiful app.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {APP_FEATURES.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-brand-teal" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{label}</p>
                      <p className="text-xs text-white/60">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#" className="flex items-center gap-2 bg-white text-brand-blue font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity">
                  <Download size={16} />
                  App Store
                </a>
                <a href="#" className="flex items-center gap-2 bg-white/15 border border-white/20 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-white/20 transition-colors">
                  <Download size={16} />
                  Google Play
                </a>
              </div>

              <Link href="/app" className="inline-flex items-center gap-1.5 mt-4 text-sm text-white/60 hover:text-white transition-colors">
                Learn more about the app <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right: Feature Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-gray-900">
                <Image 
                  src="/images/smartlab_image_4.png" 
                  alt="SMARTLAB247 App Preview" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
