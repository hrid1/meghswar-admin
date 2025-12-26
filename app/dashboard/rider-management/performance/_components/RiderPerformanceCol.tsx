"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";

export type RiderPerformanceRow = {
  date: string;
  rider: { name: string; phone: string; avatarUrl?: string };
  delivered: number;
  rescheduled: number;
  returned: number;
  assigned: number;
  commission: number;
  collectedAmount: number;
  successRate: number; // 0-100
};

export const riderPerformanceColumns = (): Column<RiderPerformanceRow>[] => [
  {
    key: "date",
    header: "Date",
    width: "14%",
    cellClassName: "align-middle",
    render: (r) => <span className="text-sm text-gray-700">{r.date}</span>,
  },
  {
    key: "rider",
    header: "Rider",
    width: "22%",
    cellClassName: "align-middle",
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gray-200 overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={r.rider.avatarUrl || "https://i.pravatar.cc/80?img=3"}
            alt={r.rider.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-gray-900">{r.rider.name}</p>
          <p className="text-xs text-gray-500">{r.rider.phone}</p>
        </div>
      </div>
    ),
  },
  {
    key: "delivered",
    header: "Delivered",
    width: "9%",
    cellClassName: "align-middle",
    render: (r) => (
      <span className="text-sm font-semibold text-green-600">{r.delivered}</span>
    ),
  },
  {
    key: "rescheduled",
    header: "Rescheduled",
    width: "10%",
    cellClassName: "align-middle",
    render: (r) => (
      <span className="text-sm font-semibold text-[#FE5000]">
        {r.rescheduled}
      </span>
    ),
  },
  {
    key: "returned",
    header: "Returned",
    width: "9%",
    cellClassName: "align-middle",
    render: (r) => (
      <span className="text-sm font-semibold text-red-600">{r.returned}</span>
    ),
  },
  {
    key: "assigned",
    header: "Assigned",
    width: "9%",
    cellClassName: "align-middle",
    render: (r) => <span className="text-sm font-semibold">{r.assigned}</span>,
  },
  {
    key: "commission",
    header: "Comission",
    width: "10%",
    cellClassName: "align-middle",
    render: (r) => (
      <span className="text-sm font-semibold text-green-600">
        {"\u09F3"} {new Intl.NumberFormat("en-US").format(r.commission)}
      </span>
    ),
  },
  {
    key: "collectedAmount",
    header: "Collected Amount",
    width: "12%",
    cellClassName: "align-middle",
    render: (r) => (
      <span className="text-sm font-semibold text-green-600">
        {"\u09F3"} {new Intl.NumberFormat("en-US").format(r.collectedAmount)}
      </span>
    ),
  },
  {
    key: "successRate",
    header: "Success Rate",
    width: "10%",
    cellClassName: "align-middle",
    render: (r) => (
      <span className="text-sm font-semibold text-green-700">
        {Math.round(r.successRate)}%
      </span>
    ),
  },
];

