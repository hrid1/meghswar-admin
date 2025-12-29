export type ClearanceRow = {
  id: string;
  merchant: { name: string; phone: string; avatarUrl?: string };
  totalParcel: number;
  collectedAmount: number;
  deliveryCharge: number;
  due: number;
  lastPaidAt: string;
};

export const clearanceListFakeData: ClearanceRow[] = [
  {
    id: "m-1",
    merchant: {
      name: "Booklet Design BD",
      phone: "+8801234567890",
      avatarUrl: "https://i.pravatar.cc/80?img=12",
    },
    totalParcel: 240,
    collectedAmount: 45666,
    deliveryCharge: 5400,
    due: 39600,
    lastPaidAt: "Last Paid 30 Sep, 2025 2:35 PM",
  },
  {
    id: "m-2",
    merchant: {
      name: "Booklet Design BD",
      phone: "+8801234567890",
      avatarUrl: "https://i.pravatar.cc/80?img=13",
    },
    totalParcel: 240,
    collectedAmount: 1187,
    deliveryCharge: 187,
    due: 39600,
    lastPaidAt: "Last Paid 30 Sep, 2025 2:35 PM",
  },
  {
    id: "m-3",
    merchant: {
      name: "Booklet Design BD",
      phone: "+8801234567890",
      avatarUrl: "https://i.pravatar.cc/80?img=14",
    },
    totalParcel: 240,
    collectedAmount: 1187,
    deliveryCharge: 187,
    due: 39600,
    lastPaidAt: "Last Paid 30 Sep, 2025 2:35 PM",
  },
];

