"use client";

import { PageShell } from "@/app/dashboard/_components/PageShell";
import CustomTabs from "@/components/reusable/CustomTab";
import SalaryListTable from "./_components/SalaryListTable";
import PaymentHistoryTable from "./_components/PaymentHistoryTable";

export default function Page() {
  const tabs = [
    {
      name: "Salary List",
      value: "salary-list",
      content: <SalaryListTable />,
    },
    {
      name: "Payment History",
      value: "payment-history",
      content: <PaymentHistoryTable />,
    },
  ];

  return (
    <PageShell title="Salary Management" description="Manage employees salaries and payment history.">
      <CustomTabs tabs={tabs} defaultValue="salary-list" />
    </PageShell>
  );
}
