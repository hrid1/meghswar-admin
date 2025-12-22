"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { receiveParcelColumns, ReceiveParcelRow } from "./ReceiveParcelColumns";
import { receiveParcelFakeData } from "./ReceiveParcelFakeData";
import { ReceiveParcelSummary } from "./ReceiveParcelSummary";

export default function ReceiveParcelTable() {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const columns = useMemo(() => receiveParcelColumns(), []);

  const selectedRows = receiveParcelFakeData.filter((r) =>
    selectedIds.includes(r.id)
  );

  return (
    <div className="space-y-4">
      <ReceiveParcelSummary selectedRows={selectedRows} />

      <DataTable<ReceiveParcelRow>
        columns={columns}
        data={receiveParcelFakeData}
        selectable
        getRowId={(row) => row.id}
        selectedRowIds={selectedIds}
        onToggleRow={(rowId) =>
          setSelectedIds((prev) =>
            prev.includes(rowId)
              ? prev.filter((id) => id !== rowId)
              : [...prev, rowId]
          )
        }
        onToggleAll={(next) => setSelectedIds(next)}
      />
    </div>
  );
}
