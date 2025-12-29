"use client";

import Link from "next/link";
import type { Column } from "@/components/reusable/DataTable";
import type { AdvancePayListRow } from "./fakeData";

export const advancePayListColumns = (): Column<AdvancePayListRow>[] => [
  {
    key: "merchant",
    header: "Merchant",
    width: "30%",
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={row.merchant.avatarUrl || "https://i.pravatar.cc/80?img=12"}
            alt={row.merchant.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900 leading-tight">
            {row.merchant.name}
          </span>
          <span className="text-xs text-gray-500">{row.merchant.phone}</span>
        </div>
      </div>
    ),
  },
  {
    key: "assignedHub",
    header: "Assigned HUB",
    width: "18%",
    render: (row) => (
      <span className="text-sm font-semibold text-gray-900">
        {row.assignedHub}
      </span>
    ),
  },
  {
    key: "totalTransactions",
    header: "Total Transactions",
    width: "18%",
    render: (row) => (
      <span className="text-sm font-bold text-[#107E3E]">
        ৳{new Intl.NumberFormat("en-US").format(row.totalTransactions)}
      </span>
    ),
  },
  {
    key: "advancePaid",
    header: "Advance Paid",
    width: "18%",
    render: (row) => (
      <span className="text-sm font-bold text-[#107E3E]">
        ৳{new Intl.NumberFormat("en-US").format(row.advancePaid)}
      </span>
    ),
  },
  {
    key: "view",
    header: "View",
    width: "16%",
    render: (row) => (
      <Link
        href={`/dashboard/merchant-management/advance-pay-list/${row.mid}`}
        className="inline-flex items-center justify-center rounded-md border border-[#FE5000] bg-white px-4 py-2 text-sm font-medium text-[#FE5000] hover:bg-orange-50"
        onClick={(e) => e.stopPropagation()}
      >
        View
      </Link>
    ),
  },
];

