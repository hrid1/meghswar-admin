"use client";

import React from "react";
import { Store, Truck } from "lucide-react";

interface ListsTabNavProps {
  activeTab: "stores" | "parcels";
  onTabChange: (tab: "stores" | "parcels") => void;
  storeCount: number;
  parcelCount: number;
}

export default function ListsTabNav({
  activeTab,
  onTabChange,
  storeCount,
  parcelCount,
}: ListsTabNavProps) {
  return (
    <div className="border-b border-gray-100 bg-gray-50/60 p-6 lg:border-b-0 lg:border-r">
      <h3 className="text-lg font-semibold text-gray-900">Lists</h3>
      <p className="mt-1 text-xs text-gray-500">Stores and parcels for this merchant</p>

      <div className="mt-5 flex flex-col gap-2" role="tablist" aria-label="Merchant lists">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "stores"}
          onClick={() => onTabChange("stores")}
          className={[
            "flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition-colors",
            activeTab === "stores"
              ? "bg-white text-gray-900 border-gray-200 shadow-sm"
              : "bg-transparent text-gray-600 border-transparent hover:bg-white/70 hover:text-gray-900",
          ].join(" ")}
        >
          <span className="inline-flex items-center gap-2">
            <Store className="h-4 w-4" />
            Store List
          </span>
          <span className="rounded-full bg-gray-200/70 px-2 py-0.5 text-xs font-bold text-gray-700">
            {storeCount}
          </span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "parcels"}
          onClick={() => onTabChange("parcels")}
          className={[
            "flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition-colors",
            activeTab === "parcels"
              ? "bg-white text-gray-900 border-gray-200 shadow-sm"
              : "bg-transparent text-gray-600 border-transparent hover:bg-white/70 hover:text-gray-900",
          ].join(" ")}
        >
          <span className="inline-flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Parcel List
          </span>
          <span className="rounded-full bg-gray-200/70 px-2 py-0.5 text-xs font-bold text-gray-700">
            {parcelCount}
          </span>
        </button>
      </div>
    </div>
  );
}
