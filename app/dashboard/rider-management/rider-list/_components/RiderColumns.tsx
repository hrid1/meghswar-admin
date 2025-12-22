import type { Column } from "@/components/reusable/DataTable";
import { Rider } from "../types";
import Link from "next/link";

export const riderColumns = (): Column<Rider>[] => [
  {
    key: "id",
    header: "ID",
    width: 120,
    render: (r) => (
      <span className="text-sm text-[#4B4B4B]">{r.id.slice(0, 6)}...</span>
    ),
  },
  {
    key: "profile",
    header: "Profile",
    width: 260,
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-[#F2F2F2] text-[#333] overflow-hidden flex items-center justify-center">
          <span className="text-xs font-semibold">
            {r.full_name?.[0] ?? "R"}
          </span>
        </div>
        <div className="leading-tight">
          <p className="text-sm text-[#2B2B2B] font-semibold">{r.full_name}</p>
          <p className="text-xs text-[#7A7A7A]">{r.phone}</p>
        </div>
      </div>
    ),
  },
  {
    key: "hub",
    header: "Assigned HUB",
    width: 200,
    render: (r) => (
      <span className="text-sm text-[#4B4B4B]">{r.hub?.branch_name ?? "-"}</span>
    ),
  },
  {
    key: "bike_type",
    header: "Bike Type",
    width: 160,
    render: (r) => <span className="text-sm text-[#4B4B4B]">{r.bike_type}</span>,
  },

  { key: "license", header: "License No.", width: 160, render: () => <span className="text-sm text-[#7A7A7A]">—</span> },
  { key: "nid", header: "NID", width: 160, render: () => <span className="text-sm text-[#7A7A7A]">—</span> },
  { key: "deliveryCompleted", header: "Delivery Completed", width: 170, render: () => <span className="text-sm text-[#7A7A7A]">—</span> },
  { key: "deliveryReturned", header: "Delivery Returned", width: 160, render: () => <span className="text-sm text-[#7A7A7A]">—</span> },
  { key: "cash", header: "Total Cash Collected", width: 190, render: () => <span className="text-sm text-[#16A34A] font-semibold">৳1,250</span> },

  {
    key: "actions",
    header: "Actions",
    width: 140,
    render: (r) => (
      <div className="flex items-center gap-3">
        <button className="text-sm text-[#7A7A7A] hover:text-[#111]">
            <Link href={`./rider-list/${r.id}`}>View </Link>
        </button>
        <button className="text-sm text-[#7A7A7A] hover:text-[#111]">Edit</button>
        <button className="text-sm text-[#7A7A7A] hover:text-[#111]">Delete</button>
      </div>
    ),
  },
];
