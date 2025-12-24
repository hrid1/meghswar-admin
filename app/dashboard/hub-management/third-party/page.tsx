import { PageShell } from "@/app/dashboard/_components/PageShell";
import ThirdPartyTable from "./_components/ThirdPartyTable";

export default function Page() {
  return (
    <PageShell
      title="Third Party Management"
      description="Browse and manage third parties."
    >
      <ThirdPartyTable />
    </PageShell>
  );
}
