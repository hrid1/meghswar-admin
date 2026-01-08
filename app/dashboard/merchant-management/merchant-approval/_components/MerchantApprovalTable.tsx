"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportRowsToCsv, type ExportRow } from "@/lib/exportCsv";
import { AppButton } from "@/components/reusable/CustomButton";

import { merchantApprovalColumns, type MerchantApprovalRow } from "./MerchantApprovalCol";
import { useGetMerchantsQuery } from "@/redux/features/merchant/merchnatApi";
import formatDate from "@/lib/formateDate";

type RowId = string | number;



// Map API response to MerchantApprovalRow format
const mapApiDataToRow = (apiMerchant: any): MerchantApprovalRow => {
  // Construct address from thana and district
  const addressParts = [apiMerchant.thana, apiMerchant.district].filter(Boolean);
  const address = addressParts.length > 0 ? addressParts.join(", ") : "N/A";
  
  return {
    aid: `${apiMerchant.id}-create`, // Using merchant ID with "-create" suffix
    userId: apiMerchant.id, // Using merchant ID as userId
    merchant: {
      name: apiMerchant.full_name || "N/A",
      phone: apiMerchant.phone || "N/A",
    },
    requestedFor: {
      title: "Create Account", // Default title for pending merchants
      status: (apiMerchant.status?.toLowerCase() || "pending") as "pending" | "approved" | "rejected",
    },
    requestedAt: formatDate(apiMerchant.created_at || new Date().toISOString()),
    address: address,
  };
};

export default function MerchantApprovalTable() {
  const { data, isLoading, error } = useGetMerchantsQuery({
    status: "PENDING",
    district: "",
    page: 1,
    limit: 10,
  });

  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [search, setSearch] = useState("");

  // Transform API data to MerchantApprovalRow format
  const apiRows = useMemo(() => {
    if (!data?.data?.merchants) return [];
    return data.data.merchants.map(mapApiDataToRow);
  }, [data]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return apiRows;

    return apiRows.filter((r: MerchantApprovalRow) => {
      return (
        r.userId.toLowerCase().includes(q) ||
        r.merchant.name.toLowerCase().includes(q) ||
        r.merchant.phone.toLowerCase().includes(q) ||
        r.requestedFor.title.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q)
      );
    });
  }, [apiRows, search]);

  const visibleIds = useMemo(() => filteredRows.map((r: MerchantApprovalRow) => r.userId), [filteredRows]);

  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds]
  );

  const selectedRows = useMemo(() => {
    const set = new Set(cleanedSelectedIds.map(String));
    return filteredRows.filter((r: MerchantApprovalRow) => set.has(String(r.userId)));
  }, [filteredRows, cleanedSelectedIds]);

  const columns = useMemo(() => merchantApprovalColumns(), []);

  const handleExport = () => {
    const rowsToExport = selectedRows.length > 0 ? selectedRows : filteredRows;
    const exportRows: ExportRow[] = rowsToExport.map((r: MerchantApprovalRow) => ({
      userId: r.userId,
      merchantName: r.merchant.name,
      merchantPhone: r.merchant.phone,
      requestedFor: r.requestedFor.title,
      requestedStatus: r.requestedFor.status,
      requestedAt: r.requestedAt,
      address: r.address,
    }));
    exportRowsToCsv(exportRows, "merchant_account_approvals_export.csv");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading merchants</div>;
  if (!data?.data?.merchants || apiRows.length === 0) return <div>No merchants found</div>;

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
          <Button
            variant="outline"
            className="border-[#FE5000] bg-white hover:bg-white text-[#3A3A3A] flex items-center gap-2"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            Export(CSV)
          </Button>

          <select
            className="rounded-md border border-[#F7C9AE] bg-white px-5 py-2 text-sm outline-none disabled:opacity-50"
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
            <option value="reject">Reject</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <DataTable<MerchantApprovalRow>
        columns={columns}
        data={filteredRows}
        selectable
        minWidth={1100}
        getRowId={(row) => row.userId}
        selectedRowIds={cleanedSelectedIds}
        onToggleRow={(rowId) => {
          setSelectedIds((prev) =>
            prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
          );
        }}
        onToggleAll={(nextSelected) => setSelectedIds(nextSelected)}
      />
    </div>
  );
}

