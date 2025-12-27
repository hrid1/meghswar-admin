import { PageShell } from "@/app/dashboard/_components/PageShell";
import CreateMerchantInvoiceTable from "./_components/CreateMerchantInvoiceTable";

export default function Page() {
  return (
    <PageShell title="Create Merchant Invoice" description="Create merchant invoice.">
      <CreateMerchantInvoiceTable />
    </PageShell>
  );
}
