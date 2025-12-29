"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import type { ExpenseRow } from "./fakeData";
import { AppButton } from "@/components/reusable/CustomButton";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";

const money = (n: number) => new Intl.NumberFormat("en-US").format(n);

function StatusPill({ status }: { status: ExpenseRow["status"] }) {
    const config = {
        "In Review": { bg: "bg-[#FFF4E6]", text: "text-[#FE5000]", icon: null, label: "In Review" },
        Approved: { bg: "bg-[#E6FFF0]", text: "text-[#00A533]", icon: <CheckCircle2 className="w-3 h-3" />, label: "Approved" },
        Declined: { bg: "bg-[#FFEBEE]", text: "text-[#FF4D4F]", icon: <XCircle className="w-3 h-3" />, label: "Declined" },
    };
    const c = config[status];
    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold ${c.bg} ${c.text}`}>
            {c.icon}
            {c.label}
        </span>
    );
}

export const approveExpenseColumns = (): Column<ExpenseRow>[] => [
    {
        key: "date",
        header: "Date",
        width: "10%",
        cellClassName: " pt-4 font-semibold text-sm",
        render: (r) => <span>{r.date}</span>,
    },
    {
        key: "hub",
        header: "HUB",
        width: "18%",
        cellClassName: "align-top pt-4",
        render: (r) => (
            <div className="flex flex-col gap-1 pr-4">
                <span className="text-sm font-semibold text-black leading-tight ">{r.hub.name}</span>
                <span className="text-[10px] text-gray-400 font-medium leading-relaxed  text-wrap">
                    {r.hub.address}
                </span>
            </div>
        ),
    },
    {
        key: "category",
        header: "Category",
        width: "12%",
        cellClassName: " pt-4 text-center",
        headerClassName: "text-center",
        render: (r) => <span className="text-sm font-semibold text-black">{r.category}</span>,
    },
    {
        key: "amount",
        header: "Amount",
        width: "10%",
        cellClassName: " pt-4 text-center",
        headerClassName: "text-center",
        render: (r) => (
            <span className="text-sm font-semibold text-[#00A533]">
                {"\u09F3"} {money(r.amount)}
            </span>
        ),
    },
    {
        key: "proof",
        header: "Proof",
        width: "10%",
        cellClassName: " pt-4 text-center",
        headerClassName: "text-center",
        render: (r) => (
            <Link
                href={r.proofUrl || "#"}
                className="text-[#FE5000] text-[11px] font-semibold underline hover:text-[#FE5000]/80"
            >
                View Proof
            </Link>
        ),
    },
    {
        key: "reason",
        header: "Reason",
        width: "18%",
        cellClassName: " pt-4",
        wrap: true,
        render: (r) => (
            <span className="text-[11px] text-gray-600 leading-relaxed text-wrap">{r.reason}</span>
        ),
    },
    {
        key: "status",
        header: "Status",
        width: "10%",
        cellClassName: " pt-4 text-center",
        headerClassName: "text-center",
        render: (r) => <StatusPill status={r.status} />,
    },
    {
        key: "actions",
        header: "Actions",
        width: "12%",
        cellClassName: " pt-4",
        headerClassName: "text-center",
        render: (r) => (
            <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                <AppButton
                    variantType="primary"
                    className="bg-[#00A533] hover:bg-[#00A533]/90 text-white px-3 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1"
                    onClick={() => { }}
                >
                    <CheckCircle2 className="w-3 h-3" />
                    Approve
                </AppButton>
                <AppButton
                    variantType="outline"
                    className="bg-[#FF4D4F] border-none text-white px-3 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1 hover:bg-[#FF4D4F]"
                    onClick={() => { }}
                >
                    <XCircle className="w-3 h-3" />
                    Decline
                </AppButton>
            </div>
        ),
    },
];
