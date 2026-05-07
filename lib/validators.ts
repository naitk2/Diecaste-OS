import { z } from "zod";

export const leaveNoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  rollNo: z.string().min(1, "Roll number is required"),
  reason: z.string().min(3, "Reason is required"),
  dates: z.string().min(3, "Leave dates are required"),
  tone: z.enum(["Formal", "Urgent", "Apologetic", "Concise"])
});

export const pricingSchema = z.object({
  wordCount: z.number().int().nonnegative(),
  urgency: z.enum(["24h", "3days", "standard"]),
  complexity: z.enum(["basic", "technical", "expert"])
});

/** Converts unknown request data into validated leave-note form fields. */
export function parseLeaveNotePayload(payload: unknown) {
  return leaveNoteSchema.parse(payload);
}
