"use client";

import type { Column } from "@/components/reusable/DataTable";
import type { HubListRow } from "./fakeData";
import { Pencil, Trash2 } from "lucide-react";

export const hubListColumns = (opts: {
  onToggleThirdParty: (rowId: string, next: boolean) => void;
  onClickEdit: (row: HubListRow) => void;
  onClickDelete: (row: HubListRow) => void;
}): Column<HubListRow>[] => [
  {
    key: "id",
    header: "ID",
    width: "8%",
    render: (row) => (
      <span className="text-sm font-bold text-gray-900">{row.id}</span>
    ),
  },
  {
    key: "hubBranch",
    header: "HUB Branch",
    width: "16%",
    render: (row) => (
      <span className="text-sm font-semibold text-gray-900">
        {row.hubBranch}
      </span>
    ),
  },
  {
    key: "address",
    header: "Address",
    width: "22%",
    wrap: true,
    render: (row) => (
      <p className="text-xs text-gray-600 leading-relaxed">{row.address}</p>
    ),
  },
  {
    key: "area",
    header: "Area",
    width: "14%",
    render: (row) => (
      <span className="text-sm font-semibold text-gray-900">{row.area}</span>
    ),
  },
  {
    key: "manager",
    header: "Manager",
    width: "14%",
    render: (row) => (
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900">
          {row.manager.name}
        </span>
        <span className="text-xs text-gray-500">{row.manager.phone}</span>
      </div>
    ),
  },
  {
    key: "pendingAmount",
    header: "Pending Amount",
    width: "12%",
    render: (row) => (
      <span className="text-sm font-bold text-[#107E3E]">
        ৳{new Intl.NumberFormat("en-US").format(row.pendingAmount)}
      </span>
    ),
  },
  {
    key: "thirdParty",
    header: "3rd Party",
    width: "10%",
    render: (row) => (
      <label
        className="relative inline-flex items-center cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={row.thirdParty}
          onChange={(e) => opts.onToggleThirdParty(row.id, e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-checked:bg-[#2DBB4E] transition-colors" />
        <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
      </label>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    width: "10%",
    render: (row) => (
      <div
        className="flex items-center justify-center gap-4 text-gray-500"
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

