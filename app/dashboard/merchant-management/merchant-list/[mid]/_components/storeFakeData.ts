"use client";

export type MerchantStoreRow = {
  id: string;
  storeName: string;
  phone: string;
  storeAddress: string;
  performance: {
    totalParcelsHandled: number;
    successfullyDelivered: number;
    totalReturns: number;
  };
  status: "Active" | "Deactivate";
};

export const merchantStoresFakeData: MerchantStoreRow[] = [
  {
    id: "TSH001",
    storeName: "Tech Solutions",
    phone: "+8801234567890",
    storeAddress: "123 Tech Street, Gulshan-2, Dhaka",
    performance: {
      totalParcelsHandled: 1247,
      successfullyDelivered: 1200,
      totalReturns: 47,
    },
    status: "Active",
  },
  {
    id: "TSH002",
    storeName: "Booklet Design Outlet",
    phone: "+8801999887766",
    storeAddress: "Road 12, Dhanmondi, Dhaka",
    performance: {
      totalParcelsHandled: 980,
      successfullyDelivered: 930,
      totalReturns: 50,
    },
    status: "Active",
  },
  {
    id: "TSH003",
    storeName: "Urban Corner",
    phone: "+8801711223344",
    storeAddress: "Mirpur DOHS, Dhaka-1216",
    performance: {
      totalParcelsHandled: 540,
      successfullyDelivered: 490,
      totalReturns: 50,
    },
    status: "Deactivate",
  },
];

