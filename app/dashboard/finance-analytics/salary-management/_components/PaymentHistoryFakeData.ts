export interface PaymentHistoryRow {
  transactionId: string;
  payee: string;
  amount: number;
  paymentMethod: "Bank Transfer" | "Cash" | "Cheque";
  processedBy: string;
  date: string;
  status: "Completed" | "Failed" | "Refunded";
}

export const paymentHistoryFakeData: PaymentHistoryRow[] = [
  {
    transactionId: "TRX-8859",
    payee: "John Doe",
    amount: 5500,
    paymentMethod: "Bank Transfer",
    processedBy: "Admin",
    date: "2023-10-25 10:30 AM",
    status: "Completed",
  },
  {
    transactionId: "TRX-8860",
    payee: "Michael Brown",
    amount: 5200,
    paymentMethod: "Bank Transfer",
    processedBy: "Admin",
    date: "2023-10-25 11:15 AM",
    status: "Completed",
  },
  {
    transactionId: "TRX-8861",
    payee: "Sarah Wilson",
    amount: 3200,
    paymentMethod: "Cheque",
    processedBy: "Super Admin",
    date: "2023-10-24 09:45 AM",
    status: "Completed",
  },
  {
    transactionId: "TRX-8862",
    payee: "Davil Miller",
    amount: 4500,
    paymentMethod: "Bank Transfer",
    processedBy: "Admin",
    date: "2023-10-23 04:20 PM",
    status: "Failed",
  },
  {
    transactionId: "TRX-8863",
    payee: "Emily Davis",
    amount: 3700,
    paymentMethod: "Cash",
    processedBy: "Finance Manager",
    date: "2023-10-24 02:00 PM",
    status: "Completed",
  },
];
