"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { pendingInvoiceColumns, PendingInvoiceRow } from "./PendingInvoiceCol";
import { useGetInvoiceListQuery, usePayInvoiceMutation } from "@/redux/features/finance/financeApi";
import { toast } from "sonner";
import { Download } from "lucide-react";

type RowId = string | number;

export default function PendingInvoiceTable() {
  const { data: pendingInvoiceList, isLoading, isError } = useGetInvoiceListQuery({
    invoiceStatus: "UNPAID",
    page: 1,
    limit: 10,
    fromDate: "2021-01-01",
    toDate: "2028-12-31",
  });

  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
  const [search, setSearch] = useState("");
  const [openPayModal, setOpenPayModal] = useState(false);
  const [activeRow, setActiveRow] = useState<PendingInvoiceRow | null>(null);
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [payInvoice] = usePayInvoiceMutation(); 
  const rows: PendingInvoiceRow[] = useMemo(() => {
    if (!pendingInvoiceList?.invoices) return [];

    return pendingInvoiceList.invoices.map((inv: any) => ({
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
  }, [pendingInvoiceList]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((r) => {
      return (
        r.invoiceNo.toLowerCase().includes(q) ||
        r.merchantName.toLowerCase().includes(q) ||
        r.merchantPhone.toLowerCase().includes(q)
      );
    });
  }, [rows, search]);

  const visibleIds = useMemo(() => filteredRows.map((r) => r.id), [filteredRows]);
  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds]
  );

  const columns = useMemo(
    () =>
      pendingInvoiceColumns((row) => {
        setActiveRow(row);
        setAmount(String(row.payableAmount ?? ""));
        setAccount("");
        setOpenPayModal(true);
      }),
    []
  );

  const handlePayNow = async  (id: string): Promise<void> => {
    try {
      const response = await payInvoice({ id }).unwrap();
      toast.success("Invoice paid successfully");
      setOpenPayModal(false); 
    } catch (error) {
      toast.error("Failed to pay invoice"); 
      setOpenPayModal(false);
    }
  };  

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError) return <div className="p-4">Failed to load invoices</div>;

  return (
    <div className="space-y-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      {/* Search row */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="w-full md:w-1/3">
          <CustomSearchInput
            placeholder="Search by Merchant Name, ID"
            value={search}
            onChange={setSearch}
            className="w-full"
            inputClassName="w-full rounded-lg border-[#FFC3A8] focus:border-[#FE5000]"
          />
        </div>

        <div>
          <Button variant="outline" className="h-9 text-xs flex items-center gap-2 border-gray-300 text-gray-600 hover:bg-gray-50 bg-white">
            <Download className="h-3.5 w-3.5" />
            Export(CSV)
          </Button>
        </div>
      </div>

      {/* Table */}
      {/* Note: To achieve the orange header shown in the design, we might need custom styles if DataTable supports it. 
          For now, we use the default DataTable styling but we can wrap it or inspect the styles. 
          The requirement was to 'create table like img', and standard DataTable is used in reference.
          The orange header might be a global theme or specific customization. 
          I will stick to standard usage as per reference but add a comment. */}
      
      <div className="overflow-hidden rounded-t-lg">
          {/* Attempting to force orange header via wrapper if possible, or just standard. 
              If the global DataTable doesn't support custom header class props, it keeps default.
              However, we can try to style the header cells via `headerClassName` in columns, 
              but that only affects individual th, not the tr. 
              Let's proceed with standard usage. 
           */}
          <DataTable<PendingInvoiceRow>
            columns={columns}
            data={filteredRows}
            selectable
            minWidth={1000}
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

      <CustomDialog
        open={openPayModal}
        onOpenChange={(open) => {
          setOpenPayModal(open);
          if (!open) {
            setActiveRow(null);
            setAmount("");
            setAccount("");
          }
        }}
        showHeader
        title="Pay Now"
        description={
          activeRow
            ? `Invoice ${activeRow.invoiceNo} • ${activeRow.merchantName}`
            : "Enter payment details"
        }
        className="max-w-[520px]"
      >
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Amount</label>
            <Input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Select Account
            </label>
            <Select value={account} onValueChange={setAccount}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-[#E9E9E9] shadow-lg rounded-md">
                <SelectItem value="dbbl">DBBL Bank</SelectItem>
                <SelectItem value="ebl">EBL</SelectItem>
                <SelectItem value="brac">BRAC Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setOpenPayModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => handlePayNow(activeRow?.id ?? "")}>Pay</Button>
          </div>
        </div>
      </CustomDialog>
    </div>
  );
}
