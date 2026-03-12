"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import Link from "next/link";
import { AppButton } from "@/components/reusable/CustomButton";

export type CreateMerchantInvoiceRow = {
  id: string;
  merchant: {
    name: string;
    phone: string;
    avatarUrl?: string;
  };
  totalParcel: number;
  parcelDelivered: number;
  parcelReturned: number;
  collectable: number;
  collectedAmount: number;
  deliveryCharge: number;
  dueAmount: number;
  merchantAddress: string;
};

function money(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export const createMerchantInvoiceColumns = (): Column<CreateMerchantInvoiceRow>[] => [
  {
    key: "merchant",
    header: "Merchant",
    width: "20%",
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={r.merchant.avatarUrl || "https://i.pravatar.cc/80"}
            alt={r.merchant.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">
            {r.merchant.name}
          </span>
          <span className="text-xs text-gray-500">{r.merchant.phone}</span>
        </div>
      </div>
    ),
  },

  {
    key: "totalParcel",
    header: "Total Parcel",
    width: "8%",
    headerClassName: "text-center",
    cellClassName: "text-center",
    render: (r) => <span className="font-semibold">{r.totalParcel}</span>,
  },

  {
    key: "parcelDelivered",
    header: "Delivered",
    width: "8%",
    headerClassName: "text-center",
    cellClassName: "text-center",
    render: (r) => <span className="font-semibold">{r.parcelDelivered}</span>,
  },

  {
    key: "parcelReturned",
    header: "Returned",
    width: "8%",
    headerClassName: "text-center",
    cellClassName: "text-center",
    render: (r) => <span className="font-semibold">{r.parcelReturned}</span>,
  },

  {
    key: "collectable",
    header: "Collectable",
    width: "10%",
    headerClassName: "text-right",
    cellClassName: "text-right",
    render: (r) => (
      <span className="text-green-600 font-semibold">
        ৳ {money(r.collectable)}
      </span>
    ),
  },

  {
    key: "collectedAmount",
    header: "Collected",
    width: "10%",
    headerClassName: "text-right",
    cellClassName: "text-right",
    render: (r) => (
      <span className="font-semibold">৳ {money(r.collectedAmount)}</span>
    ),
  },

  {
    key: "deliveryCharge",
    header: "Delivery Charge",
    width: "10%",
    headerClassName: "text-right",
    cellClassName: "text-right",
    render: (r) => <span>৳ {money(r.deliveryCharge)}</span>,
  },

  {
    key: "dueAmount",
    header: "Due Amount",
    width: "10%",
    headerClassName: "text-right",
    cellClassName: "text-right",
    render: (r) => (
      <span className="font-semibold text-red-600">
        ৳ {money(r.dueAmount)}
      </span>
    ),
  },

  {
    key: "merchantAddress",
    header: "Address",
    width: "16%",
    wrap: true,
    render: (r) => (
      <span className="text-xs text-gray-600">{r.merchantAddress}</span>
    ),
  },

  {
    key: "view",
    header: "View",
    width: "8%",
    headerClassName: "text-center",
    cellClassName: "text-center",
    render: (r) => (
      <Link href={`./create-merchant-invoice/${r.id}`}>
        <AppButton
          variantType="outline"
          className="px-4 py-2 text-xs rounded-md"
        >
          View
        </AppButton>
      </Link>
    ),
  },
];