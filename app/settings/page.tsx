import { DashboardShell } from "@/components/DashboardShell";

/** Displays deployment and account configuration guidance for admins. */
export default function SettingsPage() {
  return (
    <DashboardShell>
      <section className="glass-card p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-electric">Settings</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Secure business controls</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Connect NextAuth, MongoDB Atlas, and your AI provider through environment variables. Keep all secret keys server-side and rotate them from provider dashboards when needed.
        </p>
      </section>
    </DashboardShell>
  );
}
