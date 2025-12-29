"use client";

import { PageShell } from "@/app/dashboard/_components/PageShell";
import AccountManagementTable from "./_components/AccountManagementTable";

export default function Page() {
  return (
    <PageShell title="Account Management" description="Manage your accounts here">
      <div className="mt-4">
        <AccountManagementTable />
      </div>
    </PageShell>
  );
}
