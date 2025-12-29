"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ApproveExpenseTable from "./_components/ApproveExpenseTable";

export default function Page() {
  return (
    <div className="p-6 space-y-6">
      {/* Header with Breadcrumb */}
      <div>
        <h1 className="text-2xl font-bold text-black">Expense Manage</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
          <Link href="/dashboard/finance-analytics" className="hover:text-gray-600 transition-colors">
            Finance & Analytics
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>Expense List</span>
        </div>
      </div>

      {/* Table Section */}
      <ApproveExpenseTable />
    </div>
  );
}
