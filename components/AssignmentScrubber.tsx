"use client";

import { FormEvent, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

type Analysis = { readabilityScore: number; summary: string; issues: string[]; polishedVersion: string };

/** Uploads or accepts draft text and displays AI readability and polishing results. */
export function AssignmentScrubber() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /** Sends multipart form data to the assignment analysis endpoint. */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("text", text);

    const response = await fetch("/api/analyze-assignment", { method: "POST", body: formData });
    const data = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      setError(data.error ?? "Analysis failed.");
      return;
    }
    setAnalysis(data);
  }

  return (
    <section className="glass-card p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-electric">Smart Assignment Scrubber</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Grammar, tone, and human-flow analysis</h2>
      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-electric/50 bg-white/[0.04] p-6 text-center text-slate-300">
          <span className="text-4xl">⬆️</span>
          <span className="mt-3 font-semibold text-white">Upload a text draft</span>
          <span className="text-sm">TXT/MD/DOC text exports work best for Phase 1.</span>
          <input type="file" className="sr-only" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
          {file && <span className="mt-3 text-electric">{file.name}</span>}
        </label>
        <textarea className="focus-ring min-h-48 rounded-3xl border border-white/10 bg-ink/80 p-4 text-slate-100" placeholder="Or paste assignment text here..." value={text} onChange={(event) => setText(event.target.value)} />
        <button className="focus-ring rounded-2xl bg-electric px-5 py-3 font-bold text-ink lg:col-span-2" disabled={isLoading}>{isLoading ? <LoadingSpinner /> : "Analyze Assignment"}</button>
      </form>
      {error && <p className="mt-4 rounded-2xl bg-red-500/10 p-3 text-red-200">{error}</p>}
      {analysis && <div className="mt-5 grid gap-4 lg:grid-cols-3"><div className="rounded-2xl bg-white/10 p-4"><p className="text-sm text-slate-400">Readability Score</p><p className="text-4xl font-black text-electric">{analysis.readabilityScore}</p></div><div className="rounded-2xl bg-white/10 p-4 lg:col-span-2"><p className="font-semibold text-white">Issues</p><ul className="mt-2 list-disc pl-5 text-sm text-slate-300">{analysis.issues?.map((issue) => <li key={issue}>{issue}</li>)}</ul></div><pre className="whitespace-pre-wrap rounded-2xl bg-ink/70 p-4 text-sm text-slate-200 lg:col-span-3">{analysis.polishedVersion}</pre></div>}
    </section>
  );
}
