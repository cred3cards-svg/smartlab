import Image from "next/image";
import { Clock, Home, ShieldCheck, Microscope } from "lucide-react";

export default function TrustStrip() {
  const TRUST_ITEMS = [
    {
      icon: Clock,
      title: "6-Hour Reports",
      description: "Fastest turnaround with same-day digital delivery.",
    },
    {
      icon: Home,
      title: "Home Collection",
      description: "Hygienic sample collection at your door in 60 mins.",
    },
    {
      icon: ShieldCheck,
      title: "NABL Certified",
      description: "Strict quality control matching global standards.",
    },
    {
      icon: Microscope,
      title: "AI Assisted",
      description: "Enhanced pathological accuracy and early detection.",
    },
  ];

  return (
    <section className="section bg-white border-b border-surface-border" aria-label="Trust metrics">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Image */}
          <div className="order-2 lg:order-1 relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-modal border border-surface-border">
            <Image 
              src="/images/smartlab_image_5.png" 
              alt="Diagnostics You Can Trust" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Right: Text and Grid */}
          <div className="order-1 lg:order-2">
            <div className="text-center lg:text-left mb-10">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-text-primary mb-4">
                Diagnostics You Can <span className="text-brand-teal">Trust</span>
              </h2>
              <p className="text-text-secondary text-lg">
                We combined advanced AI pathology with seamless logistics to bring premium healthcare straight to your home.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {TRUST_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-surface-soft rounded-2xl p-5 border border-surface-border premium-hover flex flex-col items-start"
                  >
                    <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center mb-4">
                      <Icon size={20} className="text-brand-teal" />
                    </div>
                    <h3 className="font-heading font-semibold text-base text-text-primary mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
