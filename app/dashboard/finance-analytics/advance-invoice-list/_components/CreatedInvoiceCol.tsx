"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import type { CreatedInvoiceRow } from "./fakeData";
import { CheckCircle2 } from "lucide-react";

function money(n: number) {
    return new Intl.NumberFormat("en-US").format(n);
}

function StatusPill({ status }: { status: CreatedInvoiceRow["clearance"] }) {
    const isPaid = status === "Paid";
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold ${isPaid ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                }`}
        >
            {isPaid && <CheckCircle2 className="w-3 h-3" />}
            {status}
        </span>
    );
}

export const createdInvoiceColumns = (): Column<CreatedInvoiceRow>[] => [
    {
        key: "merchant",
        header: "Merchant",
        width: "30%",
        cellClassName: "align-middle",
        render: (r) => (
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={r.merchant.avatarUrl}
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
        key: "store",
        header: "Store",
        width: "25%",
        cellClassName: "align-middle text-center",
        headerClassName: "text-center",
        render: (r) => <span className="text-sm font-semibold text-gray-700">{r.store}</span>,
    },
    {
        key: "advanceCreated",
        header: "Advance Created",
        width: "25%",
        cellClassName: "align-middle text-center",
        headerClassName: "text-center",
        render: (r) => (
            <span className="text-sm font-bold text-green-600">
                {"\u09F3"} {money(r.advanceCreated)}
            </span>
        ),
    },
    {
        key: "clearance",
        header: "Clearance",
        width: "20%",
        cellClassName: "align-middle text-center",
        headerClassName: "text-center",
        render: (r) => <StatusPill status={r.clearance} />,
    },
];
