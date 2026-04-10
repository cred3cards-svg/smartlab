import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight, Clock, Home, Check, ShoppingCart,
  AlertCircle, ChevronDown, Star, Users, RotateCcw, Calendar
} from "lucide-react";
import { getPackageBySlug, PACKAGES } from "@/data/packages";
import { formatPrice } from "@/lib/utils";
import { DiscountBadge, FastingBadge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import PackageCard from "@/components/cards/PackageCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PACKAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return { title: "Package Not Found" };
  return {
    title: `${pkg.name} — ${pkg.parameterCount} Parameters | Book at ₹${pkg.price}`,
    description: `${pkg.tagline}. ${pkg.parameterCount} parameters, ${pkg.testCount} tests. Home collection. Reports in ${pkg.reportTime}. Book online at ${pkg.discountPercent}% off.`,
  };
}

export default async function CheckupDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const savings = pkg.originalPrice - pkg.price;
  const related = PACKAGES.filter((p) => p.slug !== pkg.slug).slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-surface-soft border-b border-surface-border">
        <div className="container-site py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-text-muted">
            <Link href="/" className="hover:text-brand-teal">Home</Link>
            <ChevronRight size={13} />
            <Link href="/checkups" className="hover:text-brand-teal">Checkups</Link>
            <ChevronRight size={13} />
            <span className="text-text-primary font-medium truncate">{pkg.name}</span>
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
                {pkg.recommended && <span className="badge-popular">⭐ Recommended</span>}
                {pkg.popular && <span className="badge-popular">🔥 Most Booked</span>}
                <DiscountBadge percent={pkg.discountPercent} />
                <FastingBadge required={pkg.fasting} hours={pkg.fastingHours} />
                {pkg.membershipEligible && (
                  <span className="flex items-center gap-1 text-xs bg-brand-teal-pale text-brand-teal border border-brand-teal/20 rounded-full px-2 py-0.5 font-semibold">
                    <Star size={11} fill="currentColor" /> SMARTPASS247 Eligible
                  </span>
                )}
              </div>

              <h1 className="font-heading font-bold text-2xl md:text-3xl text-text-primary mb-2">{pkg.name}</h1>
              <p className="text-text-secondary text-base leading-relaxed">{pkg.tagline}</p>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                {[
                  { icon: Star, value: `${pkg.parameterCount}+`, label: "Parameters", color: "text-brand-teal" },
                  { icon: Clock, value: pkg.reportTime, label: "Report Time", color: "text-brand-blue" },
                  { icon: Home, value: "Home", label: "Collection", color: "text-brand-green" },
                  { icon: Users, value: pkg.gender === "all" ? "Everyone" : pkg.gender === "male" ? "Men" : "Women", label: "Recommended for", color: "text-purple-600" },
                ].map(({ icon: Icon, value, label, color }) => (
                  <div key={label} className="bg-surface-soft rounded-xl p-3 text-center">
                    <Icon size={18} className={`${color} mx-auto mb-1.5`} />
                    <p className={`font-bold text-base ${color}`}>{value}</p>
                    <p className="text-xs text-text-muted">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Savings callout */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <div className="flex items-center gap-3 flex-wrap">
                <div>
                  <p className="font-bold text-green-800 text-lg">You save {formatPrice(savings)}</p>
                  <p className="text-green-600 text-sm">vs. individual test pricing at our regular rates</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-2xl font-bold text-green-800">{pkg.discountPercent}% OFF</p>
                  <p className="text-xs text-green-600">Limited time offer</p>
                </div>
              </div>
            </div>

            {/* Preparation */}
            <div>
              <h2 className="font-heading font-semibold text-lg text-text-primary mb-4">
                <AlertCircle size={18} className="inline text-brand-teal mr-2" />
                Preparation Instructions
              </h2>
              <div className="bg-white border border-surface-border rounded-2xl divide-y divide-surface-border">
                {pkg.preparation.map((prep, i) => (
                  <div key={i} className="flex items-start gap-3 p-4">
                    <div className="w-6 h-6 rounded-full bg-brand-blue text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{prep}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Parameter groups */}
            <div>
              <h2 className="font-heading font-semibold text-lg text-text-primary mb-4">
                What&apos;s Included — {pkg.parameterCount} Parameters across {pkg.testCount} Tests
              </h2>
              <div className="space-y-3">
                {pkg.parameterGroups.map((group, i) => (
                  <details key={i} className="bg-white border border-surface-border rounded-2xl group" open={i === 0}>
                    <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-teal-pale flex items-center justify-center text-brand-teal font-bold text-sm">
                          {group.params.length}
                        </div>
                        <span className="font-semibold text-text-primary text-sm">{group.groupName}</span>
                      </div>
                      <ChevronDown size={16} className="text-text-muted group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    <div className="px-4 pb-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {group.params.map((param) => (
                          <div key={param} className="flex items-center gap-2 text-sm text-text-secondary">
                            <Check size={13} className="text-brand-green flex-shrink-0" />
                            {param}
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Who & Frequency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <h3 className="font-semibold text-brand-blue mb-3 flex items-center gap-2">
                  <Users size={16} /> Who Should Take This?
                </h3>
                <ul className="space-y-2">
                  {pkg.purpose.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-blue-800">
                      <Check size={13} className="text-brand-green flex-shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">
                <h3 className="font-semibold text-purple-700 mb-3 flex items-center gap-2">
                  <RotateCcw size={16} /> How Often?
                </h3>
                <p className="text-sm text-purple-800 leading-relaxed">{pkg.frequency}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-purple-600 bg-purple-100 rounded-xl px-3 py-2">
                  <Calendar size={13} />
                  <span>SMARTPASS247 members get annual reminders</span>
                </div>
              </div>
            </div>

            {/* FAQs */}
            {pkg.faqs.length > 0 && (
              <div>
                <h2 className="font-heading font-semibold text-lg text-text-primary mb-4">FAQs</h2>
                <div className="space-y-3">
                  {pkg.faqs.map((faq, i) => (
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

            {/* Related */}
            {related.length > 0 && (
              <div>
                <h2 className="font-heading font-semibold text-lg text-text-primary mb-4">
                  Other Packages You Might Like
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {related.map((p) => (
                    <PackageCard key={p.id} pkg={p} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-surface-border shadow-card p-6 sticky top-20">
              <h2 className="font-heading font-bold text-lg text-text-primary mb-1">{pkg.name}</h2>
              <p className="text-xs text-text-muted mb-4">{pkg.parameterCount} parameters · {pkg.testCount} tests · {pkg.gender === "all" ? "For everyone" : `For ${pkg.gender === "male" ? "men" : "women"}`}</p>

              <div className="flex items-end gap-3 mb-2">
                <span className="font-heading font-bold text-3xl text-brand-blue">{formatPrice(pkg.price)}</span>
                <DiscountBadge percent={pkg.discountPercent} />
              </div>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-sm text-text-muted line-through">{formatPrice(pkg.originalPrice)}</span>
                <span className="text-sm font-semibold text-brand-green">Save {formatPrice(savings)}</span>
              </div>

              <div className="space-y-2.5 mb-5 py-4 border-y border-surface-border">
                {[
                  { icon: Clock, label: "Report Time", value: pkg.reportTime },
                  { icon: Home, label: "Home Collection", value: "Available" },
                  { icon: FastingBadge, label: "Fasting", value: pkg.fasting ? `${pkg.fastingHours}h required` : "Not required" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">{label}</span>
                    <span className="font-medium text-text-primary">{value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Button variant="secondary" fullWidth size="lg" leftIcon={<ShoppingCart size={16} />}>
                  Add to Cart
                </Button>
                <Button variant="primary" fullWidth size="lg">
                  Book Now
                </Button>
              </div>

              {pkg.membershipEligible && (
                <div className="mt-4 bg-brand-teal-pale border border-brand-teal/20 rounded-xl p-3 text-center">
                  <p className="text-xs font-semibold text-brand-teal">
                    <Star size={12} className="inline mr-1" />
                    SMARTPASS247 members save an extra 20–25%
                  </p>
                  <Link href="/smartpass247" className="text-xs text-brand-teal underline">Get membership →</Link>
                </div>
              )}

              <div className="mt-4 space-y-1.5">
                {["Free home collection above ₹499", "No hidden charges", "NABL-certified lab"].map((n) => (
                  <p key={n} className="flex items-center gap-2 text-xs text-text-muted">
                    <Check size={12} className="text-brand-green flex-shrink-0" />
                    {n}
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-16 left-0 right-0 z-30 lg:hidden bg-white border-t border-surface-border px-4 py-3 flex items-center gap-3 shadow-modal pb-safe">
        <div className="flex-1">
          <p className="font-heading font-bold text-xl text-brand-blue">{formatPrice(pkg.price)}</p>
          <p className="text-xs text-brand-green font-medium">{pkg.discountPercent}% off · {pkg.reportTime}</p>
        </div>
        <Button variant="secondary" size="md"><ShoppingCart size={16} /></Button>
        <Button variant="primary" size="md">Book Now</Button>
      </div>
    </>
  );
}
