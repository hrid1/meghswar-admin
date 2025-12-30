"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Delivery Fee", value: 65, color: "#FE5000" }, // Orange
    { name: "COD Charges", value: 20, color: "#FF9C66" }, // Lighter Orange
    { name: "Others", value: 15, color: "#E5E7EB" }, // Gray
];

export const RevenuePieChart = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Sources</h3>

            <div className="flex-1 min-h-[300px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={0}
                            outerRadius={100}
                            paddingAngle={0}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Custom labels overlay - hard to get exactly right dynamically without complex math, 
            so for this static-ish design we'll rely on legend or tooltip generally, 
            but let's try to add some absolute pos text if needed or just rely on legend below.
            The image has text ON the slices. 
        */}
            </div>

            <div className="mt-8 space-y-3">
                {data.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-gray-500 text-sm font-medium">{item.name}</span>
                        </div>
                        <span className="text-gray-900 font-bold text-sm">{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
