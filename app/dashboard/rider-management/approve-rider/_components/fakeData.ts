"use client";

import type { ApproveRiderRow } from "./ApproveRiderCol";

export const approveRiderFakeData: ApproveRiderRow[] = [
  {
    userId: "00100",
    rider: {
      name: "Ahmed Wasi",
      email: "wasi@gmail.com",
      avatarUrl: "https://i.pravatar.cc/80?img=3",
    },
    requestedFor: {
      title: "Create Account",
      status: "pending",
    },
    requestedAt: "30 Sep, 2025 2:35 PM",
    requestedHubBranch: "Dhanmondi Branch",
  },
  {
    userId: "00101",
    rider: {
      name: "Nusrat Jahan",
      email: "nusrat@gmail.com",
      avatarUrl: "https://i.pravatar.cc/80?img=12",
    },
    requestedFor: {
      title: "Create Account",
      status: "pending",
    },
    requestedAt: "29 Sep, 2025 11:10 AM",
    requestedHubBranch: "Uttara Branch",
  },
  {
    userId: "00102",
    rider: {
      name: "Shahriar Hossain",
      email: "shahriar@gmail.com",
      avatarUrl: "https://i.pravatar.cc/80?img=8",
    },
    requestedFor: {
      title: "Create Account",
      status: "pending",
    },
    requestedAt: "28 Sep, 2025 5:45 PM",
    requestedHubBranch: "Mirpur Branch",
  },
];

