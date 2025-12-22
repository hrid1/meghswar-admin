// columns.tsx
"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import type { Parcel } from "./mockData";

export const parcelHistoryColumns: Column<Parcel>[] = [
  {
    key: "customerInfo",
    header: "Customer",
    width: "20%",
    wrap: true,
    render: (row) => {
      const address = row.customerInfo.address || "";
      const shouldTruncate = address.length > 60;
      const displayAddress = shouldTruncate ? `${address.slice(0, 60)}...` : address;

      return (
        <div className="flex flex-col">
          <span className="font-semibold text-sm truncate">{row.customerInfo.name}</span>
          <span className="text-sm text-[#6B6B6B]">{row.customerInfo.phone}</span>
          <div className="relative group">
            <span className="text-xs text-[#8A8A8A]">{displayAddress}</span>
            {shouldTruncate && (
              <div className="absolute left-0 top-1 mb-1 hidden group-hover:block z-50">
                <div className="bg-black/80 text-white text-xs rounded px-3 py-2 max-w-xs whitespace-normal">
                  {address}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    },
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "15%",
    wrap: true,
    render: (row) => (
      <div className="flex flex-col">
        <span className="font-semibold text-sm truncate">{row.merchant}</span>
        <span className="text-xs text-[#6B6B6B] truncate">{row.area}</span>
      </div>
    ),
  },
  {
    key: "rider",
    header: "Rider",
    width: "14%",
    wrap: true,
    render: (row) => (
      <div className="flex flex-col">
        <span className="font-semibold text-sm truncate">{row.rider.name}</span>
        <span className="text-xs text-[#6B6B6B] truncate">{row.rider.phone}</span>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "12%",
    render: (row) => {
      const statusConfig: Record<string, { bg: string; text: string }> = {
        "Delivered": { bg: "bg-green-100", text: "text-green-700" },
        "Return To Merchant": { bg: "bg-red-100", text: "text-red-700" },
        "In Transit": { bg: "bg-blue-100", text: "text-blue-700" },
        "Pending": { bg: "bg-orange-100", text: "text-orange-700" },
        "Out for Delivery": { bg: "bg-purple-100", text: "text-purple-700" },
      };

      const config = statusConfig[row.status] || { bg: "bg-gray-100", text: "text-gray-700" };

      return (
        <span
          className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap ${config.bg} ${config.text}`}
        >
          {row.status}
        </span>
      );
    },
  },
  {
    key: "amount",
    header: "Amount",
    width: "8%",
    render: (row) => <span className="font-bold text-sm">৳ {row.amount.toLocaleString()}</span>,
  },
  {
    key: "age",
    header: "Age",
    width: "6%",
    render: (row) => <span className="text-sm">{row.age} </span>,
  },
  {
    key: "deliveryCharge",
    header: "Charges",
    width: "10%",
    wrap: true,
    render: (row) => (
      <div className="text-xs text-[#555] space-y-0.5">
        <div className="flex justify-between">
          <span>Delivery:</span>
          <span className="font-medium">৳ {row.deliveryCharge}</span>
        </div>
        <div className="flex justify-between">
          <span>Weight:</span>
          <span className="font-medium">৳ {row.weightCharge}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount:</span>
          <span className="font-medium text-green-600">-৳ {row.discount}</span>
        </div>
      </div>
    ),
  },
  {
    key: "createdAt",
    header: "Timeline",
    width: "12%",
    wrap: true,
    render: (row) => (
      <div className="text-xs text-[#6B6B6B] space-y-0.5">
        <div>
          <div className="font-medium text-[#333]">Created:</div>
          <div>{row.createdAt}</div>
        </div>
        <div>
          <div className="font-medium text-[#333]">Updated:</div>
          <div>{row.lastUpdated}</div>
        </div>
      </div>
    ),
  },
];