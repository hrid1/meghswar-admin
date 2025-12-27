"use client";

import React, { useState } from "react";

export default function MerchantHeaderCard({ merchantId }: { merchantId: string }) {
  const [advancePayment, setAdvancePayment] = useState(true);

  return (
    <div className="rounded-2xl border border-[#E9E9E9] bg-white p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="h-16 w-16 rounded-full bg-gray-200 shrink-0" />

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500">Merchant&apos;s Business Name</p>
            <p className="text-lg font-bold text-[#FE5000]">Booklet Design BD</p>
            <div className="mt-2">
              <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-[11px] font-semibold text-green-700">
                Active
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p className="text-sm text-gray-800 leading-5">
              Plot#142, Safwan Road, Block#B, Bashundhara Residential Area,
              Baridhara, Dhaka - 1229
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Contact Person&apos;s Name</p>
              <p className="text-sm font-semibold text-gray-900">Johir Raihan</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm text-gray-800">+8801234567890</p>
            </div>

            <div className="col-span-2 flex items-center justify-between pt-1">
              <p className="text-xs text-gray-500">Advance Payment</p>
              <button
                type="button"
                aria-label="Toggle advance payment"
                onClick={() => setAdvancePayment((v) => !v)}
                className="relative inline-flex items-center cursor-pointer"
              >
                <span className="sr-only">Toggle</span>
                <div
                  className={`w-12 h-7 rounded-full transition-colors ${
                    advancePayment ? "bg-[#2DBB4E]" : "bg-gray-200"
                  }`}
                />
                <div
                  className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                    advancePayment ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {merchantId ? (
        <p className="mt-4 text-xs text-gray-400">Merchant ID: {merchantId}</p>
      ) : null}
    </div>
  );
}

