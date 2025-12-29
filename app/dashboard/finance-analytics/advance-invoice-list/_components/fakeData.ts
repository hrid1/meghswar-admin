export interface CreatedInvoiceRow {
  id: string;
  merchant: {
    name: string;
    phone: string;
    avatarUrl?: string;
  };
  store: string;
  advanceCreated: number;
  clearance: "Paid" | "Unpaid" | "Pending";
}

export const createdInvoiceFakeData: CreatedInvoiceRow[] = [
  {
    id: "INV-001",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/150?u=1",
    },
    store: "Booklet Store A",
    advanceCreated: 101187,
    clearance: "Paid",
  },
  {
    id: "INV-002",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/150?u=1",
    },
    store: "Booklet Store B",
    advanceCreated: 1187,
    clearance: "Paid",
  },
  {
    id: "INV-003",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/150?u=1",
    },
    store: "Main Branch",
    advanceCreated: 1187,
    clearance: "Paid",
  },
];

export interface AllAdvanceInvoiceRow {
  id: string;
  merchant: {
    name: string;
    phone: string;
    avatarUrl?: string;
  };
  totalParcel: number;
  advancePaid: number;
  clearance: "Paid" | "Unpaid" | "Pending";
}

export const allAdvanceInvoiceFakeData: AllAdvanceInvoiceRow[] = [
  {
    id: "AAI-001",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/150?u=1",
    },
    totalParcel: 240,
    advancePaid: 101187,
    clearance: "Paid",
  },
  {
    id: "AAI-002",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/150?u=1",
    },
    totalParcel: 240,
    advancePaid: 1187,
    clearance: "Paid",
  },
  {
    id: "AAI-003",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/150?u=1",
    },
    totalParcel: 240,
    advancePaid: 1187,
    clearance: "Paid",
  },
  {
    id: "AAI-004",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
      avatarUrl: "https://i.pravatar.cc/150?u=1",
    },
    totalParcel: 240,
    advancePaid: 1187,
    clearance: "Paid",
  },
];
