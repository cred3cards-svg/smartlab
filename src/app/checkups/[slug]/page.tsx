import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ChevronRight, 
  Clock, 
  Home, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Stethoscope,
  Share2,
  Bookmark,
  Calendar,
  FileText,
  Activity,
  Users,
  Award,
  ChevronDown,
  ArrowRight,
  Zap,
  MapPin,
  Phone,
  Microscope
} from "lucide-react";
import { getPackageBySlug as getStaticPackageBySlug, PACKAGES } from "@/data/packages";
import { PackageService } from "@/services/package.service";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { DiscountBadge, FastingBadge } from "@/components/ui/Badge";
import PackageCard from "@/components/cards/PackageCard";
import { CONTACT, BRAND } from "@/lib/constants";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await PackageService.getPackageBySlug(slug);
  if (!pkg) return { title: "Package Not Found" };

  return {
    title: `${pkg.name} — Health Checkup at ₹${pkg.price} | ${BRAND.name}`,
    description: `${pkg.tagline}. Covers ${pkg.testCount} tests and ${pkg.parameterCount} parameters. NABL certified home collection in Kolkata.`,
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = await PackageService.getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  const relatedPackages = PACKAGES
    .filter((p) => p.slug !== pkg.slug && p.gender === pkg.gender)
    .slice(0, 2);

  return (
    <div className="bg-surface-soft min-h-screen pb-20">
      {/* Top Breadcrumb & Mobile Header */}
      <div className="bg-white border-b border-surface-border sticky top-16 z-30 md:relative md:top-0">
        <div className="container-site py-3 flex items-center justify-between">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-text-muted overflow-hidden whitespace-nowrap">
            <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
            <ChevronRight size={13} className="flex-shrink-0" />
            <Link href="/checkups" className="hover:text-brand-teal transition-colors">Checkups</Link>
            <ChevronRight size={13} className="flex-shrink-0" />
            <span className="text-text-primary font-medium truncate">{pkg.name}</span>
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
            <div className="bg-white rounded-3xl border border-surface-border p-6 md:p-8 shadow-sm relative overflow-hidden">
               {/* Accent Gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal-pale text-brand-teal text-[10px] font-bold uppercase tracking-wider">
                      <Activity size={12} />
                      Health Package
                    </div>
                    {pkg.recommended && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-wider">
                        <Award size={12} />
                        Recommended
                      </div>
                    )}
                  </div>
                  <h1 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-text-primary leading-tight">
                    {pkg.name}
                  </h1>
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl">
                    {pkg.tagline}
                  </p>
                  
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 pt-2">
                    <div className="bg-surface-soft rounded-2xl p-4 flex flex-col items-center justify-center min-w-[120px] border border-surface-border">
                      <p className="text-2xl font-bold text-brand-blue">{pkg.parameterCount}</p>
                      <p className="text-[10px] text-text-muted uppercase font-bold tracking-tight">Parameters</p>
                    </div>
                    <div className="bg-surface-soft rounded-2xl p-4 flex flex-col items-center justify-center min-w-[120px] border border-surface-border">
                      <p className="text-2xl font-bold text-brand-blue">{pkg.testCount}</p>
                      <p className="text-[10px] text-text-muted uppercase font-bold tracking-tight">Tests Included</p>
                    </div>
                    <div className="hidden sm:flex bg-surface-soft rounded-2xl p-4 flex-col items-center justify-center min-w-[120px] border border-surface-border">
                      <p className="text-base font-bold text-brand-teal">{pkg.reportTime}</p>
                      <p className="text-[10px] text-text-muted uppercase font-bold tracking-tight">Report ETA</p>
                    </div>
                    <div className="hidden sm:flex bg-surface-soft rounded-2xl p-4 flex-col items-center justify-center min-w-[120px] border border-surface-border">
                      <Users size={18} className="text-brand-blue mb-1" />
                      <p className="text-[10px] text-text-muted uppercase font-bold tracking-tight">{pkg.gender === 'all' ? 'Unisex' : pkg.gender}</p>
                    </div>
                  </div>
                </div>
                
                {/* Desktop Price block */}
                <div className="hidden md:block w-72 bg-surface-soft rounded-2xl p-6 border border-surface-border sticky top-0">
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-2">Package Value</p>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl font-heading font-bold text-brand-blue">{formatPrice(pkg.price)}</span>
                    <DiscountBadge percent={pkg.discountPercent} size="lg" />
                  </div>
                  <p className="text-sm text-text-muted line-through mb-4">MRP {formatPrice(pkg.originalPrice)}</p>
                  
                  <div className="bg-green-100/50 text-green-700 text-xs font-bold px-3 py-2 rounded-xl mb-4 text-center">
                    💰 You Save {formatPrice(pkg.originalPrice - pkg.price)}
                  </div>

                  <Button fullWidth size="lg" className="shadow-blue">Book This Package</Button>
                  
                  {pkg.membershipEligible && (
                    <div className="mt-4 p-3 rounded-xl bg-brand-teal/5 border border-brand-teal/10">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-brand-teal uppercase mb-1">
                        <Zap size={10} fill="currentColor" /> SMARTPASS247 Exclusive
                      </div>
                      <p className="text-[11px] text-text-secondary">Save an extra 20% + Free Collection with membership.</p>
                      <button className="text-[11px] text-brand-teal font-bold hover:underline mt-1">Upgrade & Save →</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Included Tests Accordion */}
            <section id="tests-included" className="bg-white rounded-3xl border border-surface-border overflow-hidden">
               <div className="p-6 md:p-8 border-b border-surface-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-teal-pale text-brand-teal flex items-center justify-center">
                    <FileText size={22} />
                  </div>
                  <h2 className="font-heading font-bold text-xl text-text-primary">What&apos;s Included in this Package?</h2>
                </div>
              </div>

              <div className="divide-y divide-surface-border">
                {pkg.parameterGroups.map((group, i) => (
                   <div key={i} className="group">
                    <button className="w-full px-6 md:px-8 py-5 flex items-center justify-between hover:bg-surface-soft transition-colors outline-none">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-brand-blue-pale text-brand-blue flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </div>
                        <span className="font-bold text-text-primary text-base">{group.groupName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="hidden sm:block text-xs text-text-muted font-medium bg-surface-soft px-2 py-1 rounded-lg">
                          {group.params.length} Markers
                        </span>
                        <ChevronDown size={20} className="text-text-muted transition-transform group-open:rotate-180" />
                      </div>
                    </button>
                    <div className="px-6 md:px-8 pb-5 pt-0">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
                        {group.params.map((param, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-text-secondary">
                            <CheckCircle2 size={14} className="text-brand-teal flex-shrink-0" />
                            {param}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-surface-soft text-center border-t border-surface-border">
                <p className="text-xs text-text-muted font-medium">
                  Missing something? <Link href="/tests" className="text-brand-teal font-bold hover:underline">Browse individual tests</Link> to add to your cart.
                </p>
              </div>
            </section>

             {/* Preparation Section */}
             <section className="bg-white rounded-3xl border border-surface-border p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <AlertCircle size={22} />
                </div>
                <h2 className="font-heading font-bold text-xl text-text-primary">Patient Fasting & Preparation</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {pkg.fasting && (
                    <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100">
                      <div className="flex items-center gap-2 mb-2 text-orange-700 font-bold text-sm">
                        <Clock size={18} />
                        10-12 Hours Fasting Required
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Do not consume any food or drinks except plain water for 10-12 hours prior to the test. Avoid coffee, tea, and tobacco.
                      </p>
                    </div>
                  )}
                  <div className="p-4 rounded-2xl bg-brand-blue-pale border border-brand-blue/10">
                    <div className="flex items-center gap-2 mb-2 text-brand-blue font-bold text-sm">
                      <Stethoscope size={18} />
                      Frequency Recommendation
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Recommended to be taken <span className="font-bold">{pkg.frequency}</span> for optimal preventive health monitoring.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                   <h3 className="font-bold text-sm text-text-primary uppercase tracking-wider">Guidelines:</h3>
                   <ul className="space-y-3">
                    {pkg.preparation.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-text-secondary border-b border-surface-border pb-2 last:border-0">
                        <div className="w-5 h-5 rounded-full bg-brand-teal text-white flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        {item}
                      </li>
                    ))}
                   </ul>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Action Box Mobile */}
            <div className="bg-white rounded-3xl border border-surface-border p-6 shadow-sm md:hidden">
               <div className="flex items-center justify-between mb-4">
                  <div>
                     <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Total Price</p>
                     <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-brand-blue">{formatPrice(pkg.price)}</span>
                        <DiscountBadge percent={pkg.discountPercent} />
                     </div>
                  </div>
                  <Button size="lg" className="px-8 shadow-blue">Book Now</Button>
               </div>
            </div>

            {/* Membership Box */}
             <div className="bg-gradient-to-br from-brand-blue to-[#0F5280] rounded-3xl p-6 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded-lg bg-white/10 text-white text-[10px] font-bold uppercase mb-4">
                  ⭐ Flagship Membership
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 italic">SMARTPASS247</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6 italic">
                  Save an extra 20% on this package and every other test for a whole year.
                </p>
                <Link href="/smartpass247">
                  <Button fullWidth variant="secondary" rightIcon={<ArrowRight size={16} />}>
                    Explore Benefits
                  </Button>
                </Link>
              </div>
            </div>

            {/* Trust sidebar elements */}
            <div className="bg-white rounded-3xl border border-surface-border p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-brand-teal">
                  <ShieldCheck size={20} />
                  <span className="font-bold text-sm uppercase tracking-wider">Quality Guarantee</span>
                </div>
                
                <div className="space-y-4">
                   <div className="flex items-start gap-3">
                      <div className="bg-surface-soft p-2 rounded-lg">
                         <Microscope size={18} className="text-brand-blue" />
                      </div>
                      <div>
                         <p className="text-sm font-bold text-text-primary">NABL Labs</p>
                         <p className="text-xs text-text-muted">Certified diagnostic centers</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-3">
                      <div className="bg-surface-soft p-2 rounded-lg">
                         <Users size={18} className="text-brand-blue" />
                      </div>
                      <div>
                         <p className="text-sm font-bold text-text-primary">Skilled Phlebotomists</p>
                         <p className="text-xs text-text-muted">Gentle collection specialists</p>
                      </div>
                   </div>
                </div>

                <div className="mt-8 pt-6 border-t border-surface-border">
                   <p className="text-xs text-text-muted mb-2 font-medium">Have questions about this checkup?</p>
                   <Link href={`tel:${CONTACT.phone}`} className="text-brand-teal font-bold hover:underline flex items-center gap-2">
                       <Phone size={14} /> Talk to our Doctors →
                   </Link>
                </div>
            </div>

            {/* Related Packages */}
            {relatedPackages.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-lg text-text-primary ml-2 uppercase tracking-tight text-xs text-text-muted">You might also Need</h3>
                <div className="space-y-4">
                  {relatedPackages.map((rp) => (
                    <PackageCard key={rp.id} pkg={rp} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
