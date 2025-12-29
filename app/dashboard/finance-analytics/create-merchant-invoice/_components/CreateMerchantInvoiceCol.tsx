"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import type { CreateMerchantInvoiceRow } from "./fakeData";
import Link from "next/link";
import { AppButton } from "@/components/reusable/CustomButton";

function money(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

function StatusPill({ status }: { status: CreateMerchantInvoiceRow["status"] }) {
  const cls =
    status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-200 text-gray-600";
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${cls}`}>
      {status}
    </span>
  );
}

export const createMerchantInvoiceColumns = (): Column<CreateMerchantInvoiceRow>[] => [
  {
    key: "merchant",
    header: "Merchant",
    width: "18%",
    cellClassName: "align-middle",
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={r.merchant.avatarUrl || "https://i.pravatar.cc/80?img=12"}
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
    width: "10%",
    cellClassName: "align-middle text-center",
    headerClassName: "text-center",
    render: (r) => <span className="text-sm font-semibold">{r.totalParcel}</span>,
  },
  {
    key: "parcelDelivered",
    header: "Parcel Delivered",
    width: "12%",
    cellClassName: "align-middle text-center",
    headerClassName: "text-center",
    render: (r) => <span className="text-sm font-semibold">{r.parcelDelivered}</span>,
  },
  {
    key: "parcelReturned",
    header: "Parcel Returned",
    width: "12%",
    cellClassName: "align-middle text-center",
    headerClassName: "text-center",
    render: (r) => <span className="text-sm font-semibold">{r.parcelReturned}</span>,
  },
  {
    key: "totalTransactions",
    header: "Total Transactions",
    width: "12%",
    cellClassName: "align-middle text-right",
    headerClassName: "text-right",
    render: (r) => (
      <span className="text-sm font-semibold text-green-600">
        {"\u09F3"} {money(r.totalTransactions)}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "10%",
    cellClassName: "align-middle text-center",
    headerClassName: "text-center",
    render: (r) => <StatusPill status={r.status} />,
  },
  {
    key: "merchantAddress",
    header: "Merchant Address",
    width: "18%",
    wrap: true,
    cellClassName: "align-middle",
    render: (r) => <span className="text-[10px] text-gray-600 leading-4">{r.merchantAddress}</span>,
  },
  {
    key: "view",
    header: "View",
    width: "8%",
    cellClassName: "align-middle text-center",
    headerClassName: "text-center",
    render: (r) => (
      <div onClick={(e) => e.stopPropagation()}>
        <Link href={`./create-merchant-invoice/${encodeURIComponent(r.id)}`}>
          <AppButton variantType="outline" className="px-4 py-2 text-xs rounded-md">
            View
          </AppButton>
        </Link>
      </div>
    ),
  },
];
