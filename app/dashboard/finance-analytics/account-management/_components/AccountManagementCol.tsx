"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import type { AccountRow } from "./fakeData";
import { AppButton } from "@/components/reusable/CustomButton";
import Link from "next/link";

const money = (n: number) => new Intl.NumberFormat("en-US").format(n);

export const accountManagementColumns = (
    onViewStatement: (row: AccountRow) => void,
    onBalanceTransfer: (row: AccountRow) => void
): Column<AccountRow>[] => [
        {
            key: "bank",
            header: "Bank",
            width: "20%",
            cellClassName: "align-middle",
            render: (r) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={r.bank.logoUrl || "https://via.placeholder.com/40"}
                            alt={r.bank.name}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                    <span className="text-sm font-semibold text-black">{r.bank.name}</span>
                </div>
            ),
        },
        {
            key: "accountNo",
            header: "Account No.",
            width: "15%",
            cellClassName: "align-middle font-semibold text-sm",
            render: (r) => <span>{r.accountNo}</span>,
        },
        {
            key: "holderName",
            header: "Acc. Holder Name",
            width: "15%",
            cellClassName: "align-middle font-semibold text-sm",
            render: (r) => <span>{r.holderName}</span>,
        },
        {
            key: "balance",
            header: "Acc. Balance",
            width: "15%",
            cellClassName: "align-middle",
            render: (r) => (
                <div className="flex flex-col">
                    <span className="text-[#00A533] font-semibold text-sm">
                        {"\u09F3"} {money(r.balance.amount)}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                        Last Used: {r.balance.lastUsed}
                    </span>
                </div>
            ),
        },
        {
            key: "status",
            header: "Status",
            width: "10%",
            cellClassName: "align-middle text-center",
            headerClassName: "text-center",
            render: (r) => (
                <span className="bg-[#E6FFF0] text-[#00A533] px-3 py-1 rounded-full text-[10px] font-semibold">
                    {r.status}
                </span>
            ),
        },
        {
            key: "statements",
            header: "Statements",
            width: "10%",
            cellClassName: "align-middle text-center",
            headerClassName: "text-center",
            render: (r) => (
                <button
                    onClick={() => onViewStatement(r)}
                    className="text-[#FE5000] text-[11px] font-semibold underline hover:text-[#FE5000]/80"
                >
                    View Statements
                </button>
            ),
        },
        {
            key: "actions",
            header: "Actions",
            width: "13%",
            cellClassName: "align-middle",
            headerClassName: "text-center",
            render: (r) => (
                <div className="flex items-center justify-center">
                    <div className="inline-flex flex-col   gap-2  " onClick={(e) => e.stopPropagation()}>
                        <AppButton
                            variantType="outline"
                            className="bg-[#FFF4E6] border-none text-[#FE5000] px-3 py-1 rounded-lg text-[11px] font-semibold hover:bg-[#FFE7CC]"
                            onClick={() => { }}
                        >
                            Pause
                        </AppButton>
                        <AppButton
                            variantType="primary"
                            className="bg-[#FE5000] hover:bg-[#FE5000]/90 text-white px-3 py-1 rounded-lg text-[11px] font-semibold"
                            onClick={() => onBalanceTransfer(r)}
                        >
                            Balance Transfer
                        </AppButton>
                    </div>
                </div>
            ),
        },
    ];
