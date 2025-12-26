import { PageShell } from "@/app/dashboard/_components/PageShell";
import ApproveRiderTable from "./_components/ApproveRiderTable";

export default function Page() {
  return (
    <PageShell title="Approve Rider" description="Approve rider registrations.">
      <ApproveRiderTable />
    </PageShell>
  );
}
