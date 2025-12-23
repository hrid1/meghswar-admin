"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { Button } from "@/components/ui/button";
import {
  pickupRequestColumns,
  type PickupRequestRow,
} from "./PickupRequestColumns";
import { mockPickupRequests } from "./fakeData";
import { exportRowsToCsv, type ExportRow } from "@/lib/exportCsv";
import { Input } from "@/components/ui/input";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";

type RowId = string | number;
type FilterBy = "merchant" | "rider" | "hub";

export default function PickupRequestTable() {
  // table selections (store ids, not index)
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>("merchant");
  const [search, setSearch] = useState("");

  // For now fake; later you'll connect backend and filter server-side.
  const filteredRows = useMemo(() => {
    return mockPickupRequests;
  }, [filterBy]);

  // keep selection valid when filter changes
  const visibleIds = useMemo(
    () => filteredRows.map((p) => p.parcelid),
    [filteredRows]
  );

  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds]
  );

  const selectedRows = useMemo(() => {
    const set = new Set(cleanedSelectedIds.map(String));
    return filteredRows.filter((r) => set.has(String(r.parcelid)));
  }, [filteredRows, cleanedSelectedIds]);

  const columns = useMemo(() => pickupRequestColumns(() => {}), []);

  const handleExport = () => {
    const rowsToExport = selectedRows.length > 0 ? selectedRows : filteredRows;

    const exportRows: ExportRow[] = rowsToExport.map((r) => ({
      requestId: r.parcelid,
      pickupLocation: r.additionalNote,
      merchantName: r.merchant.name,
      merchantPhone: String(r.merchant.phone),
      area: r.area,
      parcelQuantity: String(r.amount),
    }));

    exportRowsToCsv(exportRows, "parcels_export.csv");
  };

  return (
    <div className="space-y-4">
      {/* search bar */}
      <div className="flex items-center justify-between">
        <CustomSearchInput
          placeholder="Search by Parcel ID, Customer Name, Customer Phone No. or Merchant Name..."
          value={search}
          onChange={setSearch}
          className="max-w-140"
          inputClassName="w-full"
        />
      </div>
      {/* Top bar */}
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

      {/* TABLE */}
      <DataTable<PickupRequestRow>
        columns={columns}
        data={filteredRows}
        selectable
        minWidth={900}
        getRowId={(row) => row.parcelid}
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
