import { DashboardShell } from "@/components/DashboardShell";
import { AssignmentScrubber } from "@/components/AssignmentScrubber";
import { LeaveNoteArchitect } from "@/components/LeaveNoteArchitect";

/** Groups AI-powered generation and polishing tools in one workspace. */
export default function AiToolsPage() {
  return (
    <DashboardShell>
      <div className="grid gap-6 xl:grid-cols-2">
        <LeaveNoteArchitect />
        <AssignmentScrubber />
      </div>
    </DashboardShell>
  );
}
