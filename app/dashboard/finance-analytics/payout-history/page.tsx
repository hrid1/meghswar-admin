"use client";

import { PageShell } from "@/app/dashboard/_components/PageShell";
import PayoutHistoryTable from "./_components/PayoutHistoryTable";

export default function Page() {
  return (
    <PageShell title="Payout History" description="View payout history.">
      <PayoutHistoryTable />
    </PageShell>
  );
}
