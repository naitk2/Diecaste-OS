import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

/** Calls the configured OpenAI chat model and returns trimmed text for UI rendering. */
export async function completeText(messages: ChatCompletionMessageParam[]) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const response = await client.chat.completions.create({
    model,
    temperature: 0.35,
    messages
  });

  return response.choices[0]?.message?.content?.trim() ?? "";
}

/** Builds the exact prompt that turns leave details into a polished school letter. */
export function buildLeaveNotePrompt(input: { name: string; rollNo: string; reason: string; dates: string; tone: string }) {
  return [
    { role: "system" as const, content: "You write concise, professional school leave letters with clear formatting and no invented facts." },
    {
      role: "user" as const,
      content: `Generate a ${input.tone.toLowerCase()} leave letter for a student.\nName: ${input.name}\nRoll No: ${input.rollNo}\nReason: ${input.reason}\nDates: ${input.dates}\nUse a subject line, salutation, body, closing, and signature. Keep it professional and ready to paste into a PDF.`
    }
  ];
}

/** Builds the assignment analysis prompt with strict JSON output for reliable parsing. */
export function buildAssignmentPrompt(text: string) {
  return [
    { role: "system" as const, content: "You are an academic editing assistant. Return only valid JSON." },
    {
      role: "user" as const,
      content: `Analyze this draft for grammar, tone consistency, and human-like flow. Return JSON with keys readabilityScore (0-100), summary, issues (array), and polishedVersion. Draft:\n${text.slice(0, 12000)}`
    }
  ];
}
