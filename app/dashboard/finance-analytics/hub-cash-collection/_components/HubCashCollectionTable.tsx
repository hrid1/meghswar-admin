"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { AppButton } from "@/components/reusable/CustomButton";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportRowsToCsv, type ExportRow } from "@/lib/exportCsv";

import { hubCashCollectionColumns } from "./HubCashCollectionCol";
import { hubCashFakeData, type HubCashRow } from "./fakeData";

type RowId = string | number;
type SortBy = "area";

export default function HubCashCollectionTable() {
  const [rows, setRows] = useState<HubCashRow[]>(hubCashFakeData);
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("area");

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
  }, [rows, search, sortBy]);

  const visibleIds = useMemo(() => filteredRows.map((r) => r.id), [filteredRows]);
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
      hubCashCollectionColumns({
        onNotifyHub: (row) => {
          setRows((prev) =>
            prev.map((r) =>
              r.id === row.id
                ? { ...r, notified: true, lastNotifiedAt: "01 Oct, 2025" }
                : r
            )
          );
        },
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
      lifetimeCollection: String(r.lifetimeCollection),
      hubExpenses: String(r.hubExpenses),
      pendingAmount: String(r.pendingAmount),
      notified: r.notified ? "Yes" : "No",
      lastNotifiedAt: r.lastNotifiedAt ?? "",
    }));
    exportRowsToCsv(exportRows, "hub_cash_collection_export.csv");
  };

  return (
    <div className="space-y-4 bg-white">
      {/* Search + create */}
      <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
        <div className="flex-1 w-full">
          <CustomSearchInput
            placeholder="Search by Hub name..."
            value={search}
            onChange={setSearch}
            className="w-full"
            inputClassName="w-full rounded-lg border-[#FFC3A8] focus:border-[#FE5000]"
          />
        </div>

        <div className="flex items-center gap-3">
          <AppButton
            variantType="primary"
            className="px-10 py-2.5 rounded-lg bg-[#FE5000] hover:bg-[#FE5000]/90"
            onClick={() => console.log("Create HUB")}
          >
            Create HUB
          </AppButton>
        </div>
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

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-700">Sort By</span>
          <select
            className="rounded-md border border-[#F7C9AE] bg-white px-5 py-2 text-sm outline-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
          >
            <option value="area">Area</option>
          </select>
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
            <option value="notify">Notify HUB</option>
          </select>
        </div>
      </div>

      <DataTable<HubCashRow>
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

