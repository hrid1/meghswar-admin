"use client";

import React from "react";
import CustomModal from "@/components/reusable/CustomModal";
import { AppButton } from "@/components/reusable/CustomButton";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface BalanceTransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    sourceAccount?: any;
}

const AccountCard = ({ title, bankName, accountNo, holderName, logoUrl }: { title: string, bankName: string, accountNo: string, holderName: string, logoUrl: string }) => (
    <div className="bg-gray-50 rounded-xl p-5 flex items-start justify-between relative">
        <div className="space-y-1">
            <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-sm text-gray-600 font-medium">{bankName}</p>
            <p className="text-sm">
                <span className="text-gray-500">Account No:</span>{" "}
                <span className="font-bold text-gray-900">{accountNo}</span>
            </p>
            <p className="text-sm">
                <span className="text-gray-500">Account Holder Name:</span>{" "}
                <span className="font-bold text-gray-900">{holderName}</span>
            </p>
        </div>
        <div className="h-10 w-10 shrink-0 flex items-center justify-center bg-white rounded-full p-1">
            <img src={logoUrl} alt="Bank" className="max-w-full max-h-full object-contain" />
        </div>
    </div>
);

const StatsCard = ({ label, value, valueColor = "text-green-600" }: { label: string, value: string, valueColor?: string }) => (
    <div className="bg-gray-50 rounded-xl p-5 flex items-center h-[90px]">
        <span className="text-sm font-bold text-gray-900">
            {label}: <span className={valueColor}>{value}</span>
        </span>
    </div>
);

export default function BalanceTransferModal({
    isOpen,
    onClose,
    sourceAccount,
}: BalanceTransferModalProps) {
    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            className="!max-w-4xl p-6 overflow-hidden"
        >
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Balance Transfer</h2>

                {/* Transfer Selection */}
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 justify-between">
                    <div className="flex items-center gap-3 w-full">
                        <span className="font-bold text-sm text-gray-900 w-12">From</span>
                        <Select>
                            <SelectTrigger className="w-full h-10 bg-white border-gray-200">
                                <SelectValue placeholder="Dutch Bangla Bank (74584136...)" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="dbbl">Dutch Bangla Bank</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <ArrowRight className="text-gray-900 shrink-0 hidden md:block" />

                    <div className="flex items-center gap-3 w-full">
                        <span className="font-bold text-sm text-gray-900 w-8 text-center">To</span>
                        <Select>
                            <SelectTrigger className="w-full h-10 bg-white border-gray-200">
                                <SelectValue placeholder="EBL Bank (98423621...)" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ebl">EBL Bank</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* From Section */}
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3">From</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AccountCard
                            title="Account Details"
                            bankName={sourceAccount?.bank?.name || "Dutch Bangla Bank"}
                            accountNo={sourceAccount?.accountNo || "7458413684559"}
                            holderName={sourceAccount?.holderName || "Shahriar Emon"}
                            logoUrl={sourceAccount?.bank?.logoUrl || "https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Dutch-Bangla_Bank_Limited.svg/1200px-Dutch-Bangla_Bank_Limited.svg.png"}
                        />
                        <div className="space-y-4">
                            <StatsCard label="Account Balance" value={`৳${sourceAccount?.balance?.amount || "5,47,256,333"}`} />
                            <StatsCard label="Last Used" value={sourceAccount?.balance?.lastUsed || "19 Oct, 2025, 2:50PM"} valueColor="text-[#FE5000]" />
                        </div>
                    </div>
                </div>

                {/* To Section */}
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3">To</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AccountCard
                            title="Account Details"
                            bankName="EBL Sky Banking"
                            accountNo="9842362184559"
                            holderName="Shahriar Emon"
                            logoUrl="https://seeklogo.com/images/E/eastern-bank-limited-ebl-logo-F110B6B386-seeklogo.com.png"
                        />
                        <div className="space-y-4">
                            <StatsCard label="Account Balance" value={`৳${"5,47,256,333"}`} />
                            <StatsCard label="Last Used" value={"19 Oct, 2025, 2:50PM"} valueColor="text-[#FE5000]" />
                        </div>
                    </div>
                </div>

                {/* Transfer Amount Section */}
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3">Transfer Amount</h3>
                    <div className="bg-gray-50 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4">
                        <Input
                            placeholder="Enter Transfer Amount"
                            className="bg-white border-gray-200 h-11 flex-1"
                        />
                        <AppButton
                            variantType="primary"
                            className="bg-[#FE5000] hover:bg-[#FE5000]/90 text-white font-bold h-11 px-8 w-full md:w-auto rounded-lg"
                            onClick={onClose}
                        >
                            Confirm Transfer
                        </AppButton>
                    </div>
                </div>
            </div>
        </CustomModal>
    );
}
