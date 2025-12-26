"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import { AppButton } from "@/components/reusable/CustomButton";

export type VerifyOtpStatus = "Delivered" | "Partial Delivery" | "Return";

export type VerifyOtpRow = {
  parcelId: string;
  rider: { name: string; phone: string; avatarUrl?: string };
  requestedFor: { title: string; status: VerifyOtpStatus; requestedAt: string };
  customerInfo: { name: string; phone: string; address: string };
  merchant: { name: string; phone: string };
  hubName: string;
};

function StatusChip({ status }: { status: VerifyOtpStatus }) {
  const cls =
    status === "Delivered"
      ? "bg-green-100 text-green-700"
      : status === "Partial Delivery"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`inline-flex items-center w-fit gap-2 rounded-full px-3 py-1 text-[11px] font-semibold ${cls}`}
    >
      {status}
    </span>
  );
}

export const verifyOtpColumns = (opts: {
  onApprove: (row: VerifyOtpRow) => void;
  onDecline: (row: VerifyOtpRow) => void;
}): Column<VerifyOtpRow>[] => [
  {
    key: "parcelId",
    header: "Parcel ID",
    width: "10%",
    headerClassName: "text-left",
    cellClassName: "align-middle",
    render: (r) => (
      <span className="text-sm font-semibold text-gray-800">{r.parcelId}</span>
    ),
  },
  {
    key: "rider",
    header: "Rider",
    width: "14%",
    headerClassName: "text-left",
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
    key: "requestedFor",
    header: "Requested For",
    width: "14%",
    headerClassName: "text-left",
    cellClassName: "align-middle",
    wrap: true,
    render: (r) => (
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-semibold text-gray-800">
          {r.requestedFor.title}
        </span>
        <StatusChip status={r.requestedFor.status} />
        <span className="text-[10px] text-gray-500">
          {r.requestedFor.requestedAt}
        </span>
      </div>
    ),
  },
  {
    key: "customerInfo",
    header: "Customer Info",
    width: "19%",
    headerClassName: "text-left",
    cellClassName: "align-middle",
    wrap: true,
    render: (r) => (
      <div className="flex flex-col gap-0.5 text-sm text-gray-800">
        <span className="font-semibold">{r.customerInfo.name}</span>
        <span className="text-xs text-gray-600">{r.customerInfo.phone}</span>
        <span className="text-[11px] text-gray-500 leading-4">
          {r.customerInfo.address}
        </span>
      </div>
    ),
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "14%",
    headerClassName: "text-left",
    cellClassName: "align-middle",
    wrap: true,
    render: (r) => (
      <div className="flex flex-col leading-4">
        <span className="text-sm font-semibold text-gray-900">
          {r.merchant.name}
        </span>
        <span className="text-xs text-gray-500">{r.merchant.phone}</span>
      </div>
    ),
  },
  {
    key: "hubName",
    header: "HUB Name",
    width: "12%",
    headerClassName: "text-left",
    cellClassName: "align-middle",
    render: (r) => (
      <span className="text-sm font-semibold text-gray-800">{r.hubName}</span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    width: "17%",
    headerClassName: "text-center",
    cellClassName: "align-middle",
    render: (r) => (
      <div
        className="flex items-center justify- gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <AppButton
          variantType="approve"
          className="bg-green-500 hover:bg-green-600 text-xs"
          onClick={() => opts.onApprove(r)}
        >
          Approve
        </AppButton>
        <AppButton
          variantType="danger"
          className="bg-red- 500 hover:bg- red-600 px-5 py-2 text-xs rounded-md"
          onClick={() => opts.onDecline(r)}
        >
          Decline
        </AppButton>
      </div>
    ),
  },
];
