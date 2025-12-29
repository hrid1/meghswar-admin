import { PageShell } from "@/app/dashboard/_components/PageShell";
import PendingInvoiceStats from "./_components/PendingInvoiceStats";
import PendingInvoiceTable from "./_components/PendingInvoiceTable";

export default function Page() {
  return (
    <PageShell title="Pending Invoice List" description="View pending invoices.">
      <div className="space-y-6">
        <PendingInvoiceStats />
        <PendingInvoiceTable />
      </div>
    </PageShell>
  );
}

