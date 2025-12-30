"use client";

import React from "react";
import { Column } from "@/components/reusable/DataTable";
import { StaffListRow } from "./StaffListFakeData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const staffListColumns = (): Column<StaffListRow>[] => [
    {
        key: "id",
        header: "ID",
        width: "5%",
        render: (row) => <span className="text-gray-900 font-medium">{row.id}</span>,
    },
    {
        key: "profile",
        header: "Profile",
        width: "22%",
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
        width: "12%",
        render: (row) => <span className="text-gray-700 font-medium">{row.position}</span>,
    },
    {
        key: "assignedHub",
        header: "Assigned HUB",
        width: "12%",
        render: (row) => <span className="text-gray-700">{row.assignedHub}</span>,
    },
    {
        key: "secPhone",
        header: "2nd. Phone No.",
        width: "12%",
        render: (row) => <span className="text-gray-700">{row.secPhone}</span>,
    },
    {
        key: "salary",
        header: "Salary",
        width: "10%",
        render: (row) => (
            <span className="font-bold text-green-600">৳{row.salary.toLocaleString()}</span>
        ),
    },
    {
        key: "lastPaid",
        header: "Last Paid",
        width: "17%",
        render: (row) => {
            const parts = row.lastPaid.split(' ');
            const datePart = parts.slice(0, 3).join(' ');
            const timePart = parts.slice(3).join(' ');

            return (
                <div className="flex flex-col leading-snug">
                    <span className="text-gray-900 text-xs font-medium">{datePart}</span>
                    <span className="text-gray-500 text-[10px]">{timePart}</span>
                </div>
            )
        },
    },
    {
        key: "actions",
        header: "Actions",
        width: "10%",
        // Align actions right or center? Image shows standard align.
        render: (row) => (
            <div className="flex items-center gap-2 text-gray-500">
                <Button variant="ghost" className="h-8 w-8 p-0 hover:text-blue-600 hover:bg-blue-50">
                    <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="h-8 w-8 p-0 hover:text-green-600 hover:bg-green-50">
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="h-8 w-8 p-0 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        ),
    },
];
