"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import type { PendingInvoiceRow } from "./fakeData";
import { AppButton } from "@/components/reusable/CustomButton";

function money(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export const pendingInvoiceColumns = (): Column<PendingInvoiceRow>[] => [
  {
    key: "id",
    header: "Invoice ID",
    width: "15%",
    cellClassName: "align-middle font-semibold text-gray-900",
    render: (r) => <span>{r.id}</span>,
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "25%",
    cellClassName: "align-middle",
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={r.merchant.avatarUrl}
            alt={r.merchant.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col leading-4">
          <span className="text-sm font-semibold text-gray-900">{r.merchant.name}</span>
          <span className="text-xs text-gray-500">{r.merchant.phone}</span>
        </div>
      </div>
    ),
  },
  {
    key: "totalParcel",
    header: "Total Parcel",
    width: "15%",
    cellClassName: "align-middle text-center",
    headerClassName: "text-center",
    render: (r) => <span className="text-sm font-semibold">{r.totalParcel}</span>,
  },
  {
    key: "payableAmount",
    header: "Payable Amount",
    width: "15%",
    cellClassName: "align-middle text-center",
    headerClassName: "text-center",
    render: (r) => (
      <span className="text-sm font-semibold text-green-600">
        {"\u09F3"} {money(r.payableAmount)}
      </span>
    ),
  },
  {
    key: "paymentMethod",
    header: "Payment Method",
    width: "15%",
    cellClassName: "align-middle text-center",
    headerClassName: "text-center",
    render: (r) => <span className="text-sm text-gray-700">{r.paymentMethod}</span>,
  },
  {
    key: "action",
    header: "Action",
    width: "15%",
    cellClassName: "align-middle text-center",
    headerClassName: "text-center",
    render: (r) => (
      <div onClick={(e) => e.stopPropagation()}>
        <AppButton
          variantType="primary"
          className="bg-[#FE5000] hover:bg-[#FE5000]/90 text-white px-4 py-2 rounded-lg text-xs font-semibold"
          onClick={() => alert(`Paying merchant ${r.merchant.name}`)}
        >
          Pay Merchant
        </AppButton>
      </div>
    ),
  },
];
