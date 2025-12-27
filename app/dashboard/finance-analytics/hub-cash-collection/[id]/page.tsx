"use client"
import { PageShell } from "@/app/dashboard/_components/PageShell";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ id: string }>();
  return (
    <PageShell title="HUB Cash Collection" description="HUB details.">
      <div className="rounded-xl border border-dashed bg-white p-6 text-sm text-gray-600">
        HUB ID: <span className="font-semibold">{params?.id}</span>
      </div>
    </PageShell>
  );
}

