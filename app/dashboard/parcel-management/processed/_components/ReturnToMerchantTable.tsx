"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
// import CustomDialog from "@/components/reusable/CustomDialog";
import { Button } from "@/components/ui/button";
import CustomButton, { AppButton } from "@/components/reusable/CustomButton";


import CustomDialog from "@/components/reusable/CustomDialog";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";

import { mockThirdPartyParcels } from "../../third-party/_components/ThirdPartyFakeData";
import { unProcessedColumns } from "../../unprocessed/_components/UnProcessedColumns";
import { ReturnToMerchantRow } from "./ReturnToMerchantCol";

type RowId = string | number;

export default function ReturnToMerchantTable() {
  // selection (use parcelid, not index)
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);

  // modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedParcel, setSelectedParcel] =
    useState<ReturnToMerchantRow | null>(null);

  // search
  const [searchQuery, setSearchQuery] = useState("");

  // map ThirdPartyParcelRow -> ReturnToMerchantRow
  const mappedParcels: ReturnToMerchantRow[] = useMemo(
    () =>
      mockThirdPartyParcels.map((p) => ({
        parcelid: p.parcelid,
        reason: p.additionalNote,
        destination: { title: p.area, address: p.customerInfo.address },
        hub: "Main Hub",
        merchant: p.merchant,
        status: "Returned",
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
      unProcessedColumns((row) => {
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
            setOpenModal(true);
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
      
              {/* Middle: filter dropdown */}
              {/* <div className="flex items-center gap-2">
                <select
                  className="rounded-md border border-[#F7C9AE] bg-white px-3 py-2 text-sm outline-none"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as FilterBy)}
                >
                  <option value="merchant">Merchant</option>
                  <option value="rider">Rider</option>
                  <option value="hub">Hub</option>
                </select>
              </div> */}
      
              {/* Right: export button */}
              <div className="flex items-center justify-end">
                <Button
                  variant="outline"
                  className="border-[#F7C9AE] bg-white hover:bg-white"
                  // onClick={handleExport}
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

      {/* Modal */}
      
    </div>
  );
}
