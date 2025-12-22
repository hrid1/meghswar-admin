"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { HistoryRow } from "@/types/billing-history";
import { billingHistoryColumns } from "./BillingHistoryColumns";

export default function BillingHistoryTableSelectionDemo() {
  const data: HistoryRow[] = [
    { planName: "Basic", amounts: "$29", startDate: "2025-01-10", endDate: "2025-02-10" },
    { planName: "Pro", amounts: "$59", startDate: "2025-02-10", endDate: "2025-03-10" },
    { planName: "Pro", amounts: "$59", startDate: "2025-02-10", endDate: "2025-03-10" },
    { planName: "Pro", amounts: "$59", startDate: "2025-02-10", endDate: "2025-03-10" },
    { planName: "Pro", amounts: "$59", startDate: "2025-02-10", endDate: "2025-03-10" },
  ];

  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const columns = useMemo(
    () =>
      billingHistoryColumns({
        onViewDetails: () => {},
      }),
    []
  );

  return (
    <div className="space-y-4">
      {/* Bulk action bar */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#909296]">
          Selected: {selectedIds.length}
        </span>

        <button
          disabled={selectedIds.length === 0}
          className="px-3 py-2 rounded-md border border-[#272725]  disabled:opacity-50"
          onClick={() => {
            // Example bulk operation
            console.log("Bulk delete ids:", selectedIds);
          }}
        >
          Delete Selected
        </button>
      </div>

      <DataTable<HistoryRow>
        columns={columns}
        data={data}
        selectable
        getRowId={(row) => row.planName} // ⚠️ Use real unique id from API ideally
        selectedRowIds={selectedIds}
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
