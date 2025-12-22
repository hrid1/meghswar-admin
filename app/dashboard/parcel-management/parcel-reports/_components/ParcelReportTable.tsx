"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import { parcelReportColumns, ParcelReportRow } from "./ParcelReportColumns";
import { mockParcels } from "./ParcelReportFakeData";

type RowId = string | number;

const STATUS_OPTIONS = [
  { label: "All Status", value: "" },
  { label: "Delivered", value: "Delivered" },
  { label: "Pending", value: "Pending" },
  { label: "Delivery Rescheduled", value: "Delivery Rescheduled" },
  { label: "Customer Not Available", value: "Customer Not Available" },
  { label: "Return To Merchant", value: "Return To Merchant" },
];

export default function ParcelReportTable() {
  // table selections (store IDs, not indexes)
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);

  // modal
  const [openModal, setOpenModal] = useState(false);

  // for single update (store parcel id or full row)
  const [selectedParcel, setSelectedParcel] = useState<ParcelReportRow | null>(
    null
  );

  // radio value
  const [selectedStatus, setSelectedStatus] = useState("");

  // search + filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // 🔍 SEARCH + FILTER
  const filteredParcels = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return mockParcels
      .filter((p) => {
        if (!q) return true;
        return (
          p.id.toLowerCase().includes(q) ||
          p.customerInfo.name.toLowerCase().includes(q) ||
          p.customerInfo.phone.toLowerCase().includes(q) ||
          p.merchant.name.toLowerCase().includes(q)
        );
      })
      .filter((p) => (filterStatus ? p.status === filterStatus : true));
  }, [searchQuery, filterStatus]);

  // keep selection valid when filter changes
  const visibleIds = useMemo(() => filteredParcels.map((p) => p.id), [filteredParcels]);
  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds]
  );

  // columns (action opens modal for single)
  const columns = useMemo(
    () =>
      parcelReportColumns((row) => {
        setSelectedParcel(row);
        setSelectedStatus(""); // reset
        setOpenModal(true);
      }),
    []
  );

  // SUBMIT (single + bulk)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStatus) return;

    const parcelIds = selectedParcel
      ? [selectedParcel.id]
      : cleanedSelectedIds.map(String);

    if (parcelIds.length === 0) return;

    try {
      const res = await fetch("/api/update-parcels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parcelIds,
          status: selectedStatus,
        }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      setOpenModal(false);
      setSelectedStatus("");
      setSelectedParcel(null);
      setSelectedIds([]); // optional: clear selection after bulk update
    } catch (err) {
      console.error("API error:", err);
    }
  };

  const canBulkUpdate = cleanedSelectedIds.length > 0;

  return (
    <div className="p-6 space-y-4">
      {/* 🔍 SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Input
            placeholder="Search parcels..."
            className="w-full sm:w-72"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="border p-2 rounded-md text-sm w-full sm:w-56"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* 🔥 BULK UPDATE BUTTON */}
        <Button
          disabled={!canBulkUpdate}
          className="bg-red-600/80 text-white"
          onClick={() => {
            if (!canBulkUpdate) return;
            setSelectedParcel(null); // bulk mode
            setSelectedStatus(""); // reset
            setOpenModal(true);
          }}
        >
          Bulk Update Status
        </Button>
      </div>

      {/* TABLE */}
      <DataTable<ParcelReportRow>
        columns={columns}
        data={filteredParcels}
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
        onToggleAll={(nextSelected) => {
          // "select all" should only select visible (filtered) rows
          setSelectedIds(nextSelected);
        }}
      />

      {/* MODAL */}
      {/* <CustomDialog open={openModal} setOpen={setOpenModal}>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="text-sm font-semibold">
            {selectedParcel ? (
              <>
                Update status for: <span className="text-red-600">{selectedParcel.id}</span>
              </>
            ) : (
              <>
                Bulk update for:{" "}
                <span className="text-red-600">{cleanedSelectedIds.length}</span> parcels
              </>
            )}
          </div>

          <div className="flex flex-col gap-3 my-2">

            <label
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                selectedStatus === "Delivery Rescheduled"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="status"
                value="Delivery Rescheduled"
                checked={selectedStatus === "Delivery Rescheduled"}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="hidden"
              />
              <span className="font-medium text-gray-700">
                Delivery Rescheduled
              </span>
            </label>


            <label
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                selectedStatus === "Customer Not Available"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="status"
                value="Customer Not Available"
                checked={selectedStatus === "Customer Not Available"}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="hidden"
              />
              <span className="font-medium text-gray-700">
                Customer Not Available
              </span>
            </label>
          </div>

          <Button type="submit" className="bg-red-500 text-white">
            Confirm &amp; Update
          </Button>
        </form>
      </CustomDialog> */}
    </div>
  );
}
