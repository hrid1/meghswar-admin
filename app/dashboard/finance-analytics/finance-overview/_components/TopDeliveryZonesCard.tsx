"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const zones = [
    { name: "Badda", deliveries: "5,241" },
    { name: "Rampura", deliveries: "4,890" },
    { name: "Dhanmondi", deliveries: "3,120" },
    { name: "Uttara 5", deliveries: "2,850" },
    { name: "Basundhara", deliveries: "1,350" },
];

export const TopDeliveryZonesCard = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Top Delivery Zones</h3>
                <Button variant="link" className="text-[#FE5000] text-sm p-0 h-auto font-medium">
                    View All
                </Button>
            </div>

            <div className="flex-1">
                {/* Header Row */}
                <div className="flex justify-between text-xs text-gray-400 font-medium mb-4 pb-2 border-b border-gray-50 uppercase tracking-wider">
                    <span>Zone Name</span>
                    <span>Deliveries</span>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {zones.map((zone, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="font-medium text-gray-700">{zone.name}</span>
                            <span className="font-semibold text-gray-900">{zone.deliveries}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
