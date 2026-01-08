import { PageShell } from "@/app/dashboard/_components/PageShell";
import AdvancePayDetails from "./_components/AdvancePayDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ mid: string }>;
}) {
  const { mid } = await params;

  return (
    <PageShell
      title="View Details"
      description="Merchant Management > Advance Payment List > View Details"
    >
      <AdvancePayDetails merchantId={mid} />
    </PageShell>
  );
}
