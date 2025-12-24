"use client";

import type { Column } from "@/components/reusable/DataTable";

export type DeliveryRescheduleRow = {
  parcelid: string;
  reason: string;
  destination: {
    title: string;
    address: string;
  };
  hub: string;
  merchant: { name: string; phone: string | number; avatarUrl?: string };
  status: "Returned" | "Paid Returned";
  attempt: number;
  amount: number;
  age: string; // e.g., "2Days 2H 3M"
  createdAt: string;
  updatedAt: string;
};

export const deliveryRescheduleColumns = (
  _onClickUpdate: (row: DeliveryRescheduleRow) => void
): Column<DeliveryRescheduleRow>[] => [
  {
    key: "parcelid",
    header: "Previous Parcel ID",
    width: "10%",
    render: (row) => (
      <span className="text-sm font-bold text-gray-800">#{row.parcelid}</span>
    ),
  },
  {
    key: "reason",
    header: "Reason",
    width: "14%",
    render: (row) => (
      <p className="text-[12px] text-gray-700 leading-relaxed text-wrap">{row.reason}</p>
    ),
  },
  {
    key: "destination",
    header: "Destination",
    width: "15%",
    render: (row) => (
      <div className="flex flex-col gap-0.5 text-[11px] text-gray-600 leading-4">
        <p className="font-semibold text-gray-800 text-[12px]">{row.destination.title}</p>
        <p className="text-wrap">{row.destination.address}</p>
      </div>
    ),
  },
  {
    key: "hub",
    header: "HUB",
    width: "12%",
    render: (row) => (
      <span className="text-sm font-bold text-gray-800">{row.hub}</span>
    ),
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "15%",
    render: (row) => (
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-full bg-gray-200 overflow-hidden shrink-0">
          <img
            src={row.merchant.avatarUrl || "https://i.pravatar.cc/80?img=12"}
            alt={row.merchant.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-800 leading-tight">{row.merchant.name}</span>
          <span className="text-xs text-gray-500">{row.merchant.phone}</span>
        </div>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "12%",
    render: (row) => (
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border w-fit font-medium text-xs ${
        row.status === "Returned" 
          ? "bg-[#FFF1F1] text-[#E04F5F] border-[#FAD2D6]" 
          : "bg-[#FFF5F5] text-[#E04F5F] border-[#FAD2D6]"
      }`}>
        <span className="h-2 w-2 rounded-full bg-red-400" />
        {row.status}
      </div>
    ),
  },
  {
    key: "attempt",
    header: "Attempt",
    width: "5%",
    render: (row) => (
      <span className="text-sm font-bold text-gray-800">{row.attempt}</span>
    ),
  },
  {
    key: "amount",
    header: "COD Amount",
    width: "12%",
    render: (row) => {
      const money = new Intl.NumberFormat("en-US").format(row.amount);
      return (
        <div className="flex flex-col gap-0.5">
          <div className="text-sm font-bold text-[#107E3E]">…3 {money}</div>
          <div className="text-[10px] text-gray-500 space-y-0.5">
            <div>Delivery Charge: …3 125</div>
            <div>COD Charge: …3 12</div>
            <div>Weight Charge: …3 50</div>
            <div className="text-[#FE5000]">Discount: …3 0</div>
          </div>
        </div>
      );
    },
  },
  {
    key: "age",
    header: "Age",
    width: "13%",
    render: (row) => (
      <div className="flex flex-col items-center gap-2">
        <span className="rounded-full bg-[#FDEFE6] px-3 py-0.5 text-[11px] font-bold text-gray-800">
          {row.age}
        </span>
        <div className="text-[10px] text-gray-500 leading-3 text-center space-y-1">
          <div><p className="font-semibold text-gray-700 inline">Created:</p><br/>{row.createdAt}</div>
          <div><p className="font-semibold text-gray-700 inline">Last Updated:</p><br/>{row.updatedAt}</div>
        </div>
      </div>
    ),
  },
];
