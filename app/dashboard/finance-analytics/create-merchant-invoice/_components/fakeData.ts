"use client";

export type CreateMerchantInvoiceRow = {
  id: string;
  merchant: { name: string; phone: string; avatarUrl?: string };
  totalParcel: number;
  parcelDelivered: number;
  parcelReturned: number;
  totalTransactions: number;
  status: "Active" | "Deactivate";
  merchantAddress: string;
};

export const createMerchantInvoiceFakeData: CreateMerchantInvoiceRow[] = [
  {
    id: "inv-1",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/80?img=12",
    },
    totalParcel: 240,
    parcelDelivered: 234,
    parcelReturned: 201,
    totalTransactions: 1187,
    status: "Active",
    merchantAddress:
      "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
  },
  {
    id: "inv-2",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/80?img=12",
    },
    totalParcel: 240,
    parcelDelivered: 234,
    parcelReturned: 201,
    totalTransactions: 1187,
    status: "Active",
    merchantAddress:
      "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
  },
  {
    id: "inv-3",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/80?img=12",
    },
    totalParcel: 240,
    parcelDelivered: 234,
    parcelReturned: 201,
    totalTransactions: 1187,
    status: "Deactivate",
    merchantAddress:
      "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
  },
  {
    id: "inv-4",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/80?img=12",
    },
    totalParcel: 240,
    parcelDelivered: 234,
    parcelReturned: 201,
    totalTransactions: 1187,
    status: "Active",
    merchantAddress:
      "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
  },
];

