"use client";

import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { DataTable } from "@/components/reusable/DataTable";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { DatePickerWithRange } from "@/components/reusable/DateRangePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetInvoiceListQuery } from "@/redux/features/finance/financeApi";
import { allInvoiceColumns, AllInvoiceRow } from "./AllInvoiceCol";

const DEFAULT_FROM = new Date("2021-01-01");

export default function AllInvoiceListTable() {
  const [search, setSearch] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState<
    "UNPAID" | "PROCESSING" | "PAID"
  >("UNPAID");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: DEFAULT_FROM,
    to: new Date(),
  });

  const resolvedFrom = dateRange?.from ?? DEFAULT_FROM;
  const resolvedTo = dateRange?.to ?? dateRange?.from ?? new Date();

  const { data: invoiceList, isLoading, isError } = useGetInvoiceListQuery({
    invoiceStatus,
    page: 1,
    limit: 10,
    fromDate: format(resolvedFrom, "yyyy-MM-dd"),
    toDate: format(resolvedTo, "yyyy-MM-dd"),
  });

  const rows: AllInvoiceRow[] = useMemo(() => {
    if (!invoiceList?.invoices) return [];

    return invoiceList.invoices.map((inv: any) => ({
      id: inv.invoice_id,
      invoiceNo: inv.invoice_no,
      merchantName: inv.merchant_name,
      merchantPhone: inv.merchant_phone,
      date: inv.invoice_no?.split("-").slice(1, 3).join("-") ?? "-",
      collectedAmount: inv.financial_breakdown.collected_amount,
      deliveryCharge: inv.financial_breakdown.charges.delivery_charge,
      payableAmount: inv.payable_amount,
      paymentMethod: inv.payment_method,
    }));
  }, [invoiceList]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((r) => {
      return (
        r.invoiceNo.toLowerCase().includes(q) ||
        r.merchantName.toLowerCase().includes(q) ||
        r.merchantPhone.toLowerCase().includes(q) ||
        (r.paymentMethod ?? "").toLowerCase().includes(q)
      );
    });
  }, [rows, search]);

  const columns = useMemo(() => allInvoiceColumns(), []);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError) return <div className="p-4">Failed to load invoices</div>;

  return (
    <div className="space-y-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="w-full md:w-1/3">
          <CustomSearchInput
            placeholder="Search by Invoice, Merchant, Phone"
            value={search}
            onChange={setSearch}
            className="w-full"
            inputClassName="w-full rounded-lg border-[#FFC3A8] focus:border-[#FE5000]"
          />
        </div>

        <div className="w-full md:w-auto flex flex-col md:flex-row gap-3 md:items-center md:justify-end">
          <div className="w-full md:w-[220px]">
            <Select
              value={invoiceStatus}
              onValueChange={(val) =>
                setInvoiceStatus(val as "UNPAID" | "PROCESSING" | "PAID")
              }
            >
              <SelectTrigger className="w-full h-9 border-[#FFC3A8] focus:ring-0">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-[#E9E9E9] shadow-lg rounded-md">
                <SelectItem value="UNPAID">UNPAID</SelectItem>
                <SelectItem value="PROCESSING">PROCESSING</SelectItem>
                <SelectItem value="PAID">PAID</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-auto">
            <DatePickerWithRange
              date={dateRange}
              setDate={setDateRange}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <DataTable<AllInvoiceRow>
        columns={columns}
        data={filteredRows}
        minWidth={1200}
        getRowId={(row) => row.id}
      />
    </div>
  );
}
