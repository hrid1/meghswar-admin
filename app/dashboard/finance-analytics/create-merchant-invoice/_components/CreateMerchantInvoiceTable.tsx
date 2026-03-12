"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { AppButton } from "@/components/reusable/CustomButton";

import {
  createMerchantInvoiceColumns,
  CreateMerchantInvoiceRow,
} from "./CreateMerchantInvoiceCol";

import { useGetMerchantInvoiceEligibilityListQuery } from "@/redux/features/finance/financeApi";

type RowId = string | number;

export default function CreateMerchantInvoiceTable() {
  const { data, isLoading } =
    useGetMerchantInvoiceEligibilityListQuery(null);

  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [search, setSearch] = useState("");

  // API → Table Row Mapping
  const rows: CreateMerchantInvoiceRow[] = useMemo(() => {
    if (!data?.data?.merchants) return [];

    return data.data.merchants.map((m) => ({
      id: m.merchant_id,

      merchant: {
        name: m.merchant_name,
        phone: m.phone_number,
      },

      totalParcel: m.total_parcel,
      parcelDelivered: m.parcel_delivered,
      parcelReturned: m.parcel_returned,

      collectable: m.total_transaction,
      collectedAmount: m.total_collected_amount,
      deliveryCharge: m.total_delivery_charge,
      dueAmount: m.total_due_amount,

      merchantAddress: m.merchant_address,
    }));
  }, [data]);

  // Search
  const filteredRows = useMemo(() => {
    const q = search.toLowerCase();

    if (!q) return rows;

    return rows.filter((r) =>
      r.merchant.name.toLowerCase().includes(q)
    );
  }, [search, rows]);

  const columns = useMemo(() => createMerchantInvoiceColumns(), []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4 bg-white">

      {/* Search */}
      <div className="flex gap-4">
        <CustomSearchInput
          placeholder="Search merchant"
          value={search}
          onChange={setSearch}
        />

        <AppButton variantType="primary">
          Search
        </AppButton>
      </div>

      {/* Table */}
      <DataTable<CreateMerchantInvoiceRow>
        columns={columns}
        data={filteredRows}
        selectable
        minWidth={1200}
        getRowId={(row) => row.id}
        selectedRowIds={selectedIds}
        onToggleRow={(rowId) => {
          setSelectedIds((prev) =>
            prev.includes(rowId)
              ? prev.filter((id) => id !== rowId)
              : [...prev, rowId]
          );
        }}
        onToggleAll={(next) => setSelectedIds(next)}
      />
    </div>
  );
}