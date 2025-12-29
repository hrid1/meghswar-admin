"use client";

import { PageShell } from "@/app/dashboard/_components/PageShell";
import CustomTabs from "@/components/reusable/CustomTab";
import CreatedInvoiceTable from "./_components/CreatedInvoiceTable";
import AllAdvanceInvoiceTable from "./_components/AllAdvanceInvoiceTable";

export default function Page() {
  const tabs = [
    {
      name: "Created Invoice",
      value: "created-invoice",
      content: <CreatedInvoiceTable />,
    },
    {
      name: "All Advance Invoice",
      value: "all-advance-invoice",
      content: <AllAdvanceInvoiceTable />,
    },
  ];

  return (
    <PageShell title="Advance Invoice" description="Invoice">
      <CustomTabs tabs={tabs} defaultValue="created-invoice" />
    </PageShell>
  );
}
