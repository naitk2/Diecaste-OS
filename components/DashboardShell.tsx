import Link from "next/link";
import { ReactNode } from "react";

const navItems = ["Dashboard", "New Order", "AI Tools", "Settings"];
const routes: Record<string, string> = { Dashboard: "/dashboard", "New Order": "/new-order", "AI Tools": "/ai-tools", Settings: "/settings" };

/** Provides responsive sidebar navigation and a dashboard-first content canvas. */
export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <aside className="glass-card sticky top-4 z-10 flex h-fit items-center justify-between p-4 lg:w-72 lg:flex-col lg:items-start lg:p-6">
          <Link href="/" className="text-xl font-black tracking-tight text-white">Diecaste OS</Link>
          <nav className="fixed inset-x-4 bottom-4 z-20 grid grid-cols-4 gap-2 rounded-3xl border border-white/10 bg-ink/90 p-2 backdrop-blur md:static md:mt-8 md:w-full md:grid-cols-1 md:bg-transparent md:p-0">
            {navItems.map((item) => (
              <Link key={item} href={routes[item]} className="focus-ring rounded-2xl px-3 py-3 text-center text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white md:text-left md:text-sm">
                {item}
              </Link>
            ))}
          </nav>
        </aside>
        <section className="flex-1 space-y-6 pb-24 md:pb-0">
          <header className="glass-card p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-electric">Founder Command Center</p>
            <h1 className="mt-3 text-3xl font-semibold text-white md:text-5xl">AI operations for student service requests.</h1>
            <p className="mt-4 max-w-3xl text-slate-300">Generate leave notes, scrub assignments, price urgent work, and track each order from intake to completion.</p>
          </header>
          {children}
        </section>
      </div>
    </main>
  );
}
