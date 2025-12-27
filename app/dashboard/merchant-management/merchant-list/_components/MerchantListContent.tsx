"use client";

import React from "react";
import MerchantStats from "./MerchantStats";
import MerchantListTable from "./MerchantListTable";

export default function MerchantListContent() {
  return (
    <div className="space-y-6">
      <MerchantStats />
      <MerchantListTable />
    </div>
  );
}

