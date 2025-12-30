"use client";

import { PageShell } from "@/app/dashboard/_components/PageShell";
import CreateStaffForm from "./_components/CreateStaffForm";

export default function Page() {
  return (
    <PageShell title="Create Staff" description="Staff Management > Create Staff">
      <CreateStaffForm />
    </PageShell>
  );
}
