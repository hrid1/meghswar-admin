import React from "react";
import { type HubInfo } from "./fakeData";

export default function HubInfoCard({ data }: { data: HubInfo }) {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div>
                    <h4 className="text-gray-400 text-sm font-medium">HUB Branch</h4>
                    <h2 className="text-[#FE5000] text-2xl font-bold">{data.branchName}</h2>
                </div>
                <div>
                    <h4 className="text-gray-400 text-sm font-medium">HUB Manager</h4>
                    <h2 className="text-black text-lg font-bold">{data.managerName}</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-tight">
                <div className="col-span-1 md:col-span-2">
                    <h4 className="text-gray-400 text-sm font-medium mb-1">Address</h4>
                    <p className="text-gray-600 font-medium text-sm leading-relaxed max-w-md">
                        {data.address}
                    </p>
                </div>
                <div>
                    <h4 className="text-gray-400 text-sm font-medium">Phone</h4>
                    <p className="text-gray-600 font-medium text-sm">{data.phone}</p>
                </div>
                <div>
                    <h4 className="text-gray-400 text-sm font-medium">Secondary Phone</h4>
                    <p className="text-gray-600 font-medium text-sm">{data.secondaryPhone}</p>
                </div>
            </div>
        </div>
    );
}
