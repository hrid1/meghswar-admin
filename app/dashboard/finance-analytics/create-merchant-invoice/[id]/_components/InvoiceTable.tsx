"use client";

import { DataTable } from "@/components/reusable/DataTable";
import { invoiceColumns } from "./invoiceColumns";
import type { InvoiceRow } from "./invoiceColumns";
import type { EligibleParcel } from "@/redux/features/finance/financeTypes";
import React, { useMemo } from "react";

function parcelToRow(p: EligibleParcel): InvoiceRow {
  const b = p.delivery_charge_breakdown;
  return {
    _rowId: p.parcel_id,
    parcelId: p.parcel_tx_id,
    merchant: p.merchant_name,
    merchantId: p.merchant_phone,
    merchantInvoice: p.tracking_number,
    additionalNote: p.special_instructions ?? "",
    customer: p.customer_name,
    customerPhone: p.customer_phone,
    customerAddress: p.customer_address ?? "",
    hub: p.hub_name,
    status: p.status,
    collectedAmount: p.cod_collected ?? 0,
    deliveryCharge: b?.delivery_charge ?? 0,
    codCharge: b?.cod_charge ?? 0,
    weightCharge: 0,
    discount: 0,
    payableAmount: p.net_payable ?? 0,
  };
}

interface InvoiceTableProps {
  parcels: EligibleParcel[];
  selectedRowIds: (string | number)[];
  onToggleRow: (rowId: string | number) => void;
  onToggleAll: (nextSelected: (string | number)[]) => void;
}

export default function InvoiceTable({
  parcels,
  selectedRowIds,
  onToggleRow,
  onToggleAll,
}: InvoiceTableProps) {
  const rows = useMemo(() => parcels.map(parcelToRow), [parcels]);
  const columns = useMemo(() => invoiceColumns(), []);

  return (
    <div className="bg-white">
      <DataTable<InvoiceRow>
        columns={columns}
        data={rows}
        selectable
        minWidth={1400}
        getRowId={(row) => row._rowId}
        selectedRowIds={selectedRowIds}
        onToggleRow={(rowId) => onToggleRow(rowId)}
        onToggleAll={(nextSelected) => onToggleAll(nextSelected)}
      />
    </div>
  );
}
