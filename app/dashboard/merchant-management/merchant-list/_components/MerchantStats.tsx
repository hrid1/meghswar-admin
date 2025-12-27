"use client";

import React from "react";
import { BadgeDollarSign, Store, Wallet } from "lucide-react";

function Card({
  title,
  children,
  icon: Icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        {children}
      </div>
      <div className="h-12 w-12 rounded-lg bg-orange-50 flex items-center justify-center">
        <Icon className="h-7 w-7 text-[#FE5000]" />
      </div>
    </div>
  );
}

export default function MerchantStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Total Merchants" icon={Store}>
        <div className="text-4xl font-extrabold text-[#FE5000]">365</div>
      </Card>

      <Card title="Top Merchant" icon={BadgeDollarSign}>
        <div className="text-xl font-bold text-[#FE5000]">Booklet Design BD</div>
        <div className="text-xs text-gray-400 font-semibold">
          Successful Parcels: 746
        </div>
      </Card>

      <Card title="Top Merchant's Transaction" icon={Wallet}>
        <div className="text-3xl font-extrabold text-green-600">
          {"\u09F3"} 1,187
        </div>
      </Card>
    </div>
  );
}

