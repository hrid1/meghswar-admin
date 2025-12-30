export interface StaffListRow {
  id: string;
  profile: {
    name: string;
    phone: string;
    image?: string;
  };
  position: string;
  assignedHub: string;
  secPhone: string;
  salary: number;
  lastPaid: string;
}

export const staffListFakeData: StaffListRow[] = [
  {
    id: "1011",
    profile: {
      name: "Salmon Sah",
      phone: "+8801234567890",
      image: "https://github.com/shadcn.png",
    },
    position: "HUB-Manager",
    assignedHub: "Dhanmondi",
    secPhone: "88741258893",
    salary: 30250,
    lastPaid: "30 Sep, 2025 2:35 PM",
  },
  {
    id: "1012",
    profile: {
      name: "Salmon Sah",
      phone: "+8801234567890",
      image: "https://github.com/shadcn.png",
    },
    position: "HUB-Manager",
    assignedHub: "Mirpur",
    secPhone: "88741258893",
    salary: 30250,
    lastPaid: "30 Sep, 2025 2:35 PM",
  },
  {
    id: "1013",
    profile: {
      name: "Salmon Sah",
      phone: "+8801234567890",
      image: "https://github.com/shadcn.png",
    },
    position: "Accountant",
    assignedHub: "Uttara",
    secPhone: "88741258893",
    salary: 25000,
    lastPaid: "30 Sep, 2025 2:35 PM",
  },
  {
    id: "1014",
    profile: {
      name: "Salmon Sah",
      phone: "+8801234567890",
      image: "https://github.com/shadcn.png",
    },
    position: "Support",
    assignedHub: "Dhanmondi",
    secPhone: "88741258893",
    salary: 20000,
    lastPaid: "30 Sep, 2025 2:35 PM",
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
    secPhone: "88741258893",
    salary: 30250,
    lastPaid: "30 Sep, 2025 2:35 PM",
  },
];
