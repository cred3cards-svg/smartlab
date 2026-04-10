import Link from "next/link";
import { CITIES } from "@/data/index";
import { MapPin, ArrowRight } from "lucide-react";

export default function CitiesSection() {
  return (
    <section className="section bg-white" aria-labelledby="cities-heading">
      <div className="container-site">
        <div className="text-center mb-10">
          <p className="text-brand-teal text-sm font-semibold mb-2 uppercase tracking-wider">Nationwide Coverage</p>
          <h2 id="cities-heading" className="font-heading font-bold text-2xl md:text-3xl text-text-primary">
            We&apos;re Expanding Across India
          </h2>
          <p className="text-text-muted mt-2">Premium home diagnostics — now available in 6 cities</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/city/${city.slug}`}
              className="group flex flex-col items-center text-center p-4 rounded-2xl bg-surface-soft border border-surface-border hover:border-brand-teal hover:bg-brand-teal-pale transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-full bg-brand-blue/10 group-hover:bg-brand-teal flex items-center justify-center mb-3 transition-colors">
                <MapPin size={18} className="text-brand-blue group-hover:text-white transition-colors" />
              </div>
              <p className="font-semibold text-text-primary text-sm group-hover:text-brand-teal transition-colors">{city.name}</p>
              <p className="text-xs text-text-muted mt-0.5">{city.state}</p>
              <p className="text-xs text-brand-teal font-medium mt-1">{city.centreCount} centres</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-surface-soft border border-surface-border rounded-full px-5 py-2.5 text-sm text-text-secondary">
            <span>Coming soon:</span>
            <span className="font-medium text-text-primary">Kolkata · Goa · Belagavi · Guwahati · Shillong</span>
          </div>
          <div className="mt-4">
            <Link href="/centres" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal hover:text-brand-teal-dark transition-colors">
              Find a centre near you <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
