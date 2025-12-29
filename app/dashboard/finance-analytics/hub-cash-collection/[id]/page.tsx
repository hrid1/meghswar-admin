"use client";

import { PageShell } from "@/app/dashboard/_components/PageShell";
import { useParams } from "next/navigation";
import HubInfoCard from "./_components/HubInfoCard";
import HubCashCollectionDetailsStats from "./_components/HubCashCollectionDetailsStats";
import HubCashCollectionDetailsTable from "./_components/HubCashCollectionDetailsTable";
import { hubInfoFake, hubStatsFake } from "./_components/fakeData";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Page() {
  const params = useParams<{ id: string }>();

  return (
    <div className="p-6 space-y-8">
      {/* Header with Breadcrumb */}
      <div>
        <h1 className="text-2xl font-bold text-black">HUB Cash Collection</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
          <Link href="/dashboard/finance-analytics" className="hover:text-gray-600 transition-colors">
            Finance & Analytics
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/dashboard/finance-analytics/hub-cash-collection" className="hover:text-gray-600 transition-colors">
            HUB Cash Collection
          </Link>
        </div>
      </div>

      {/* HUB Information Card */}
      <HubInfoCard data={hubInfoFake} />

      {/* Stats Section */}
      <HubCashCollectionDetailsStats stats={hubStatsFake} />

      {/* Table Section */}
      <HubCashCollectionDetailsTable />
    </div>
  );
}
