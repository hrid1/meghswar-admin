"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const hubs = [
    {
        name: "Bashundhara HUB",
        parcels: "12,450 Parcels",
        success: 98,
        color: "bg-green-500",
    },
    {
        name: "Rampura HUB",
        parcels: "8,450 Parcels",
        success: 95,
        color: "bg-green-500",
    },
    {
        name: "Nashik Distribution",
        parcels: "5,100 Parcels",
        success: 95,
        color: "bg-yellow-400",
    },
];

export const HubPerformanceCard = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">HUB Performance</h3>
                <Button variant="link" className="text-[#FE5000] text-sm p-0 h-auto font-medium">
                    View All
                </Button>
            </div>

            <div className="space-y-6 flex-1">
                {hubs.map((hub, index) => (
                    <div key={index} className="flex items-center gap-4">
                        {/* Rank Circle */}
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm">
                            {index + 1}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-gray-900 truncate">
                                {hub.name}
                            </h4>
                            <p className="text-xs text-gray-500">{hub.parcels}</p>
                        </div>

                        {/* Progress */}
                        <div className="flex-shrink-0 w-32 text-right">
                            <span className={`text-xs font-bold ${hub.success >= 98 ? 'text-green-500' : 'text-yellow-500'} block mb-1`}>
                                {hub.success}% Success
                            </span>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${hub.color}`}
                                    style={{ width: `${hub.success}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
