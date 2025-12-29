"use client";

import React, { useMemo } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

type FlowPoint = { day: string; value: number };

const chartConfig = {
  value: {
    label: "Parcel Flow",
    color: "#FE5000",
  },
};

function FlowTooltip({ active, payload }: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload as FlowPoint | undefined;
  const value = Number(payload[0].value ?? 0);
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 text-xs shadow-lg">
      <p className="font-semibold uppercase tracking-wide text-gray-500">
        {point?.day ?? ""}
      </p>
      <p className="mt-1 text-lg font-bold text-gray-900">{value.toLocaleString()}</p>
    </div>
  );
}

export default function ParcelFlowChart() {
  const flowData: FlowPoint[] = useMemo(
    () => [
      { day: "Sat", value: 3000 },
      { day: "Sun", value: 4200 },
      { day: "Mon", value: 2800 },
      { day: "Tues", value: 5000 },
      { day: "Wed", value: 6200 },
      { day: "Thu", value: 4700 },
      { day: "Fri", value: 5900 },
    ],
    []
  );

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Parcel Flow</h3>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-full bg-[#FE5000] px-5 py-2 text-xs font-semibold text-white"
          >
            Weekly (7 Days)
          </button>
          <select className="rounded-full border border-gray-200 bg-white px-5 py-2 text-xs font-medium text-gray-700 outline-none">
            <option>Monthly (April)</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <ChartContainer
          config={chartConfig}
          className="h-80 w-full overflow-visible ps-1.5 pe-2.5 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-initial"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={flowData}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <defs>
                <linearGradient id="parcelFlowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartConfig.value.color} stopOpacity={0.18} />
                  <stop offset="100%" stopColor={chartConfig.value.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="4 12"
                stroke="var(--input)"
                strokeOpacity={1}
                horizontal
                vertical={false}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={12}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => `${v / 1000}k`}
                domain={[0, "dataMax + 1000"]}
                tickCount={6}
                tickMargin={12}
              />
              <ChartTooltip
                content={(props) => <FlowTooltip {...props} />}
                cursor={{
                  stroke: chartConfig.value.color,
                  strokeWidth: 1,
                  strokeDasharray: "none",
                }}
              />
              <Area
                type="linear"
                dataKey="value"
                stroke="transparent"
                fill="url(#parcelFlowGradient)"
                strokeWidth={0}
                dot={false}
              />
              <Line
                type="linear"
                dataKey="value"
                stroke={chartConfig.value.color}
                strokeWidth={2.5}
                activeDot={{
                  r: 6,
                  fill: chartConfig.value.color,
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
