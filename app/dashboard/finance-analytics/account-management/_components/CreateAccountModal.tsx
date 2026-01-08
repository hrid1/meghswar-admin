"use client";

import React, { useState } from "react";
import CustomModal from "@/components/reusable/CustomModal";
import { AppButton } from "@/components/reusable/CustomButton";
import { ChevronLeft, ChevronDown } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface CreateAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateAccountModal({ isOpen, onClose }: CreateAccountModalProps) {
    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            className="!max-w-xl p-6 overflow-hidden"
        >
            <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 pt-2">Create Account</h3>

                <div className="space-y-6">
                    {/* Account Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900">Account Name</label>
                        <Select>
                            <SelectTrigger className="w-full h-12 border-gray-200 rounded-lg text-gray-500">
                                <SelectValue placeholder="Select Account Name" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="brac">BRAC Bank</SelectItem>
                                <SelectItem value="ebl">Eastern Bank Ltd</SelectItem>
                                <SelectItem value="city">City Bank</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Account No */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900">Account No.</label>
                        <Input
                            placeholder="Enter Account No."
                            className="h-12 border-gray-200 rounded-lg text-sm"
                        />
                    </div>

                    {/* Account Holder Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900">Account Holder Name</label>
                        <Input
                            placeholder="Enter Account Holder Name"
                            className="h-12 border-gray-200 rounded-lg text-sm"
                        />
                    </div>

                    {/* Bank Balance & API Connect */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-900">Bank Balance</label>
                            <Input
                                placeholder="Enter Initial Bank Balance"
                                className="h-12 border-gray-200 rounded-lg text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-900">Or, Connect Bank API</label>
                            <AppButton
                                variantType="primary"
                                className="w-full h-12 bg-[#FE5000] hover:bg-[#FE5000]/90 text-white font-bold rounded-lg"
                                onClick={() => { }}
                            >
                                Connect Bank API
                            </AppButton>
                        </div>
                    </div>
                </div>

                {/* Confirm Button */}
                <div className="flex justify-end pt-4">
                    <AppButton
                        variantType="primary"
                        className="px-8 py-3 bg-[#FE5000] hover:bg-[#FE5000]/90 text-white font-bold rounded-lg text-sm w-full md:w-auto"
                        onClick={onClose}
                    >
                        Confirm Changes
                    </AppButton>
                </div>
            </div>
        </CustomModal>
    );
}
