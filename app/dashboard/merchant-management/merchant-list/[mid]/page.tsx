import { PageShell } from "@/app/dashboard/_components/PageShell";
import MerchantDetailsContent from "./_components/MerchantDetailsContent";

export default function Page() {
  return (
    <PageShell title="Merchant Details" description="Merchant profile and parcel flow.">
      <MerchantDetailsContent />
    </PageShell>
  );
}
