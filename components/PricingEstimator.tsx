"use client";

import { useMemo, useState } from "react";
import { calculatePrice, Complexity, Urgency } from "@/lib/pricing";

/** Lets founders quote services from word count, deadline urgency, and technical complexity. */
export function PricingEstimator() {
  const [wordCount, setWordCount] = useState(1000);
  const [urgency, setUrgency] = useState<Urgency>("3days");
  const [complexity, setComplexity] = useState<Complexity>("technical");

  /** Recalculates the quote whenever inputs change without requiring an API request. */
  const quote = useMemo(() => calculatePrice(wordCount, urgency, complexity), [wordCount, urgency, complexity]);

  return (
    <section className="glass-card p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-electric">Automated Pricing Engine</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Expert quote calculator</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="text-sm text-slate-300">Word count<input className="focus-ring mt-1 w-full rounded-2xl border border-white/10 bg-ink p-3" type="number" min={0} value={wordCount} onChange={(event) => setWordCount(Number(event.target.value))} /></label>
        <label className="text-sm text-slate-300">Urgency<select className="focus-ring mt-1 w-full rounded-2xl border border-white/10 bg-ink p-3" value={urgency} onChange={(event) => setUrgency(event.target.value as Urgency)}><option value="24h">24 hours</option><option value="3days">3 days</option><option value="standard">Standard</option></select></label>
        <label className="text-sm text-slate-300">Complexity<select className="focus-ring mt-1 w-full rounded-2xl border border-white/10 bg-ink p-3" value={complexity} onChange={(event) => setComplexity(event.target.value as Complexity)}><option value="basic">Basic</option><option value="technical">Technical</option><option value="expert">Expert</option></select></label>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Metric label="Base" value={`$${quote.basePrice}`} />
        <Metric label="Urgency" value={`${quote.urgencyMultiplier}x`} />
        <Metric label="Complexity" value={`${quote.complexityMultiplier}x`} />
        <Metric label="Total" value={`$${quote.total}`} highlight />
      </div>
    </section>
  );
}

/** Shows a single pricing metric with optional emphasis for the final total. */
function Metric({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"><p className="text-sm text-slate-400">{label}</p><p className={highlight ? "text-4xl font-black text-electric" : "text-2xl font-bold text-white"}>{value}</p></div>;
}
