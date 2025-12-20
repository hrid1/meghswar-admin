"use client";

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

import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

type ChargePoint = {
  month: string;
  value: number;
};

const defaultData: ChargePoint[] = [
  { month: "JAN", value: 3200 },
  { month: "FEB", value: 4500 },
  { month: "MAR", value: 4900 },
  { month: "APR", value: 6400 },
  { month: "MAY", value: 5200 },
  { month: "JUN", value: 7000 },
  { month: "JUL", value: 6100 },
  { month: "AUG", value: 3900 },
  { month: "SEP", value: 6300 },
  { month: "OCT", value: 6800 },
  { month: "NOV", value: 7600 },
  { month: "DEC", value: 6200 },
];

const chartConfig = {
  value: {
    label: "Delivery Charge",
    color: "#fb923c",
  },
};

function CustomTooltip({
  active,
  payload,
}: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0].payload as ChargePoint | undefined;
  const charge = Number(payload[0].value ?? 0);
  const label = point?.month ?? "";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 text-xs shadow-lg">
      <p className="font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="mt-1 text-lg font-bold text-gray-900">
        ৳{charge.toLocaleString()}
      </p>
    </div>
  );
}

export function DeliveryChargeChart({
  data = defaultData,
  periodLabel = "Monthly (April)",
}: {
  data?: ChargePoint[];
  periodLabel?: string;
}) {
  const filteredData = data;

  return (
    <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm shadow-orange-200/40">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Delivery Charge
          </p>
          <p className="text-lg font-semibold text-gray-900">৳ per month</p>
        </div>
        <span className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500">
          {periodLabel}
        </span>
      </div>

      <div className="mt-4">
        <ChartContainer
          config={chartConfig}
          className="h-75 w-full overflow-visible ps-1.5 pe-2.5 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-initial"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={filteredData}
              margin={{ top: 25, right: 25, left: 0, bottom: 25 }}
            >
              <defs>
                <linearGradient
                  id="cashflowGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={chartConfig.value.color}
                    stopOpacity={0.15}
                  />
                  <stop
                    offset="100%"
                    stopColor={chartConfig.value.color}
                    stopOpacity={0}
                  />
                </linearGradient>
                <filter id="dotShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow
                    dx="2"
                    dy="2"
                    stdDeviation="3"
                    floodColor="rgba(0,0,0,0.5)"
                  />
                </filter>
              </defs>
              <CartesianGrid
                strokeDasharray="4 12"
                stroke="var(--input)"
                strokeOpacity={1}
                horizontal
                vertical={false}
              />
              <XAxis
                dataKey="month"
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
                tickFormatter={(value) => `${value / 1000}K`}
                domain={[0, "dataMax + 1000"]}
                tickCount={6}
                tickMargin={12}
              />
              <ChartTooltip
                content={(props) => <CustomTooltip {...props} />}
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
                fill="url(#cashflowGradient)"
                strokeWidth={0}
                dot={false}
              />
              <Line
                type="linear"
                dataKey="value"
                stroke={chartConfig.value.color}
                strokeWidth={3}
                dot={(props) => {
                  const point = props as {
                    cx?: number;
                    cy?: number;
                    payload?: ChargePoint;
                  };
                  if (
                    point.payload &&
                    (point.payload.month === "JUN" || point.payload.month === "NOV")
                  )
                  //  {
                  //   return (
                  //     <circle
                  //       key={`dot-${point.cx}-${point.cy}`}
                  //       cx={point.cx}
                  //       cy={point.cy}
                  //       r={6}
                  //       fill={chartConfig.value.color}
                  //       stroke="white"
                  //       strokeWidth={2}
                  //       filter="url(#dotShadow)"
                  //     />
                  //   );
                  // }
                  return null;
                }}
                activeDot={{
                  r: 6,
                  fill: chartConfig.value.color,
                  stroke: "white",
                  strokeWidth: 2,
                  filter: "url(#dotShadow)",
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
