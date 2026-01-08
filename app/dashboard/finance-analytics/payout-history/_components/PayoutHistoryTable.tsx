"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { AppButton } from "@/components/reusable/CustomButton";
import { Download, ChevronDown } from "lucide-react";

import { payoutHistoryColumns } from "./PayoutHistoryCol";
import { payoutHistoryFakeData, type PayoutHistoryRow } from "./PayoutHistoryFakeData";
import { Button } from "@/components/ui/button";

type RowId = string | number;

import HubDetailsModal from "./HubDetailsModal";

export default function PayoutHistoryTable() {
    const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<PayoutHistoryRow | null>(null);

    const filteredRows = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return payoutHistoryFakeData;

        return payoutHistoryFakeData.filter((r) => {
            return (
                r.profile.name.toLowerCase().includes(q) ||
                r.id.includes(q)
            );
        });
    }, [search]);

    const visibleIds = useMemo(() => filteredRows.map((r) => r.id), [filteredRows]);
    const cleanedSelectedIds = useMemo(
        () => selectedIds.filter((id) => visibleIds.includes(String(id))),
        [selectedIds, visibleIds]
    );

    const handleViewDetails = (row: PayoutHistoryRow) => {
        setSelectedRow(row);
        setIsModalOpen(true);
    };

    const columns = useMemo(() => payoutHistoryColumns(handleViewDetails), []);

    return (
        <div className="space-y-4">

            {/* Search Section */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-lg border border-gray-100">
                <div className="flex-1 w-full">
                    <CustomSearchInput
                        placeholder="Search by Staff Name, ID"
                        value={search}
                        onChange={setSearch}
                        className="w-full"
                        inputClassName="w-full rounded-lg border-gray-200 focus:border-[#FE5000] h-10"
                    />
                </div>
                <AppButton
                    variantType="primary"
                    className="w-full md:w-auto px-8 h-10 text-sm rounded-lg bg-[#FE5000] hover:bg-[#FE5000]/90 text-white font-bold"
                    onClick={() => { }}
                >
                    Search
                </AppButton>
            </div>

            {/* Action Toolbar */}
            <div className={`flex flex-col md:flex-row justify-between items-center gap-4 p-3 rounded-lg border border-gray-100 bg-white transition-colors ${selectedIds.length > 0 ? 'bg-[#FFF4EC] border-orange-100' : ''}`}>
                <div className="font-medium text-gray-700 text-sm">
                    {selectedIds.length > 0 ? `${selectedIds.length} Selected` : '0 Selected'}
                </div>

                <div className="flex flex-wrap gap-3">
                    <Button variant="outline" className="h-9 text-xs flex items-center gap-2 border-gray-300 text-gray-600 hover:bg-gray-50 bg-white">
                        <Download className="h-3.5 w-3.5" />
                        Export(CSV)
                    </Button>

                    <Button variant="outline" className="h-9 text-xs flex items-center gap-2 border-gray-300 text-gray-600 hover:bg-gray-50 bg-white min-w-[110px] justify-between">
                        Bulk Action
                        <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                    </Button>

                    <Button variant="outline" className="h-9 text-xs flex items-center gap-2 border-gray-300 text-gray-600 hover:bg-gray-50 bg-white min-w-[150px] justify-between">
                        Select Date Range
                        <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                <DataTable<PayoutHistoryRow>
                    columns={columns}
                    data={filteredRows}
                    selectable
                    minWidth={1000}
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

            <HubDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={selectedRow}
            />
        </div>
    );
}
