"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { ReportStatCard } from "@/app/dashboard/manage-operators/report/_components/ReportStatCard";
import { clearanceListColumns } from "./ClearanceListCol";
import { clearanceListFakeData } from "./fakeData";

type RowId = string | number;

function money(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export default function ClearanceListTable() {
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);

  const visibleIds = useMemo(() => clearanceListFakeData.map((r) => r.id), []);
  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds]
  );

  const selectedStats = useMemo(() => {
    const selectedSet = new Set(selectedIds.map(String));
    const selectedRows = clearanceListFakeData.filter((r) => selectedSet.has(r.id));

    return {
      parcelsSelected: selectedRows.reduce((sum, r) => sum + r.totalParcel, 0),
      totalCollectedAmount: selectedRows.reduce((sum, r) => sum + r.collectedAmount, 0),
      totalDeliveryCharge: selectedRows.reduce((sum, r) => sum + r.deliveryCharge, 0),
      totalPayableAmount: selectedRows.reduce((sum, r) => sum + r.due, 0),
    };
  }, [selectedIds]);

  const columns = useMemo(() => clearanceListColumns(), []);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <ReportStatCard
          label="Parcels Selected"
          value={String(selectedStats.parcelsSelected)}
          accentClassName="border-orange-200 bg-orange-50"
          valueClassName="text-orange-600"
        />
        <ReportStatCard
          label="Total Collected Amount"
          value={`${"\u09F3"}${money(selectedStats.totalCollectedAmount)}`}
          accentClassName="border-emerald-200 bg-emerald-50"
          valueClassName="text-emerald-700"
        />
        <ReportStatCard
          label="Total Delivery Charge"
          value={`${"\u09F3"}${money(selectedStats.totalDeliveryCharge)}`}
          accentClassName="border-purple-200 bg-purple-50"
          valueClassName="text-purple-700"
        />
        <ReportStatCard
          label="Total Payable Amount"
          value={`${"\u09F3"}${money(selectedStats.totalPayableAmount)}`}
          accentClassName="border-blue-200 bg-blue-50"
          valueClassName="text-blue-700"
        />
      </div>

      <div className="bg-white">
        <DataTable
          columns={columns}
          data={clearanceListFakeData}
          selectable
          minWidth={1100}
          getRowId={(row) => row.id}
          selectedRowIds={cleanedSelectedIds}
          onToggleRow={(rowId) => {
            setSelectedIds((prev) =>
              prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
            );
          }}
          onToggleAll={(nextSelected) => setSelectedIds(nextSelected)}
        />
      </div>
    </div>
  );
}

