"use client";

import React from "react";

interface Parcel {
  trackingId: string;
  recipient: string;
  cod: number;
  status: "Delivered" | "In Transit" | "Returned";
  updatedAt: string;
}

interface ParcelListTabProps {
  parcels: Parcel[];
}

export default function ParcelListTab({ parcels }: ParcelListTabProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-wide text-gray-500">
          <tr className="border-b border-gray-100">
            <th className="py-3 pe-4">Tracking ID</th>
            <th className="py-3 pe-4">Recipient</th>
            <th className="py-3 pe-4">Updated</th>
            <th className="py-3 pe-4">Status</th>
            <th className="py-3 text-right">COD</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {parcels.map((parcel) => (
            <tr key={parcel.trackingId} className="text-gray-800">
              <td className="py-3 pe-4 font-medium">{parcel.trackingId}</td>
              <td className="py-3 pe-4">{parcel.recipient}</td>
              <td className="py-3 pe-4 text-gray-600">{parcel.updatedAt}</td>
              <td className="py-3 pe-4">
                <span
                  className={[
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border",
                    parcel.status === "Delivered"
                      ? "bg-[#DBFFE6] text-[#0B8F3C] border-[#BDF5CF]"
                      : parcel.status === "Returned"
                        ? "bg-[#F3E8FF] text-[#7C3AED] border-[#E9D5FF]"
                        : "bg-orange-50 text-[#FE5000] border-orange-200",
                  ].join(" ")}
                >
                  {parcel.status}
                </span>
              </td>
              <td className="py-3 text-right font-semibold text-gray-900">
                {parcel.cod.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
