"use client";

import React from "react";
import {
  AlertCircle,
  Banknote,
  Store,
  Truck,
  Undo2,
  User,
} from "lucide-react";

export default function StatsSection() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
      <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-4 flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 font-medium">No. Of Stores</p>
          <p className="mt-2 text-3xl font-extrabold text-[#FE5000]">7</p>
        </div>
        <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#FE5000]">
          <Store className="h-5 w-5" />
        </div>
      </div>

      <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-4 flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 font-medium">No. Of Operators</p>
          <p className="mt-2 text-3xl font-extrabold text-[#FE5000]">4</p>
        </div>
        <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#FE5000]">
          <User className="h-5 w-5" />
        </div>
      </div>

      <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-4 flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 font-medium">Total Transactions</p>
          <p className="mt-2 text-xl font-extrabold text-[#107E3E]">৳1,187</p>
        </div>
        <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center text-[#107E3E]">
          <Banknote className="h-5 w-5" />
        </div>
      </div>

      <div className="rounded-xl bg-[#DBFFE6] border border-[#BDF5CF] shadow-sm p-4 flex items-start justify-between">
        <div>
          <p className="text-xs text-[#0B8F3C] font-semibold">Parcel Delivered</p>
          <p className="mt-2 text-3xl font-extrabold text-[#0B8F3C]">125</p>
        </div>
        <div className="h-10 w-10 rounded-xl bg-white/60 flex items-center justify-center text-[#0B8F3C]">
          <Truck className="h-5 w-5" />
        </div>
      </div>

      <div className="rounded-xl bg-[#F3E8FF] border border-[#E9D5FF] shadow-sm p-4 flex items-start justify-between">
        <div>
          <p className="text-xs text-[#7C3AED] font-semibold">Parcel Returned</p>
          <p className="mt-2 text-3xl font-extrabold text-[#7C3AED]">125</p>
        </div>
        <div className="h-10 w-10 rounded-xl bg-white/60 flex items-center justify-center text-[#7C3AED]">
          <Undo2 className="h-5 w-5" />
        </div>
      </div>

      <div className="rounded-xl bg-[#EF4444] border border-[#EF4444] shadow-sm p-4 flex items-start justify-between text-white">
        <div>
          <p className="text-xs font-semibold opacity-90">Parcel Reported</p>
          <p className="mt-2 text-3xl font-extrabold">125</p>
        </div>
        <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center">
          <AlertCircle className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
