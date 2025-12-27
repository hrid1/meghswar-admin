"use client";

export type HubCashRow = {
  id: string;
  hubBranch: string;
  address: string;
  area: string;
  manager: { name: string; phone: string };
  lifetimeCollection: number;
  lastReceivedAt: string;
  hubExpenses: number;
  pendingAmount: number;
  notified: boolean;
  lastNotifiedAt?: string;
};

export const hubCashFakeData: HubCashRow[] = [
  {
    id: "0001",
    hubBranch: "Dhanmondi Branch",
    address:
      "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    area: "Area 01: Dhanmondi",
    manager: { name: "Fokrul Alam", phone: "+880123456789" },
    lifetimeCollection: 11187,
    lastReceivedAt: "30 Sep, 2025 2:35 PM",
    hubExpenses: 5187,
    pendingAmount: 50187,
    notified: false,
    lastNotifiedAt: "01 Oct, 2025",
  },
  {
    id: "0002",
    hubBranch: "Dhanmondi Branch",
    address:
      "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    area: "Area 01: Dhanmondi",
    manager: { name: "Fokrul Alam", phone: "+880123456789" },
    lifetimeCollection: 11187,
    lastReceivedAt: "30 Sep, 2025 2:35 PM",
    hubExpenses: 4187,
    pendingAmount: 50187,
    notified: true,
    lastNotifiedAt: "30 Sep, 2025",
  },
];

