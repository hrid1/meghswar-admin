export type HubListRow = {
  id: string; // e.g. "0001"
  hubBranch: string;
  address: string;
  area: string;
  manager: { name: string; phone: string };
  pendingAmount: number;
  thirdParty: boolean;
};

export const mockHubList: HubListRow[] = [
  {
    id: "0001",
    hubBranch: "Dhanmondi Branch",
    address:
      "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    area: "Area 01: Dhanmondi",
    manager: { name: "Fokrul Alam", phone: "+880123456789" },
    pendingAmount: 1187,
    thirdParty: true,
  },
  {
    id: "0002",
    hubBranch: "Mirpur Branch",
    address:
      "House#12, Road#7, Section#10, Mirpur, Dhaka - 1216",
    area: "Area 02: Mirpur",
    manager: { name: "Nusrat Jahan", phone: "+8801987654321" },
    pendingAmount: 540,
    thirdParty: false,
  },
  {
    id: "0003",
    hubBranch: "Uttara Branch",
    address:
      "Sector#11, Road#3, Uttara, Dhaka - 1230",
    area: "Area 03: Uttara",
    manager: { name: "Mahmud Hasan", phone: "+8801712345678" },
    pendingAmount: 3020,
    thirdParty: true,
  },
];

