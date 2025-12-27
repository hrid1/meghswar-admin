"use client";

import React, { useMemo, useState } from "react";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { AppButton } from "@/components/reusable/CustomButton";
import { DataTable } from "@/components/reusable/DataTable";

import { storesColumns } from "./StoresCol";
import { merchantStoresFakeData, type MerchantStoreRow } from "./storeFakeData";

type RowId = string | number;

export default function StoresSection() {
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [search, setSearch] = useState("");

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return merchantStoresFakeData;

    return merchantStoresFakeData.filter((r) => {
      return (
        r.id.toLowerCase().includes(q) ||
        r.storeName.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        r.storeAddress.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
      );
    });
  }, [search]);

  const visibleIds = useMemo(() => filteredRows.map((r) => r.id), [filteredRows]);
  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds]
  );

  const columns = useMemo(
    () =>
      storesColumns({
        onView: (row) => console.log("View store:", row),
        onEdit: (row) => console.log("Edit store:", row),
        onDelete: (row) => console.log("Delete store:", row),
      }),
    []
  );

  return (
    <div className="rounded-2xl border border-[#E9E9E9] bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Stores</h2>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-4">
        <div className="flex-1 w-full">
          <CustomSearchInput
            placeholder="Search Store"
            value={search}
            onChange={setSearch}
            className="w-full"
            inputClassName="w-full rounded-lg border-[#FFC3A8] focus:border-[#FE5000]"
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

      <DataTable<MerchantStoreRow>
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

