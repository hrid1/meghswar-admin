"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { AppButton } from "@/components/reusable/CustomButton";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportRowsToCsv, type ExportRow } from "@/lib/exportCsv";
import CustomPagination from "@/components/reusable/CustomPagination";

import {
  riderPerformanceColumns,
  type RiderPerformanceRow,
} from "./RiderPerformanceCol";
import { riderPerformanceFakeData } from "./fakeData";

type Period = "weekly" | "monthly";

export default function RiderPerformanceTable() {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState<Period>("weekly");
  const [month, setMonth] = useState("september");

  const [page, setPage] = useState(1);
  const [limit] = useState(6);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return riderPerformanceFakeData;

    return riderPerformanceFakeData.filter((r) => {
      return (
        r.rider.name.toLowerCase().includes(q) ||
        r.rider.phone.toLowerCase().includes(q) ||
        r.date.toLowerCase().includes(q)
      );
    });
  }, [search]);

  const totalItems = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  const pagedRows = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredRows.slice(start, start + limit);
  }, [filteredRows, page, limit]);

  const columns = useMemo(() => riderPerformanceColumns(), []);

  const handleExport = () => {
    const exportRows: ExportRow[] = filteredRows.map((r) => ({
      date: r.date,
      riderName: r.rider.name,
      riderPhone: r.rider.phone,
      delivered: String(r.delivered),
      rescheduled: String(r.rescheduled),
      returned: String(r.returned),
      assigned: String(r.assigned),
      commission: String(r.commission),
      collectedAmount: String(r.collectedAmount),
      successRate: `${r.successRate}%`,
    }));

    exportRowsToCsv(exportRows, "rider_performance_export.csv");
  };

  return (
    <div className="rounded-2xl border border-[#E9E9E9] bg-white overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between px-6 pt-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Daily performance Entries
        </h2>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPeriod("weekly")}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              period === "weekly"
                ? "bg-[#FE5000] text-white"
                : "bg-[#F2F2F2] text-gray-700"
            }`}
          >
            Weekly (7 Days)
          </button>

          <select
            className="rounded-full border border-[#E9E9E9] bg-white px-4 py-2 text-xs font-medium outline-none"
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
              setPeriod("monthly");
            }}
          >
            <option value="september">Monthly (September)</option>
            <option value="october">Monthly (October)</option>
            <option value="november">Monthly (November)</option>
          </select>
        </div>
      </div>

      {/* Search row */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center px-6 pt-4 pb-5">
        <div className="flex-1 w-full">
          <CustomSearchInput
            placeholder="Search by Rider Name, ID"
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            className="w-full"
            inputClassName="w-full border-[#FFC3A8] focus:border-[#FE5000] rounded-lg"
          />
        </div>
        <AppButton
          variantType="primary"
          className="px-10 py-2.5 rounded-lg bg-[#FE5000] hover:bg-[#FE5000]/90"
          onClick={() => {}}
        >
          Search Rider
        </AppButton>
      </div>

      {/* Table */}
      <div className="px-6">
        <DataTable<RiderPerformanceRow>
          columns={columns}
          data={pagedRows}
          minWidth={1100}
        />
      </div>

      {/* Footer: export + pagination */}
      <div className="px-6 pb-6 ">
        {/* <div className="flex items-center justify-end gap-3 mb-3">
          <Button
            variant="outline"
            className="border-[#FE5000] bg-white hover:bg-white text-[#3A3A3A] flex items-center gap-2"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            Export(CSV)
          </Button>
        </div> */}

        <CustomPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={totalItems}
          itemsPerPage={limit}
          show
          showItemsPerPage={false}
          showingLabel="Showing"
          resultsLabel="Results"
        />
      </div>
    </div>
  );
}

