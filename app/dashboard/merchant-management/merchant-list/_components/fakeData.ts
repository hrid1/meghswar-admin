"use client";

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

