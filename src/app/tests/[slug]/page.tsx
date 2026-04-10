import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight, Clock, Home, Droplets, Check, X, ShoppingCart,
  AlertCircle, FileText, FlaskConical, ChevronDown
} from "lucide-react";
import { getTestBySlug, TESTS } from "@/data/tests";
import { formatPrice } from "@/lib/utils";
import { DiscountBadge, FastingBadge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import TestCard from "@/components/cards/TestCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TESTS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const test = getTestBySlug(slug);
  if (!test) return { title: "Test Not Found" };
  return {
    title: `${test.name} — Book at ₹${test.price} with Home Collection`,
    description: `Book ${test.name} online with home sample collection. Reports in ${test.reportTime}. ${test.discountPercent}% off. NABL-certified lab. Book now.`,
  };
}

export default async function TestDetailPage({ params }: Props) {
  const { slug } = await params;
  const test = getTestBySlug(slug);
  if (!test) notFound();

  const savings = test.originalPrice - test.price;
  const related = test.relatedTests
    .map((s) => TESTS.find((t) => t.slug === s))
    .filter(Boolean) as typeof TESTS;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-surface-soft border-b border-surface-border">
        <div className="container-site py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-text-muted">
            <Link href="/" className="hover:text-brand-teal">Home</Link>
            <ChevronRight size={13} />
            <Link href="/tests" className="hover:text-brand-teal">Lab Tests</Link>
            <ChevronRight size={13} />
            <span className="text-text-primary font-medium truncate">{test.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-site py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {test.popular && <span className="badge-popular">🔥 Most Booked</span>}
                {test.isNew && <span className="badge-new">NEW</span>}
                <DiscountBadge percent={test.discountPercent} />
                <FastingBadge required={test.fasting} hours={test.fastingHours} />
              </div>

              <h1 className="font-heading font-bold text-2xl md:text-3xl text-text-primary mb-2">
                {test.name}
              </h1>
              <p className="text-text-secondary text-base leading-relaxed">{test.shortDescription}</p>

              {/* Quick info strip */}
              <div className="flex flex-wrap gap-3 mt-4">
                <div className="flex items-center gap-1.5 text-sm bg-surface-soft rounded-xl px-3 py-2">
                  <Clock size={15} className="text-brand-teal" />
                  <span className="font-medium text-text-primary">Reports in {test.reportTime}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm bg-surface-soft rounded-xl px-3 py-2">
                  <Home size={15} className="text-brand-teal" />
                  <span className="font-medium text-text-primary">Home Collection Available</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm bg-surface-soft rounded-xl px-3 py-2">
                  <Droplets size={15} className="text-brand-teal" />
                  <span className="font-medium text-text-primary">{test.sampleType} Sample</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm bg-surface-soft rounded-xl px-3 py-2">
                  <FlaskConical size={15} className="text-brand-teal" />
                  <span className="font-medium text-text-primary">{test.parameterCount} Parameters</span>
                </div>
              </div>
            </div>

            {/* Why this test */}
            <div className="bg-brand-teal-pale border border-brand-teal/20 rounded-2xl p-5">
              <div className="flex gap-3">
                <AlertCircle size={20} className="text-brand-teal flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-brand-blue mb-1.5">Why is this test important?</h2>
                  <p className="text-sm text-text-secondary leading-relaxed">{test.whyImportant}</p>
                </div>
              </div>
            </div>

            {/* Who should take it */}
            <div>
              <h2 className="font-heading font-semibold text-lg text-text-primary mb-4">Who Should Take This Test?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {test.whoShouldTake.map((who, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-surface-soft rounded-xl p-3">
                    <Check size={15} className="text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-text-secondary">{who}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation */}
            <div>
              <h2 className="font-heading font-semibold text-lg text-text-primary mb-4">
                Preparation Instructions
              </h2>
              <div className="bg-white border border-surface-border rounded-2xl overflow-hidden">
                {test.preparation.map((prep, i) => (
                  <div key={i} className={`flex items-start gap-3 p-4 ${i !== 0 ? "border-t border-surface-border" : ""}`}>
                    <div className="w-6 h-6 rounded-full bg-brand-blue text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{prep}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Parameters */}
            <div>
              <h2 className="font-heading font-semibold text-lg text-text-primary mb-4">
                {test.parameterCount} Parameters Included
              </h2>
              <div className="bg-white border border-surface-border rounded-2xl overflow-hidden">
                <div className="grid grid-cols-3 bg-surface-soft px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  <span>Parameter</span>
                  <span>Unit</span>
                  <span>Normal Range</span>
                </div>
                {test.parameters.map((param, i) => (
                  <div key={i} className={`grid grid-cols-3 px-4 py-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-surface-soft/50"} ${i !== 0 ? "border-t border-surface-border" : ""}`}>
                    <span className="font-medium text-text-primary">{param.name}</span>
                    <span className="text-text-muted">{param.unit || "—"}</span>
                    <span className="text-text-secondary text-xs">{param.normalRange || "—"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lab details */}
            <div className="bg-white border border-surface-border rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <FileText size={20} className="text-brand-blue flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-text-primary mb-1.5">Lab & Process Details</h2>
                  <p className="text-sm text-text-secondary leading-relaxed">{test.labDetails}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {["NABL Accredited", "ISO 15189", "Doctor Verified", "AI-Assisted"].map((b) => (
                      <span key={b} className="text-xs bg-brand-teal-pale text-brand-teal border border-brand-teal/20 rounded-full px-3 py-1 font-medium">
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            {test.faqs.length > 0 && (
              <div>
                <h2 className="font-heading font-semibold text-lg text-text-primary mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {test.faqs.map((faq, i) => (
                    <details key={i} className="bg-white border border-surface-border rounded-2xl group">
                      <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                        <span className="font-medium text-text-primary text-sm">{faq.question}</span>
                        <ChevronDown size={16} className="text-text-muted group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                      </summary>
                      <div className="px-4 pb-4 -mt-1">
                        <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Related tests */}
            {related.length > 0 && (
              <div>
                <h2 className="font-heading font-semibold text-lg text-text-primary mb-4">
                  Related Tests
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {related.slice(0, 3).map((t) => (
                    <TestCard key={t.id} test={t} compact />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky booking sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-surface-border shadow-card p-6 sticky top-20">
              <h2 className="font-heading font-bold text-xl text-text-primary mb-1">{test.name}</h2>
              <p className="text-xs text-text-muted mb-4">{test.sampleType} · {test.parameterCount} parameters</p>

              {/* Price */}
              <div className="flex items-end gap-3 mb-2">
                <span className="font-heading font-bold text-3xl text-brand-blue">
                  {formatPrice(test.price)}
                </span>
                <DiscountBadge percent={test.discountPercent} />
              </div>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-sm text-text-muted line-through">{formatPrice(test.originalPrice)}</span>
                <span className="text-sm font-semibold text-brand-green">You save {formatPrice(savings)}</span>
              </div>

              {/* Quick facts */}
              <div className="space-y-3 mb-5 py-4 border-y border-surface-border">
                {[
                  { icon: Clock, label: "Report Time", value: test.reportTime },
                  { icon: Home, label: "Home Collection", value: "Available" },
                  { icon: test.fasting ? AlertCircle : Check, label: "Fasting", value: test.fasting ? `Required (${test.fastingHours}h)` : "Not Required" },
                  { icon: Droplets, label: "Sample Type", value: test.sampleType },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-text-muted">
                      <Icon size={14} />
                      <span>{label}</span>
                    </div>
                    <span className="font-medium text-text-primary text-right">{value}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <Button variant="secondary" fullWidth size="lg" leftIcon={<ShoppingCart size={16} />}>
                  Add to Cart
                </Button>
                <Button variant="primary" fullWidth size="lg">
                  Book Now
                </Button>
              </div>

              {/* Trust notes */}
              <div className="mt-4 space-y-1.5">
                {[
                  "Free home collection above ₹499",
                  "No hidden charges",
                  "NABL-certified lab results",
                  "Doctor-reviewed reports",
                ].map((note) => (
                  <p key={note} className="flex items-center gap-2 text-xs text-text-muted">
                    <Check size={12} className="text-brand-green flex-shrink-0" />
                    {note}
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-16 left-0 right-0 z-30 lg:hidden bg-white border-t border-surface-border px-4 py-3 flex items-center gap-3 shadow-modal pb-safe">
        <div className="flex-1">
          <p className="font-heading font-bold text-xl text-brand-blue">{formatPrice(test.price)}</p>
          <p className="text-xs text-brand-green font-medium">{test.discountPercent}% off · {test.reportTime}</p>
        </div>
        <Button variant="secondary" size="md" leftIcon={<ShoppingCart size={16} />}>
          Add
        </Button>
        <Button variant="primary" size="md">
          Book Now
        </Button>
      </div>
    </>
  );
}
