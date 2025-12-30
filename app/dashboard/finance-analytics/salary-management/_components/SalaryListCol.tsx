"use client";

import React from "react";
import { Column } from "@/components/reusable/DataTable";
import { SalaryListRow } from "./SalaryListFakeData";
import { Badge } from "@/components/ui/badge"; // Assuming shadcn badge exists, if not I'll use simple span
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const salaryListColumns = (): Column<SalaryListRow>[] => [
    {
        key: "id",
        header: "Salary ID",
        width: 100,
        render: (row) => <span className="text-gray-600 font-medium">#{row.id}</span>,
    },
    {
        key: "employee",
        header: "Employee Name",
        width: 250,
        render: (row) => (
            <div className="flex flex-col">
                <span className="font-semibold text-gray-900">{row.employee.name}</span>
                <span className="text-xs text-gray-500">{row.employee.email}</span>
            </div>
        ),
    },
    {
        key: "role",
        header: "Role",
        width: 150,
        render: (row) => <span className="text-gray-700">{row.role}</span>,
    },
    {
        key: "basicSalary",
        header: "Basic Salary",
        width: 120,
        render: (row) => (
            <span className="text-gray-700">${row.basicSalary.toLocaleString()}</span>
        ),
    },
    {
        key: "bonus",
        header: "Bonus",
        width: 100,
        render: (row) => (
            <span className="text-green-600">+${row.bonus.toLocaleString()}</span>
        ),
    },
    {
        key: "total",
        header: "Total",
        width: 120,
        render: (row) => (
            <span className="font-bold text-gray-900">${row.total.toLocaleString()}</span>
        ),
    },
    {
        key: "paymentDate",
        header: "Date",
        width: 120,
        render: (row) => <span className="text-gray-600">{row.paymentDate}</span>,
    },
    {
        key: "status",
        header: "Status",
        width: 120,
        render: (row) => {
            let colorClass = "bg-gray-100 text-gray-800";
            if (row.status === "Paid") colorClass = "bg-green-100 text-green-800";
            if (row.status === "Pending") colorClass = "bg-yellow-100 text-yellow-800";
            if (row.status === "Processing") colorClass = "bg-blue-100 text-blue-800";

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
        key: "actions",
        header: "Action",
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
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.id)}>
                        Copy Salary ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Download Slip</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
