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
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading font-bold text-3xl text-text-primary mb-4">
            Diagnostics You Can Trust
          </h2>
          <p className="text-text-secondary">
            We combined advanced AI pathology with seamless logistics to bring premium healthcare straight to your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-surface-soft rounded-[2rem] p-6 border border-surface-border premium-hover text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center mb-5">
                  <Icon size={24} className="text-brand-teal" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
