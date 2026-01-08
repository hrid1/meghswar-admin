"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportRowsToCsv, type ExportRow } from "@/lib/exportCsv";

import { merchantListColumns } from "./MerchantListCol";
import { merchantListFakeData, type MerchantListRow } from "./fakeData";
import { useGetMerchantsQuery } from "@/redux/features/merchant/merchnatApi";

type RowId = string | number;

export default function MerchantListTable() {
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);

  const filteredRows = useMemo(() => merchantListFakeData, []);

  const visibleIds = useMemo(() => filteredRows.map((r) => r.id), [filteredRows]);
  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds]
  );

  const selectedRows = useMemo(() => {
    const set = new Set(cleanedSelectedIds.map(String));
    return filteredRows.filter((r) => set.has(String(r.id)));
  }, [filteredRows, cleanedSelectedIds]);

  const columns = useMemo(() => merchantListColumns(), []);

  const handleExport = () => {
    const rowsToExport = selectedRows.length > 0 ? selectedRows : filteredRows;
    const exportRows: ExportRow[] = rowsToExport.map((r) => ({
      merchantName: r.merchant.name,
      merchantPhone: r.merchant.phone,
      totalParcel: String(r.totalParcel),
      parcelDelivered: String(r.parcelDelivered),
      parcelReturned: String(r.parcelReturned),
      collectedAmount: String(r.collectedAmount),
      deliveryCharge: String(r.deliveryCharge),
      totalPaid: String(r.totalPaid.amount),
      lastPaidAt: r.totalPaid.lastPaidAt,
      status: r.status,
      advancePayment: r.advancePayment,
    }));
    exportRowsToCsv(exportRows, "merchant_list_export.csv");


    
  };


  const { data, isLoading, error } = useGetMerchantsQuery({
    status: "",
    district: "",
    page: 1,
    limit: 10,
  });

  const merchants = data?.data?.merchants ?? [];
  console.log(merchants);
  if(isLoading) return <div>Loading...</div>;
  return (
    <div className="space-y-4 bg-white">
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
          <Button
            variant="outline"
            className="border-[#FE5000] bg-white hover:bg-white text-[#3A3A3A] flex items-center gap-2"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            Export(CSV)
          </Button>

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
            <option value="active">Active</option>
            <option value="deactivate">Deactivate</option>
          </select>

          <select
            className="rounded-md border border-[#FE5000] bg-white px-5 py-2 text-sm outline-none"
            defaultValue=""
            onChange={(e) => {
              const v = e.target.value;
              if (!v) return;
              console.log("Date range:", v);
              e.currentTarget.value = "";
            }}
          >
            <option value="" disabled>
              Select Date Range
            </option>
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
        </div>
      </div>

      <DataTable<MerchantListRow>
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
