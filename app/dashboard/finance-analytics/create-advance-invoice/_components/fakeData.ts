"use client";

export type CreateAdvanceInvoiceRow = {
  id: string;
  merchant: { name: string; phone: string; avatarUrl?: string };
  address: string;
  stores: number;
  hubCount: number;
};

export const createAdvanceInvoiceFakeData: CreateAdvanceInvoiceRow[] = [
  {
    id: "adv-1",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/80?img=12",
    },
    address:
      "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    stores: 12,
    hubCount: 7,
  },
  {
    id: "adv-2",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/80?img=12",
    },
    address:
      "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    stores: 12,
    hubCount: 7,
  },
  {
    id: "adv-3",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/80?img=12",
    },
    address:
      "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    stores: 12,
    hubCount: 7,
  },
  {
    id: "adv-4",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/80?img=12",
    },
    address:
      "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    stores: 12,
    hubCount: 7,
  },
];

