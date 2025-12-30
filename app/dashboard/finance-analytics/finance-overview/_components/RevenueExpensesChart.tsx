"use client";

import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const data = [
    { name: "Jan", revenue: 65, expenses: 40 },
    { name: "Feb", revenue: 15, expenses: 18 },
    { name: "Mar", revenue: 42, expenses: 50 },
    { name: "April", revenue: 80, expenses: 78 },
    { name: "May", revenue: 55, expenses: 48 },
    { name: "June", revenue: 60, expenses: 32 },
    { name: "July", revenue: 84, expenses: 45 },
    { name: "Aug", revenue: 66, expenses: 98 },
    { name: "Sep", revenue: 76, expenses: 88 }, // Adjusting to match the wavy curve roughly
    { name: "Oct", revenue: 30, expenses: 90 },
    { name: "Nov", revenue: 95, expenses: 50 },
    { name: "Dec", revenue: 20, expenses: 55 },
];

export const RevenueExpensesChart = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Vs Expenses</h3>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#FE5000]"></span>
                        <span className="text-xs text-gray-500 font-medium">Revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-gray-200"></span>
                        <span className="text-xs text-gray-500 font-medium">Expenses</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FE5000" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#FE5000" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#E5E7EB" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#E5E7EB" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#6B7280' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#6B7280' }}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />

                        {/* The image shows smooth curves, likely monotone or similar interpolation */}
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#FE5000"
                            strokeWidth={1.5}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                            dot={{ r: 3, fill: "white", stroke: "#FE5000", strokeWidth: 1.5 }}
                            activeDot={{ r: 5 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="expenses"
                            stroke="#E5E7EB"
                            strokeWidth={1.5}
                            fillOpacity={1}
                            fill="url(#colorExpenses)"
                            dot={{ r: 3, fill: "white", stroke: "#E5E7EB", strokeWidth: 1.5 }}
                            activeDot={{ r: 5 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
