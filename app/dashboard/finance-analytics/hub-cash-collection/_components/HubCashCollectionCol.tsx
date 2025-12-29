"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import type { HubCashRow } from "./fakeData";
import Link from "next/link";
import { AppButton } from "@/components/reusable/CustomButton";

function money(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export const hubCashCollectionColumns = (opts: {
  onNotifyHub: (row: HubCashRow) => void;
}): Column<HubCashRow>[] => [
  {
    key: "id",
    header: "ID",
    width: "7%",
    cellClassName: "align-middle",
    render: (r) => <span className="text-sm font-semibold text-gray-800">{r.id}</span>,
  },
  {
    key: "hubBranch",
    header: "HUB Branch",
    width: "18%",
    wrap: true,
    cellClassName: "align-middle",
    render: (r) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-gray-900">{r.hubBranch}</span>
        <span className="text-[10px] text-gray-500 leading-4">{r.address}</span>
      </div>
    ),
  },
  {
    key: "area",
    header: "Area",
    width: "12%",
    cellClassName: "align-middle",
    render: (r) => <span className="text-sm font-semibold text-gray-800">{r.area}</span>,
  },
  {
    key: "manager",
    header: "Manager",
    width: "12%",
    cellClassName: "align-middle",
    render: (r) => (
      <div className="flex flex-col leading-4">
        <span className="text-sm font-semibold text-gray-900">{r.manager.name}</span>
        <span className="text-xs text-gray-500">{r.manager.phone}</span>
      </div>
    ),
  },
  {
    key: "lifetimeCollection",
    header: "Lifetime Collection",
    width: "14%",
    wrap: true,
    cellClassName: "align-middle text-center",
    headerClassName: "text-center",
    render: (r) => (
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-sm font-semibold text-green-600">
          {"\u09F3"} {money(r.lifetimeCollection)}
        </span>
        <span className="text-[10px] text-gray-500 leading-4 text-center">
          Last Received on {r.lastReceivedAt}
        </span>
      </div>
    ),
  },
  {
    key: "hubExpenses",
    header: "HUB Expenses",
    width: "10%",
    cellClassName: "align-middle text-center",
    headerClassName: "text-center",
    render: (r) => (
      <span className="text-sm font-semibold text-[#FE5000]">
        {"\u09F3"} {money(r.hubExpenses)}
      </span>
    ),
  },
  {
    key: "pendingAmount",
    header: "Pending Amount",
    width: "11%",
    cellClassName: "align-middle text-center",
    headerClassName: "text-center",
    render: (r) => (
      <span className="text-sm font-semibold text-green-700">
        {"\u09F3"} {money(r.pendingAmount)}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    width: "12%",
    headerClassName: "text-center",
    cellClassName: "align-middle",
    render: (r) => (
      <div className="flex flex-col items-end gap-1" onClick={(e) => e.stopPropagation()}>
        {r.notified ? (
          <span className="inline-flex items-center justify-center rounded-md bg-gray-200 px-5 py-2 text-xs font-semibold text-gray-800">
            Notified
          </span>
        ) : (
          <AppButton
            variantType="primary"
            className="bg-[#FE5000] hover:bg-[#FE5000]/90 px-6 py-2 text-xs rounded-md"
            onClick={() => opts.onNotifyHub(r)}
          >
            Notify HUB
          </AppButton>
        )}
        <span className="text-[10px] text-gray-500">
          Last Notified on {r.lastNotifiedAt ?? "-"}
        </span>
      </div>
    ),
  },
  {
    key: "view",
    header: "View",
    width: "6%",
    headerClassName: "text-center",
    cellClassName: "align-middle text-center",
    render: (r) => (
      <div onClick={(e) => e.stopPropagation()}>
        <Link href={`./hub-cash-collection/${encodeURIComponent(r.id)}`}>
          <AppButton variantType="outline" className="px-4 py-2 text-xs rounded-md">
            View
          </AppButton>
        </Link>
      </div>
    ),
  },
];

