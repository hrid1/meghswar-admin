"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export type PendingInvoiceRow = {
  id: string;
  invoiceNo: string;

  merchantName: string;
  merchantPhone: string;

  date: string;

  collectedAmount: number;
  deliveryCharge: number;
  payableAmount: number;

  paymentMethod: string | null;
};

function money(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export const pendingInvoiceColumns = (
  onPayNow?: (row: PendingInvoiceRow) => void
): Column<PendingInvoiceRow>[] => [
  {
    key: "invoiceNo",
    header: "Invoice ID",
    width: "14%",
    cellClassName: "font-semibold text-gray-900",
    render: (r) => r.invoiceNo,
  },

  {
    key: "merchant",
    header: "Merchant",
    width: "20%",
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
          <img
            src={`https://i.pravatar.cc/80?u=${encodeURIComponent(
              r.merchantName
            )}`}
            alt={r.merchantName}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="leading-4">
          <div className="text-sm font-semibold">{r.merchantName}</div>
          <div className="text-xs text-gray-500">{r.merchantPhone}</div>
        </div>
      </div>
    ),
  },

  {
    key: "date",
    header: "Date",
    width: "12%",
    cellClassName: "text-sm text-gray-600",
    render: (r) => r.date,
  },

  {
    key: "collectedAmount",
    header: "Collected Amount",
    width: "14%",
    headerClassName: "text-center",
    cellClassName: "text-center font-semibold text-[#107E3E]",
    render: (r) => (
      <span>
        {"\u09F3"} {money(r.collectedAmount)}
      </span>
    ),
  },

  {
    key: "deliveryCharge",
    header: "Total Delivery Charge",
    width: "14%",
    headerClassName: "text-center",
    cellClassName: "text-center",
    render: (r) => (
      <span>
        {"\u09F3"} {money(r.deliveryCharge)}
      </span>
    ),
  },

  {
    key: "payableAmount",
    header: "Payable Amount",
    width: "12%",
    headerClassName: "text-center",
    cellClassName: "text-center font-semibold text-[#FE5000]",
    render: (r) => (
      <span>
        {"\u09F3"} {money(r.payableAmount)}
      </span>
    ),
  },

  {
    key: "paymentMethod",
    header: "Payment Method",
    width: "14%",
    cellClassName: "text-sm text-gray-600",
    render: (r) => r.paymentMethod ?? "Not Available",
  },


  {
    key: "action",
    header: "Action",
    width: "14%",
    cellClassName: "text-sm text-gray-600",
    render: (r) => (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => onPayNow?.(r)}>
          Pay Now
        </Button>
      </div>
    ),
  }
]; 
