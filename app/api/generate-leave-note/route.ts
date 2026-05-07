import { NextResponse } from "next/server";
import { buildLeaveNotePrompt, completeText } from "@/lib/ai";
import { getRateLimitKey, rateLimit } from "@/lib/rateLimit";
import { parseLeaveNotePayload } from "@/lib/validators";

/** Handles leave-note generation with validation, rate limiting, and AI prompting. */
export async function POST(request: Request) {
  const limit = rateLimit(getRateLimitKey(request));
  if (!limit.allowed) {
    return NextResponse.json({ error: "Rate limit exceeded. Please wait before generating again." }, { status: 429 });
  }

  try {
    const payload = parseLeaveNotePayload(await request.json());
    const letter = await completeText(buildLeaveNotePrompt(payload));
    return NextResponse.json({ letter });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to generate leave note.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
