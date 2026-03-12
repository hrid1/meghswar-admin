import { PageShell } from "@/app/dashboard/_components/PageShell";
import AllInvoiceListTable from "./_components/AllInvoiceListTable";

export default function Page() {
  return (
    <PageShell title="All Invoice List" description="View all invoices.">
      <AllInvoiceListTable />
    </PageShell>
  );
}
