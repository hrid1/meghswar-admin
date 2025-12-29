"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import type { ClearanceRow } from "./fakeData";

function money(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export const clearanceListColumns = (): Column<ClearanceRow>[] => [
  {
    key: "merchant",
    header: "Merchant",
    width: "34%",
    cellClassName: "align-middle",
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
        <div className="flex flex-col leading-4">
          <span className="text-sm font-bold text-gray-900">{row.merchant.name}</span>
          <span className="text-xs text-gray-400">{row.merchant.phone}</span>
        </div>
      </div>
    ),
  },
  {
    key: "totalParcel",
    header: "Total Parcel",
    width: "14%",
    cellClassName: "align-middle text-center font-semibold text-gray-900",
    headerClassName: "text-center",
    render: (row) => row.totalParcel.toLocaleString(),
  },
  {
    key: "collectedAmount",
    header: "Collected Amount",
    width: "18%",
    cellClassName: "align-middle text-center font-semibold text-[#107E3E]",
    headerClassName: "text-center",
    render: (row) => (
      <span>
        {"\u09F3"}
        {money(row.collectedAmount)}
      </span>
    ),
  },
  {
    key: "deliveryCharge",
    header: "Delivery Charge",
    width: "18%",
    cellClassName: "align-middle text-center font-semibold text-[#107E3E]",
    headerClassName: "text-center",
    render: (row) => (
      <span>
        {"\u09F3"}
        {money(row.deliveryCharge)}
      </span>
    ),
  },
  {
    key: "due",
    header: "Due",
    width: "16%",
    cellClassName: "align-middle text-center",
    headerClassName: "text-center",
    render: (row) => (
      <div className="leading-4">
        <div className="font-semibold text-[#107E3E]">
          {"\u09F3"}
          {money(row.due)}
        </div>
        <div className="mt-1 text-[10px] text-gray-500">{row.lastPaidAt}</div>
      </div>
    ),
  },
];

