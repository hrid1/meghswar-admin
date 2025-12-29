"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { advancePayListColumns } from "./AdvancePayListCol";
import { mockAdvancePayList, type AdvancePayListRow } from "./fakeData";

type RowId = string | number;

export default function AdvancePayListTable() {
  const [selectedIds, setSelectedIds] = useState<RowId[]>([]);

  const visibleIds = useMemo(
    () => mockAdvancePayList.map((r) => r.mid),
    []
  );

  const cleanedSelectedIds = useMemo(
    () => selectedIds.filter((id) => visibleIds.includes(String(id))),
    [selectedIds, visibleIds]
  );

  const columns = useMemo(() => advancePayListColumns(), []);

  return (
    <div className="bg-white">
      <DataTable<AdvancePayListRow>
        columns={columns}
        data={mockAdvancePayList}
        selectable
        minWidth={1100}
        getRowId={(row) => row.mid}
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
  );
}

