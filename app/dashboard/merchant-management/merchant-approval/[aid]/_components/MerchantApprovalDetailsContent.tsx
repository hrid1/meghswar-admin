"use client";

import React from "react";
import CustomTabs from "@/components/reusable/CustomTab";
import StoreDetailsTab from "./StoreDetailsTab";
import ProfileDetails from "./ProfileDetails";

export default function MerchantApprovalDetailsContent({ aid }: { aid: string }) {

  const tabs = [
    {
      name: "Profile Details & Security",
      value: "profile",
      content: (
      <ProfileDetails aid={aid} />
      ),
    },
    {
      name: "Store Details",
      value: "store",
      content: <StoreDetailsTab />,
    },
  ];

  return <CustomTabs tabs={tabs} defaultValue="profile" />;
}

