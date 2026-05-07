import { NextResponse } from "next/server";
import { buildAssignmentPrompt, completeText } from "@/lib/ai";
import { getRateLimitKey, rateLimit } from "@/lib/rateLimit";

/** Safely parses model JSON and falls back to a structured response if needed. */
function parseAnalysis(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    return {
      readabilityScore: 70,
      summary: "The AI returned prose instead of JSON; review the polished version manually.",
      issues: ["Could not parse structured issue list."],
      polishedVersion: raw
    };
  }
}

/** Handles multipart assignment uploads and returns readability plus polished text. */
export async function POST(request: Request) {
  const limit = rateLimit(getRateLimitKey(request));
  if (!limit.allowed) {
    return NextResponse.json({ error: "Rate limit exceeded. Please wait before analyzing again." }, { status: 429 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const pastedText = formData.get("text");
    let text = typeof pastedText === "string" ? pastedText : "";

    if (file instanceof File) {
      text = await file.text();
    }

    if (!text.trim()) {
      return NextResponse.json({ error: "Upload a text-based draft or paste assignment text." }, { status: 400 });
    }

    const raw = await completeText(buildAssignmentPrompt(text));
    return NextResponse.json(parseAnalysis(raw));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to analyze assignment.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
