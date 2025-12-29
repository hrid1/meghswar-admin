export interface PendingInvoiceRow {
  id: string;
  merchant: {
    name: string;
    phone: string;
    avatarUrl?: string;
  };
  totalParcel: number;
  payableAmount: number;
  paymentMethod: string;
}

export const pendingInvoiceFakeData: PendingInvoiceRow[] = [
  {
    id: "TXN-001",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/150?u=1",
    },
    totalParcel: 240,
    payableAmount: 101187,
    paymentMethod: "DBBL Bank",
  },
  {
    id: "TXN-002",
    merchant: {
      name: "Fashion House",
      phone: "+8801987654321",
      avatarUrl: "https://i.pravatar.cc/150?u=2",
    },
    totalParcel: 120,
    payableAmount: 50500,
    paymentMethod: "EBL",
  },
  {
    id: "TXN-003",
    merchant: {
      name: "Tech Gadgets",
      phone: "+8801711223344",
      avatarUrl: "https://i.pravatar.cc/150?u=3",
    },
    totalParcel: 85,
    payableAmount: 32000,
    paymentMethod: "Brac Bank",
  },
];
