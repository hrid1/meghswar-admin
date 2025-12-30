"use client";

import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
    label: string;
    value: string;
    icon: React.ReactNode;
    trend?: {
        value: string;
        isPositive: boolean;
    };
}

export const MetricCard: React.FC<MetricCardProps> = ({
    label,
    value,
    icon,
    trend,
}) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[140px]">
            <div className="flex justify-between items-start">
                <div className="bg-[#FFF4EC] p-2.5 rounded-lg text-[#FE5000]">
                    {icon}
                </div>
                {trend && (
                    <div
                        className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trend.isPositive
                                ? "text-emerald-600 bg-emerald-50"
                                : "text-red-600 bg-red-50"
                            }`}
                    >
                        {trend.isPositive ? (
                            <TrendingUp className="h-3 w-3" />
                        ) : (
                            <TrendingDown className="h-3 w-3" />
                        )}
                        {trend.value}
                    </div>
                )}
            </div>

            <div className="mt-4">
                <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
        </div>
    );
};
