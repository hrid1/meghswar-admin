"use client";

import { PageShell } from "@/app/dashboard/_components/PageShell";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import InvoiceTable from "./_components/InvoiceTable";
import StatsCards from "./_components/StatsCards";
import {
  useCreateMerchantInvoiceMutation,
  useGetMerchantInvoiceDetailsMerchantIdQuery,
} from "@/redux/features/finance/financeApi";
import type { EligibleParcel } from "@/redux/features/finance/financeTypes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RowId = string;

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default function Page() {
  const params = useParams<{ id: string }>();
  const merchantId = params?.id ?? "";
  const router = useRouter();

  const { data, isLoading, isError, refetch } =
    useGetMerchantInvoiceDetailsMerchantIdQuery({
      merchantId,
    });

  const [createMerchantInvoice, { isLoading: isCreating }] =
    useCreateMerchantInvoiceMutation();

  const parcels = useMemo<EligibleParcel[]>(
    () => data?.data?.eligible_parcels ?? [],
    [data]
  );

  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [search, setSearch] = useState("");
  const [merchantFilter, setMerchantFilter] = useState("");
  const [hubFilter, setHubFilter] = useState("");

  const merchants = useMemo(
    () => Array.from(new Set(parcels.map((p) => p.merchant_name).filter(Boolean))),
    [parcels]
  );
  const hubs = useMemo(
    () => Array.from(new Set(parcels.map((p) => p.hub_name).filter(Boolean))),
    [parcels]
  );

  const filteredParcels = useMemo(() => {
    const q = search.trim().toLowerCase();
    return parcels.filter((p) => {
      if (merchantFilter && p.merchant_name !== merchantFilter) return false;
      if (hubFilter && p.hub_name !== hubFilter) return false;
      if (!q) return true;
      return (
        (p.parcel_tx_id ?? "").toLowerCase().includes(q) ||
        (p.customer_name ?? "").toLowerCase().includes(q) ||
        (p.customer_phone ?? "").toLowerCase().includes(q) ||
        (p.merchant_name ?? "").toLowerCase().includes(q) ||
        (p.hub_name ?? "").toLowerCase().includes(q)
      );
    });
  }, [parcels, search, merchantFilter, hubFilter]);

  const visibleIds = useMemo(
    () => filteredParcels.map((p) => p.parcel_id),
    [filteredParcels]
  );
  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(id)),
    [selectedIds, visibleIds]
  );

  const selectedStats = useMemo(() => {
    const selectedSet = new Set(cleanedSelectedIds);
    const selected = parcels.filter((p) => selectedSet.has(p.parcel_id));
    const b = (p: EligibleParcel) => p.delivery_charge_breakdown;
    return {
      parcelsSelected: selected.length,
      totalCollectedAmount: selected.reduce((sum, p) => sum + (p.cod_collected ?? 0), 0),
      totalDeliveryCharge: selected.reduce(
        (sum, p) => sum + (b(p)?.delivery_charge ?? 0),
        0
      ),
      totalPayableAmount: selected.reduce((sum, p) => sum + (p.net_payable ?? 0), 0),
    };
  }, [cleanedSelectedIds, parcels]);

  const merchantLabel = safeDecodeURIComponent(merchantId);


  const handleCreateMerchantInvoice = async () => {
    try {
      if (!merchantId || cleanedSelectedIds.length === 0) return;
      await createMerchantInvoice({
        merchantId,
        parcelIds: cleanedSelectedIds,
      }).unwrap();
      // Clear selection and refresh eligible parcels after successful creation
      setSelectedIds([]);
      toast.success("Invoice created successfully");  
      await refetch();
      router.back();
    } catch (error) {
      // You can replace this with a toast/snackbar in your project
      console.error("Failed to create merchant invoice", error);
      alert("Failed to create invoice. Please try again.");
    }
  }

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
                disabled={
                  selectedStats.parcelsSelected === 0 ||
                  isCreating ||
                  !merchantId
                }
                onClick={handleCreateMerchantInvoice}
              >
                Create Invoice / Bulk Create
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-[#E9E9E9] bg-white p-8 text-center text-gray-500">
            Loading eligible parcels…
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
            Failed to load eligible parcels. Please try again.
          </div>
        ) : (
          <InvoiceTable
            parcels={filteredParcels}
            selectedRowIds={cleanedSelectedIds}
            onToggleRow={(rowId) => {
              const id = String(rowId);
              setSelectedIds((prev) =>
                prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
              );
            }}
            onToggleAll={(nextSelected) =>
              setSelectedIds(nextSelected.map((x) => String(x)))
            }
          />
        )}
      </div>
    </PageShell>
  );
}
