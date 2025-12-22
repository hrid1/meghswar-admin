"use client";

import React from "react";
import { Column } from "@/components/reusable/DataTable";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export type ParcelReportRow = {
  id: string;
  customerInfo: { name: string; phone: string; address: string };
  merchant: { name: string; phone: string | number };
  area: string;
  rider: { name: string; phone: string | number };
  status: string;
  reportType: string;
  reason: string;
};

export const parcelReportColumns = (
  onClickUpdate: (row: ParcelReportRow) => void
): Column<ParcelReportRow>[] => [
  {
    key: "id",
    header: "Parcel Id",
    width: "10%",
    render: (row) => <span className="font-semibold">{row.id}</span>,
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
    key: "rider",
    header: "Rider Info",
    width: "16%",
    render: (row) => (
      <div>
        <div className="font-semibold">{row.rider.name}</div>
        <div className="text-xs text-gray-500">{row.rider.phone}</div>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "12%",
    render: (row) => (
      <span
        className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
          row.status === "Delivered"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "reportType",
    header: "Report Type",
    width: "12%",
    wrap: true,
  },
  {
    key: "reason",
    header: "Reason",
    width: "20%",
    wrap: true,
    render: (row) => <span className="text-sm text-gray-600">{row.reason}</span>,
  },
  {
    key: "action",
    header: "Action",
    width: "12%",
    render: (row) => (
      <div className="flex flex-col gap-2 items-center justify-center">
        <Phone className="w-5 h-5 text-green-600" />
        <Button
          onClick={(e) => {
            e.stopPropagation(); // important if you add onRowClick later
            onClickUpdate(row);
            console.log("Update Status Clicked for Parcel:", row.id);
          }}
          size="sm"
          className="bg-red-400"
        >
          Update Status
        </Button>
      </div>
    ),
  },
];
