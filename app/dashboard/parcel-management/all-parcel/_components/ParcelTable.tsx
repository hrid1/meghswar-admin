"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { parcelColumns } from "./ParcelColumns";
import { parcelFakeData } from "./ParcelFakeData";
import { ParcelRow } from "./ParcelColumns";

export default function ParcelTable() {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const columns = useMemo(() => parcelColumns(), []);

  return (
    <DataTable<ParcelRow>
      columns={columns}
      data={parcelFakeData}
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
  );
}
