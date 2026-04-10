import { NextResponse } from "next/server";
import { TestService } from "@/services/test.service";

/**
 * GET /api/tests
 * Returns a list of all tests, optionally filtered by category or slug.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const test = await TestService.getTestBySlug(slug);
      if (!test) {
        return NextResponse.json({ error: "Test not found" }, { status: 404 });
      }
      return NextResponse.json(test);
    }

    const tests = await TestService.getAllTests();
    return NextResponse.json(tests);
  } catch (error) {
    console.error("API Error - /api/tests:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
