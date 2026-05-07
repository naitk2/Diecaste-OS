import { DashboardShell } from "@/components/DashboardShell";
import { PricingEstimator } from "@/components/PricingEstimator";

/** Provides the new-order workspace and automated pricing estimator. */
export default function NewOrderPage() {
  return (
    <DashboardShell>
      <PricingEstimator />
    </DashboardShell>
  );
}
