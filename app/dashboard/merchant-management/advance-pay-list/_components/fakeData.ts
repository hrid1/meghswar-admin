export type AdvancePayListRow = {
  mid: string;
  merchant: { name: string; phone: string; avatarUrl?: string };
  assignedHub: string;
  totalTransactions: number;
  advancePaid: number;
};

export const mockAdvancePayList: AdvancePayListRow[] = [
  {
    mid: "M0001",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
    },
    assignedHub: "Dhanmondi",
    totalTransactions: 101187,
    advancePaid: 101187,
  },
  {
    mid: "M0002",
    merchant: {
      name: "Green Mart",
      phone: "+8801712345678",
    },
    assignedHub: "Mirpur",
    totalTransactions: 58750,
    advancePaid: 32100,
  },
  {
    mid: "M0003",
    merchant: {
      name: "Urban Style",
      phone: "+8801987654321",
    },
    assignedHub: "Uttara",
    totalTransactions: 22040,
    advancePaid: 1187,
  },
];

