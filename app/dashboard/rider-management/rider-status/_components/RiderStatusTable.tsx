"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportRowsToCsv, type ExportRow } from "@/lib/exportCsv";
import { AppButton } from "@/components/reusable/CustomButton";

import { riderStatusColumns, type RiderStatusRow } from "./RiderStatusCol";
import { riderStatusFakeData } from "./fakeData";

type RowId = string | number;

export default function RiderStatusTable() {
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [search, setSearch] = useState("");

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return riderStatusFakeData;

    return riderStatusFakeData.filter((r) => {
      return (
        r.id.toLowerCase().includes(q) ||
        r.profile.name.toLowerCase().includes(q) ||
        r.profile.phone.toLowerCase().includes(q) ||
        r.assignedHub.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q) ||
        r.licenseNo.toLowerCase().includes(q)
      );
    });
  }, [search]);

  const visibleIds = useMemo(() => filteredRows.map((r) => r.id), [filteredRows]);

  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds]
  );

  const selectedRows = useMemo(() => {
    const set = new Set(cleanedSelectedIds.map(String));
    return filteredRows.filter((r) => set.has(String(r.id)));
  }, [filteredRows, cleanedSelectedIds]);

  const columns = useMemo(() => riderStatusColumns(), []);

  const handleExport = () => {
    const rowsToExport = selectedRows.length > 0 ? selectedRows : filteredRows;
    const exportRows: ExportRow[] = rowsToExport.map((r) => ({
      id: r.id,
      riderName: r.profile.name,
      riderPhone: r.profile.phone,
      assignedHub: r.assignedHub,
      status: r.status,
      licenseNo: r.licenseNo,
      performance: String(r.performance),
    }));

    exportRowsToCsv(exportRows, "rider_status_export.csv");
  };

  return (
    <div className="space-y-4 bg-white">
      {/* Search row */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="flex-1 w-full">
          <CustomSearchInput
            placeholder="Search by Rider Name, ID"
            value={search}
            onChange={setSearch}
            className="w-full"
            inputClassName="w-full"
          />
        </div>
        <AppButton
          variantType="primary"
          className="px-10 py-2.5 rounded-lg bg-[#FE5000] hover:bg-[#FE5000]/90"
          onClick={() => {}}
        >
          Search
        </AppButton>
      </div>

      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-xl bg-[#FDEFE6] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-[#F7C9AE] bg-white px-6 py-1.5 text-sm text-orange-500 font-medium">
            <span className="font-semibold text-gray-900">
              {cleanedSelectedIds.length}
            </span>{" "}
            Selected
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            className="border-[#FE5000] bg-white hover:bg-white text-[#3A3A3A] flex items-center gap-2"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            Export(CSV)
          </Button>

          <select
            className="rounded-md border border-[#F7C9AE] bg-white px-5 py-2 text-sm outline-none disabled:opacity-50"
            defaultValue=""
            disabled={cleanedSelectedIds.length === 0}
            onChange={(e) => {
              const v = e.target.value;
              if (!v) return;
              console.log("Bulk action:", v, cleanedSelectedIds);
              e.currentTarget.value = "";
            }}
          >
            <option value="" disabled>
              Bulk Action
            </option>
            <option value="mark-on-duty">Mark On Duty</option>
            <option value="mark-leave">Mark Leave</option>
            <option value="mark-break">Mark Break</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <DataTable<RiderStatusRow>
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

