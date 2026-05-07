import { DashboardShell } from "@/components/DashboardShell";
import { FounderDashboard } from "@/components/FounderDashboard";
import { LeaveNoteArchitect } from "@/components/LeaveNoteArchitect";
import { AssignmentScrubber } from "@/components/AssignmentScrubber";

/** Renders the dashboard-first landing experience with the three core modules. */
export default function HomePage() {
  return (
    <DashboardShell>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <FounderDashboard />
        <LeaveNoteArchitect />
      </div>
      <AssignmentScrubber />
    </DashboardShell>
  );
}
