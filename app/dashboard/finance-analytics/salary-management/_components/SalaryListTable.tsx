"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { AppButton } from "@/components/reusable/CustomButton";

import { salaryListColumns } from "./SalaryListCol";
import { salaryListFakeData, type SalaryListRow } from "./SalaryListFakeData";

type RowId = string | number;

export default function SalaryListTable() {
    const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
    const [search, setSearch] = useState("");

    const filteredRows = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return salaryListFakeData;

        return salaryListFakeData.filter((r) => {
            return (
                r.employee.name.toLowerCase().includes(q) ||
                r.employee.email.toLowerCase().includes(q) ||
                r.id.toLowerCase().includes(q)
            );
        });
    }, [search]);

    const visibleIds = useMemo(() => filteredRows.map((r) => r.id), [filteredRows]);
    const cleanedSelectedIds = useMemo(
        () => selectedIds.filter((id) => visibleIds.includes(String(id))),
        [selectedIds, visibleIds]
    );

    const columns = useMemo(() => salaryListColumns(), []);

    return (
        <div className="space-y-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            {/* Search row */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900">Search Employee</label>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 w-full">
                        <CustomSearchInput
                            placeholder="Search by Name, Email or ID..."
                            value={search}
                            onChange={setSearch}
                            className="w-full"
                            inputClassName="w-full rounded-lg border-gray-200 focus:border-[#FE5000]"
                        />
                    </div>
                    <AppButton
                        variantType="primary"
                        className="w-full md:w-auto px-10 py-2.5 rounded-lg bg-[#FE5000] hover:bg-[#FE5000]/90 text-white font-medium"
                        onClick={() => { }}
                    >
                        Search
                    </AppButton>
                </div>
            </div>

            {/* Table */}
            <div className="mt-6">
                <DataTable<SalaryListRow>
                    columns={columns}
                    data={filteredRows}
                    selectable
                    minWidth={900}
                    getRowId={(row) => row.id}
                    selectedRowIds={cleanedSelectedIds}
                    onToggleRow={(rowId) => {
                        setSelectedIds((prev) =>
                            prev.includes(rowId)
                                ? prev.filter((id) => id !== rowId)
                                : [...prev, rowId]
                        );
                    }}
                    onToggleAll={(nextSelected) => setSelectedIds(nextSelected)}
                />
            </div>
        </div>
    );
}
