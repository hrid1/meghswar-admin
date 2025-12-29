import { PageShell } from "@/app/dashboard/_components/PageShell";
import AdvancePayListTable from "./_components/AdvancePayListTable";
import { Banknote, BadgeCheck, Store } from "lucide-react";

export default function Page() {
  return (
    <PageShell
      title="Advance Payment List"
      description="Merchant Management > Advance Payment List"
    >
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Merchants</p>
              <p className="mt-2 text-4xl font-extrabold text-[#FE5000]">365</p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#FE5000]">
              <Store className="h-5 w-5" />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Merchant Paid</p>
              <p className="mt-2 text-lg font-extrabold text-[#FE5000]">
                Booklet Design BD
              </p>
              <p className="text-xs text-gray-500">Successful Parcels: 746</p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#FE5000]">
              <BadgeCheck className="h-5 w-5" />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Advance Paid</p>
              <p className="mt-2 text-2xl font-extrabold text-[#107E3E]">
                ৳ 1,187
              </p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center text-[#107E3E]">
              <Banknote className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Table section */}
        <AdvancePayListTable />
      </div>
    </PageShell>
  );
}
