"use client";

import Image from "next/image";
import { Search, Home, Microscope, FileText } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Book Online",
    description: "Select your tests, pick a time, and confirm. No waiting queues or phone calls.",
    icon: Search,
  },
  {
    step: "02",
    title: "Home Collection",
    description: "A trained SkillMedic™ arrives at your location for a painless, hygienic sample collection.",
    icon: Home,
  },
  {
    step: "03",
    title: "Lab Processing",
    description: "Your sample is processed in NABL-certified labs using cutting-edge AI-assisted technology.",
    icon: Microscope,
  },
  {
    step: "04",
    title: "Digital Report",
    description: "Secure, verified reports delivered straight to your dashboard and email within hours.",
    icon: FileText,
  },
];

export default function HowItWorks() {
  return (
    <section className="section bg-surface-soft" aria-labelledby="how-it-works-heading">
      <div className="container-site">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-brand-teal text-sm font-bold mb-3 uppercase tracking-widest">Seamless Process</p>
          <h2 id="how-it-works-heading" className="font-heading font-bold text-3xl md:text-4xl text-text-primary mb-4">
            Health Checkups Made <span className="text-brand-teal">Effortless</span>
          </h2>
          <p className="text-text-secondary text-lg">
            From booking to clinical insights, experience healthcare the way it should be.
          </p>
        </div>

        <div className="relative">
          {/* Subtle horizontal connecting line structure */}
          <div className="absolute hidden lg:block top-8 left-[10%] right-[10%] h-[1px] bg-surface-border" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map(({ step, title, description, icon: Icon }, idx) => (
              <div 
                key={step} 
                className="group relative flex flex-col items-center text-center opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                {/* Icon Container */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-white border border-surface-border shadow-sm flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:border-brand-teal group-hover:shadow-teal">
                  <Icon size={24} className="text-brand-blue group-hover:text-brand-teal transition-colors" />
                  <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-brand-teal text-white text-[10px] font-bold flex items-center justify-center border-2 border-surface-soft">
                    {step}
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg text-text-primary mb-3">
                  {title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Image */}
        <div className="mt-20 max-w-5xl mx-auto hidden md:block opacity-0 animate-fade-in-up [animation-delay:0.6s]">
          <div className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden shadow-modal border border-surface-border">
            <Image 
              src="/images/smartlab_image_2.png" 
              alt="SMARTLAB247 seamless process" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
