import { PageShell } from "@/app/dashboard/_components/PageShell";
import RiderStatusTable from "./_components/RiderStatusTable";

export default function Page() {
  return (
    <PageShell title="Rider Status" description="Track rider status.">
      <RiderStatusTable />
    </PageShell>
  );
}
