import { PageShell } from "@/app/dashboard/_components/PageShell";
import HubCashCollectionTable from "./_components/HubCashCollectionTable";

export default function Page() {
  return (
    <PageShell title="HUB Cash Collection" description="Manage hub cash collection." >
      <HubCashCollectionTable/>
    </PageShell>
  );
}

