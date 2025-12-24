"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { Button } from "@/components/ui/button";
import { AppButton } from "@/components/reusable/CustomButton";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { exportRowsToCsv, type ExportRow } from "@/lib/exportCsv";
import { Download } from "lucide-react";

import { hubListColumns } from "./HubListCol";
import { mockHubList, type HubListRow } from "./fakeData";

type RowId = string | number;
type FilterBy = "area";

export default function HubListTable() {
  const [rows, setRows] = useState<HubListRow[]>(mockHubList);
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>("area");
  const [search, setSearch] = useState("");

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((r) => {
      return (
        r.id.toLowerCase().includes(q) ||
        r.hubBranch.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.area.toLowerCase().includes(q) ||
        r.manager.name.toLowerCase().includes(q) ||
        r.manager.phone.toLowerCase().includes(q)
      );
    });
  }, [rows, search, filterBy]);

  const visibleIds = useMemo(
    () => filteredRows.map((p) => p.id),
    [filteredRows]
  );

  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds]
  );

  const selectedRows = useMemo(() => {
    const set = new Set(cleanedSelectedIds.map(String));
    return filteredRows.filter((r) => set.has(String(r.id)));
  }, [filteredRows, cleanedSelectedIds]);

  const columns = useMemo(
    () =>
      hubListColumns({
        onToggleThirdParty: (rowId, next) => {
          setRows((prev) =>
            prev.map((r) => (r.id === rowId ? { ...r, thirdParty: next } : r))
          );
        },
        onClickEdit: (row) => console.log("Edit hub:", row),
        onClickDelete: (row) => console.log("Delete hub:", row),
      }),
    []
  );

  const handleExport = () => {
    const rowsToExport = selectedRows.length > 0 ? selectedRows : filteredRows;
    const exportRows: ExportRow[] = rowsToExport.map((r) => ({
      id: r.id,
      hubBranch: r.hubBranch,
      address: r.address,
      area: r.area,
      managerName: r.manager.name,
      managerPhone: r.manager.phone,
      pendingAmount: String(r.pendingAmount),
      thirdParty: r.thirdParty ? "Yes" : "No",
    }));

    exportRowsToCsv(exportRows, "hub_list_export.csv");
  };

  return (
    <div className="space-y-4 bg-white">
      {/* Search + create */}
      <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
        <div className="flex-1 w-full">
          <CustomSearchInput
            placeholder="Search by Parcel ID, Customer Name, Customer Phone No. or Merchant Name..."
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
            onClick={() => console.log("Create HUB")}
          >
            Create HUB
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

        {/* Middle: filter dropdown */}
        <div className="flex items-center gap-2">
          <select
            className="rounded-md border border-[#F7C9AE] bg-white px-5 py-2 text-sm outline-none"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as FilterBy)}
          >
            <option value="area">Area</option>
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
            <option value="enable-third-party">Enable 3rd Party</option>
            <option value="disable-third-party">Disable 3rd Party</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <DataTable<HubListRow>
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
  );
}

