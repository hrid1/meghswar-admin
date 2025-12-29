export interface Invoice {
  parcelId: string;
  merchant: string;
  merchantId: string;
  merchantInvoice: string;
  additionalNote: string;
  customer: string;
  customerPhone: string;
  customerAddress: string;
  hub: string;
  status: "Delivered" | "Partial Delivery" | "Pending";
  collectedAmount: number;
  deliveryCharge: number;
  codCharge: number;
  weightCharge: number;
  discount: number;
  payableAmount: number;
}

export const invoiceData: Invoice[] = [
  {
    parcelId: "#139679",
    merchant: "Booklet Design BD",
    merchantId: "+8801234567890",
    merchantInvoice: "#INV-1345",
    additionalNote: "Please handle with care. Fragile item inside. Keep upright and avoid pressure or heat exposure.",
    customer: "Farrana Rahman",
    customerPhone: "+8801234567890",
    customerAddress: "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    hub: "Dhanmondi HUB",
    status: "Delivered",
    collectedAmount: 2187,
    deliveryCharge: 125,
    codCharge: 12,
    weightCharge: 50,
    discount: 0,
    payableAmount: 2187,
  },
  {
    parcelId: "#139679",
    merchant: "Booklet Design BD",
    merchantId: "+8801234567890",
    merchantInvoice: "#INV-1345",
    additionalNote: "Please handle with care. Fragile item inside. Keep upright and avoid pressure or heat exposure.",
    customer: "Farrana Rahman",
    customerPhone: "+8801234567890",
    customerAddress: "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    hub: "Dhanmondi HUB",
    status: "Partial Delivery",
    collectedAmount: 2187,
    deliveryCharge: 125,
    codCharge: 12,
    weightCharge: 50,
    discount: 0,
    payableAmount: 2187,
  },
];
