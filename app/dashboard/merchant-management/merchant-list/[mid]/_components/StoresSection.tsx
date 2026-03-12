"use client";

import React, { useMemo, useState } from "react";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { AppButton } from "@/components/reusable/CustomButton";
import { DataTable } from "@/components/reusable/DataTable";


import { storesColumns } from "./StoresCol";
import { type MerchantStoreRow } from "./storeFakeData";
import AssignHubModal from "./AssignHubModal";
import SetChargesModal from "./SetChargesModal";
import { useGetStoresQuery } from "@/redux/features/stores/storeApi";
import { useParams } from "next/navigation";

type RowId = string | number;

export default function StoresSection() {
  const params = useParams();
  const mid = typeof params?.mid === "string" ? params.mid : "";

  const { data: sData, isLoading, isError } = useGetStoresQuery({
    isActive: true,
    page: 1,
    limit: 100,
    ...(mid ? { merchantId: mid } : {}),
  });

  const storesData = useMemo(() => {
    if (isLoading || isError) return [];
    const raw = sData?.data?.stores ?? [];
    return raw.map((s: Record<string, unknown>) => ({
      ...s,
      id: String(s?.id ?? ""),
      performance: (s?.performance as MerchantStoreRow["performance"]) ?? {
        total_parcels_handled: 0,
        successfully_delivered: 0,
        total_returns: 0,
      },
    })) as MerchantStoreRow[];
  }, [sData, isLoading, isError]);

  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [search, setSearch] = useState("");

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return storesData;

    return storesData.filter((r) => {
      const id = String(r?.id ?? "").toLowerCase();
      const name = String(r?.business_name ?? "").toLowerCase();
      const phone = String(r?.phone_number ?? "").toLowerCase();
      const address = String(r?.business_address ?? "").toLowerCase();
      const status = String(r?.status ?? "").toLowerCase();
      return (
        id.includes(q) ||
        name.includes(q) ||
        phone.includes(q) ||
        address.includes(q) ||
        status.includes(q)
      );
    });
  }, [search, storesData]);

  const visibleIds = useMemo(
    () => filteredRows.map((r) => String(r.id)),
    [filteredRows]
  );
  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds]
  );

  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isChargesOpen, setIsChargesOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<MerchantStoreRow | null>(null);

  const columns = useMemo(
    () =>
      storesColumns({
        mid,
        onView: () => {},
        onEdit: (row) => console.log("Edit store:", row),
        onDelete: (row) => console.log("Delete store:", row),
        onAssign: (row) => {
          setSelectedStore(row);
          setIsAssignOpen(true);
        },
        onSetCharges: (row) => {
          setSelectedStore(row);
          setIsChargesOpen(true);
        },
      }),
    [mid]
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

      <AssignHubModal
        isOpen={isAssignOpen}
        onClose={() => setIsAssignOpen(false)}
        store={selectedStore}
        onSuccess={() => {
          // Optionally refresh or do something after assign
          setIsAssignOpen(false);
          setSelectedStore(null);
        }}
      />

      <SetChargesModal
        isOpen={isChargesOpen}
        onClose={() => setIsChargesOpen(false)}
        store={selectedStore}
        onSuccess={() => {
          setIsChargesOpen(false);
          setSelectedStore(null);
        }}
      />
    </div>
  );
}
