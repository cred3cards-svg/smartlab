import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import CategorySection from "@/components/sections/CategorySection";
import FeaturedSection from "@/components/sections/FeaturedSection";
import HowItWorks from "@/components/sections/HowItWorks";
import AISection from "@/components/sections/AISection";
import MembershipSection from "@/components/sections/MembershipSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CitiesSection from "@/components/sections/CitiesSection";
import FAQPreview from "@/components/sections/FAQPreview";
import AppSection from "@/components/sections/AppSection";
import Script from "next/script";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "SMARTLAB247 — India's First AI-Assisted Pathology Lab | Home Blood Test & Checkups",
  description:
    "Book blood tests, full body checkups & health packages online with home sample collection in Kolkata. AI-assisted pathology. Reports in 6 hours. Up to 75% off. Salt Lake, New Town, Lake Town. NABL certified.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "SMARTLAB247 Health Pvt. Ltd.",
  url: "https://smartlab247.com",
  logo: "https://smartlab247.com/logo.png",
  description: "India's first AI-assisted pathology lab offering home sample collection, fastest reports, and up to 75% discounts.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-1800-266-2247",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://twitter.com/smartlab247",
    "https://linkedin.com/company/smartlab247",
    "https://instagram.com/smartlab247",
  ],
};

import { useTranslations } from "next-intl";

export default function Home() {
  const tCommon = useTranslations("Common");

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Hero />
      <TrustStrip />
      <CategorySection />
      <FeaturedSection />
      <HowItWorks />
      <AISection />
      <MembershipSection />
      <TestimonialsSection />
      <AppSection />
      <CitiesSection />
      <FAQPreview />

      {/* Bottom CTA section */}
      <section className="section bg-white border-t border-surface-border">
        <div className="container-site text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-text-primary mb-3">
            Ready to Get Started?
          </h2>
          <p className="text-text-muted mb-8 max-w-lg mx-auto">
            Book your first test today. Home collection, NABL-certified results, delivered in hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tests"
              className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-teal active:scale-[0.98] text-base"
            >
              Browse Tests <ArrowRight size={18} />
            </Link>
            <Link
              href="/checkups"
              className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-blue active:scale-[0.98] text-base"
            >
              View Packages <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
