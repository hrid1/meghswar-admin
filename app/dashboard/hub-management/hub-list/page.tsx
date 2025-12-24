import { PageShell } from "@/app/dashboard/_components/PageShell";
import HubListTable from "./_components/HubListTable";

export default function Page() {
  return (
    <PageShell title="HUB List" description="Browse and manage hubs.">
      <HubListTable />
    </PageShell>
  );
}
