import db from "@/lib/db";
import { PACKAGES } from "@/data/packages";
import { Package } from "@/types";

export class PackageService {
  /**
   * Fetch all active checkup packages.
   */
  static async getAllPackages(): Promise<Package[]> {
    try {
      const dbPackages = await db.checkupPackage.findMany({
        where: { active: true },
        include: {
          items: {
            include: { test: true }
          },
          faqs: true,
        },
        orderBy: { popular: "desc" },
      });

      if (dbPackages.length === 0) return PACKAGES;

      return dbPackages.map((p) => this.mapDbPackageToType(p));
    } catch (error) {
      console.error("Failed to fetch packages from DB, falling back:", error);
      return PACKAGES;
    }
  }

  /**
   * Fetch a single package by slug.
   */
  static async getPackageBySlug(slug: string): Promise<Package | null> {
    try {
      const dbPackage = await db.checkupPackage.findUnique({
        where: { slug },
        include: {
          items: {
            include: { test: true }
          },
          faqs: true,
        },
      });

      if (!dbPackage) {
        return PACKAGES.find((p) => p.slug === slug) || null;
      }

      return this.mapDbPackageToType(dbPackage);
    } catch (error) {
      console.error(`Failed to fetch package ${slug} from DB, falling back:`, error);
      return PACKAGES.find((p) => p.slug === slug) || null;
    }
  }

  private static mapDbPackageToType(p: any): Package {
    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      price: p.price,
      originalPrice: p.originalPrice,
      discountPercent: p.discountPercent,
      reportTime: p.reportTime,
      homeCollection: p.homeCollection,
      fasting: p.fasting,
      fastingHours: p.fastingHours || undefined,
      parameterCount: p.parameterCount,
      testCount: p.testCount,
      includedTests: p.items.map((i: any) => i.test?.name || i.label || ""),
      parameterGroups: [], // This can be expanded with more logic if needed
      gender: p.gender.toLowerCase() as any,
      ageGroup: p.ageGroup || "Any",
      purpose: p.purpose,
      popular: p.popular,
      recommended: p.recommended,
      membershipEligible: p.membershipEligible,
      preparation: p.preparation,
      frequency: p.frequency || "Once a year",
      faqs: p.faqs.map((f: any) => ({
        question: f.question,
        answer: f.answer,
        category: f.category,
      })),
    };
  }
}
