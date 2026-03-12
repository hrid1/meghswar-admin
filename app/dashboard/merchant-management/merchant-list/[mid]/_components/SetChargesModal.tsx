"use client";

import React, { useEffect, useMemo, useState } from "react";
import CustomModal from "@/components/reusable/CustomModal";
import { Input } from "@/components/ui/input";
import { AppButton } from "@/components/reusable/CustomButton";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { useCreatePricingMutation } from "@/redux/features/pricing/pricingApi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

type SetChargesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  store: { id: string | number; storeName?: string } | null;
  onSuccess?: () => void;
};

const DEFAULTS = {
  zone: "SUB_DHAKA",
  deliveryCharge: "60",
  weightStepKg: "0.5",
  codPercentage: "1.0",
  discountPercentage: "5",
  startDate: new Date("2026-01-01"),
  endDate: new Date("2026-12-31"),
};

const formatDate = (date?: Date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function SetChargesModal({
  isOpen,
  onClose,
  store,
  onSuccess,
}: SetChargesModalProps) {
  const [zone, setZone] = useState(DEFAULTS.zone);
  const [deliveryCharge, setDeliveryCharge] = useState(DEFAULTS.deliveryCharge);
  const [weightStepKg, setWeightStepKg] = useState(DEFAULTS.weightStepKg);
  const [codPercentage, setCodPercentage] = useState(DEFAULTS.codPercentage);
  const [discountPercentage, setDiscountPercentage] = useState(
    DEFAULTS.discountPercentage,
  );
  const [startDate, setStartDate] = useState<Date | undefined>(
    DEFAULTS.startDate,
  );
  const [endDate, setEndDate] = useState<Date | undefined>(DEFAULTS.endDate);

  const [createPricing, { isLoading }] = useCreatePricingMutation();

  useEffect(() => {
    if (!isOpen) return;
    setZone(DEFAULTS.zone);
    setDeliveryCharge(DEFAULTS.deliveryCharge);
    setWeightStepKg(DEFAULTS.weightStepKg);
    setCodPercentage(DEFAULTS.codPercentage);
    setDiscountPercentage(DEFAULTS.discountPercentage);
    setStartDate(DEFAULTS.startDate);
    setEndDate(DEFAULTS.endDate);
  }, [isOpen]);

  const storeIdForApi = useMemo(() => {
    if (!store) return "";
    return String(
      (store as any).id ??
        (store as any)._id ??
        (store as any).store_id ??
        (store as any).uuid ??
        "",
    );
  }, [store]);

  const handleSubmit = async () => {
    if (!storeIdForApi) {
      toast.error("Store id is missing.");
      return;
    }
    if (!startDate || !endDate) {
      toast.error("Please select start and end dates.");
      return;
    }
    if (startDate > endDate) {
      toast.error("Start date must be before end date.");
      return;
    }

    const payload = {
      store_id: storeIdForApi,
      zone: zone.trim(),
      delivery_charge: Number(deliveryCharge),
      weight_step_kg: Number(weightStepKg),
      cod_percentage: Number(codPercentage),
      discount_percentage: Number(discountPercentage),
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
    };

    try {
      await createPricing(payload).unwrap();
      toast.success("Charges set successfully");
      onClose();
      onSuccess?.();
    } catch (err: any) {
      const msg =
        err?.data?.message || err?.message || "Failed to set charges.";
      toast.error(msg);
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        store
          ? `Set Charges for ${store.storeName ?? `Store ${store.id}`}`
          : "Set Charges"
      }
      description="Set pricing and COD/discount settings for the selected store."
      className="max-w-4xl"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-500">Store ID</label>
            <Input value={storeIdForApi} readOnly className="bg-gray-50" />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-500">Zone</label>
            <Input
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              placeholder="SUB_DHAKA"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-500">Delivery Charge</label>
            <Input
              type="number"
              step="0.01"
              value={deliveryCharge}
              onChange={(e) => setDeliveryCharge(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-500">Weight Step (kg)</label>
            <Input
              type="number"
              step="0.01"
              value={weightStepKg}
              onChange={(e) => setWeightStepKg(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-500">COD Percentage</label>
            <Input
              type="number"
              step="0.01"
              value={codPercentage}
              onChange={(e) => setCodPercentage(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-500">Discount Percentage</label>
            <Input
              type="number"
              step="0.01"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Start Date</label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate
                    ? format(startDate, "yyyy-MM-dd")
                    : "Pick a start date"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">End Date</label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "yyyy-MM-dd") : "Pick an end date"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-md border border-gray-200 text-sm"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <AppButton
            variantType="primary"
            className="px-4 py-2 text-sm"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Charges"}
          </AppButton>
        </div>
      </div>
    </CustomModal>
  );
}
