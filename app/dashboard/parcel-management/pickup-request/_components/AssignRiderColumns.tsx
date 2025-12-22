"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";

export type AssignRiderRow = {
  id: string; // unique id
  hub: string;
  merchant: {
    name: string;
    phone: string | number;
    avatarUrl?: string;
  };
  comments: string;
  rider: {
    name: string;
    phone: string | number;
    avatarUrl?: string;
  };
  parcelQuantity: number;
};

export const AssignRiderColumns = (): Column<AssignRiderRow>[] => [
  {
    key: "hub",
    header: "HUB",
    width: "18%",
    render: (row) => (
      <div className="text-sm font-semibold text-black/80">{row.hub}</div>
    ),
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "22%",
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={row.merchant.avatarUrl || "https://i.pravatar.cc/80?img=12"}
            alt={row.merchant.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col leading-4">
          <span className="text-sm font-semibold">{row.merchant.name}</span>
          <span className="text-xs text-gray-500">
            +{String(row.merchant.phone)}
          </span>
        </div>
      </div>
    ),
  },
  {
    key: "comments",
    header: "Comments",
    width: "30%",
    wrap: true,
    render: (row) => (
      <p className="text-xs text-gray-600 leading-4">
        {row.comments}
      </p>
    ),
  },
  {
    key: "rider",
    header: "Rider Name",
    width: "20%",
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={row.rider.avatarUrl || "https://i.pravatar.cc/80?img=3"}
            alt={row.rider.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col leading-4">
          <span className="text-sm font-semibold">{row.rider.name}</span>
          <span className="text-xs text-gray-500">
            +{String(row.rider.phone)}
          </span>
        </div>
      </div>
    ),
  },
  {
    key: "parcelQuantity",
    header: "Parcel Quantity",
    width: "10%",
    render: (row) => (
      <div className="text-right pr-2 text-base font-semibold">
        {row.parcelQuantity}
      </div>
    ),
  },
];
