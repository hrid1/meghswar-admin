import { PageShell } from "@/app/dashboard/_components/PageShell";
import MerchantApprovalDetailsContent from "./_components/MerchantApprovalDetailsContent";

export default async function Page({ params }: { params: Promise<{ aid: string }> }) {
  const { aid } = await params; 
  return (
    <PageShell
      title="Merchant Approval Details"
      description="Merchant Management › Merchant Account"
    >
      <MerchantApprovalDetailsContent aid={aid} />
    </PageShell>
  );
}

