export interface PayoutHistoryRow {
  id: string;
  profile: {
    name: string;
    phone: string;
    image?: string;
  };
  position: string;
  assignedHub: string;
  lastPaid: string;
  salaryPaid: number;
  paidUsing: string;
}

export const payoutHistoryFakeData: PayoutHistoryRow[] = [
  {
    id: "1011",
    profile: {
      name: "Salmon Sah",
      phone: "+8801234567890",
      image: "https://github.com/shadcn.png", // Using a placeholder
    },
    position: "HUB-Manager",
    assignedHub: "Dhanmondi",
    lastPaid: "30 Sep, 2025 2:35 PM",
    salaryPaid: 30250,
    paidUsing: "EBL Bank",
  },
  {
    id: "1012",
    profile: {
      name: "Salmon Sah",
      phone: "+8801234567890",
      image: "https://github.com/shadcn.png",
    },
    position: "HUB-Manager",
    assignedHub: "Dhanmondi",
    lastPaid: "30 Sep, 2025 2:35 PM",
    salaryPaid: 30250,
    paidUsing: "DBBL Bank",
  },
  {
    id: "1013",
    profile: {
      name: "Salmon Sah",
      phone: "+8801234567890",
      image: "https://github.com/shadcn.png",
    },
    position: "HUB-Manager",
    assignedHub: "Dhanmondi",
    lastPaid: "30 Sep, 2025 2:35 PM",
    salaryPaid: 30250,
    paidUsing: "Bkash",
  },
  {
    id: "1014",
    profile: {
      name: "Salmon Sah",
      phone: "+8801234567890",
      image: "https://github.com/shadcn.png",
    },
    position: "HUB-Manager",
    assignedHub: "Dhanmondi",
    lastPaid: "30 Sep, 2025 2:35 PM",
    salaryPaid: 30250,
    paidUsing: "Nagad",
  },
  {
    id: "1015",
    profile: {
      name: "Salmon Sah",
      phone: "+8801234567890",
      image: "https://github.com/shadcn.png",
    },
    position: "HUB-Manager",
    assignedHub: "Dhanmondi",
    lastPaid: "30 Sep, 2025 2:35 PM",
    salaryPaid: 30250,
    paidUsing: "Cash",
  },
];
