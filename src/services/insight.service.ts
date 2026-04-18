import { prisma } from "@/lib/db";

export interface HealthTrend {
  date: Date;
  value: number;
  unit: string;
}

export interface AIInsight {
  type: "warning" | "success" | "info";
  message: string;
  testName: string;
}

export class InsightService {
  /**
   * Generates a mock health score (0-100) based on report history.
   */
  static async getHealthScore(patientId: string): Promise<number> {
    // In a real system, this would analyze 'structuredData' values
    // For now, we return a stable mock score based on patientId
    const base = patientId.length % 20;
    return 75 + base;
  }

  /**
   * Generates a mock summary explanation for a specific report.
   */
  static async generateReportSummary(reportId: string): Promise<string> {
    const report = await prisma.testReport.findUnique({
      where: { id: reportId },
      include: { booking: { include: { tests: true } } }
    });

    if (!report) return "Report details unavailable.";

    const testNames = report.booking.tests.map(t => t.name).join(", ");
    
    // Mock logic simulating AI interpretation
    return `Your ${testNames} results are now ready. Overall, most parameters are within the healthy range. However, we've noticed slightly elevated markers in your organ function tests which may require attention to hydration and diet.`;
  }

  /**
   * Detects trends across multiple reports for a specific test/parameter.
   */
  static async getTestTrends(patientPhone: string, testName: string): Promise<HealthTrend[]> {
    // We fetch bookings for this phone number and filter for the test
    const bookings = await prisma.testBooking.findMany({
      where: {
        patient: { phone: patientPhone },
        tests: { some: { name: testName } },
        status: "REPORT_READY"
      },
      include: { reports: true },
      orderBy: { createdAt: "asc" }
    });

    // Mock trend generation
    return [
      { date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), value: 5.8, unit: "%" },
      { date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), value: 6.1, unit: "%" },
      { date: new Date(), value: 6.3, unit: "%" },
    ];
  }

  /**
   * Get personalized recommendations based on past tests.
   */
  static async getRecommendations(patientId: string) {
    return [
      {
        title: "HbA1c Recheck",
        description: "Your sugar levels showed an upward trend. Recommended to recheck in 3 months.",
        dueInDays: 90,
        cta: "Book HbA1c"
      },
      {
        title: "Vitamin D Supplementation",
        description: "Your levels are borderline. Consider Vitamin D intake and 15 mins of sun exposure.",
        dueInDays: 0,
        cta: "View Diet Plan"
      }
    ];
  }

  /**
   * Calculate next due tests.
   */
  static async getReminders(patientPhone: string) {
    return [
      { testName: "Full Body Checkup", dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), critical: false },
      { testName: "Thyroid Profile", dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), critical: true },
    ];
  }
}
