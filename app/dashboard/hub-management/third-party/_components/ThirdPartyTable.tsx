"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { Button } from "@/components/ui/button";
import { AppButton } from "@/components/reusable/CustomButton";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { exportRowsToCsv, type ExportRow } from "@/lib/exportCsv";
import { Download } from "lucide-react";

import { thirdPartyColumns } from "./ThirdPartyCol";
import { mockThirdParties, type ThirdPartyRow } from "./fakeData";

type RowId = string | number;
type SortBy = "permissions";

export default function ThirdPartyTable() {
  const [rows] = useState<ThirdPartyRow[]>(mockThirdParties);
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>("permissions");
  const [search, setSearch] = useState("");

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((r) => {
      return (
        r.userId.toLowerCase().includes(q) ||
        r.party.name.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q) ||
        String(r.parcelsDelivered).includes(q)
      );
    });
  }, [rows, search, sortBy]);

  const visibleIds = useMemo(
    () => filteredRows.map((p) => p.userId),
    [filteredRows]
  );

  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds]
  );

  const selectedRows = useMemo(() => {
    const set = new Set(cleanedSelectedIds.map(String));
    return filteredRows.filter((r) => set.has(String(r.userId)));
  }, [filteredRows, cleanedSelectedIds]);

  const columns = useMemo(
    () =>
      thirdPartyColumns({
        onClickEdit: (row) => console.log("Edit third party:", row),
        onClickPause: (row) => console.log("Pause third party:", row),
        onClickDelete: (row) => console.log("Delete third party:", row),
      }),
    []
  );

  const handleExport = () => {
    const rowsToExport = selectedRows.length > 0 ? selectedRows : filteredRows;
    const exportRows: ExportRow[] = rowsToExport.map((r) => ({
      userId: r.userId,
      partyName: r.party.name,
      status: r.status,
      parcelsDelivered: String(r.parcelsDelivered),
    }));

    exportRowsToCsv(exportRows, "third_parties_export.csv");
  };

  return (
    <div className="space-y-4 bg-white">
      {/* Search + create */}
      <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
        <div className="flex-1 w-full">
          <CustomSearchInput
            placeholder="Search by Operator Name, Email, HUB Branch Name"
            value={search}
            onChange={setSearch}
            className="w-full"
            inputClassName="w-full"
          />
        </div>

        <div className="flex items-center gap-3">
          <AppButton
            variantType="primary"
            className="px-10 py-3 rounded-lg bg-[#FE5000] hover:bg-[#FE5000]/90"
            onClick={() => console.log("Create Third Party")}
          >
            Create Third Party
          </AppButton>
        </div>
      </div>

      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-xl bg-[#FDEFE6] px-4 py-3">
        {/* Left: selected badge */}
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-[#F7C9AE] bg-white px-6 py-1.5 text-sm text-orange-500 font-medium">
            <span className="font-semibold text-gray-900">
              {cleanedSelectedIds.length}
            </span>{" "}
            Selected
          </div>
        </div>

        {/* Middle: sort dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">Sort By</span>
          <select
            className="rounded-md border border-[#F7C9AE] bg-white px-5 py-2 text-sm outline-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
          >
            <option value="permissions">Permissions</option>
          </select>
        </div>

        {/* Right: export + bulk action */}
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
            <option value="activate">Set Active</option>
            <option value="deactivate">Set Inactive</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <DataTable<ThirdPartyRow>
        columns={columns}
        data={filteredRows}
        selectable
        minWidth={1100}
        getRowId={(row) => row.userId}
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

