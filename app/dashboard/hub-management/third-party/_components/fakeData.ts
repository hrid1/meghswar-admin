export type ThirdPartyRow = {
  userId: string; // e.g. "00100"
  party: {
    name: string;
    logoUrl?: string;
  };
  status: "Active" | "Inactive";
  parcelsDelivered: number;
};

export const mockThirdParties: ThirdPartyRow[] = [
  {
    userId: "00100",
    party: {
      name: "Pathao Courier",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Pathao_Logo.svg/256px-Pathao_Logo.svg.png",
    },
    status: "Active",
    parcelsDelivered: 238,
  },
  {
    userId: "00101",
    party: {
      name: "RedX",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/RedX_Logo.svg/256px-RedX_Logo.svg.png",
    },
    status: "Inactive",
    parcelsDelivered: 91,
  },
  {
    userId: "00102",
    party: {
      name: "Paperfly",
    },
    status: "Active",
    parcelsDelivered: 412,
  },
];

