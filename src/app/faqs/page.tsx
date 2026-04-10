import type { Metadata } from "next";
import Link from "next/link";
import { FAQS } from "@/data/index";
import { Search, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQs — Frequently Asked Questions | SMARTLAB247",
  description:
    "Everything you need to know about SMARTLAB247 — booking, home collection, report time, payment, cancellation, membership, cities served, and more.",
};

const CATEGORIES = [
  { id: "booking", label: "Booking" },
  { id: "preparation", label: "Preparation" },
  { id: "collection", label: "Sample Collection" },
  { id: "reports", label: "Reports" },
  { id: "accuracy", label: "Accuracy" },
  { id: "payment", label: "Payment" },
  { id: "membership", label: "SMARTPASS247" },
  { id: "cities", label: "Cities" },
  { id: "refund", label: "Refunds" },
];

export default function FAQsPage() {
  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    faqs: FAQS.filter((f) => f.category === cat.id),
  })).filter((g) => g.faqs.length > 0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-blue to-[#0F5280] text-white py-14">
        <div className="container-site max-w-3xl text-center">
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-white/70 mb-6">
            Everything you need to know about SMARTLAB247.
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full pl-11 pr-4 h-12 rounded-xl bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand-teal/30"
            />
          </div>
        </div>
      </div>

      {/* Category nav */}
      <div className="bg-white border-b border-surface-border sticky top-16 z-30">
        <div className="container-site">
          <div className="flex gap-2 overflow-x-auto scroll-x py-3">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm border border-surface-border text-text-secondary hover:border-brand-teal hover:text-brand-teal transition-all whitespace-nowrap"
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site py-10 max-w-3xl">
        <div className="space-y-12">
          {grouped.map((group) => (
            <section key={group.id} id={group.id} aria-labelledby={`faq-${group.id}`}>
              <h2 id={`faq-${group.id}`} className="font-heading font-bold text-xl text-text-primary mb-5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-brand-teal text-white text-xs font-bold flex items-center justify-center">
                  {group.faqs.length}
                </span>
                {group.label}
              </h2>
              <div className="space-y-3">
                {group.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="bg-white rounded-2xl border border-surface-border shadow-card group"
                    itemScope
                    itemType="https://schema.org/Question"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none gap-4" itemProp="name">
                      <span className="font-semibold text-text-primary text-sm">{faq.question}</span>
                      <ChevronDown size={18} className="text-text-muted group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    <div
                      className="px-5 pb-5 -mt-1"
                      itemScope
                      itemType="https://schema.org/Answer"
                      itemProp="acceptedAnswer"
                    >
                      <p className="text-sm text-text-secondary leading-relaxed" itemProp="text">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-14 bg-brand-teal-pale border border-brand-teal/20 rounded-2xl p-8 text-center">
          <h2 className="font-heading font-semibold text-xl text-brand-blue mb-2">Still have a question?</h2>
          <p className="text-text-muted text-sm mb-5">Our support team is available 7 days a week.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/918002662247" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity">
              💬 Chat on WhatsApp
            </a>
            <Link href="/contact"
              className="flex items-center gap-2 bg-brand-blue text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-colors">
              ✉️ Contact Support
            </Link>
            <a href="tel:1800-266-2247"
              className="flex items-center gap-2 border border-brand-blue text-brand-blue font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-brand-blue hover:text-white transition-colors">
              📞 1800-266-2247
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
