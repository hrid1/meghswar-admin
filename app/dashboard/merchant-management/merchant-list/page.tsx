import { PageShell } from "@/app/dashboard/_components/PageShell";
import MerchantListContent from "./_components/MerchantListContent";

export default function Page() {
  return (
    <PageShell title="Merchant List" description="Browse and manage merchants.">
      <MerchantListContent />
    </PageShell>
  );
}
