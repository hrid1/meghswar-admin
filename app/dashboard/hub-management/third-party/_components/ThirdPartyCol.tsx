"use client";

import type { Column } from "@/components/reusable/DataTable";
import type { ThirdPartyRow } from "./fakeData";
import { Pause, Pencil, Trash2 } from "lucide-react";

export const thirdPartyColumns = (opts: {
  onClickEdit: (row: ThirdPartyRow) => void;
  onClickPause: (row: ThirdPartyRow) => void;
  onClickDelete: (row: ThirdPartyRow) => void;
}): Column<ThirdPartyRow>[] => [
  {
    key: "userId",
    header: "UserID",
    width: "12%",
    render: (row) => (
      <span className="text-sm font-bold text-gray-900">{row.userId}</span>
    ),
  },
  {
    key: "party",
    header: "Party Name",
    width: "34%",
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
          {row.party.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={row.party.logoUrl}
              alt={row.party.name}
              className="h-full w-full object-contain p-1"
            />
          ) : (
            <span className="text-xs font-semibold text-gray-500">
              {row.party.name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        <span className="text-sm font-semibold text-gray-900">
          {row.party.name}
        </span>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "18%",
    render: (row) => {
      const isActive = row.status === "Active";
      return (
        <span
          className={[
            "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold border w-fit",
            isActive
              ? "bg-[#DBFFE6] text-[#0B8F3C] border-[#BDF5CF]"
              : "bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]",
          ].join(" ")}
        >
          <span
            className={[
              "h-4 w-4 rounded-full flex items-center justify-center",
              isActive ? "bg-[#0B8F3C]" : "bg-[#6B7280]",
            ].join(" ")}
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
            >
              <path
                d="M8.25 13.25L4.75 9.75L3.5 11L8.25 15.75L16.5 7.5L15.25 6.25L8.25 13.25Z"
                fill="white"
              />
            </svg>
          </span>
          {row.status}
        </span>
      );
    },
  },
  {
    key: "parcelsDelivered",
    header: "Parcels Delivered",
    width: "20%",
    render: (row) => (
      <span className="text-sm font-semibold text-gray-900">
        {row.parcelsDelivered}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    headerClassName:"pl-8",
    width: "16%",
    render: (row) => (
      <div
        className="flex items-center justify-start gap-4 text-gray-500 "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="hover:text-[#FE5000] transition-colors"
          title="Edit"
          onClick={() => opts.onClickEdit(row)}
        >
          <Pencil className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="hover:text-[#111827] transition-colors"
          title="Pause"
          onClick={() => opts.onClickPause(row)}
        >
          <Pause className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="hover:text-red-500 transition-colors"
          title="Delete"
          onClick={() => opts.onClickDelete(row)}
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    ),
  },
];

