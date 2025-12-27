export type StoreDetailsRow = {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  facebook: string;
  status: "approved" | "pending";
  canDefaultPickup?: boolean;
  performance: {
    totalHandled: number;
    delivered: number;
    returns: number;
    bars: number[];
  };
};

export const storesFakeData: StoreDetailsRow[] = [
  {
    id: "TSH001",
    name: "Tech Solutions hub",
    phone: "+880123456789",
    address: "123 Tech Street, Gulshan-2, Dhaka",
    email: "info@techsolutionshub.com",
    facebook: "facebook.com/meghswar",
    status: "approved",
    canDefaultPickup: true,
    performance: { totalHandled: 1247, delivered: 1200, returns: 47, bars: [40, 32, 12] },
  },
  {
    id: "TSH002",
    name: "Fashion Boutique",
    phone: "+880123456789",
    address: "123 Tech Street, Gulshan-2, Dhaka",
    email: "info@techsolutionshub.com",
    facebook: "facebook.com/meghswar",
    status: "pending",
    performance: { totalHandled: 0, delivered: 0, returns: 0, bars: [6, 10, 8] },
  },
  {
    id: "TSH003",
    name: "Techpedia",
    phone: "+880123456789",
    address: "123 Tech Street, Gulshan-2, Dhaka",
    email: "info@techsolutionshub.com",
    facebook: "facebook.com/meghswar",
    status: "pending",
    performance: { totalHandled: 0, delivered: 0, returns: 0, bars: [4, 6, 5] },
  },
  {
    id: "TSH004",
    name: "Techpedia",
    phone: "+880123456789",
    address: "123 Tech Street, Gulshan-2, Dhaka",
    email: "info@techsolutionshub.com",
    facebook: "facebook.com/meghswar",
    status: "pending",
    performance: { totalHandled: 0, delivered: 0, returns: 0, bars: [3, 4, 3] },
  },
];

