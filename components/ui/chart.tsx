"use client";

import * as React from "react";
import {
  Tooltip as RechartsTooltip,
  TooltipProps,
} from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

import { cn } from "@/lib/utils";

export type ChartConfig = Record<
  string,
  {
    label?: string;
    color?: string;
  }
>;

type ChartContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  config: ChartConfig;
};

const ChartConfigContext = React.createContext<ChartConfig | null>(null);

export function ChartContainer({
  children,
  className,
  config,
  ...props
}: ChartContainerProps) {
  return (
    <ChartConfigContext.Provider value={config}>
      <div className={cn("relative flex flex-col", className)} {...props}>
        {children}
      </div>
    </ChartConfigContext.Provider>
  );
}

export function useChartConfig() {
  const context = React.useContext(ChartConfigContext);
  if (!context) {
    throw new Error("useChartConfig must be used within a ChartContainer");
  }
  return context;
}

type ChartTooltipProps = TooltipProps<ValueType, NameType>;

export function ChartTooltip({ wrapperStyle, ...props }: ChartTooltipProps) {
  return (
    <RechartsTooltip
      {...props}
      wrapperStyle={{ outline: "none", ...(wrapperStyle ?? {}) }}
    />
  );
}
