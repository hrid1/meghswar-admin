"use client";

import React, { useMemo, useState } from "react";
import MerchantSummary from "./MerchantSummary";
import StatsSection from "./StatsSection";
import ParcelFlowChart from "./ParcelFlowChart";
import StoreListTab from "./StoreListTab";
import ParcelListTab from "./ParcelListTab";
import CustomTabs from "@/components/reusable/CustomTab";

type FlowPoint = { day: string; value: number };

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  performance: {
    handled: number;
    delivered: number;
    returns: number;
  };
  status: "Active" | "Inactive";
}

interface Parcel {
  trackingId: string;
  recipient: string;
  cod: number;
  status: "Delivered" | "In Transit" | "Returned";
  updatedAt: string;
}

export default function AdvancePayDetails({ mid }: { mid: string }) {
  const [advanceEnabled, setAdvanceEnabled] = useState(true);
  const [storeQuery, setStoreQuery] = useState("");

  const storeList: Store[] = useMemo(
    () => [
      {
        id: "ST-10231",
        name: "Bashundhara Store",
        address: "Block B, Bashundhara R/A, Dhaka",
        phone: "+880 1700-000000",
        performance: { handled: 1247, delivered: 1200, returns: 47 },
        status: "Active",
      },
      {
        id: "ST-10232",
        name: "Mirpur Hub",
        address: "Mirpur-10, Dhaka",
        phone: "+880 1700-000001",
        performance: { handled: 986, delivered: 944, returns: 42 },
        status: "Active",
      },
      {
        id: "ST-10233",
        name: "Uttara Outlet",
        address: "Sector 7, Uttara, Dhaka",
        phone: "+880 1700-000002",
        performance: { handled: 322, delivered: 280, returns: 42 },
        status: "Inactive",
      },
    ],
    []
  );

  const filteredStores = useMemo(() => {
    const q = storeQuery.trim().toLowerCase();
    if (!q) return storeList;
    return storeList.filter((store) => {
      const haystack = `${store.id} ${store.name} ${store.phone} ${store.address}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [storeList, storeQuery]);

  const parcelList: Parcel[] = useMemo(
    () => [
      {
        trackingId: "MGS-240401-0001",
        recipient: "Tanvir Ahmed",
        cod: 1250,
        status: "Delivered",
        updatedAt: "2025-12-26",
      },
      {
        trackingId: "MGS-240401-0002",
        recipient: "Nusrat Jahan",
        cod: 850,
        status: "In Transit",
        updatedAt: "2025-12-27",
      },
      {
        trackingId: "MGS-240401-0003",
        recipient: "Sakib Hasan",
        cod: 0,
        status: "Returned",
        updatedAt: "2025-12-25",
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <MerchantSummary
        mid={mid}
        advanceEnabled={advanceEnabled}
        onAdvanceToggle={setAdvanceEnabled}
      />

      <StatsSection />

      <ParcelFlowChart />

      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Lists</h3>
        <CustomTabs
          tabs={[
            {
              name: "Store List",
              value: "stores",
              content: (
                <StoreListTab
                  stores={filteredStores}
                  searchQuery={storeQuery}
                  onSearchChange={setStoreQuery}
                />
              ),
            },
            {
              name: "Parcel List",
              value: "parcels",
              content: <ParcelListTab parcels={parcelList} />,
            },
          ]}
          defaultValue="stores"
        />
      </div>
    </div>
  );
}
