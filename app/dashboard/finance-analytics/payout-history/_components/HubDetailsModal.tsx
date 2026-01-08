"use client";

import React from "react";
import CustomModal from "@/components/reusable/CustomModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface HubDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    // We can pass row data here later if needed
    data?: any;
}

export default function HubDetailsModal({ isOpen, onClose }: HubDetailsModalProps) {
    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            className="!max-w-[980px] p-0 overflow-hidden"
        >
            {/* Custom Header with specific styling matching the image */}
            <div className="pb-2">
                <h2 className="text-xl font-bold text-gray-900">
                    Payout History <span className="text-gray-400">&gt;</span> View Details
                </h2>
            </div>

            <div className="space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">

                {/* Staff Information Section */}
                <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Staff Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Profile Card */}
                        <div className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4">
                            <div className="h-24 w-24 rounded-full overflow-hidden shrink-0 bg-gray-100">
                                <img
                                    src="https://github.com/shadcn.png"
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-lg font-bold text-gray-900">Ahmed Wasi</h4>
                                    <Badge className="bg-green-100 text-green-600 hover:bg-green-100 border-0 px-2 py-0.5 gap-1 text-[10px]">
                                        <CheckCircle2 className="w-3 h-3" />
                                        Verified
                                    </Badge>
                                </div>
                                <p className="text-xs text-gray-500 font-medium">HUB-Manager (Dhanmondi)</p>
                                <p className="text-xs text-gray-500 mb-2">+8801234567890</p>

                                <div className="flex gap-4 text-xs mt-2">
                                    <span className="text-gray-500">Salary: <span className="text-[#FE5000] font-bold">৳30,000</span></span>
                                    <span className="text-gray-500">Commision: <span className="text-green-600 font-bold">৳5,000</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side Stats */}
                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                                <span className="text-sm font-bold text-gray-900">Total Earnings: <span className="text-green-600">৳5,47,256,333</span></span>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                                <span className="text-sm font-bold text-gray-900">Last Paid: <span className="text-[#FE5000]">19 Oct, 2025, 2:50PM</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Salary Paid Section */}
                <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Salary Paid</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-xl p-6 flex flex-col justify-between min-h-[100px]">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-gray-900">Month <span className="text-gray-400 font-normal">(Sep - Oct)</span></span>
                                <button className="text-xs text-gray-400 font-medium hover:text-gray-600">Change</button>
                            </div>
                            <div className="text-2xl font-bold text-green-600">
                                ৳5,47,256,333
                            </div>
                        </div>

                        <div className="bg-green-50 rounded-xl p-6 flex flex-col justify-between min-h-[100px]">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-green-700">Total</span>
                            </div>
                            <div className="text-2xl font-bold text-green-600">
                                ৳5,47,256,333
                            </div>
                        </div>
                    </div>
                </div>

                {/* Paid Using Section */}
                <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Paid Using</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Account Details */}
                        <div className="bg-gray-50 rounded-xl p-6 relative">
                            <h4 className="text-sm font-bold text-gray-900 mb-6">Account Details</h4>

                            <div className="space-y-1.5 text-xs text-gray-600">
                                <p>EBL Sky Banking</p>
                                <p><span className="text-gray-500">Account No:</span> <span className="font-semibold text-gray-900">9842362184559</span></p>
                                <p><span className="text-gray-500">Account Holder Name:</span> <span className="font-semibold text-gray-900">Shahriar Emon</span></p>
                            </div>

                            {/* Bank Logo Placeholder */}
                            <div className="absolute top-6 right-6 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] font-bold text-center leading-tight shadow-sm">
                                EBL<br />SKY
                            </div>
                        </div>

                        {/* Right Side Stats */}
                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-xl p-6 flex items-center">
                                <span className="text-sm font-bold text-gray-900">Account Balance: <span className="text-green-600">৳5,47,256,333</span></span>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6 flex items-center">
                                <span className="text-sm font-bold text-gray-900">Last Used: <span className="text-[#FE5000]">19 Oct, 2025, 2:50PM</span></span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </CustomModal>
    );
}
