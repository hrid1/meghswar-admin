export interface AccountRow {
  id: string;
  bank: {
    name: string;
    logoUrl?: string;
  };
  accountNo: string;
  holderName: string;
  balance: {
    amount: number;
    lastUsed: string;
  };
  status: "Active" | "Paused" | "Inactive";
}

export const accountFakeData: AccountRow[] = [
  {
    id: "ACC-001",
    bank: {
      name: "Dutch Bangla Bank",
      logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Dutch_Bangla_Bank_Logo.svg/1200px-Dutch_Bangla_Bank_Logo.svg.png",
    },
    accountNo: "7458413684559",
    holderName: "Shahriar Emon",
    balance: {
      amount: 547256333,
      lastUsed: "30 Sep, 2025 2:35 PM",
    },
    status: "Active",
  },
  {
    id: "ACC-002",
    bank: {
      name: "EBL Sky Banking",
      logoUrl: "https://play-lh.googleusercontent.com/yU4E0M_p7XOf7XQ6l6v0I8pSxq5G7rLw6s1s5r1V8q1k_S1R_S1R_S1R_S1R_S1R_S1", // Placeholder
    },
    accountNo: "9842362184559",
    holderName: "Shahriar Emon",
    balance: {
      amount: 547256333,
      lastUsed: "30 Sep, 2025 2:35 PM",
    },
    status: "Active",
  },
];
