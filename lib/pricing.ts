export type Urgency = "24h" | "3days" | "standard";
export type Complexity = "basic" | "technical" | "expert";

const urgencyMultiplier: Record<Urgency, number> = {
  "24h": 1.8,
  "3days": 1.25,
  standard: 1
};

const complexityMultiplier: Record<Complexity, number> = {
  basic: 1,
  technical: 1.45,
  expert: 1.9
};

/** Calculates a defensible service price from workload, deadline pressure, and complexity. */
export function calculatePrice(wordCount: number, urgency: Urgency, complexity: Complexity) {
  const safeWordCount = Math.max(0, wordCount);
  const basePrice = Math.max(8, Math.ceil(safeWordCount / 250) * 6);
  const rawTotal = basePrice * urgencyMultiplier[urgency] * complexityMultiplier[complexity];

  return {
    basePrice,
    urgencyMultiplier: urgencyMultiplier[urgency],
    complexityMultiplier: complexityMultiplier[complexity],
    total: Math.round(rawTotal * 100) / 100
  };
}
