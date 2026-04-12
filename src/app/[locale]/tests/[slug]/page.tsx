import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ChevronRight, 
  Clock, 
  Home, 
  FlaskConical, 
  ShieldCheck, 
  Info, 
  CheckCircle2, 
  AlertCircle,
  Stethoscope,
  ArrowLeft,
  Share2,
  Bookmark,
  Calendar,
  Microscope,
  FileText,
  MapPin,
  Phone
} from "lucide-react";
import { getTestBySlug, TESTS } from "@/data/tests";
import { TestService } from "@/services/test.service";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { DiscountBadge, FastingBadge } from "@/components/ui/Badge";
import TestCard from "@/components/cards/TestCard";
import { CONTACT, BRAND, PRICING, ADDRESS } from "@/lib/constants";
import Script from "next/script";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const test = await TestService.getTestBySlug(slug);
  if (!test) return { title: "Test Not Found" };

  return {
    title: `${test.name} — Book Online at ₹${test.price} | ${BRAND.name}`,
    description: `${test.shortDescription}. Reports in ${test.reportTime}. Home collection available in Kolkata. ${test.parameterCount} parameters included.`,
  };
}

export default async function TestDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const test = await TestService.getTestBySlug(slug);

  if (!test) {
    notFound();
  }

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": test.name,
    "description": test.shortDescription,
    "brand": {
      "@type": "Brand",
      "name": BRAND.name
    },
    "offers": {
      "@type": "Offer",
      "url": `https://smartlab247.com/tests/${test.slug}`,
      "priceCurrency": "INR",
      "price": test.price,
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "areaServed": "Kolkata"
    }
  };

  const relatedTests = test.relatedTests
    .map((slug) => getTestBySlug(slug))
    .filter((t): t is any => !!t)
    .slice(0, 3);

  return (
    <div className="bg-surface-soft min-h-screen pb-20">
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* Top Breadcrumb & Mobile Header */}
      <div className="bg-white border-b border-surface-border sticky top-16 z-30 md:relative md:top-0">
        <div className="container-site py-3 flex items-center justify-between">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-text-muted overflow-hidden whitespace-nowrap">
            <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
            <ChevronRight size={13} className="flex-shrink-0" />
            <Link href="/tests" className="hover:text-brand-teal transition-colors">Tests</Link>
            <ChevronRight size={13} className="flex-shrink-0" />
            <span className="text-text-primary font-medium truncate">{test.name}</span>
          </nav>
          <div className="flex items-center gap-3">
            <button className="p-2 text-text-muted hover:text-brand-teal hover:bg-surface-soft rounded-lg transition-colors">
              <Share2 size={18} />
            </button>
            <button className="p-2 text-text-muted hover:text-brand-teal hover:bg-surface-soft rounded-lg transition-colors">
              <Bookmark size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="container-site py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Main Header Card */}
            <div className="bg-white rounded-3xl border border-surface-border p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal-pale text-brand-teal text-xs font-bold uppercase tracking-wider">
                    <Microscope size={12} />
                    Pathology Test
                  </div>
                  <h1 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-text-primary leading-tight">
                    {test.name}
                  </h1>
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl">
                    {test.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <div className="w-8 h-8 rounded-lg bg-surface-soft flex items-center justify-center text-brand-teal">
                        <Clock size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] text-text-muted uppercase font-bold leading-none mb-1">Reports in</p>
                        <p className="font-semibold">{test.reportTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <div className="w-8 h-8 rounded-lg bg-surface-soft flex items-center justify-center text-brand-teal">
                        <Home size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] text-text-muted uppercase font-bold leading-none mb-1">Collection</p>
                        <p className="font-semibold">{test.homeCollection ? "Available at Home" : "Lab Visit Only"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <div className="w-8 h-8 rounded-lg bg-surface-soft flex items-center justify-center text-brand-teal">
                        <FileText size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] text-text-muted uppercase font-bold leading-none mb-1">Sample</p>
                        <p className="font-semibold">{test.sampleType}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Price block for desktop inside main card */}
                <div className="hidden md:block w-full md:w-auto bg-surface-soft rounded-2xl p-6 border border-surface-border text-center md:text-left">
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-2">Our Price</p>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl font-heading font-bold text-brand-blue">{formatPrice(test.price)}</span>
                    <DiscountBadge percent={test.discountPercent} size="lg" />
                  </div>
                  <p className="text-sm text-text-muted line-through mb-4">MRP {formatPrice(test.originalPrice)}</p>
                  <Button fullWidth size="lg">Add to Cart</Button>
                  <p className="text-[10px] text-text-muted mt-3 text-center">
                    <ShieldCheck size={10} className="inline mr-1" /> Verified & Secure Booking
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs (Anchor Links) */}
            <div className="bg-white rounded-2xl border border-surface-border p-1 sticky top-[105px] z-20 shadow-sm hidden md:flex">
              {['Parameters', 'Preparation', 'About Test', 'FAQs'].map((tab) => (
                <a 
                  key={tab} 
                  href={`#${tab.toLowerCase().replace(' ', '-')}`}
                  className="flex-1 py-2.5 text-center text-sm font-semibold text-text-secondary hover:text-brand-teal hover:bg-surface-soft rounded-xl transition-all"
                >
                  {tab}
                </a>
              ))}
            </div>

            {/* Preparation Instructions */}
            <section id="preparation" className="bg-white rounded-3xl border border-surface-border p-6 md:p-8 scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <AlertCircle size={22} />
                </div>
                <h2 className="font-heading font-bold text-xl text-text-primary">Preparation Instructions</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border ${test.fasting ? "bg-orange-50 border-orange-100" : "bg-green-50 border-green-100"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={18} className={test.fasting ? "text-orange-600" : "text-green-600"} />
                    <span className={`font-bold text-sm ${test.fasting ? "text-orange-700" : "text-green-700"}`}>
                      {test.fasting ? "Fasting Required" : "No Fasting Required"}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    {test.fasting 
                      ? `Do not eat or drink anything (except water) for at least ${test.fastingHours} hours before the sample collection.` 
                      : "You can take this test at any time of the day without any specific fasting requirement."}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border bg-brand-blue-pale border-brand-blue/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Info size={18} className="text-brand-blue" />
                    <span className="font-bold text-sm text-brand-blue">Hydration</span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Stay well-hydrated. Drink a normal amount of water before the test, as it helps in clearer blood sample collection.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <h3 className="font-bold text-sm text-text-primary uppercase tracking-wider">Guidelines:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  {test.preparation.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                      <CheckCircle2 size={16} className="text-brand-teal flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Parameters Table */}
            <section id="parameters" className="bg-white rounded-3xl border border-surface-border p-6 md:p-8 scroll-mt-32">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-teal-pale text-brand-teal flex items-center justify-center">
                    <FlaskConical size={22} />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-xl text-text-primary">Parameters Included</h2>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-wide">Total {test.parameterCount} Marker(s)</p>
                  </div>
                </div>
              </div>
              
              <div className="overflow-hidden border border-surface-border rounded-2xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-soft border-bottom border-surface-border">
                      <th className="px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Parameter Name</th>
                      <th className="px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Normal Range</th>
                      <th className="px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Unit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border">
                    {test.parameters.map((param, i) => (
                      <tr key={i} className="hover:bg-brand-teal-pale/30 transition-colors">
                        <td className="px-4 py-3.5 text-sm font-semibold text-text-primary">{param.name}</td>
                        <td className="px-4 py-3.5 text-sm text-text-secondary font-mono">{param.normalRange || "N/A"}</td>
                        <td className="px-4 py-3.5 text-sm text-text-muted">{param.unit || "-"}</td>
                      </tr>
                    ))}
                    {test.parameterCount > test.parameters.length && (
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-center bg-surface-soft text-xs text-text-muted italic">
                          + {test.parameterCount - test.parameters.length} additional internal markers
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Medical Context (Why it matters) */}
            <section id="about-test" className="bg-white rounded-3xl border border-surface-border p-6 md:p-8 scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-blue-pale text-brand-blue flex items-center justify-center">
                  <Stethoscope size={22} />
                </div>
                <h2 className="font-heading font-bold text-xl text-text-primary">Clinical Significance</h2>
              </div>
              
              <div className="prose prose-sm text-text-secondary max-w-none space-y-4">
                <p className="font-medium text-text-primary text-base leading-relaxed">
                  {test.whyImportant}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-surface-soft rounded-2xl p-5 border-l-4 border-brand-teal">
                    <h4 className="font-bold text-brand-teal text-sm uppercase tracking-wider mb-2">Who should take this?</h4>
                    <ul className="space-y-2">
                      {test.whoShouldTake.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-surface-soft rounded-2xl p-5 border-l-4 border-brand-blue">
                    <h4 className="font-bold text-brand-blue text-sm uppercase tracking-wider mb-2">Lab Technology</h4>
                    <p className="text-sm">{test.labDetails}</p>
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-text-muted font-bold">
                      <ShieldCheck size={14} className="text-brand-teal" />
                      NABL ACCREDITED PROCESS
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar / Floating Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Trust Sidebar Box */}
            <div className="bg-white rounded-3xl border border-surface-border p-6 shadow-sm sticky top-28">
              <h3 className="font-heading font-bold text-lg text-text-primary mb-5">Service Highlights</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-teal-pale text-brand-teal flex items-center justify-center flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-text-primary leading-none mb-1">Fastest Turnaround</h4>
                    <p className="text-xs text-text-secondary">Reports typically ready in 6-8 hours for routine tests.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue-pale text-brand-blue flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-text-primary leading-none mb-1">Serving All Kolkata</h4>
                    <p className="text-xs text-text-secondary">Salt Lake, New Town, Park St, Behala, Dum Dum & more.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-teal-pale text-brand-teal flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-text-primary leading-none mb-1">NABL Certified</h4>
                    <p className="text-xs text-text-secondary">Quality-controlled labs with qualified pathologists.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-surface-border">
                <p className="text-xs text-text-muted mb-4 italic">Need help with booking? Call us:</p>
                <Link 
                  href={`tel:${CONTACT.phone}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-surface-soft hover:bg-brand-blue-pale text-brand-blue font-bold text-sm transition-all"
                >
                  <Phone size={16} />
                  {CONTACT.phone_display}
                </Link>
              </div>
            </div>

            {/* Related Tests Section */}
            {relatedTests.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-lg text-text-primary ml-2">Related Tests</h3>
                <div className="space-y-4">
                  {relatedTests.map((rt) => (
                    <TestCard key={rt.id} test={rt} compact />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Floating Footer CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-surface-border p-4 shadow-2xl flex items-center justify-between animate-in slide-in-from-bottom duration-300">
        <div className="flex flex-col">
          <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Book {test.name}</span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-brand-blue">{formatPrice(test.price)}</span>
            <DiscountBadge percent={test.discountPercent} size="sm" />
          </div>
        </div>
        <Button size="lg" className="px-8 shadow-teal">Add to Cart</Button>
      </div>

    </div>
  );
}
