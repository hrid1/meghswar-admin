"use client";

import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type ParcelPoint = { name: string; parcels: number };

function formatK(n: number) {
  if (n >= 1000) return `${Math.round(n / 100) / 10}k`;
  return String(n);
}

export default function ParcelFlowChart({
  title,
  period,
  month,
  onChangePeriod,
  onChangeMonth,
  data,
}: {
  title: string;
  period: "weekly" | "monthly";
  month: string;
  onChangePeriod: (p: "weekly" | "monthly") => void;
  onChangeMonth: (m: string) => void;
  data: ParcelPoint[];
}) {
  return (
    <div className="rounded-2xl border border-[#E9E9E9] bg-white p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChangePeriod("weekly")}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-colors ${
              period === "weekly"
                ? "bg-[#FE5000] text-white"
                : "bg-[#F2F2F2] text-gray-700"
            }`}
          >
            Weekly (7 Days)
          </button>

          <select
            className="rounded-full border border-[#E9E9E9] bg-[#F2F2F2] px-5 py-2 text-xs font-medium outline-none"
            value={month}
            onChange={(e) => {
              onChangeMonth(e.target.value);
              onChangePeriod("monthly");
            }}
          >
            <option value="april">Monthly (April)</option>
            <option value="may">Monthly (May)</option>
            <option value="june">Monthly (June)</option>
          </select>
        </div>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 25, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="fillOrange" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FE5000" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#FE5000" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#EEE" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis
              tickFormatter={formatK}
              tickLine={false}
              axisLine={false}
              width={30}
            />
            <Tooltip
              formatter={(value) => [value, "No. of Parcels"]}
              labelStyle={{ color: "#111" }}
              contentStyle={{
                borderRadius: 12,
                borderColor: "#E9E9E9",
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="parcels"
              stroke="#FE5000"
              strokeWidth={2}
              fill="url(#fillOrange)"
              dot={{ r: 3, strokeWidth: 2, fill: "#FE5000" }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

