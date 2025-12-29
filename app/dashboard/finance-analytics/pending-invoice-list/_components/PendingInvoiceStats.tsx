import React from "react";
import { ArrowRight } from "lucide-react";

const stats = [
  { bank: "DBBL", amount: "1,01,187" },
  { bank: "EBL", amount: "1,01,187" },
  { bank: "Brac", amount: "1,01,187" },
];

export default function PendingInvoiceStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-center gap-2 shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="text-gray-500 font-medium text-sm">Available Balance</span>
          <div className="flex items-center gap-2">
            <span className="text-black font-bold text-lg">{stat.bank} :</span>
            <span className="text-green-600 font-bold text-lg flex items-center">
              <span className="text-xl mr-1">৳</span> {stat.amount}
            </span>
          </div>
        </div>
      ))}

      {/* See More Card */}
      <button className="bg-[#FFF4E6] rounded-xl p-6 flex items-center justify-center hover:bg-[#ffe8d1] transition-colors group cursor-pointer border border-[#ffe8d1]">
        <span className="text-orange-500 font-bold text-lg group-hover:scale-105 transition-transform">
          See more
        </span>
      </button>
    </div>
  );
}
