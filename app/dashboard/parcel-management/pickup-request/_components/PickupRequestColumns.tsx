"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import { Button } from "@/components/ui/button";

export type PickupRequestRow = {
  parcelid: string; // "REQ-2001"
  additionalNote: string;
  merchant: { name: string; phone: string };
  area: string;
  amount: number;
};

export const pickupRequestColumns = (
  onClickAssign: (row: PickupRequestRow) => void
): Column<PickupRequestRow>[] => [
  {
    key: "parcelid",
    header: "Request Id",
    width: "14%",
    render: (row) => <span className="font-semibold">{row.parcelid}</span>,
  },
  {
    key: "additionalNote",
    header: "Pickup Location",
    width: "28%",
    wrap: true,
    render: (row) => <p className="text-sm">{row.additionalNote}</p>,
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "22%",
    render: (row) => (
      <div>
        <div className="font-semibold">{row.merchant.name}</div>
        <div className="text-xs text-gray-500">{row.merchant.phone}</div>
      </div>
    ),
  },
  {
    key: "comments",
    header: "Comment",
    width: "20%",
    wrap: true,
    render: (row) => <span className="text-sm text-gray-600">{row.area}</span>,
  },
  {
    key: "amount",
    header: "Parcel Quantity",
    width: "10%",
    render: (row) => (
      <span className="font-semibold text-gray-900">{row.amount}</span>
    ),
  },
  {
    key: "action",
    header: "Action",
    width: "16%",
    render: (row) => (
      <Button
        size="sm"
        className="bg-orange-500 text-white"
        onClick={(e) => {
          e.stopPropagation();
          onClickAssign(row);
        }}
      >
        Assign
      </Button>
    ),
  },
];
