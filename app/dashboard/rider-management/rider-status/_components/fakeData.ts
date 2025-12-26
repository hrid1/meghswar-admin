"use client";

import type { RiderStatusRow } from "./RiderStatusCol";

export const riderStatusFakeData: RiderStatusRow[] = [
  {
    id: "1011",
    profile: {
      name: "Ahmed Wasi",
      phone: "+8801234567890",
      avatarUrl: "https://i.pravatar.cc/80?img=3",
    },
    assignedHub: "Dhanmondi",
    status: "On Duty",
    licenseNo: "DH-38439",
    performance: 125,
  },
  {
    id: "1012",
    profile: {
      name: "Ahmed Wasi",
      phone: "+8801234567890",
      avatarUrl: "https://i.pravatar.cc/80?img=3",
    },
    assignedHub: "Dhanmondi",
    status: "Leave",
    licenseNo: "DH-38439",
    performance: 125,
  },
  {
    id: "1013",
    profile: {
      name: "Ahmed Wasi",
      phone: "+8801234567890",
      avatarUrl: "https://i.pravatar.cc/80?img=3",
    },
    assignedHub: "Dhanmondi",
    status: "Break",
    licenseNo: "DH-38439",
    performance: 125,
  },
];

