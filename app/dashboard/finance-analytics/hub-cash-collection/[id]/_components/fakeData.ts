export interface HubInfo {
  branchName: string;
  address: string;
  managerName: string;
  phone: string;
  secondaryPhone: string;
}

export interface HubStats {
  totalCollected: number;
  expensesClearance: number;
  totalReceivable: number;
}

export interface ParcelRow {
  id: string;
  parcelId: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  merchant: {
    name: string;
    phone: string;
    avatarUrl?: string;
  };
  area: string;
  rider: {
    name: string;
    phone: string;
    avatarUrl?: string;
  };
  status: "Delivered" | "Return To Merchant";
  amount: {
    total: number;
    deliveryCharge: number;
    codCharge: number;
    weightCharge: number;
    discount: number;
  };
  age: {
    days: number;
    created: string;
    lastUpdated: string;
  };
}

export const hubInfoFake: HubInfo = {
  branchName: "Dhanmondi Branch",
  address: "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
  managerName: "Fokrul Alam",
  phone: "+8801234567890",
  secondaryPhone: "+8801234567890",
};

export const hubStatsFake: HubStats = {
  totalCollected: 50500,
  expensesClearance: 14500,
  totalReceivable: 36500,
};

export const parcelFakeData: ParcelRow[] = [
  {
    id: "1",
    parcelId: "#139679",
    customer: {
      name: "Farzana Rahman",
      phone: "+880123456789",
      address: "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    },
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/150?u=1",
    },
    area: "Area 01: Dhanmondi",
    rider: {
      name: "Ahmed Wasi",
      phone: "+8801234567890",
      avatarUrl: "https://i.pravatar.cc/150?u=12",
    },
    status: "Delivered",
    amount: {
      total: 1187,
      deliveryCharge: 125,
      codCharge: 12,
      weightCharge: 50,
      discount: 0,
    },
    age: {
      days: 2,
      created: "20 Mar, 2025 2:35 PM",
      lastUpdated: "20 Mar, 2025 2:35 PM",
    },
  },
  {
    id: "2",
    parcelId: "#139680",
    customer: {
      name: "Farzana Rahman",
      phone: "+880123456789",
      address: "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    },
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/150?u=1",
    },
    area: "Area 01: Dhanmondi",
    rider: {
      name: "Ahmed Wasi",
      phone: "+8801234567890",
      avatarUrl: "https://i.pravatar.cc/150?u=12",
    },
    status: "Return To Merchant",
    amount: {
      total: 1187,
      deliveryCharge: 125,
      codCharge: 12,
      weightCharge: 50,
      discount: 0,
    },
    age: {
      days: 2,
      created: "20 Mar, 2025 2:35 PM",
      lastUpdated: "20 Mar, 2025 2:35 PM",
    },
  },
  {
    id: "3",
    parcelId: "#139681",
    customer: {
      name: "Farzana Rahman",
      phone: "+880123456789",
      address: "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    },
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/150?u=1",
    },
    area: "Area 01: Dhanmondi",
    rider: {
      name: "Ahmed Wasi",
      phone: "+8801234567890",
      avatarUrl: "https://i.pravatar.cc/150?u=12",
    },
    status: "Return To Merchant",
    amount: {
      total: 1187,
      deliveryCharge: 125,
      codCharge: 12,
      weightCharge: 50,
      discount: 0,
    },
    age: {
      days: 2,
      created: "20 Mar, 2025 2:35 PM",
      lastUpdated: "20 Mar, 2025 2:35 PM",
    },
  },
];
