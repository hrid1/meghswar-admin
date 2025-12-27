"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { AppButton } from "@/components/reusable/CustomButton";

import { createAdvanceInvoiceColumns } from "./CreateAdvanceInvoiceCol";
import {
  createAdvanceInvoiceFakeData,
  type CreateAdvanceInvoiceRow,
} from "./fakeData";

type RowId = string | number;

export default function CreateAdvanceInvoiceTable() {
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [search, setSearch] = useState("");

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return createAdvanceInvoiceFakeData;

    return createAdvanceInvoiceFakeData.filter((r) => {
      return (
        r.id.toLowerCase().includes(q) ||
        r.merchant.name.toLowerCase().includes(q) ||
        r.merchant.phone.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q)
      );
    });
  }, [search]);

  const visibleIds = useMemo(() => filteredRows.map((r) => r.id), [filteredRows]);
  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds]
  );

  const columns = useMemo(() => createAdvanceInvoiceColumns(), []);

  return (
    <div className="space-y-4 bg-white">
      {/* Search row */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="flex-1 w-full">
          <CustomSearchInput
            placeholder="Search by Merchant Name, ID"
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

      {/* Table */}
      <DataTable<CreateAdvanceInvoiceRow>
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

