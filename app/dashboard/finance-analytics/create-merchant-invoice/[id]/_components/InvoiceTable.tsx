"use client";

import { DataTable } from "@/components/reusable/DataTable";
import { invoiceColumns } from "./invoiceColumns";
import type { InvoiceRow } from "./invoiceColumns";
import React, { useMemo } from "react";

interface InvoiceTableProps {
  data: InvoiceRow[];
  selectedRowIds: (string | number)[];
  onToggleRow: (rowId: string | number) => void;
  onToggleAll: (nextSelected: (string | number)[]) => void;
}

export default function InvoiceTable({
  data,
  selectedRowIds,
  onToggleRow,
  onToggleAll,
}: InvoiceTableProps) {
  const columns = useMemo(() => invoiceColumns(), []);

  return (
    <div className="bg-white">
      <DataTable<InvoiceRow>
        columns={columns}
        data={data}
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
