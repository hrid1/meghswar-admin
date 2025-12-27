"use client";

import React from "react";
import CustomTabs from "@/components/reusable/CustomTab";
import StoreDetailsTab from "./StoreDetailsTab";

export default function MerchantApprovalDetailsContent({ aid }: { aid: string }) {
  const tabs = [
    {
      name: "Profile Details & Security",
      value: "profile",
      content: (
        <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">
          Profile details &amp; security will be updated later. (Approval ID:{" "}
          <span className="font-semibold text-gray-900">{aid}</span>)
        </div>
      ),
    },
    {
      name: "Store Details",
      value: "store",
      content: <StoreDetailsTab />,
    },
  ];

  return <CustomTabs tabs={tabs} defaultValue="store" />;
}

