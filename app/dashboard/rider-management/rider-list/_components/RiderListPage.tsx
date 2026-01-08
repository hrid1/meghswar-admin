"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { useGetRidersQuery } from "@/redux/features/api/riders/rider.api";
import { riderColumns } from "./RiderColumns";
import { Rider } from "../types";
import CustomPagination from "@/components/reusable/CustomPagination";

export default function RiderListPage() {
  const [hubId, setHubId] = useState<string | undefined>(undefined);
  const [isActive, setIsActive] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const { data, isLoading, error } = useGetRidersQuery({
    hubId,
    isActive,
    page,
    limit,
    search,
  });

 

  const riders = data?.data?.riders ?? [];
  const columns = useMemo(() => riderColumns(), []);

  const handleToggleRow = (rowId: string | number) => {
    setSelectedIds((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

  return (
    <div className="space-y-4 bg-white">
      {/* Search + toolbar */}
      <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
        <div className="flex-1 w-full flex gap-3">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by Rider Name, ID"
            className="w-full lg:w-[480px] px-4 py-2.5 text-sm text-[#5A5A5A] bg-white border border-[#FFC3A8] rounded-lg focus:outline-none focus:border-[#FE5000]"
          />

          <button
            onClick={() => {
              setSearch(searchInput);
              setPage(1);
            }}
            className="px-8 py-2.5 rounded-lg bg-[#FE5000] text-white text-sm font-semibold hover:opacity-95"
          >
            Search
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 rounded-lg border border-[#FE5000] text-[#FE5000] bg-white text-sm font-medium disabled:opacity-40"
            onClick={() => console.log("Export selected IDs:", selectedIds)}
            disabled={selectedIds.length === 0}
          >
            Export(CSV)
          </button>

          <button
            className="px-4 py-2 rounded-lg border border-[#FE5000] text-[#3A3A3A] bg-white text-sm font-medium disabled:opacity-40"
            onClick={() => console.log("Bulk action on IDs:", selectedIds)}
            disabled={selectedIds.length === 0}
          >
            Bulk Action
          </button>
        </div>
      </div>

      {/* Selected bar */}
      <div className="bg-[#FFE8DD] border border-[#FFD2BF] rounded-lg px-4 py-2 flex items-center justify-between">
        <span className="text-sm  bg-white px-5 py-1.5 rounded-md text-orange-400 font-medium">
          {selectedIds.length} Selected
        </span>

        <button
          className="text-sm text-[#3A3A3A] underline disabled:opacity-40"
          onClick={() => setSelectedIds([])}
          disabled={selectedIds.length === 0}
        >
          Clear
        </button>
      </div>

      {isLoading && <div className="text-[#6B6B6B]">Loading...</div>}
      {error && <div className="text-red-600">Failed to load riders</div>}

      <div>
        <DataTable<Rider>
          columns={columns}
          data={riders}
          selectable
          getRowId={(row) => row.id}
          selectedRowIds={selectedIds}
          onToggleRow={(rowId) => handleToggleRow(rowId)}
          onToggleAll={(nextSelected) => setSelectedIds(nextSelected)}
          minWidth={1200}
        />

        <CustomPagination
          page={page}
          totalPages={data?.data.pagination.totalPages ?? 1}
          onPageChange={setPage}
          totalItems={data?.data.pagination.total}
          itemsPerPage={limit}
          onItemsPerPageChange={setLimit}
          showItemsPerPage
        />
      </div>
    </div>
  );
}
