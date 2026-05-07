"use client";

import { jsPDF } from "jspdf";
import { FormEvent, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

const initialForm = { name: "", rollNo: "", reason: "", dates: "", tone: "Formal" };

/** Collects leave details, calls the AI endpoint, and exports the result as a PDF. */
export function LeaveNoteArchitect() {
  const [form, setForm] = useState(initialForm);
  const [letter, setLetter] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /** Submits validated form data to the leave-note API route. */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const response = await fetch("/api/generate-leave-note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      setError(data.error ?? "Generation failed.");
      return;
    }
    setLetter(data.letter);
  }

  /** Converts the generated leave note into a downloadable PDF. */
  function downloadPdf() {
    const pdf = new jsPDF();
    const lines = pdf.splitTextToSize(letter, 180);
    pdf.text(lines, 15, 20);
    pdf.save(`${form.name || "leave-note"}.pdf`);
  }

  return (
    <section className="glass-card p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-electric">AI Leave Note Architect</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Professional leave letter generator</h2>
        </div>
        <div className="hidden rounded-3xl border border-white/10 bg-white/10 p-4 text-3xl md:block">📝</div>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
        {Object.keys(initialForm).map((key) => (
          <label key={key} className="text-sm text-slate-300">
            {key === "rollNo" ? "Roll No" : key.charAt(0).toUpperCase() + key.slice(1)}
            {key === "tone" ? (
              <select className="focus-ring mt-1 w-full rounded-2xl border border-white/10 bg-ink/80 p-3" value={form.tone} onChange={(event) => setForm({ ...form, tone: event.target.value })}>
                {['Formal', 'Urgent', 'Apologetic', 'Concise'].map((tone) => <option key={tone}>{tone}</option>)}
              </select>
            ) : (
              <input className="focus-ring mt-1 w-full rounded-2xl border border-white/10 bg-ink/80 p-3" required value={form[key as keyof typeof form]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} />
            )}
          </label>
        ))}
        <button className="focus-ring rounded-2xl bg-electric px-5 py-3 font-bold text-ink transition hover:bg-sky-300 md:col-span-2" disabled={isLoading}>{isLoading ? <LoadingSpinner /> : "Generate Leave Note"}</button>
      </form>
      {error && <p className="mt-4 rounded-2xl bg-red-500/10 p-3 text-red-200">{error}</p>}
      {letter && <div className="mt-5 rounded-2xl border border-white/10 bg-ink/70 p-4"><pre className="whitespace-pre-wrap text-sm text-slate-200">{letter}</pre><button onClick={downloadPdf} className="focus-ring mt-4 rounded-2xl bg-violet px-4 py-2 font-semibold text-white">Download PDF</button></div>}
    </section>
  );
}
