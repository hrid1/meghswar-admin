"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";

export type RiderStatus = "On Duty" | "Leave" | "Break";

export type RiderStatusRow = {
  id: string;
  profile: { name: string; phone: string; avatarUrl?: string };
  assignedHub: string;
  status: RiderStatus;
  licenseNo: string;
  performance: number;
};

function StatusText({ status }: { status: RiderStatus }) {
  const cls =
    status === "On Duty"
      ? "text-green-700"
      : status === "Leave"
      ? "text-orange-600"
      : "text-gray-700";

  return <span className={`text-sm font-medium ${cls}`}>{status}</span>;
}

export const riderStatusColumns = (): Column<RiderStatusRow>[] => [
  {
    key: "id",
    header: "ID",
    width: "10%",
    headerClassName: "text-left",
    cellClassName: "align-middle",
    render: (r) => <span className="text-sm text-gray-700">{r.id}</span>,
  },
  {
    key: "profile",
    header: "Profile",
    width: "30%",
    headerClassName: "text-left",
    cellClassName: "align-middle",
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={r.profile.avatarUrl || "https://i.pravatar.cc/80?img=3"}
            alt={r.profile.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col leading-4">
          <span className="text-sm font-semibold text-gray-900">
            {r.profile.name}
          </span>
          <span className="text-xs text-gray-500">{r.profile.phone}</span>
        </div>
      </div>
    ),
  },
  {
    key: "assignedHub",
    header: "Assigned HUB",
    width: "18%",
    headerClassName: "text-left",
    cellClassName: "align-middle",
    render: (r) => (
      <span className="text-sm text-gray-800">{r.assignedHub}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "18%",
    headerClassName: "text-left",
    cellClassName: "align-middle",
    render: (r) => <StatusText status={r.status} />,
  },
  {
    key: "licenseNo",
    header: "License No.",
    width: "14%",
    headerClassName: "text-left",
    cellClassName: "align-middle",
    render: (r) => <span className="text-sm text-gray-700">{r.licenseNo}</span>,
  },
  {
    key: "performance",
    header: "Rider's Performance",
    width: "10%",
    headerClassName: "text-left",
    cellClassName: "align-middle",
    render: (r) => <span className="text-sm text-gray-700">{r.performance}</span>,
  },
];

