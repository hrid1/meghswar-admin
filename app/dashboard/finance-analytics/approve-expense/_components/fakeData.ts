export interface ExpenseRow {
  id: string;
  date: string;
  hub: {
    name: string;
    address: string;
  };
  category: string;
  amount: number;
  proofUrl?: string;
  reason: string;
  status: "In Review" | "Approved" | "Declined";
}

export const expenseFakeData: ExpenseRow[] = [
  {
    id: "EXP-001",
    date: "Sep 12, 2024",
    hub: {
      name: "Dhanmondi Branch",
      address: "Plot#142, Safwan Road, Block#8, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    },
    category: "Office Supplies",
    amount: 65670,
    proofUrl: "#",
    reason: "Purchase of printer ink and A4 paper for parcel documentation.",
    status: "In Review",
  },
  {
    id: "EXP-002",
    date: "Sep 12, 2024",
    hub: {
      name: "Dhanmondi Branch",
      address: "Plot#142, Safwan Road, Block#8, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    },
    category: "Office Supplies",
    amount: 65670,
    proofUrl: "#",
    reason: "Purchase of printer ink and A4 paper for parcel documentation.",
    status: "Declined",
  },
  {
    id: "EXP-003",
    date: "Sep 12, 2024",
    hub: {
      name: "Dhanmondi Branch",
      address: "Plot#142, Safwan Road, Block#8, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    },
    category: "Office Supplies",
    amount: 65670,
    proofUrl: "#",
    reason: "Purchase of printer ink and A4 paper for parcel documentation.",
    status: "Approved",
  },
];
