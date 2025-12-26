import { PageShell } from "@/app/dashboard/_components/PageShell";
import VerifyOtpTable from "./_components/VerifyOtpTable";

export default function Page() {
  return (
    <PageShell title="Verify OTP" description="Verify rider OTP.">
      <VerifyOtpTable />
    </PageShell>
  );
}
