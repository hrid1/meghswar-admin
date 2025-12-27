import type { MerchantApprovalRow } from "./MerchantApprovalCol";

export const merchantApprovalFakeData: MerchantApprovalRow[] = [
  {
    aid: "00100-create",
    userId: "00100",
    merchant: { name: "Booklet Design BD", phone: "+8801234567890" },
    requestedFor: { title: "Create Account", status: "pending" },
    requestedAt: "30 Sep, 2025 2:35 PM",
    address:
      "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
  },
  {
    aid: "00100-docs",
    userId: "00100",
    merchant: { name: "Booklet Design BD", phone: "+8801234567890" },
    requestedFor: { title: "Update Documents", status: "pending" },
    requestedAt: "30 Sep, 2025 2:35 PM",
    address:
      "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
  },
];

