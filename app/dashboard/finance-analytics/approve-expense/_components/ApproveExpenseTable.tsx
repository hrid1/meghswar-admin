"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { AppButton } from "@/components/reusable/CustomButton";
import { Download, ChevronDown, Calendar } from "lucide-react";

import { approveExpenseColumns } from "./ApproveExpenseCol";
import { expenseFakeData, type ExpenseRow } from "./fakeData";

type RowId = string | number;

export default function ApproveExpenseTable() {
    const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
    const [search, setSearch] = useState("");

    const filteredRows = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return expenseFakeData;

        return expenseFakeData.filter((r) => {
            return (
                r.hub.name.toLowerCase().includes(q) ||
                r.category.toLowerCase().includes(q) ||
                r.id.toLowerCase().includes(q)
            );
        });
    }, [search]);

    const visibleIds = useMemo(() => filteredRows.map((r) => r.id), [filteredRows]);
    const cleanedSelectedIds = useMemo(
        () => selectedIds.filter((id) => visibleIds.includes(String(id))),
        [selectedIds, visibleIds]
    );

    const columns = useMemo(() => approveExpenseColumns(), []);

    return (
        <div className="space-y-4">
            {/* Search Row */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 w-full">
                    <CustomSearchInput
                        placeholder="Search by Rider Name, Parcel ID"
                        value={search}
                        onChange={setSearch}
                        className="w-full"
                        inputClassName="w-full rounded-lg border-gray-200 focus:border-[#FE5000]"
                    />
                </div>
                <AppButton
                    variantType="primary"
                    className="w-full md:w-auto px-10 py-2.5 rounded-lg bg-[#FE5000] hover:bg-[#FE5000]/90 text-white font-semibold"
                    onClick={() => { }}
                >
                    Search
                </AppButton>
            </div>

            {/* Action Bar */}
            <div className="bg-[#FFF4E6] rounded-xl p-3 flex flex-wrap items-center justify-between gap-4 border border-[#FFE7CC]">
                <div className="flex items-center gap-4">
                    <span className="text-black font-bold text-sm ml-2">
                        {cleanedSelectedIds.length} Selected
                    </span>

                    {/* Filter Dropdowns */}
                    <button className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                        HUB
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                        Category
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                        Status
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <button className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                        Export(CSV)
                    </button>
                    <button className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-6 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors min-w-[140px] justify-between">
                        Bulk Action
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-6 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors min-w-[140px] justify-between">
                        Date Range
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <DataTable<ExpenseRow>
                    columns={columns}
                    data={filteredRows}
                    selectable
                    minWidth={1200}
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
