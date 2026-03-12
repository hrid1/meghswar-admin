"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import type { MerchantStoreRow } from "./storeFakeData";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

function StatusPill({ status }: { status: MerchantStoreRow["status"] }) {
  const cls =
    status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-200 text-gray-600";
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${cls}`}
    >
      {status}
    </span>
  );
}

export const storesColumns = (opts: {
  mid?: string;
  onView: (row: MerchantStoreRow) => void;
  onEdit: (row: MerchantStoreRow) => void;
  onDelete: (row: MerchantStoreRow) => void;
  onAssign: (row: MerchantStoreRow) => void;
  onSetCharges: (row: MerchantStoreRow) => void;
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
    render: (r) => (
      <span className="text-sm font-semibold text-gray-900">{r.business_name}</span>
    ),
  },
  {
    key: "phone",
    header: "Phone",
    width: "14%",
    cellClassName: "align-middle",
    render: (r) => <span className="text-sm text-gray-700">{r.phone_number}</span>,
  },
  {
    key: "storeAddress",
    header: "Store Address",
    width: "22%",
    wrap: true,
    cellClassName: "align-middle",
    render: (r) => (
      <span className="text-xs text-gray-600 leading-5">{r.business_address}</span>
    ),
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
            {r.performance.total_parcels_handled} 
          </span>
        </div>
        <div>
          Successfully Delivered:{" "}
          <span className="font-semibold text-gray-800">
            {r.performance.successfully_delivered}
          </span>
        </div>
        <div>
          Total Returns:{" "}
          <span className="font-semibold text-gray-800">
            {r.performance.total_returns}
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
        {/* <button
          type="button"
          className="hover:text-[#FE5000] transition-colors"
          title="View"
          onClick={() => opts.onView(r)}
        >
          <Eye className="h-4 w-4" />
        </button> */}

        {/* <Link
          href={
            opts.mid
              ? `/dashboard/merchant-management/merchant-list/${opts.mid}/store/${r.id}`
              : `store/${r.id}`
          }
          className=""
        >
          <Eye className="h-4 w-4" />
        </Link>
        <button
          type="button"
          className="hover:text-[#FE5000] transition-colors"
          title="Edit"
          onClick={() => opts.onEdit(r)}
        >
          <Pencil className="h-4 w-4" />
        </button> */}

        <div className="flex items-center gap-2 flex-col">
          <button
            type="button"
            className="hover:text-red-500 transition-colors bg-amber-500 text-white py-1 px-1.5 rounded cursor-pointer"
            title="Assign Hub"
            onClick={() => opts.onAssign(r)}
          >
            Assign Hub
          </button>
          <button
            type="button"
            className="hover:text-red-500 transition-colors bg-amber-500 text-white py-1 px-1.5 rounded cursor-pointer"
            title="Set Charges"
            onClick={() => opts.onSetCharges(r)}
          >
            Set Charges
          </button>
        </div>
      </div>
    ),
  },
];
