"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import type { CreateAdvanceInvoiceRow } from "./fakeData";

export const createAdvanceInvoiceColumns = (): Column<CreateAdvanceInvoiceRow>[] => [
  {
    key: "merchant",
    header: "Merchant",
    width: "26%",
    cellClassName: "align-middle",
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={r.merchant.avatarUrl || "https://i.pravatar.cc/80?img=12"}
            alt={r.merchant.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col leading-4">
          <span className="text-sm font-semibold text-gray-900">{r.merchant.name}</span>
          <span className="text-xs text-gray-500">{r.merchant.phone}</span>
        </div>
      </div>
    ),
  },
  {
    key: "address",
    header: "Address",
    width: "38%",
    wrap: true,
    cellClassName: "align-middle",
    render: (r) => <span className="text-[10px] text-gray-600 leading-4">{r.address}</span>,
  },
  {
    key: "stores",
    header: "Stores",
    width: "18%",
    headerClassName: "text-center",
    cellClassName: "align-middle text-center",
    render: (r) => <span className="text-sm font-semibold text-gray-900">{r.stores}</span>,
  },
  {
    key: "hubCount",
    header: "HUB Count",
    width: "18%",
    headerClassName: "text-center",
    cellClassName: "align-middle text-center",
    render: (r) => <span className="text-sm font-semibold text-gray-900">{r.hubCount}</span>,
  },
];

