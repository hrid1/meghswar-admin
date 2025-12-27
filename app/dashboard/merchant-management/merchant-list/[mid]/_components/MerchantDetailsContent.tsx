"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import MerchantHeaderCard from "./MerchantHeaderCard";
import MerchantStatsCards from "./MerchantStatsCards";
import ParcelFlowChart, { type ParcelPoint } from "./ParcelFlowChart";
import StoresSection from "./StoresSection";

export default function MerchantDetailsContent() {
  const params = useParams<{ mid: string }>();
  const merchantId = params?.mid ?? "";

  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const [month, setMonth] = useState("april");

  const points = useMemo<ParcelPoint[]>(() => {
    if (period === "monthly") {
      return [
        { name: "Week 1", parcels: 3100 },
        { name: "Week 2", parcels: 5200 },
        { name: "Week 3", parcels: 4600 },
        { name: "Week 4", parcels: 6000 },
      ];
    }
    return [
      { name: "Sat", parcels: 3000 },
      { name: "Sun", parcels: 4300 },
      { name: "Mon", parcels: 2800 },
      { name: "Tues", parcels: 4900 },
      { name: "Wed", parcels: 6200 },
      { name: "Thu", parcels: 4600 },
      { name: "Fri", parcels: 6000 },
    ];
  }, [period, month]);

  return (
    <div className="space-y-6">
      <MerchantHeaderCard merchantId={merchantId} />
      <MerchantStatsCards />
      <ParcelFlowChart
        title="Parcel Flow"
        period={period}
        month={month}
        onChangePeriod={setPeriod}
        onChangeMonth={setMonth}
        data={points}
      />
      <StoresSection />
    </div>
  );
}
