"use client";

import React, { useState } from "react";
import CustomModal from "@/components/reusable/CustomModal";
import { AppButton } from "@/components/reusable/CustomButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useCreateAccountMutation } from "@/redux/features/accounts/accountsApi";
import { CreateAccountBody } from "@/redux/features/accounts/accountType";
import { toast } from "sonner";

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateAccountModal({
  isOpen,
  onClose,
}: CreateAccountModalProps) {
  const [createAccount, { isLoading }] = useCreateAccountMutation();

  const [formData, setFormData] = useState<CreateAccountBody>({
    account_name: "",
    account_number: "",
    account_holder_name: "",
    provider_type: "BANK",
    opening_balance: 0,
  });

  const handleSubmit = async () => {
    try {
      await createAccount({
        ...formData,
        opening_balance: Number(formData.opening_balance),
      }).unwrap();

      onClose();
      toast.success("Account created successfully");
      setFormData({
        account_name: "",
        account_number: "",
        account_holder_name: "",
        provider_type: "BANK",
        opening_balance: 0,
      });
    } catch (error) {
      console.error("Create account failed", error);
    }
  };

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
            <label className="text-sm font-bold text-gray-900">
              Account Name
            </label>

            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, account_name: value })
              }
            >
              <SelectTrigger className="w-full h-12 border-gray-200 rounded-lg">
                <SelectValue placeholder="Select Account Name" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="BRAC Bank">BRAC Bank</SelectItem>
                <SelectItem value="Eastern Bank Ltd">
                  Eastern Bank Ltd
                </SelectItem>
                <SelectItem value="City Bank">City Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Account Number */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900">
              Account No.
            </label>

            <Input
              placeholder="Enter Account No."
              className="h-12 border-gray-200 rounded-lg text-sm"
              value={formData.account_number}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  account_number: e.target.value,
                })
              }
            />
          </div>

          {/* Account Holder */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900">
              Account Holder Name
            </label>

            <Input
              placeholder="Enter Account Holder Name"
              className="h-12 border-gray-200 rounded-lg text-sm"
              value={formData.account_holder_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  account_holder_name: e.target.value,
                })
              }
            />
          </div>

          {/* Balance */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900">
              Bank Balance
            </label>

            <Input
              type="number"
              placeholder="Enter Initial Bank Balance"
              className="h-12 border-gray-200 rounded-lg text-sm"
              value={formData.opening_balance}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  opening_balance: Number(e.target.value),
                })
              }
            />
          </div>
        </div>

        {/* Confirm */}
        <div className="flex justify-end pt-4">
          <AppButton
            variantType="primary"
            className="px-8 py-3 bg-[#FE5000] hover:bg-[#FE5000]/90 text-white font-bold rounded-lg text-sm w-full md:w-auto"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Confirm Changes"}
          </AppButton>
        </div>
      </div>
    </CustomModal>
  );
}