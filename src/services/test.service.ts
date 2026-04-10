import db from "@/lib/db";
import { TESTS } from "@/data/tests";
import { Test } from "@/types";

export class TestService {
  /**
   * Fetch all active tests from the database.
   * Fallback to static TESTS data if database is empty or connection fails.
   */
  static async getAllTests(): Promise<Test[]> {
    try {
      const dbTests = await db.test.findMany({
        where: { active: true },
        include: {
          parameters: true,
          categories: true,
          faqs: true,
        },
        orderBy: { popular: "desc" },
      });

      if (dbTests.length === 0) return TESTS;

      // Transform DB model to Frontend Type
      return dbTests.map((t) => this.mapDbTestToType(t));
    } catch (error) {
      console.error("Failed to fetch tests from DB, falling back to static data:", error);
      return TESTS;
    }
  }

  /**
   * Fetch a single test by slug.
   */
  static async getTestBySlug(slug: string): Promise<Test | null> {
    try {
      const dbTest = await db.test.findUnique({
        where: { slug },
        include: {
          parameters: true,
          categories: true,
          faqs: true,
        },
      });

      if (!dbTest) {
        return TESTS.find((t) => t.slug === slug) || null;
      }

      return this.mapDbTestToType(dbTest);
    } catch (error) {
      console.error(`Failed to fetch test ${slug} from DB, falling back:`, error);
      return TESTS.find((t) => t.slug === slug) || null;
    }
  }

  private static mapDbTestToType(t: any): Test {
    return {
      id: t.id,
      slug: t.slug,
      name: t.name,
      shortDescription: t.shortDescription,
      price: t.price,
      originalPrice: t.originalPrice,
      discountPercent: t.discountPercent,
      reportTime: t.reportTime,
      homeCollection: t.homeCollection,
      fasting: t.fasting,
      fastingHours: t.fastingHours || undefined,
      sampleType: t.sampleType.toString(),
      parameterCount: t.parameterCount,
      parameters: t.parameters.map((p: any) => ({
        name: p.name,
        unit: p.unit || undefined,
        normalRange: p.normalRange || undefined,
      })),
      categories: t.categories.map((c: any) => c.slug),
      organCategory: t.organCategory || "General",
      preparation: t.preparation,
      whoShouldTake: t.whoShouldTake,
      whyImportant: t.whyImportant || "",
      labDetails: t.labDetails || "",
      popular: t.popular,
      isNew: t.isNew,
      faqs: t.faqs.map((f: any) => ({
        question: f.question,
        answer: f.answer,
        category: f.category,
      })),
      relatedTests: [], // Can be populated via logic later
    };
  }
}
