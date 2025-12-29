"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { AppButton } from "@/components/reusable/CustomButton";
import { Download, ChevronDown } from "lucide-react";

import { hubCashCollectionDetailsColumns } from "./HubCashCollectionDetailsCol";
import { parcelFakeData, type ParcelRow } from "./fakeData";

type RowId = string | number;

export default function HubCashCollectionDetailsTable() {
    const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
    const [search, setSearch] = useState("");

    const filteredRows = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return parcelFakeData;

        return parcelFakeData.filter((r) => {
            return (
                r.parcelId.toLowerCase().includes(q) ||
                r.customer.name.toLowerCase().includes(q) ||
                r.merchant.name.toLowerCase().includes(q)
            );
        });
    }, [search]);

    const visibleIds = useMemo(() => filteredRows.map((r) => r.id), [filteredRows]);
    const cleanedSelectedIds = useMemo(
        () => selectedIds.filter((id) => visibleIds.includes(String(id))),
        [selectedIds, visibleIds]
    );

    const columns = useMemo(() => hubCashCollectionDetailsColumns(), []);

    return (
        <div className="space-y-4">
            {/* Search row */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 w-full">
                    <CustomSearchInput
                        placeholder="Search by Customer Name, Phone, Parcel ID, Merchant Name, Area"
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

            {/* Action Bar */}
            <div className="bg-[#FFF4E6] rounded-xl p-3 flex items-center justify-between border border-[#FFE7CC]">
                <span className="text-black font-bold text-sm ml-2">
                    {cleanedSelectedIds.length} Selected
                </span>
                <div className="flex items-center gap-4">
                    <button className="bg-white border border-[#E4E4E4] rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                        Export(CSV)
                    </button>

                    <div className="relative group">
                        <button className="bg-white border border-[#E4E4E4] rounded-lg px-4 py-2 flex items-center gap-6 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors justify-between min-w-[140px]">
                            Bulk Action
                            <ChevronDown className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <DataTable<ParcelRow>
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
