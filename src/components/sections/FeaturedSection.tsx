import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { POPULAR_TESTS } from "@/data/tests";
import { POPULAR_PACKAGES } from "@/data/packages";
import TestCard from "@/components/cards/TestCard";
import PackageCard from "@/components/cards/PackageCard";

export default function FeaturedSection() {
  return (
    <>
      {/* Popular Tests */}
      <section className="section bg-white" aria-labelledby="popular-tests-heading">
        <div className="container-site">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-brand-teal text-sm font-semibold mb-1 uppercase tracking-wider">Most Booked</p>
              <h2 id="popular-tests-heading" className="font-heading font-bold text-2xl text-text-primary">
                Popular Lab Tests
              </h2>
              <p className="text-text-muted text-sm mt-1">Trusted by 2 lakh+ patients — results in hours</p>
            </div>
            <Link
              href="/tests"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-brand-teal hover:text-brand-teal-dark transition-colors"
            >
              View All Tests <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {POPULAR_TESTS.slice(0, 5).map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link href="/tests" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-teal">
              View All Tests <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="section bg-surface-soft" aria-labelledby="popular-packages-heading">
        <div className="container-site">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-brand-teal text-sm font-semibold mb-1 uppercase tracking-wider">Best Value</p>
              <h2 id="popular-packages-heading" className="font-heading font-bold text-2xl text-text-primary">
                Health Checkup Packages
              </h2>
              <p className="text-text-muted text-sm mt-1">Save more with curated diagnostic packages</p>
            </div>
            <Link
              href="/checkups"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-brand-teal hover:text-brand-teal-dark transition-colors"
            >
              View All Packages <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_PACKAGES.slice(0, 3).map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} featured={i === 1} />
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link href="/checkups" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-teal">
              View All Packages <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
