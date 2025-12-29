"use client";

import { PageShell } from "@/app/dashboard/_components/PageShell";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import InvoiceTable from "./_components/InvoiceTable";
import StatsCards from "./_components/StatsCards";
import { invoiceData, type Invoice } from "./_lib/invoiceData";

type RowId = string | number;
type InvoiceRow = Invoice & { _rowId: number };

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default function Page() {
  const params = useParams<{ id: string }>();

  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [search, setSearch] = useState("");
  const [merchantFilter, setMerchantFilter] = useState("");
  const [hubFilter, setHubFilter] = useState("");

  const rows = useMemo<InvoiceRow[]>(
    () => invoiceData.map((r, idx) => ({ ...r, _rowId: idx })),
    []
  );

  const merchants = useMemo(
    () => Array.from(new Set(rows.map((r) => r.merchant))),
    [rows]
  );
  const hubs = useMemo(() => Array.from(new Set(rows.map((r) => r.hub))), [rows]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (merchantFilter && r.merchant !== merchantFilter) return false;
      if (hubFilter && r.hub !== hubFilter) return false;
      if (!q) return true;

      return (
        r.parcelId.toLowerCase().includes(q) ||
        r.customer.toLowerCase().includes(q) ||
        r.customerPhone.toLowerCase().includes(q) ||
        r.merchant.toLowerCase().includes(q)
      );
    });
  }, [rows, search, merchantFilter, hubFilter]);

  const visibleIds = useMemo(() => filteredRows.map((r) => r._rowId), [filteredRows]);
  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(Number(id))),
    [selectedIds, visibleIds]
  );

  const selectedStats = useMemo(() => {
    const selectedSet = new Set(selectedIds.map((id) => Number(id)));
    const selectedRows = rows.filter((r) => selectedSet.has(r._rowId));

    return {
      parcelsSelected: selectedRows.length,
      totalCollectedAmount: selectedRows.reduce(
        (sum, item) => sum + item.collectedAmount,
        0
      ),
      totalDeliveryCharge: selectedRows.reduce(
        (sum, item) => sum + item.deliveryCharge,
        0
      ),
      totalPayableAmount: selectedRows.reduce(
        (sum, item) => sum + item.payableAmount,
        0
      ),
    };
  }, [selectedIds, rows]);

  const merchantLabel = safeDecodeURIComponent(params?.id ?? "");

  return (
    <PageShell title="Create Merchant Invoice" description="Invoice details.">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 space-y-3">
            <div className="text-sm text-gray-500">
              Invoice <span className="mx-1">{"\u203A"}</span>{" "}
              <span className="font-semibold text-gray-900">{merchantLabel}</span>
            </div>

            <CustomSearchInput
              placeholder="Search by Parcel ID, Customer Name, Customer Phone No. or Merchant Name..."
              value={search}
              onChange={setSearch}
              className="w-full max-w-3xl"
              inputClassName="w-full rounded-lg border-[#FFC3A8] focus:border-[#FE5000] h-10"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-[520px] lg:flex-none">
            <StatsCards
              parcelsSelected={selectedStats.parcelsSelected}
              totalCollectedAmount={selectedStats.totalCollectedAmount}
              totalDeliveryCharge={selectedStats.totalDeliveryCharge}
              totalPayableAmount={selectedStats.totalPayableAmount}
            />
          </div>
        </div>

        <div className="rounded-xl bg-[#FFF0E8] p-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <select
                className="h-10 w-full rounded-lg border border-[#FFC3A8] bg-white px-4 text-sm outline-none sm:w-72"
                value={merchantFilter}
                onChange={(e) => setMerchantFilter(e.target.value)}
              >
                <option value="">
                  {merchants.length ? "Select Merchant" : "No Merchants"}
                </option>
                {merchants.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <div className="text-sm font-semibold text-gray-900 sm:px-4">
                {selectedStats.parcelsSelected} Parcel Selected
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <select
                className="h-10 w-full rounded-lg border border-[#FFC3A8] bg-white px-4 text-sm outline-none sm:w-56"
                value={hubFilter}
                onChange={(e) => setHubFilter(e.target.value)}
              >
                <option value="">{hubs.length ? "Select HUB" : "No HUBs"}</option>
                {hubs.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="h-10 rounded-lg bg-[#FE5000] px-6 text-sm font-semibold text-white hover:bg-[#FE5000]/90 disabled:opacity-50"
                disabled={selectedStats.parcelsSelected === 0}
                onClick={() => {}}
              >
                Create Invoice / Bulk Create
              </button>
            </div>
          </div>
        </div>

        <InvoiceTable
          data={filteredRows}
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
    </PageShell>
  );
}
