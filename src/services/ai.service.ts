import OpenAI from "openai";
import { prisma } from "@/lib/db";
import { AiStatus } from "@prisma/client";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ─── STRUCTURED OUTPUT SCHEMA ─────────────────────────────────────

const ReportAnalysisSchema = z.object({
  summaryEn: z.string().describe("Reassuring health summary in English"),
  summaryHi: z.string().describe("Health summary in Hindi"),
  summaryBn: z.string().describe("Health summary in Bengali"),
  abnormalAnalysis: z.array(z.object({
    name: z.string(),
    explanation: z.string(),
    status: z.enum(["normal", "borderline", "high", "low", "critical"]),
    organ: z.string()
  })),
  bodyMapping: z.array(z.object({
    organ: z.string().describe("Organ or body system affected (e.g., Liver, Kidney, Heart, Pancreas)"),
    status: z.enum(["healthy", "warning", "attention"]),
    details: z.string()
  })),
  recommendations: z.array(z.object({
    title: z.string(),
    description: z.string(),
    reason: z.string()
  })),
  lifestyleGuidance: z.array(z.object({
    category: z.string().describe("e.g., Diet, Activity, Sleep"),
    advice: z.string()
  })),
  recheckInterval: z.string().describe("e.g., 3 months, 6 weeks, or Urgent"),
  videoScript: z.string().describe("Concise video summary script for a virtual doctor avatar")
});

export class AiService {
  /**
   * Enriches a test report with AI insights using OpenAI Structured Outputs.
   */
  static async enrichReport(reportId: string) {
    console.log(`[AiService] Starting enrichment for report ${reportId}`);

    const report = await prisma.testReport.findUnique({
      where: { id: reportId },
      include: {
        booking: {
          include: {
            patient: true,
            tests: true
          }
        }
      }
    });

    if (!report) {
      console.error(`[AiService] Report ${reportId} not found`);
      return;
    }

    if (report.aiStatus === AiStatus.COMPLETED && report.promptVersion === "1.0.0") {
      console.log(`[AiService] Report ${reportId} already enriched and current. Skipping.`);
      return;
    }

    if (!report.structuredData) {
      console.warn(`[AiService] Report ${reportId} has no structured data to analyze`);
      await prisma.testReport.update({
        where: { id: reportId },
        data: { aiStatus: AiStatus.FAILED }
      });
      return;
    }

    try {
      const patient = report.booking.patient;
      const testNames = report.booking.tests.map(t => t.name).join(", ");
      
      const prompt = `You are SMARTLAB247 AI Health Assistant.

Your job is to analyze one pathology report that has already been parsed into structured lab parameters.

Patient Context:
- Name: ${patient.name}
- Age: ${patient.age}
- Gender: ${patient.gender}
- Tests Taken: ${testNames}

Parsed Lab Parameters:
${JSON.stringify(report.structuredData, null, 2)}

You must follow these rules strictly:
1. explain the report in simple English, Hindi, and Bengali.
2. identify abnormal or borderline parameters.
3. map abnormal markers to likely body systems/organs.
4. suggest safe next-step tests if appropriate.
5. suggest safe lifestyle and natural remedy guidance only.
6. recommend when to recheck.

Safety rules:
- Never claim a confirmed diagnosis.
- Never recommend prescription drugs.
- Never say “you have X disease”.
- Use phrases like “may indicate”, “can be associated with”, “worth discussing with a doctor”.
- If values are severely abnormal, advise urgent medical consultation.
- Natural remedies must be conservative, safe, general wellness suggestions only.

Output Instructions:
- Return the analysis as strict structured JSON matching the provided schema.
- Tones should be reassuring, clear, premium, and concise.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a professional medical report interpreter focused on patient education and safety. You MUST respond in valid JSON matching the schema provided." },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error("Empty AI response");
      
      const analysis = JSON.parse(content);

      // Update the report with the AI results
      await prisma.testReport.update({
        where: { id: reportId },
        data: {
          aiStatus: AiStatus.COMPLETED,
          summaryEn: analysis.summaryEn,
          summaryHi: analysis.summaryHi,
          summaryBn: analysis.summaryBn,
          abnormalAnalysis: analysis.abnormalAnalysis as any,
          bodyMapping: analysis.bodyMapping as any,
          recommendations: analysis.recommendations as any,
          lifestyleGuidance: analysis.lifestyleGuidance as any,
          recheckInterval: analysis.recheckInterval,
          videoScript: analysis.videoScript,
          promptVersion: "1.0.0",
          aiModel: "gpt-4o-2024-08-06",
          updatedAt: new Date()
        }
      });

      console.log(`[AiService] Successfully enriched report ${reportId}`);
    } catch (error: any) {
      console.error(`[AiService] Enrichment failed for report ${reportId}:`, error);
      await prisma.testReport.update({
        where: { id: reportId },
        data: { aiStatus: AiStatus.FAILED }
      });
    }
  }

  /**
   * Marks a report enrichment as stale (e.g. if data changes).
   */
  static async markStale(reportId: string) {
    await prisma.testReport.update({
      where: { id: reportId },
      data: { aiStatus: AiStatus.STALE }
    });
  }
}
