"use client";

import React from "react";
import { AlertCircle, Store, User, Wallet, Truck, ShieldX } from "lucide-react";

function Card({
  title,
  value,
  icon: Icon,
  tone = "default",
}: {
  title: string;
  value: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "default" | "green" | "purple" | "red";
}) {
  const toneClass =
    tone === "green"
      ? "bg-[#E8FFF0]"
      : tone === "purple"
      ? "bg-[#F7E9FF]"
      : tone === "red"
      ? "bg-[#FCE6E3]"
      : "bg-white";

  const iconTone =
    tone === "green"
      ? "text-green-600"
      : tone === "purple"
      ? "text-purple-700"
      : tone === "red"
      ? "text-red-600"
      : "text-gray-800";

  return (
    <div className={`rounded-xl border border-[#E9E9E9] p-4 flex justify-between ${toneClass}`}>
      <div className="space-y-1">
        <p className="text-xs text-gray-500 font-semibold">{title}</p>
        <div className="text-3xl font-extrabold text-gray-900">{value}</div>
      </div>
      <div className={`h-10 w-10 flex items-center justify-center ${iconTone}`}>
        <Icon className="h-7 w-7" />
      </div>
    </div>
  );
}

function money(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export default function MerchantStatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      <Card title="No. Of Stores" value={<span className="text-[#FE5000]">7</span>} icon={Store} />
      <Card title="No. Of Operators" value={<span className="text-[#FE5000]">4</span>} icon={User} />
      <Card
        title="Total Transactions"
        value={<span className="text-green-600">{"\u09F3"} {money(1187)}</span>}
        icon={Wallet}
      />
      <Card title="Parcel Delivered" value={<span className="text-green-700">125</span>} icon={Truck} tone="green" />
      <Card title="Parcel Returned" value={<span className="text-purple-700">125</span>} icon={ShieldX} tone="purple" />
      <Card title="Parcel Reported" value={<span className="text-red-700">125</span>} icon={AlertCircle} tone="red" />
    </div>
  );
}

