"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { Button } from "@/components/ui/button";
import { AppButton } from "@/components/reusable/CustomButton";

import CustomSearchInput from "@/components/reusable/CustomSearchInput";

import { mockThirdPartyParcels } from "../../third-party/_components/ThirdPartyFakeData";
import {
  DeliveryRescheduleRow,
  deliveryRescheduleColumns,
} from "./DeliveryRescheduleCol";

type RowId = string | number;

export default function DeliveryRescheduleTable() {
  // selection (use parcelid, not index)
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);

  // modal
  const [selectedParcel, setSelectedParcel] =
    useState<DeliveryRescheduleRow | null>(null);

  // search
  const [searchQuery, setSearchQuery] = useState("");

  // map ThirdPartyParcelRow -> DeliveryRescheduleRow
  const mappedParcels: DeliveryRescheduleRow[] = useMemo(
    () =>
      mockThirdPartyParcels.map((p, index) => ({
        parcelid: p.parcelid,
        reason: p.additionalNote,
        destination: { title: p.area, address: p.customerInfo.address },
        hub: "Main Hub",
        merchant: p.merchant,
        status: "Returned",
        attempt: index + 1,
        amount: p.amount,
        age: p.age,
        createdAt: p.createdAt ?? "-",
        updatedAt: p.updatedAt ?? "-",
      })),
    []
  );

  const filteredParcels = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return mappedParcels;

    return mappedParcels.filter((p) => {
      return (
        String(p.parcelid).toLowerCase().includes(q) ||
        p.merchant.name.toLowerCase().includes(q) ||
        String(p.merchant.phone).toLowerCase().includes(q) ||
        p.destination.title.toLowerCase().includes(q) ||
        p.destination.address.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, mappedParcels]);

  // keep selection valid when filter changes
  const visibleIds = useMemo(
    () => filteredParcels.map((p) => p.parcelid),
    [filteredParcels]
  );

  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds]
  );

  // columns
  const columns = useMemo(
    () =>
      deliveryRescheduleColumns((row) => {
        setSelectedParcel(row); // single mode
      }),
    []
  );

  const canBulkAssign = cleanedSelectedIds.length > 0;

  return (
    <div className="px-6 container mx-auto space-y-4">
      {/* Search + Bulk */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CustomSearchInput
            placeholder="Search parcels..."
            className="w-full sm:w-80"
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
        <AppButton
          variantType="primary"
          disabled={!canBulkAssign}
          onClick={() => {
            if (!canBulkAssign) return;
            setSelectedParcel(null);
          }}
        >
          {" "}
          Assign Third Party
        </AppButton>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-xl bg-[#FDEFE6] px-4 py-3">
        {/* Left: selected badge */}
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-[#F7C9AE] bg-white px-3 py-1 text-sm">
            <span className="font-semibold">{cleanedSelectedIds.length}</span>{" "}
            Selected
          </div>
        </div>

        {/* Right: export button */}
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            className="border-[#F7C9AE] bg-white hover:bg-white"
          >
            Export(CSV)
          </Button>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredParcels}
        selectable
        minWidth={1200}
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
