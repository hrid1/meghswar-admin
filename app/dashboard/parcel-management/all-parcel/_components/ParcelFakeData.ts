import { ParcelRow } from "./ParcelColumns";

export const parcelFakeData: ParcelRow[] = [
  {
    id: 1,
    parcelId: "#12345",
    marchantId: "MRC-9988",
    customer: "Farzana Rahman",
    phone: "+880123456789",
    address:
      "Plot#12, Sarwar Road, Block-B, Bashundhara Residential Area, Dhaka",
    merchant: "Booklet Design BD",
    area: "Dhanmondi",
    rider: "Ahmad Wasi",
    riderPhone: "+880124567890",
    riderImg: "https://i.pravatar.cc/50?img=3",
    status: "In Progress",
    amount: 1187,
    attempt: 2,
    deliveryTime: "2 Days",
    createdAt: "20 Nov 2025, 12:56 PM",
  },
  {
    id: 2,
    parcelId: "#12346",
    marchantId: "MRC-9988",
    customer: "Farzana Rahman",
    phone: "+880123456789",
    address:
      "Plot#12, Sarwar Road, Block-B, Bashundhara Residential Area, Dhaka",
    merchant: "Booklet Design BD",
    area: "Dhanmondi",
    rider: "Ahmad Wasi",
    riderPhone: "+880124567890",
    riderImg: "https://i.pravatar.cc/50?img=5",
    status: "Partial Delivery",
    amountDetails: { amount: 1187 },
    attempt: 1,
    deliveryTime: "2 Days",
    createdAt: "20 Nov 2025, 12:52 PM",
  },
];
