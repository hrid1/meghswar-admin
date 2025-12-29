"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import type { Invoice } from "../_lib/invoiceData";

export type InvoiceRow = Invoice & { _rowId: number };

function money(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

function StatusPill({ status }: { status: Invoice["status"] }) {
  const cls =
    status === "Delivered"
      ? "bg-[#DBFFE6] text-[#0B8F3C] border-[#BDF5CF]"
      : status === "Partial Delivery"
        ? "bg-[#DBFFE6] text-[#0B8F3C] border-[#BDF5CF]"
        : "bg-orange-50 text-[#FE5000] border-orange-200";

  const dot =
    status === "Delivered"
      ? "bg-[#0B8F3C]"
      : status === "Partial Delivery"
        ? "bg-[#0B8F3C]"
        : "bg-[#FE5000]";

  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap",
        cls,
      ].join(" ")}
    >
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

export const invoiceColumns = (): Column<InvoiceRow>[] => [
  {
    key: "parcelId",
    header: "Parcel ID",
    width: "7%",
    cellClassName: "align-middle text-center font-semibold text-gray-900 pl-0",
    headerClassName: "text-center pl-0",
    render: (r) => <span>{r.parcelId}</span>,
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "10%",
    cellClassName: "align-middle",
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.pravatar.cc/80?u=${encodeURIComponent(r.merchant)}`}
            alt={r.merchant}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-gray-900">
            {r.merchant}
          </div>
          <div className="truncate text-xs text-gray-500">{r.merchantId}</div>
        </div>
      </div>
    ),
  },
  {
    key: "merchantInvoice",
    header: "Merchant Invoice",
    width: "8%",
    cellClassName: "align-middle text-sm font-semibold text-gray-900",
    render: (r) => r.merchantInvoice,
  },
  {
    key: "additionalNote",
    header: "Additional Note",
    width: "18%",
    wrap: true,
    cellClassName: "align-middle text-xs text-gray-600 leading-4",
    render: (r) => r.additionalNote,
  },
  {
    key: "customer",
    header: "Customer ",
    width: "20%",
    wrap: true,
    cellClassName: "align-middle",
    render: (r) => (
      <div className="leading-4">
        <div className="text-xs font-semibold text-gray-900">{r.customer}</div>
        <div className="mt-1 text-[10px] text-gray-500">{r.customerPhone}</div>
        <div className="mt-1 text-[10px] text-gray-400">{r.customerAddress}</div>
      </div>
    ),
  },
  {
    key: "hub",
    header: "HUB",
    width: "10%",
    cellClassName: "align-middle text-sm font-semibold text-gray-900",
    render: (r) => r.hub,
  },
  {
    key: "status",
    header: "Status",
    width: "4%",
    cellClassName: "align-middle",
    render: (r) => <StatusPill status={r.status} />,
  },
  {
    key: "collectedAmount",
    header: "Collected Amount",
    
    // width: "5%",
    cellClassName: "align-middle text-center font-semibold text-[#107E3E]",
    headerClassName: "text-center text-wrap",
    render: (r) => (
      <span>
        {"\u09F3"} {money(r.collectedAmount)}
      </span>
    ),
  },
  {
    key: "deliveryCharge",
    header: "Charge",
    width: "20%",
    // wrap: true,
    cellClassName: "align-middle",
    render: (r) => (
      <div className="text-[10px] leading-4 text-gray-600">
        <div>
          Delivery Charge: {"\u09F3"} {money(r.deliveryCharge)}
        </div>
        <div>
          COD Charge: {"\u09F3"} {money(r.codCharge)}
        </div>
        <div>
          Weight Charge: {"\u09F3"} {money(r.weightCharge)}
        </div>
        <div className="mt-1 text-[#FE5000]">Discount: {r.discount}</div>
      </div>
    ),
  },
  {
    key: "payableAmount",
    header: "Payable",
    width: "8%",
    cellClassName: "align-middle text-center font-semibold text-[#107E3E]",
    headerClassName: "text-center",
    render: (r) => (
      <span>
        {"\u09F3"} {money(r.payableAmount)}
      </span>
    ),
  },
];
