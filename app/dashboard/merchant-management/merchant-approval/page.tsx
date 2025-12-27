import { PageShell } from "@/app/dashboard/_components/PageShell";
import MerchantApprovalContent from "./_components/MerchantApprovalContent";

export default function Page() {
  return (
    <PageShell
      title="Merchant Account Approval"
      description="Merchant Management › Merchant Account"
    >
      <MerchantApprovalContent />
    </PageShell>
  );
}
