"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetMerchantByIdQuery, useApproveMerchantMutation, useDeclineMerchantMutation } from "@/redux/features/merchant/merchnatApi";
import { AppButton } from "@/components/reusable/CustomButton";
import CustomModal from "@/components/reusable/CustomModal";
import formatDate from "@/lib/formateDate";
import { CheckCircle2, XCircle, User, Phone, Mail, MapPin, Calendar, FileText } from "lucide-react";

export default function ProfileDetails({ aid }: { aid: string }) {
  const router = useRouter();
  const { data: merchantData, isLoading, error } = useGetMerchantByIdQuery({ id: aid });
  const [approveMerchant, { isLoading: isApproving }] = useApproveMerchantMutation();
  const [declineMerchant, { isLoading: isDeclining }] = useDeclineMerchantMutation();

  const [showConfirmApprove, setShowConfirmApprove] = useState(false);
  const [showConfirmDecline, setShowConfirmDecline] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-gray-500">Loading merchant details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-red-500">Error loading merchant details</div>
      </div>
    );
  }

  if (!merchantData?.data?.merchant) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-gray-500">Merchant not found</div>
      </div>
    );
  }

  const merchant = merchantData.data.merchant;
  const isPending = merchant.status === "PENDING";
  const isApproved = merchant.status === "APPROVED";
  const isDeclined = merchant.status === "DECLINED";

  const handleApprove = async () => {
    try {
      await approveMerchant({ id: aid }).unwrap();
      setShowConfirmApprove(false);
      router.push("/dashboard/merchant-management/merchant-approval");
    } catch (error) {
      console.error("Failed to approve merchant:", error);
    }
  };

  const handleDecline = async () => {
    try {
      await declineMerchant({ id: aid }).unwrap();
      setShowConfirmDecline(false);
      router.push("/dashboard/merchant-management/merchant-approval");
    } catch (error) {
      console.error("Failed to decline merchant:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Left Section - Merchant Info */}
          <div className="flex items-start gap-5 flex-1">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0">
              <User className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Full Name</p>
                  <p className="text-2xl font-extrabold text-gray-900">
                    {merchant.full_name}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {isPending && (
                    <span className="inline-flex items-center rounded-full bg-[#FDEFE6] text-[#FE5000] border border-[#F7C9AE] px-4 py-1.5 text-xs font-semibold">
                      Pending Approval
                    </span>
                  )}
                  {isApproved && (
                    <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 border border-green-200 px-4 py-1.5 text-xs font-semibold">
                      Approved
                    </span>
                  )}
                  {isDeclined && (
                    <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 border border-red-200 px-4 py-1.5 text-xs font-semibold">
                      Declined
                    </span>
                  )}
                </div>
              </div>

              {/* Contact Information Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-6">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Phone</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {merchant.phone}
                    </p>
                  </div>
                </div>

                {merchant.secondary_number && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Secondary Phone</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {merchant.secondary_number}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Email</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {merchant.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Merchant ID</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {merchant.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-gray-400 mb-2">Address</p>
              {merchant.full_address && (
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  {merchant.full_address}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {merchant.thana && (
                  <span className="inline-flex items-center rounded-md bg-gray-100 text-gray-700 px-3 py-1 text-xs font-medium">
                    {merchant.thana}
                  </span>
                )}
                {merchant.district && (
                  <span className="inline-flex items-center rounded-md bg-gray-100 text-gray-700 px-3 py-1 text-xs font-medium">
                    {merchant.district}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Timestamps */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-400 mb-1">Created At</p>
                <p className="text-sm font-semibold text-gray-900">
                  {merchant.created_at ? formatDate(merchant.created_at) : "N/A"}
                </p>
              </div>
            </div>
            {merchant.approved_at && (
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 mb-1">Approved At</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatDate(merchant.approved_at)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isPending && (
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-4">
            <AppButton
              variantType="outline"
              className="px-8 py-3"
              onClick={() => router.back()}
            >
              Cancel
            </AppButton>
            <AppButton
              variantType="danger"
              className="px-8 py-3 flex items-center gap-2"
              onClick={() => setShowConfirmDecline(true)}
              disabled={isDeclining}
              loading={isDeclining}
            >
              <XCircle className="h-5 w-5" />
              Decline
            </AppButton>
            <AppButton
              variantType="approve"
              className="px-8 py-3 flex items-center gap-2"
              onClick={() => setShowConfirmApprove(true)}
              disabled={isApproving}
              loading={isApproving}
            >
              <CheckCircle2 className="h-5 w-5" />
              Approve
            </AppButton>
          </div>
        </div>
      )}

      {/* Confirmation Modals */}
      <CustomModal
        isOpen={showConfirmApprove}
        onClose={() => setShowConfirmApprove(false)}
        title="Confirm Approval"
        description={`Are you sure you want to approve ${merchant.full_name}? This action cannot be undone.`}
        className="max-w-md"
      >
        <div className="flex justify-end gap-3 mt-6">
          <AppButton
            variantType="outline"
            onClick={() => setShowConfirmApprove(false)}
          >
            Cancel
          </AppButton>
          <AppButton
            variantType="approve"
            onClick={handleApprove}
            loading={isApproving}
          >
            Confirm Approval
          </AppButton>
        </div>
      </CustomModal>

      <CustomModal
        isOpen={showConfirmDecline}
        onClose={() => setShowConfirmDecline(false)}
        title="Confirm Decline"
        description={`Are you sure you want to decline ${merchant.full_name}? This action cannot be undone.`}
        className="max-w-md"
      >
        <div className="flex justify-end gap-3 mt-6">
          <AppButton
            variantType="outline"
            onClick={() => setShowConfirmDecline(false)}
          >
            Cancel
          </AppButton>
          <AppButton
            variantType="danger"
            onClick={handleDecline}
            loading={isDeclining}
          >
            Confirm Decline
          </AppButton>
        </div>
      </CustomModal>
    </div>
  );
}
