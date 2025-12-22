"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { Button } from "@/components/ui/button";

import {
  exportRowsToCsv,
  type ExportRow,
} from "@/lib/exportCsv"

import {
  AssignRiderColumns,
  type AssignRiderRow,
} from "./AssignRiderColumns";
import { AssignRiderFakeData } from "./fakeData";




type FilterBy = "merchant" | "rider" | "hub";
type RowId = string | number;

export default function AssignRiderTable() {
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>("merchant");

  // For now fake; later you’ll connect backend and filter server-side.
  const filteredRows = useMemo(() => {
    // Your backend filter will replace this logic.
    return AssignRiderFakeData;
  }, [filterBy]);

  // Keep selection valid if filter changes
  const visibleIds = useMemo(() => filteredRows.map((r) => r.id), [filteredRows]);
  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds]
  );

  const selectedRows = useMemo(() => {
    const set = new Set(cleanedSelectedIds.map(String));
    return filteredRows.filter((r) => set.has(String(r.id)));
  }, [filteredRows, cleanedSelectedIds]);

  const columns = useMemo(() => AssignRiderColumns(), []);

  const handleExport = () => {
    const rowsToExport = selectedRows.length > 0 ? selectedRows : filteredRows;

    const exportRows: ExportRow[] = rowsToExport.map((r) => ({
      hub: r.hub,
      merchantName: r.merchant.name,
      merchantPhone: String(r.merchant.phone),
      comments: r.comments,
      riderName: r.rider.name,
      riderPhone: String(r.rider.phone),
      parcelQuantity: String(r.parcelQuantity),
    }));

    exportRowsToCsv(exportRows, "parcels_export.csv");
  };

  return (
    <div className="space-y-4">
      {/* Top bar (like screenshot) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-xl bg-[#FDEFE6] px-4 py-3">
        {/* Left: selected badge */}
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-[#F7C9AE] bg-white px-3 py-1 text-sm">
            <span className="font-semibold">{cleanedSelectedIds.length}</span>{" "}
            Selected
          </div>
        </div>

        {/* Middle: filter dropdown */}
        <div className="flex items-center gap-2">
          <select
            className="rounded-md border border-[#F7C9AE] bg-white px-3 py-2 text-sm outline-none"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as FilterBy)}
          >
            <option value="merchant">Merchant</option>
            <option value="rider">Rider</option>
            <option value="hub">Hub</option>
          </select>
        </div>

        {/* Right: export button */}
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            className="border-[#F7C9AE] bg-white hover:bg-white"
            onClick={handleExport}
          >
            Export(CSV)
          </Button>
        </div>
      </div>

      {/* Table */}
      <DataTable<AssignRiderRow>
        columns={columns}
        data={filteredRows}
        selectable
        minWidth={1100}
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
  );
}
