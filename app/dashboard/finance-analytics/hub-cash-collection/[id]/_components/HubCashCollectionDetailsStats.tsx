import React from "react";
import { type HubStats } from "./fakeData";

export default function HubCashCollectionDetailsStats({ stats }: { stats: HubStats }) {
    const money = (n: number) => new Intl.NumberFormat("en-US").format(n);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Collected */}
            <div className="bg-[#E6FFF0] rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2">
                <h2 className="text-[#00A533] text-4xl font-extrabold flex items-center gap-1">
                    <span className="text-3xl text-[#00A533]">৳</span> {money(stats.totalCollected)}
                </h2>
                <p className="text-[#00A533] font-bold text-lg leading-tight px-4">
                    Total Collected Amount
                </p>
            </div>

            {/* Expenses Clearance */}
            <div className="bg-[#FFF4E6] rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2">
                <h2 className="text-[#FE5000] text-4xl font-extrabold flex items-center gap-1">
                    <span className="text-3xl text-[#FE5000]">৳</span> {money(stats.expensesClearance)}
                </h2>
                <p className="text-[#FE5000] font-bold text-lg leading-tight px-4">
                    Expenses Clearance Remaining
                </p>
            </div>

            {/* Total Receivable */}
            <div className="bg-[#40A854] rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2">
                <h2 className="text-white text-4xl font-extrabold flex items-center gap-1">
                    <span className="text-3xl text-white">৳</span> {money(stats.totalReceivable)}
                </h2>
                <p className="text-white font-bold text-lg leading-tight px-4">
                    Total Receivable Amount
                </p>
            </div>
        </div>
    );
}
