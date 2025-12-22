// ParcelHistoryTable.tsx
"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/reusable/DataTable";
import { mockParcelsHistory, Parcel } from "./mockData";
import { parcelHistoryColumns } from "./ParcelHistoryColumn";


type RowId = string | number;

export default function ParcelHistoryTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState<RowId[]>([]);

  // -------------------------
  // Client-side filtering
  // -------------------------
  const filteredData = useMemo(() => {
    if (!globalFilter) return mockParcelsHistory;
    const lower = globalFilter.toLowerCase();

    return mockParcelsHistory.filter((p) =>
      String(p.id).toLowerCase().includes(lower)
    );
  }, [globalFilter]);

  return (
    <div className="p-6 space-y-4 ">
      {/* ----------- SEARCH BAR ----------- */}
      <div className="flex items-center gap-2 max-w-md">
        <Input
          placeholder="Search by Parcel ID..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* ----------- TABLE ----------- */}
      <DataTable<Parcel>
        columns={parcelHistoryColumns}
        data={filteredData}
        minWidth={1100} // so wide columns don't squeeze
        selectable
        getRowId={(row) => row.id} // IMPORTANT: must be unique
        selectedRowIds={selectedRowIds}
        onToggleRow={(rowId, row) => {
          setSelectedRowIds((prev) => {
            const exists = prev.includes(rowId);
            const next = exists ? prev.filter((x) => x !== rowId) : [...prev, rowId];

            // optional log selected rows
            const selectedRows = filteredData.filter((r) => next.includes(r.id));
            console.log("Selected parcels →", selectedRows);

            return next;
          });
        }}
        onToggleAll={(nextSelected, rows) => {
          setSelectedRowIds(nextSelected);

          // optional log selected rows
          const selectedRows = rows.filter((r) => nextSelected.includes(r.id));
          console.log("Selected parcels →", selectedRows);
        }}
        onRowClick={(row) => {
          console.log("Row clicked →", row);
        }}
        emptyMessage="No parcels found"
      />
    </div>
  );
}
