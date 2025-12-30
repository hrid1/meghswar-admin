"use client";

import React from "react";
import { Column } from "@/components/reusable/DataTable";
import { PaymentHistoryRow } from "./PaymentHistoryFakeData";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const paymentHistoryColumns = (): Column<PaymentHistoryRow>[] => [
    {
        key: "transactionId",
        header: "Transaction ID",
        width: 150,
        render: (row) => <span className="text-gray-600 font-mono text-xs">{row.transactionId}</span>,
    },
    {
        key: "payee",
        header: "Payee Name",
        width: 200,
        render: (row) => <span className="font-medium text-gray-900">{row.payee}</span>,
    },
    {
        key: "amount",
        header: "Amount",
        width: 120,
        render: (row) => (
            <span className="text-gray-900 font-semibold">${row.amount.toLocaleString()}</span>
        ),
    },
    {
        key: "paymentMethod",
        header: "Method",
        width: 150,
        render: (row) => <span className="text-gray-600">{row.paymentMethod}</span>,
    },
    {
        key: "date",
        header: "Payment Date",
        width: 180,
        render: (row) => <span className="text-gray-500 text-sm">{row.date}</span>,
    },
    {
        key: "status",
        header: "Status",
        width: 120,
        render: (row) => {
            let colorClass = "bg-gray-100 text-gray-800";
            if (row.status === "Completed") colorClass = "bg-green-100 text-green-800";
            if (row.status === "Failed") colorClass = "bg-red-100 text-red-800";
            if (row.status === "Refunded") colorClass = "bg-purple-100 text-purple-800";

            return (
                <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
                >
                    {row.status}
                </span>
            );
        },
    },
    {
        key: "processedBy",
        header: "Processed By",
        width: 150,
        render: (row) => <span className="text-gray-600 italic">{row.processedBy}</span>,
    },
    {
        key: "actions",
        header: "View",
        width: 80,
        render: (row) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.transactionId)}>
                        Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem>View Receipt</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
