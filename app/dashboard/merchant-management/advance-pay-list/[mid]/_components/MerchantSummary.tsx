"use client";

import React from "react";

interface MerchantSummaryProps {
  mid: string;
  advanceEnabled: boolean;
  onAdvanceToggle: (enabled: boolean) => void;
}

export default function MerchantSummary({
  mid,
  advanceEnabled,
  onAdvanceToggle,
}: MerchantSummaryProps) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <div className="h-18 w-18 rounded-full bg-gray-200 shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Merchant's Business Name</p>
            <p className="text-2xl font-extrabold text-[#FE5000]">
              Booklet Design BD
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-400">Contact Person's Name</p>
                <p className="text-sm font-semibold text-gray-900">
                  Johir Raihan
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Phone</p>
                <p className="text-sm font-semibold text-gray-900">
                  +8801234567890
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-xl">
          <div>
            <p className="text-xs text-gray-400">Address</p>
            <p className="text-sm font-semibold text-gray-700 leading-relaxed">
              Plot#142, Safwan Road, Block#B, Bashundhara Residential Area,
              Baridhara, Dhaka - 1229
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <span className="inline-flex w-fit items-center rounded-full bg-[#DBFFE6] px-4 py-1.5 text-xs font-semibold text-[#0B8F3C] border border-[#BDF5CF]">
              Active
            </span>

            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <span className="text-xs text-gray-400">Advance Payment</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={advanceEnabled}
                  onChange={(e) => onAdvanceToggle(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-checked:bg-[#2DBB4E] transition-colors" />
                <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
              </label>
            </div>
            <p className="text-[11px] text-gray-400 sm:text-right">
              Merchant ID: <span className="font-medium">{mid}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
