import { PageShell } from "@/app/dashboard/_components/PageShell";
import RiderPerformanceStats from "./_components/RiderPerformanceStats";
import RiderPerformanceTable from "./_components/RiderPerformanceTable";

export default function Page() {
  return (
    <PageShell
      title="Rider Performance"
      description="Review rider performance."
    >
      <div className="space-y-6">
        <RiderPerformanceStats />
        <RiderPerformanceTable />
      </div>
    </PageShell>
  );
}
