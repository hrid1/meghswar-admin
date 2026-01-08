"use client";

import React from "react";
import CustomModal from "@/components/reusable/CustomModal";
import { Badge } from "@/components/ui/badge";

interface ViewStatementModalProps {
    isOpen: boolean;
    onClose: () => void;
    account?: any; // You can type this properly based on your AccountRow
}

const fakeStatementData = [
    {
        date: "05-JAN-25",
        description: "STATEMENT OPENING BALANCE",
        reference: "42165165489543",
        debits: "114789.00",
        credits: "",
        balance: "15465498",
    },
    {
        date: "05-JAN-25",
        description: "STATEMENT OPENING BALANCE",
        reference: "42165165489543",
        debits: "",
        credits: "114789.00",
        balance: "15465498",
    },
    {
        date: "05-JAN-25",
        description: "STATEMENT OPENING BALANCE",
        reference: "42165165489543",
        debits: "114789.00",
        credits: "",
        balance: "15465498",
    },
    {
        date: "05-JAN-25",
        description: "STATEMENT OPENING BALANCE",
        reference: "42165165489543",
        debits: "114789.00",
        credits: "",
        balance: "15465498",
    },
    {
        date: "05-JAN-25",
        description: "STATEMENT OPENING BALANCE",
        reference: "42165165489543",
        debits: "114789.00",
        credits: "",
        balance: "15465498",
    },
    {
        date: "05-JAN-25",
        description: "STATEMENT OPENING BALANCE",
        reference: "42165165489543",
        debits: "114789.00",
        credits: "",
        balance: "15465498",
    },
];

export default function ViewStatementModal({
    isOpen,
    onClose,
    account,
}: ViewStatementModalProps) {
    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            className="!max-w-3xl p-0 overflow-hidden"
        >
            <div className="space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <h2 className="text-xl font-bold text-gray-900">View Statement</h2>

                {/* Top Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Account Details Card */}
                    <div className="bg-gray-50 rounded-xl p-5 flex items-start justify-between relative">
                        <div className="space-y-1">
                            <h3 className="font-bold text-gray-900 mb-3">Account Details</h3>
                            <p className="text-sm text-gray-600 font-medium">{account?.bank?.name || "Dutch Bangla Bank"}</p>
                            <p className="text-sm">
                                <span className="text-gray-500">Account No:</span>{" "}
                                <span className="font-bold text-gray-900">{account?.accountNo || "7458413684559"}</span>
                            </p>
                            <p className="text-sm">
                                <span className="text-gray-500">Account Holder Name:</span>{" "}
                                <span className="font-bold text-gray-900">{account?.holderName || "Shahriar Emon"}</span>
                            </p>
                        </div>

                        {/* Logo/Icon */}
                        <div className="h-12 w-12 rounded-full overflow-hidden shrink-0 bg-white shadow-sm flex items-center justify-center">
                            {/* Placeholder for bank logo */}
                            <img
                                src={account?.bank?.logoUrl || "https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Dutch-Bangla_Bank_Limited.svg/1200px-Dutch-Bangla_Bank_Limited.svg.png"}
                                alt="Bank Logo"
                                className="h-10 w-10 object-contain"
                            />
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="space-y-4">
                        <div className="bg-gray-50 rounded-xl p-5 flex items-center">
                            <span className="text-sm font-bold text-gray-900">
                                Account Balance: <span className="text-green-600">৳{account?.balance?.amount || "5,47,256,333"}</span>
                            </span>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-5 flex items-center">
                            <span className="text-sm font-bold text-gray-900">
                                Last Used: <span className="text-[#FE5000]">{account?.balance?.lastUsed || "30 Sep, 2025, 2:50PM"}</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Statement Table */}
                <div className="border border-gra-200 rounded-xl overflow-hidden shadow-sm max-h-[30vh] overflow-y-auto custom-scrollbar   ">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#FE5000] text-white text-[10px] uppercase font-bold tracking-wider">
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4">Reference</th>
                                <th className="px-6 py-4">Debits</th>
                                <th className="px-6 py-4 text-right">Credits</th>
                                <th className="px-6 py-4 text-right">Balance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {fakeStatementData.map((row, idx) => (
                                <tr key={idx} className="bg-white hover:bg-gray-50 text-[10px] text-gray-900 font-bold">
                                    <td className="px-6 py-4 whitespace-nowrap">{row.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{row.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{row.reference}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.debits}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">{row.credits}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">{row.balance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </CustomModal>
    );
}
