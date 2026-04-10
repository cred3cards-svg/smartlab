import Link from "next/link";
import { FAQS } from "@/data/index";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function FAQPreview() {
  const preview = FAQS.slice(0, 5);

  return (
    <section className="section bg-surface-soft" aria-labelledby="faq-preview-heading">
      <div className="container-site max-w-3xl">
        <div className="text-center mb-8">
          <p className="text-brand-teal text-sm font-semibold mb-2 uppercase tracking-wider">Have Questions?</p>
          <h2 id="faq-preview-heading" className="font-heading font-bold text-2xl text-text-primary">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {preview.map((faq, idx) => (
            <details key={idx} className="bg-white rounded-2xl border border-surface-border group shadow-card">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none gap-4">
                <span className="font-semibold text-text-primary text-sm">{faq.question}</span>
                <ChevronDown size={18} className="text-text-muted group-open:rotate-180 transition-transform flex-shrink-0" />
              </summary>
              <div className="px-5 pb-5 -mt-1">
                <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/faqs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-teal hover:text-brand-teal-dark transition-colors"
          >
            View all FAQs <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
