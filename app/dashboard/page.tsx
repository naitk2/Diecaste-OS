import { DashboardShell } from "@/components/DashboardShell";
import { FounderDashboard } from "@/components/FounderDashboard";

/** Shows the founder-focused operational dashboard route. */
export default function DashboardPage() {
  return (
    <DashboardShell>
      <FounderDashboard />
    </DashboardShell>
  );
}
