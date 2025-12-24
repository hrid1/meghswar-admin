import { UnProcessedParcelRow } from "./UnProcessedColumns";

export const fakeParcelData: UnProcessedParcelRow[] = [
  {
    parcelid: "139679",
    reason: "Parcel could not be delivered due to customer unavailability at the given phone number not reachable. Returning to sender.",
    destination: {
      title: "Southeast Bank, Bashundhara Branch",
      address: "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    },
    hub: "Dhanmondi HUB",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
    },
    status: "Returned",
    amount: 1187,
    age: "2Days 2H 3M",
    createdAt: "20 Mar, 2025 2:35 PM",
    updatedAt: "20 Mar, 2025 2:35 PM",
  },
  {
    parcelid: "139679", // Note: image shows duplicate ID
    reason: "Please handle with care. Fragile item inside. Keep upright and avoid pressure or heat exposure.",
    destination: {
      title: "Southeast Bank, Bashundhara Branch",
      address: "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    },
    hub: "Dhanmondi HUB",
    merchant: {
      name: "Booklet Design BD",
      phone: "+880123456789",
    },
    status: "Paid Returned",
    amount: 1187,
    age: "2Days 2H 3M",
    createdAt: "20 Mar, 2025 2:35 PM",
    updatedAt: "20 Mar, 2025 2:35 PM",
  },
];