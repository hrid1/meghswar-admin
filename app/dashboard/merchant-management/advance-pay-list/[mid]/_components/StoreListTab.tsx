"use client";

import React from "react";
import { Eye, Pencil, Store, Trash2, Truck } from "lucide-react";
import { Search } from "lucide-react";

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  performance: {
    handled: number;
    delivered: number;
    returns: number;
  };
  status: "Active" | "Inactive";
}

interface StoreListProps {
  stores: Store[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function StoreListTab({
  stores,
  searchQuery,
  onSearchChange,
}: StoreListProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">Stores</h4>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <div className="relative w-full sm:max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Store"
              className="h-12 w-full rounded-xl border border-orange-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none focus:border-[#FE5000]"
            />
          </div>
          <button
            type="button"
            className="h-12 rounded-xl bg-[#FE5000] px-10 text-sm font-semibold text-white"
          >
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-orange-100">
        <table className="min-w-[980px] w-full text-left text-sm">
          <thead className="bg-[#FE5000] text-white text-xs font-semibold">
            <tr>
              <th className="w-12 px-4 py-4">
                <input
                  type="checkbox"
                  aria-label="Select all stores"
                  className="h-4 w-4 rounded border-white/60 accent-white"
                />
              </th>
              <th className="px-4 py-4">ID</th>
              <th className="px-4 py-4">Store Name</th>
              <th className="px-4 py-4">Phone</th>
              <th className="px-4 py-4">Store Address</th>
              <th className="px-4 py-4">Performance</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {stores.map((store) => (
              <tr key={store.id} className="text-gray-800">
                <td className="px-4 py-5">
                  <input
                    type="checkbox"
                    aria-label={`Select store ${store.id}`}
                    className="h-4 w-4 rounded border-orange-200 accent-[#FE5000]"
                  />
                </td>
                <td className="px-4 py-5 text-xs font-semibold text-gray-700">
                  {store.id}
                </td>
                <td className="px-4 py-5 font-semibold text-gray-900">
                  {store.name}
                </td>
                <td className="px-4 py-5 text-gray-700">{store.phone}</td>
                <td className="px-4 py-5 text-gray-700">{store.address}</td>
                <td className="px-4 py-5">
                  <div className="space-y-1 text-xs text-gray-500">
                    <p>
                      Total Parcels Handled:{" "}
                      <span className="font-semibold text-gray-900">
                        {store.performance.handled.toLocaleString()}
                      </span>
                    </p>
                    <p>
                      Successfully Delivered:{" "}
                      <span className="font-semibold text-gray-900">
                        {store.performance.delivered.toLocaleString()}
                      </span>
                    </p>
                    <p>
                      Total Returns:{" "}
                      <span className="font-semibold text-gray-900">
                        {store.performance.returns.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <span
                    className={[
                      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border",
                      store.status === "Active"
                        ? "bg-[#DBFFE6] text-[#0B8F3C] border-[#BDF5CF]"
                        : "bg-gray-100 text-gray-700 border-gray-200",
                    ].join(" ")}
                  >
                    {store.status}
                  </span>
                </td>
                <td className="px-4 py-5">
                  <div className="flex items-center justify-end gap-2 text-gray-500">
                    <button
                      type="button"
                      aria-label={`View store ${store.id}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-50"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Edit store ${store.id}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-50"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete store ${store.id}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
