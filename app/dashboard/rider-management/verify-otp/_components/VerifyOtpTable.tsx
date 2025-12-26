"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { AppButton } from "@/components/reusable/CustomButton";

import { verifyOtpColumns, type VerifyOtpRow } from "./VerifyOtpCol";
import { verifyOtpFakeData } from "./fakeData";

type RowId = string | number;

export default function VerifyOtpTable() {
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [search, setSearch] = useState("");

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return verifyOtpFakeData;

    return verifyOtpFakeData.filter((r) => {
      return (
        r.parcelId.toLowerCase().includes(q) ||
        r.rider.name.toLowerCase().includes(q) ||
        r.rider.phone.toLowerCase().includes(q) ||
        r.customerInfo.name.toLowerCase().includes(q) ||
        r.merchant.name.toLowerCase().includes(q) ||
        r.hubName.toLowerCase().includes(q)
      );
    });
  }, [search]);

  const visibleIds = useMemo(
    () => filteredRows.map((r) => r.parcelId),
    [filteredRows]
  );

  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds]
  );

  const columns = useMemo(
    () =>
      verifyOtpColumns({
        onApprove: (row) => console.log("Approve:", row),
        onDecline: (row) => console.log("Decline:", row),
      }),
    []
  );

  return (
    <div className="space-y-4 bg-white">
      {/* Search row */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="flex-1 w-full">
          <CustomSearchInput
            placeholder="Search by Rider Name, Parcel ID"
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
          <select
            className="rounded-md border border-[#FE5000] bg-white px-5 py-2 text-sm outline-none disabled:opacity-50"
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
            <option value="approve">Approve</option>
            <option value="decline">Decline</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <DataTable<VerifyOtpRow>
        columns={columns}
        data={filteredRows}
        selectable
        minWidth={1200}
        getRowId={(row) => row.parcelId}
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

