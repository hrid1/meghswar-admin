"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";

export type ThirdPartyParcelRow = {
  parcelid: string;
  customerInfo: { name: string; phone: string; address: string };
  additionalNote: string;
  merchant: { name: string; phone: string | number; avatarUrl?: string };
  area: string;
  amount: number;
  age: string; // "2 Days"
  createdAt?: string;
  updatedAt?: string;
};

export const thirdPartyColumns = (
  _onClickUpdate: (row: ThirdPartyParcelRow) => void
): Column<ThirdPartyParcelRow>[] => [
  {
    key: "parcelid",
    header: "Parcel ID",
    width: "7%",
    render: (row) => (
      <span className="text-sm font-semibold text-gray-800 ">{row.parcelid}</span>
    ),
  },
  {
    key: "customerInfo",
    header: "Customer Info",
    width: "18%",
    wrap: true,
    render: (row) => (
      <div className="flex flex-col gap-0.5 text-sm text-gray-800">
        <span className="font-semibold">{row.customerInfo.name}</span>
        <span className="text-xs text-gray-600">{row.customerInfo.phone}</span>
        <span className="text-[11px] text-gray-500 leading-4">
          {row.customerInfo.address}
        </span>
      </div>
    ),
  },
  {
    key: "additionalNote",
    header: "Additional Note",
    width: "18%",
    wrap: true,
    render: (row) => (
      <p className="text-sm text-gray-700 leading-5">{row.additionalNote}</p>
    ),
  },
  {
    key: "area",
    header: "Area",
    width: "12%",
    wrap: true,
    render: (row) => (
      <span className="text-sm font-semibold text-gray-800">{row.area}</span>
    ),
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "18%",
    wrap: true,
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={row.merchant.avatarUrl || "https://i.pravatar.cc/80?img=12"}
            alt={row.merchant.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col leading-4">
          <span className="text-sm font-semibold">{row.merchant.name}</span>
          <span className="text-xs text-gray-500">
            {String(row.merchant.phone).startsWith("+")
              ? String(row.merchant.phone)
              : `+${String(row.merchant.phone)}`}
          </span>
        </div>
      </div>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    width: "13%",
    wrap: true,
    render: (row) => {
      const money = new Intl.NumberFormat("en-US").format(row.amount);
      const breakdown = {
        deliveryCharge: 125,
        codCharge: 12,
        weightCharge: 50,
        discount: 0,
      };

      return (
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold text-green-600">
            {"\u09F3"} {money}
          </div>
          <div className="text-[11px] text-gray-600 leading-4">
            <div>Delivery Charge: {"\u09F3"} {breakdown.deliveryCharge}</div>
            <div>COD Charge: {"\u09F3"} {breakdown.codCharge}</div>
            <div>Weight Charge: {"\u09F3"} {breakdown.weightCharge}</div>
            <div className="text-[#FE5000]">Discount: {"\u09F3"} {breakdown.discount}</div>
          </div>
        </div>
      );
    },
  },
  {
    key: "age",
    header: "Age",
    headerClassName: "pl-20",
    width: "15%",
    wrap: true,
    render: (row) => (
      <div className="flex flex-col items-center  gap-1">
        <span className="rounded-full bg-[#FDEFE6] px-4 py-1 text-[11px] font-semibold text-gray-800">
          {row.age}
        </span>
        <div className="text-[10px] text-gray-500 leading-4 text-center">
          <div>
            <p className="font-semibold text-gray-700">Created:</p>{" "}
            {row.createdAt ?? "-"}
          </div>
          <div>
            <p className="font-semibold text-gray-700">Last Updated:</p>{" "}
            {row.updatedAt ?? "-"}
          </div>
        </div>
      </div>
    ),
  },
];
