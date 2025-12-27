"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import type { MerchantStoreRow } from "./storeFakeData";
import { Eye, Pencil, Trash2 } from "lucide-react";

function StatusPill({ status }: { status: MerchantStoreRow["status"] }) {
  const cls =
    status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-200 text-gray-600";
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${cls}`}>
      {status}
    </span>
  );
}

export const storesColumns = (opts: {
  onView: (row: MerchantStoreRow) => void;
  onEdit: (row: MerchantStoreRow) => void;
  onDelete: (row: MerchantStoreRow) => void;
}): Column<MerchantStoreRow>[] => [
  {
    key: "id",
    header: "ID",
    width: "10%",
    cellClassName: "align-middle",
    render: (r) => <span className="text-sm text-gray-700">{r.id}</span>,
  },
  {
    key: "storeName",
    header: "Store Name",
    width: "16%",
    cellClassName: "align-middle",
    render: (r) => <span className="text-sm font-semibold text-gray-900">{r.storeName}</span>,
  },
  {
    key: "phone",
    header: "Phone",
    width: "14%",
    cellClassName: "align-middle",
    render: (r) => <span className="text-sm text-gray-700">{r.phone}</span>,
  },
  {
    key: "storeAddress",
    header: "Store Address",
    width: "22%",
    wrap: true,
    cellClassName: "align-middle",
    render: (r) => <span className="text-xs text-gray-600 leading-5">{r.storeAddress}</span>,
  },
  {
    key: "performance",
    header: "Performance",
    width: "20%",
    wrap: true,
    cellClassName: "align-middle",
    render: (r) => (
      <div className="text-[10px] text-gray-600 leading-4">
        <div>
          Total Parcels Handled:{" "}
          <span className="font-semibold text-gray-800">
            {r.performance.totalParcelsHandled}
          </span>
        </div>
        <div>
          Successfully Delivered:{" "}
          <span className="font-semibold text-gray-800">
            {r.performance.successfullyDelivered}
          </span>
        </div>
        <div>
          Total Returns:{" "}
          <span className="font-semibold text-gray-800">
            {r.performance.totalReturns}
          </span>
        </div>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "10%",
    headerClassName: "text-center",
    cellClassName: "align-middle text-center",
    render: (r) => <StatusPill status={r.status} />,
  },
  {
    key: "actions",
    header: "Actions",
    width: "8%",
    headerClassName: "text-center",
    cellClassName: "align-middle",
    render: (r) => (
      <div
        className="flex items-center justify-center gap-3 text-gray-500"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="hover:text-[#FE5000] transition-colors"
          title="View"
          onClick={() => opts.onView(r)}
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="hover:text-[#FE5000] transition-colors"
          title="Edit"
          onClick={() => opts.onEdit(r)}
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="hover:text-red-500 transition-colors"
          title="Delete"
          onClick={() => opts.onDelete(r)}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ),
  },
];

