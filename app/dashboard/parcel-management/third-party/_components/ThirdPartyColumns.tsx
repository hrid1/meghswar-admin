"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";

export type ThirdPartyParcelRow = {
  parcelid: string;
  customerInfo: { name: string; phone: string; address: string };
  additionalNote: string;
  merchant: { name: string; phone: string | number };
  area: string;
  amount: number;
  age: string; // "2 Days"
};

export const thirdPartyColumns = (
  onClickUpdate: (row: ThirdPartyParcelRow) => void
): Column<ThirdPartyParcelRow>[] => [
  {
    key: "parcelid",
    header: "Parcel Id",
    width: "10%",
    render: (row) => <span className="font-semibold">{row.parcelid}</span>,
  },
  {
    key: "customerInfo",
    header: "Customer",
    width: "22%",
    wrap: true,
    render: (row) => (
      <div className="flex flex-col">
        <span className="font-semibold">{row.customerInfo.name}</span>
        <span className="text-sm text-gray-500">{row.customerInfo.phone}</span>
        <span className="text-xs text-gray-400">{row.customerInfo.address}</span>
      </div>
    ),
  },
  {
    key: "additionalNote",
    header: "Additional Note",
    width: "18%",
    wrap: true,
    render: (row) => <p className="text-sm text-gray-700">{row.additionalNote}</p>,
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "18%",
    wrap: true,
    render: (row) => (
      <div>
        <div className="font-semibold">{row.merchant.name}</div>
        <div className="text-xs text-gray-500">{row.merchant.phone}</div>
        <div className="text-xs text-gray-400">{row.area}</div>
      </div>
    ),
  },
  {
    key: "area",
    header: "Area",
    width: "14%",
    wrap: true,
    render: (row) => <span className="text-sm text-gray-600">{row.area}</span>,
  },
  {
    key: "amount",
    header: "Amount",
    width: "9%",
    render: (row) => <span className="text-sm text-gray-600">{row.amount}</span>,
  },
  {
    key: "age",
    header: "Age",
    width: "9%",
    render: (row) => <span className="text-sm text-gray-600">{row.age}</span>,
  },
];
