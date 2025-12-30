"use client";

import React from "react";
import { Column } from "@/components/reusable/DataTable";
import { PayoutHistoryRow } from "./PayoutHistoryFakeData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppButton } from "@/components/reusable/CustomButton";

export const payoutHistoryColumns = (): Column<PayoutHistoryRow>[] => [
    {
        key: "id",
        header: "ID",
        width: 80,
        render: (row) => <span className="text-gray-900 font-medium">{row.id}</span>,
    },
    {
        key: "profile",
        header: "Profile",
        width: 250,
        render: (row) => (
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={row.profile.image} alt={row.profile.name} />
                    <AvatarFallback>{row.profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-sm">{row.profile.name}</span>
                    <span className="text-xs text-gray-500">{row.profile.phone}</span>
                </div>
            </div>
        ),
    },
    {
        key: "position",
        header: "Position",
        width: 150,
        render: (row) => <span className="text-gray-700 font-medium">{row.position}</span>,
    },
    {
        key: "assignedHub",
        header: "Assigned HUB",
        width: 150,
        render: (row) => <span className="text-gray-700">{row.assignedHub}</span>,
    },
    {
        key: "lastPaid",
        header: "Last Paid",
        width: 150,
        render: (row) => {
            // Assuming format "30 Sep, 2025 2:35 PM"
            // We can split it or just display as is.
            // The image shows Date on top, Time on bottom arguably, or just inline.
            // "30 Sep, 2025" and "2:35 PM" on next line
            const parts = row.lastPaid.split(" ");
            // rough split strategy or just use the string
            // Let's just try to break it if it's long, or use <br/>
            // Actually the image shows them stacked. 
            // "30 Sep, 2025"
            // "2:35 PM"
            // I'll parse it slightly or just take the string and try to split by last space.
            const datePart = row.lastPaid.substring(0, row.lastPaid.lastIndexOf(" "));
            const timePart = row.lastPaid.substring(row.lastPaid.lastIndexOf(" ") + 1);

            return (
                <div className="flex flex-col">
                    <span className="text-gray-900 text-sm font-medium">{datePart}</span>
                    <span className="text-gray-500 text-xs">{timePart}</span>
                </div>
            )
        },
    },
    {
        key: "salaryPaid",
        header: "Salary Paid",
        width: 120,
        render: (row) => (
            <span className="font-bold text-green-600">৳{row.salaryPaid.toLocaleString()}</span>
        ),
    },
    {
        key: "paidUsing",
        header: "Paid Using",
        width: 120,
        render: (row) => <span className="text-gray-900 font-medium">{row.paidUsing}</span>,
    },
    {
        key: "actions",
        header: "Actions",
        width: 120,
        render: (row) => (
            <AppButton
                variantType="primary"
                className="bg-[#FE5000] hover:bg-[#FE5000]/90 text-white px-4 py-1.5 h-8 text-xs rounded-md"
                onClick={() => { }}
            >
                View Details
            </AppButton>
        ),
    },
];
