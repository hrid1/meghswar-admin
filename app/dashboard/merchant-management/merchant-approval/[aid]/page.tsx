import { PageShell } from "@/app/dashboard/_components/PageShell";
import MerchantApprovalDetailsContent from "./_components/MerchantApprovalDetailsContent";

export default function Page({ params }: { params: { aid: string } }) {
  return (
    <PageShell
      title="Merchant Approval Details"
      description="Merchant Management › Merchant Account"
    >
      <MerchantApprovalDetailsContent aid={params.aid} />
    </PageShell>
  );
}

