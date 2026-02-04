"use client";
import { toNA } from "@/lib/utils";
export type MerchantListRow = {
  id: string;
  merchant: { name: string; phone: string; avatarUrl?: string };
  totalParcel: number;
  parcelDelivered: number;
  parcelReturned: number;
  collectedAmount: number;
  deliveryCharge: number;
  totalPaid: { amount: number; lastPaidAt: string };
  status: "Active" | "Deactivate";
  advancePayment: "ON" | "OFF";
};

export const merchantListFakeData: MerchantListRow[] = [
  {
    id: "m-1",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/80?img=12",
    },
    totalParcel: 240,
    parcelDelivered: 234,
    parcelReturned: 201,
    collectedAmount: 1187,
    deliveryCharge: 500,
    totalPaid: { amount: 6423, lastPaidAt: "30 Sep, 2025 2:35 PM" },
    status: "Active",
    advancePayment: "ON",
  },
  {
    id: "m-2",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/80?img=12",
    },
    totalParcel: 240,
    parcelDelivered: 234,
    parcelReturned: 201,
    collectedAmount: 1187,
    deliveryCharge: 500,
    totalPaid: { amount: 6423, lastPaidAt: "30 Sep, 2025 2:35 PM" },
    status: "Active",
    advancePayment: "ON",
  },
  {
    id: "m-3",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/80?img=12",
    },
    totalParcel: 240,
    parcelDelivered: 234,
    parcelReturned: 201,
    collectedAmount: 1187,
    deliveryCharge: 500,
    totalPaid: { amount: 6423, lastPaidAt: "30 Sep, 2025 2:35 PM" },
    status: "Deactivate",
    advancePayment: "OFF",
  },
  {
    id: "m-4",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/80?img=12",
    },
    totalParcel: 240,
    parcelDelivered: 234,
    parcelReturned: 201,
    collectedAmount: 1187,
    deliveryCharge: 500,
    totalPaid: { amount: 6423, lastPaidAt: "30 Sep, 2025 2:35 PM" },
    status: "Active",
    advancePayment: "OFF",
  },
];



export const formateResponse = (data:any) => {
 return data.map((item:any) => {
    const merchant: MerchantListRow = {
      id: item.id,
      merchant: {
        name: toNA(item .full_name),
        phone:  toNA(item.phone),
        avatarUrl: toNA(item.avatar_url),
      },
      totalParcel: toNA(item.total_parcels),
      parcelDelivered: toNA(item.total_delivered_parcels),
      parcelReturned: toNA(item.total_returned_parcels),
      collectedAmount: toNA(item.total_collected_amount),
      deliveryCharge: toNA(item.total_delivery_charge),
      totalPaid: { amount: toNA(item.total_paid_amount), lastPaidAt: toNA(item.last_paid_at)   },
      status: toNA(item.status) === "APPROVED" ? "Active" : "Deactivate",
      advancePayment: toNA(item.advance_payment_status) === "ON" ? "ON" : "OFF",
    }
    return merchant;
  })
}