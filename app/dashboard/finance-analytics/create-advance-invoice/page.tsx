import { PageShell } from "@/app/dashboard/_components/PageShell";
import CreateAdvanceInvoiceTable from "./_components/CreateAdvanceInvoiceTable";

export default function Page() {
  return (
    <PageShell title="Create Advance Invoice" description="Create advance invoice.">
      <CreateAdvanceInvoiceTable />
    </PageShell>
  );
}
