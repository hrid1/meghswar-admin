"use client";

import React, { useState } from "react";
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
import { useCreateTransactionMutation } from "@/redux/features/accounts/accountsApi";
import { toast } from "sonner";
interface BalanceTransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    sourceAccount?: any;
    allAccounts: any[];
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
    allAccounts,
}: BalanceTransferModalProps) {
    // console.log("this is allAccounts", allAccounts);
    const [createTransaction, { isLoading }] = useCreateTransactionMutation();
    const [amount, setAmount] = useState<number>(0);
    const [selectedToAccount, setSelectedToAccount] = useState<string | undefined>(undefined);
    const [selectedFromAccount, setSelectedFromAccount] = useState<string | undefined>(undefined);
    const withoutSourceAccount = allAccounts.filter((account) => account.id !== sourceAccount?.id);
    console.log("this is withoutSourceAccount", withoutSourceAccount);
    const accountOptions = withoutSourceAccount.map((account) => ({
        label: account.account_name,
        value: account.id,
        accountNo: account.account_number,
        ...account,
        
    }));
    console.log("this is accountOptions", accountOptions);

    const selectedFromAccountData = accountOptions.find((account) => account.id === selectedFromAccount);
    console.log("this is selectedFromAccountData", selectedFromAccountData);
    const selectedToAccountData = accountOptions.find((account) => account.id === selectedToAccount);
    console.log("this is selectedToAccountData", selectedToAccountData);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("this is selectedFromAccount", selectedFromAccount);
        console.log("this is selectedToAccount", selectedToAccount);
        console.log("this is amount", amount);
        try {
            await createTransaction({
                from_account_id: sourceAccount?.id || "",
                to_account_id: selectedToAccountData?.id || "",
                amount: amount,
            }).unwrap();
            toast.success("Transaction created successfully");
            onClose();
        } catch (error) {
            console.error("Create transaction failed", error);
            toast.error("Failed to transfer balance");
        }
    };
    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            className="!max-w-4xl p-6 overflow-hidden"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Balance Transfer</h2>

                {/* Transfer Selection */}
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 justify-between">
                    <div className="flex items-center gap-3 w-full">
                        <span className="font-bold text-sm text-gray-900 w-12">From</span>
                        <Select onValueChange={(value) => setSelectedFromAccount(value)}>
                            <SelectTrigger className="w-full h-10 bg-white border-gray-200">
                                <SelectValue placeholder={`${sourceAccount?.bank?.name} - (${sourceAccount?.accountNo})`} />
                            </SelectTrigger>
                            {/* <SelectContent>
                                <SelectItem value={sourceAccount?.bank?.id}>{sourceAccount?.bank?.name}</SelectItem>
                            </SelectContent> */}
                        </Select>
                    </div>

                    <ArrowRight className="text-gray-900 shrink-0 hidden md:block" />

                    <div className="flex items-center gap-3 w-full">
                        <span className="font-bold text-sm text-gray-900 w-8 text-center">To</span>
                        <Select onValueChange={(value) => setSelectedToAccount(value)}>
                            <SelectTrigger className="w-full h-10 bg-white border-gray-200">
                                <SelectValue placeholder="EBL Bank (98423621...)" />
                            </SelectTrigger>
                            <SelectContent>
                                
                                {accountOptions.map((account) => (
                                    <SelectItem key={account.value} value={account.value}>{account.label} - ({account.accountNo || "00000000000000000000000000000000"})</SelectItem>
                                ))}
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
                            accountNo={selectedFromAccountData?.accountNo || "7458413684559"}
                            holderName={sourceAccount?.holderName || "Shahriar Emon"}
                            logoUrl={sourceAccount?.bank?.logoUrl || "https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Dutch-Bangla_Bank_Limited.svg/1200px-Dutch-Bangla_Bank_Limited.svg.png"}
                        />
                        <div className="space-y-4">
                            <StatsCard label="Account Balance" value={`৳${sourceAccount?.balance?.amount || "5,47,256,333"}`} />
                            <StatsCard label="Last Used" value={sourceAccount?.balance?.lastUsed || "19 Oct, 2025, 2:50PM"} valueColor="text-[#FE5000]" />
                        </div>
                    </div>
                </div>


{/* {
    "label": "Eastern Bank Ltd",
    "value": "a4c977a1-21b2-478b-9a7c-2f8fa99301fc",
    "accountNo": "12345678",
    "id": "a4c977a1-21b2-478b-9a7c-2f8fa99301fc",
    "account_name": "Eastern Bank Ltd",
    "account_number": "12345678",
    "account_holder_name": "Hrioyd",
    "provider_type": "BANK",
    "current_balance": "212221.00",
    "is_active": true,
    "notes": null,
    "created_at": "2026-03-12T21:11:14.381Z",
    "updated_at": "2026-03-12T21:11:14.381Z"
} */}
                {/* To Section */}
                {
                    selectedToAccountData && (
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-3">To</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AccountCard
                                    title="Account Details"
                                    bankName={selectedToAccountData?.account_name || ""}
                                    accountNo={selectedToAccountData?.account_number || ""}
                                    holderName={selectedToAccountData?.account_holder_name || ""}
                                    logoUrl={selectedToAccountData?.bank?.logoUrl || "https://seeklogo.com/images/E/eastern-bank-limited-ebl-logo-F110B6B386-seeklogo.com.png"}
                                />
                                <div className="space-y-4">
                                    <StatsCard label="Account Balance" value={`৳${selectedToAccountData?.current_balance || "0"}`} />
                                    <StatsCard label="Last Used" value={(selectedToAccountData?.updated_at || "N/A")} valueColor="text-[#FE5000]" />
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Transfer Amount Section */}
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3">Transfer Amount</h3>
                    <div className="bg-gray-50 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4">
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            placeholder="Enter Transfer Amount"
                            className="bg-white border-gray-200 h-11 flex-1"
                        />
                        <AppButton
                            variantType="primary"
                            className="bg-[#FE5000] hover:bg-[#FE5000]/90 text-white font-bold h-11 px-8 w-full md:w-auto rounded-lg"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Confirming..." : "Confirm Transfer"}
                        </AppButton>
                    </div>
                </div>
            </form>
        </CustomModal>
    );
}
