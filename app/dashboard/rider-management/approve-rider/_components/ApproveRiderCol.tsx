"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import { AppButton } from "@/components/reusable/CustomButton";

export type ApproveRiderRow = {
  userId: string;
  rider: { name: string; email: string; avatarUrl?: string };
  requestedFor: { title: string; status: "pending" | "approved" | "rejected" };
  requestedAt: string;
  requestedHubBranch: string;
};

function StatusPill({ status }: { status: ApproveRiderRow["requestedFor"]["status"] }) {
  const label =
    status === "pending" ? "Pending" : status === "approved" ? "Approved" : "Rejected";

  const cls =
    status === "pending"
      ? "bg-[#FDEFE6] text-[#FE5000]"
      : status === "approved"
      ? "bg-green-50 text-green-700"
      : "bg-red-50 text-red-700";

  return (
    <span className={`inline-flex items-center justify-center  gap-2 rounded-full px-3 py-1 text-[11px] font-semibold border ${cls}`}>
      {label}
    </span>
  );
}

export const approveRiderColumns = (opts: {
  onClickViewDetails: (row: ApproveRiderRow) => void;
}): Column<ApproveRiderRow>[] => [
  {
    key: "userId",
    header: "UserID",
    width: "12%",
    headerClassName: "text-left",
    cellClassName: "align-middle",
    render: (row) => (
      <span className="text-sm font-semibold text-gray-800">{row.userId}</span>
    ),
  },
  {
    key: "rider",
    header: "Rider Name",
    width: "24%",
    headerClassName: "text-left",
    cellClassName: "align-middle",
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={row.rider.avatarUrl || "https://i.pravatar.cc/80?img=3"}
            alt={row.rider.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col leading-4">
          <span className="text-sm font-semibold text-gray-800">{row.rider.name}</span>
          <span className="text-xs text-gray-500">{row.rider.email}</span>
        </div>
      </div>
    ),
  },
  {
    key: "requestedFor",
    header: "Requested For",
    width: "26%",
    wrap: true,
    headerClassName: "text-left", // Changed from text-center to text-left
    cellClassName: "align-middle", // Removed text-center
    render: (row) => (
      <div className="inline-flex  flex-col gap-1"> {/* Removed items-center justify-center */}
        <span className="text-[11px] font-semibold text-gray-800 ">
          {row.requestedFor.title}
        </span>
        <StatusPill status={row.requestedFor.status} />
        <span className="text-[10px] text-gray-500">{row.requestedAt}</span>
      </div>
    ),
  },
  {
    key: "requestedHubBranch",
    header: "Requested HUB Branch",
    width: "24%",
    headerClassName: "text-left",
    cellClassName: "align-middle",
    render: (row) => (
      <span className="text-sm font-semibold text-gray-800">
        {row.requestedHubBranch}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    width: "14%",
    headerClassName: "", // Changed from text-center to text-left
    cellClassName: "align-middle ", // Removed text-center
    render: (row) => (
      <div className="flex" onClick={(e) => e.stopPropagation()}> {/* Removed justify-end */}
        <AppButton
          variantType="primary"
          className="bg-[#FE5000] hover:bg-[#FE5000]/90 px-6"
          onClick={() => opts.onClickViewDetails(row)}
        >
          View Details
        </AppButton>
      </div>
    ),
  },
];