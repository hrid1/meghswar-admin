import { Column } from "@/components/reusable/DataTable";
import { HistoryRow } from "@/types/billing-history";

export const billingHistoryColumns = ({
  onViewDetails,
}: {
  onViewDetails: (row: HistoryRow) => void;
}): Column<HistoryRow>[] => [
  {
    key: "planName",
    header: "Plan Name",
    width: "30%",
    render: (row) => (
      <span className="text-sm text-[#909296]">{row.planName}</span>
    ),
  },
  {
    key: "amounts",
    header: "Amount",
    width: "20%",
    render: (row) => (
      <span className="text-sm text-[#909296]">{row.amounts}</span>
    ),
  },
  {
    key: "startDate",
    header: "Start Date",
    width: "15%",
    render: (row) => (
      <span className="text-sm text-[#909296]">
        {new Date(row.startDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    key: "endDate",
    header: "End Date",
    width: "15%",
    render: (row) => (
      <span className="text-sm text-[#909296]">
        {new Date(row.endDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    key: "action",
    header: "Action",
    width: "10%",
    render: (row) => (
      <button
        onClick={(e) => {
          e.stopPropagation(); // important: avoid row click
          onViewDetails(row);
        }}
        className="text-sm text-blue-400 hover:underline"
      >
        Details
      </button>
    ),
  },
];
