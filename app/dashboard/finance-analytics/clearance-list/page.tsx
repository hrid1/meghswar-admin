import { PageShell } from "@/app/dashboard/_components/PageShell";
import ClearanceListTable from "./_components/ClearanceListTable";

export default function Page() {
  return (
    <PageShell title="Clearance List" description="View clearance list.">
      <ClearanceListTable />
    </PageShell>
  );
}
