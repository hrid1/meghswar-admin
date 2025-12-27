"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import Link from "next/link";
import { AppButton } from "@/components/reusable/CustomButton";

export type MerchantApprovalRow = {
  aid: string;
  userId: string;
  merchant: { name: string; phone: string; avatarUrl?: string };
  requestedFor: { title: string; status: "pending" | "approved" | "rejected" };
  requestedAt: string;
  address: string;
};

function StatusPill({
  status,
}: {
  status: MerchantApprovalRow["requestedFor"]["status"];
}) {
  const label =
    status === "pending" ? "Pending" : status === "approved" ? "Approved" : "Rejected";

  const cls =
    status === "pending"
      ? "bg-[#FDEFE6] text-[#FE5000] border-[#F7C9AE]"
      : status === "approved"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-red-50 text-red-700 border-red-200";

  return (
    <span
      className={[
        "inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold border w-fit",
        cls,
      ].join(" ")}
    >
      {label}
    </span>
  );
}

export const merchantApprovalColumns = (): Column<MerchantApprovalRow>[] => [
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
    key: "merchant",
    header: "Merchant Name",
    width: "28%",
    headerClassName: "text-left",
    cellClassName: "align-middle",
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={row.merchant.avatarUrl || "https://i.pravatar.cc/80?img=12"}
            alt={row.merchant.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col leading-4">
          <span className="text-sm font-semibold text-gray-800">
            {row.merchant.name}
          </span>
          <span className="text-xs text-gray-500">{row.merchant.phone}</span>
        </div>
      </div>
    ),
  },
  {
    key: "requestedFor",
    header: "Requested For",
    width: "22%",
    wrap: true,
    headerClassName: "text-left",
    cellClassName: "align-middle",
    render: (row) => (
      <div className="inline-flex flex-col gap-1">
        <span className="text-[11px] font-semibold text-gray-800">
          {row.requestedFor.title}
        </span>
        <StatusPill status={row.requestedFor.status} />
        <span className="text-[10px] text-gray-500">{row.requestedAt}</span>
      </div>
    ),
  },
  {
    key: "address",
    header: "Address",
    width: "26%",
    wrap: true,
    headerClassName: "text-left",
    cellClassName: "align-middle text-sm text-gray-600",
    render: (row) => <span className="text-sm text-gray-600">{row.address}</span>,
  },
  {
    key: "actions",
    header: "Actions",
    width: "12%",
    headerClassName: "",
    cellClassName: "align-middle",
    render: (row) => (
      <div className="flex" onClick={(e) => e.stopPropagation()}>
        <Link href={`/dashboard/merchant-management/merchant-approval/${encodeURIComponent(row.aid)}`}>
          <AppButton
            variantType="primary"
            className="bg-[#FE5000] hover:bg-[#FE5000]/90 px-6"
          >
            View Details
          </AppButton>
        </Link>
      </div>
    ),
  },
];

