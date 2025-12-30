"use client";

import React from "react";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";

const bankAccounts = [
    { name: "BRAC Bank", mask: "**** 4582", amount: "৳ 2,850,000", color: "bg-orange-100" },
    { name: "BRAC Bank", mask: "**** 4582", amount: "৳ 2,850,000", color: "bg-orange-100" },
    { name: "BRAC Bank", mask: "**** 4582", amount: "৳ 2,850,000", color: "bg-orange-100" },
    { name: "BRAC Bank", mask: "**** 4582", amount: "৳ 2,850,000", color: "bg-orange-100" },
];

export const TotalLiquiditySection = () => {
    return (
        <div className="bg-[#FE5000] rounded-xl p-6 md:p-8 text-white flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">

            {/* Left Info Section */}
            <div className="flex flex-col gap-4 lg:w-1/3">
                <h3 className="text-lg font-medium opacity-90">Total Liquidity</h3>
                <h1 className="text-4xl lg:text-5xl font-bold">৳ 11, 187,230</h1>
                <p className="text-sm opacity-80 font-light">Available Across all corporate accounts</p>

                <div className="mt-4">
                    <Button
                        variant="secondary"
                        className="bg-white text-[#FE5000] hover:bg-gray-100 font-semibold gap-2"
                    >
                        <History size={16} />
                        View Transaction History
                    </Button>
                </div>
            </div>

            {/* Right Bank Cards Grid */}
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {bankAccounts.map((account, idx) => (
                    <div key={idx} className="bg-white text-gray-900 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                        {/* Bank Icon Placeholder */}
                        <div className={`w-12 h-12 rounded-full ${account.color} flex-shrink-0`}></div>

                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-[#FE5000] text-sm">{account.name}</h4>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">{account.mask}</p>
                        </div>

                        <div className="text-right">
                            <span className="text-lg font-bold text-[#FE5000]">{account.amount}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
