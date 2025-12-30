"use client";

import { PageShell } from "@/app/dashboard/_components/PageShell";
import StaffListTable from "./_components/StaffListTable";

export default function Page() {
  return (
    <PageShell title="Staff List" description="Staff Management > Staff List">
      <StaffListTable />
    </PageShell>
  );
}
