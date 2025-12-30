"use client";

import React from "react";
import { MetricCard } from "./MetricCard";
import { RevenuePieChart } from "./RevenuePieChart";
import { RevenueExpensesChart } from "./RevenueExpensesChart";
import { DollarSign, Landmark, Wallet, Hourglass, LucideIcon, Coins } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HubPerformanceCard } from "./HubPerformanceCard";
import { TopDeliveryZonesCard } from "./TopDeliveryZonesCard";
import { TotalLiquiditySection } from "./TotalLiquiditySection";

const metrics = [
    {
        label: "Total Revenue",
        value: "৳ 11, 187,230",
        icon: <DollarSign className="h-6 w-6" />,
        trend: { value: "+5%", isPositive: true },
    },
    {
        label: "Total Expenses",
        value: "৳ 85,000",
        icon: <Landmark className="h-6 w-6" />, // Using Landmark implies bank/expenses often
        trend: { value: "+5%", isPositive: false }, // Red in image usually implies negative impact but label says +5%, let's stick to positive trend arrow color if business grew? Image shows Red +5%. Wait, usually Expense growth is bad, so Red logic applies.
    },
    {
        label: "Net Profit",
        value: "৳ 3,90,000",
        icon: <DollarSign className="h-6 w-6" />,
        trend: { value: "+5%", isPositive: true },
    },
    {
        label: "Collected Amount",
        value: "৳ 3,90,000",
        icon: <DollarSign className="h-6 w-6" />,
        trend: { value: "+5%", isPositive: true },
    },
    {
        label: "Merchant Payment",
        value: "৳ 3,90,000",
        icon: <Coins className="h-6 w-6" />, // Pinkish icon in image
        trend: undefined,
    },
    {
        label: "Pending Payment",
        value: "৳ 3,90,000",
        icon: <Hourglass className="h-6 w-6" />,
        trend: undefined,
    },
];

export default function FinanceOverview() {
    return (
        <div className="space-y-6">
            {/* Custom Header Section if not using PageShell for the title OR extending it. 
          PageShell handles title, but we have "Select Date Range" on right. 
          We can put that in PageShell's children or just render below. 
          Actually, let's just make the PageShell title/desc part of standard shell 
          and put the button in the action area if PageShell supports it.
          Assuming the PageShell from context doesn't support action prop, 
          we'll just let PageShell handle Title and render the date picker below or 
          inject it if I modify PageShell (riskier).
          
          Let's look at image: Title is Top Left. Button Top Right. 
          The PageShell component usually renders title. 
          I will assume PageShell renders title and I will just render the button absolutely or flexed 
          if I can't pass it. 
          
          Actually, I'll just render the content below PageShell title.
      */}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {metrics.map((m, i) => (
                    <MetricCard
                        key={i}
                        label={m.label}
                        value={m.value}
                        icon={m.icon}
                        trend={m.trend}
                    />
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pie Chart - Takes roughly 1/3 on large screens */}
                <div className="lg:col-span-1">
                    <RevenuePieChart />
                </div>

                {/* Area Chart - Takes roughly 2/3 on large screens */}
                <div className="lg:col-span-2">
                    <RevenueExpensesChart />
                </div>
            </div>

            {/* Performance & Zones Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HubPerformanceCard />
                <TopDeliveryZonesCard />
            </div>

            {/* Total Liquidity Section */}
            <div>
                <TotalLiquiditySection />
            </div>
        </div>
    );
}
