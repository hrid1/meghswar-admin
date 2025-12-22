"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
// import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import { thirdPartyColumns, type ThirdPartyParcelRow } from "./ThirdPartyColumns";
import { mockThirdPartyParcels } from "./ThirdPartyFakeData";
import CustomDialog from "@/components/reusable/CustomDialog";

type RowId = string | number;

export default function ThirdPartyTable() {
  // selection (use parcelid, not index)
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);

  // modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<ThirdPartyParcelRow | null>(null);

  // search
  const [searchQuery, setSearchQuery] = useState("");

  // filter (client now, backend later)
  const filteredParcels = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return mockThirdPartyParcels;

    return mockThirdPartyParcels.filter((p) => {
      return (
        p.parcelid.toLowerCase().includes(q) ||
        p.customerInfo.name.toLowerCase().includes(q) ||
        p.customerInfo.phone.toLowerCase().includes(q) ||
        p.merchant.name.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

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
      thirdPartyColumns((row) => {
        setSelectedParcel(row); // single mode
        setOpenModal(true);
      }),
    []
  );

  const canBulkAssign = cleanedSelectedIds.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // single vs bulk
    const parcelIds = selectedParcel
      ? [selectedParcel.parcelid]
      : cleanedSelectedIds.map(String);

    if (parcelIds.length === 0) return;

    try {
      // Replace with your real API later
      const res = await fetch("/api/assign-third-party", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parcelIds }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      setOpenModal(false);
      setSelectedParcel(null);
      setSelectedIds([]); // optional: clear after submit
    } catch (err) {
      console.error("API error:", err);
    }
  };

  return (
    <div className="p-6 container mx-auto space-y-4">
      <h1 className="text-2xl font-bold">All Parcel</h1>

      {/* Search + Bulk */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Input
          placeholder="Search parcels..."
          className="w-full sm:w-72"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Button
          disabled={!canBulkAssign}
          className="bg-orange-600/80 text-white"
          onClick={() => {
            if (!canBulkAssign) return;
            setSelectedParcel(null); // bulk mode
            setOpenModal(true);
          }}
        >
          Assign Third Party
        </Button>
      </div>

      {/* Table */}
      <DataTable<ThirdPartyParcelRow>
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

      {/* Modal */}
      <CustomDialog open={openModal} setOpen={setOpenModal}>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="text-sm font-semibold">
            {selectedParcel ? (
              <>
                Assign third party for:{" "}
                <span className="text-orange-600">{selectedParcel.parcelid}</span>
              </>
            ) : (
              <>
                Bulk assign for:{" "}
                <span className="text-orange-600">{cleanedSelectedIds.length}</span>{" "}
                parcels
              </>
            )}
          </div>

          <div className="text-sm text-gray-600">This is still processing...</div>

          <Button type="submit" className="bg-orange-500 text-white w-full">
            Confirm
          </Button>
        </form>
      </CustomDialog>
    </div>
  );
}
