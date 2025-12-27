"use client";

import React from "react";
import { AppButton } from "@/components/reusable/CustomButton";
import { storesFakeData, type StoreDetailsRow } from "./fakeData";

function StatRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-xs">
      <span className="text-gray-500">{label}</span>
      <span className={["font-semibold", valueClassName ?? ""].join(" ")}>
        {value}
      </span>
    </div>
  );
}

function MiniBars({ bars }: { bars: number[] }) {
  const max = Math.max(1, ...bars);
  const colors = ["bg-[#2563EB]", "bg-[#10B981]", "bg-[#EF4444]"];
  return (
    <div className="flex items-end gap-1 h-10 w-16">
      {bars.slice(0, 3).map((v, i) => (
        <div
          key={i}
          className={["w-3 rounded-sm", colors[i] ?? "bg-gray-300"].join(" ")}
          style={{ height: `${Math.max(3, Math.round((v / max) * 40))}px` }}
        />
      ))}
    </div>
  );
}

function StoreCard({ store }: { store: StoreDetailsRow }) {
  const isApproved = store.status === "approved";

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm max-w-md">
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-semibold text-gray-900">{store.name}</div>

        <div className="flex items-center gap-2">
          {isApproved ? (
            <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-[11px] font-semibold">
              Approved
            </span>
          ) : (
            <>
              <AppButton
                variantType="approve"
                className="px-3 py-1 text-[11px] rounded-full"
                onClick={() => console.log("Approve store:", store.id)}
              >
                Approve
              </AppButton>
              <AppButton
                variantType="danger"
                className="px-3 py-1 text-[11px] rounded-full"
                onClick={() => console.log("Decline store:", store.id)}
              >
                Decline
              </AppButton>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 text-xs">
        <div>
          <div className="text-gray-400">Unique ID</div>
          <div className="font-semibold text-gray-900">{store.id}</div>
        </div>
        <div>
          <div className="text-gray-400">Phone/Whatsapp</div>
          <div className="font-semibold text-gray-900">{store.phone}</div>
        </div>
        <div className="col-span-2">
          <div className="text-gray-400">Business Address</div>
          <div className="font-semibold text-gray-900">{store.address}</div>
        </div>
        <div className="col-span-2">
          <div className="text-gray-400">Email</div>
          <div className="font-semibold text-gray-900">{store.email}</div>
        </div>
        <div className="col-span-2">
          <div className="text-gray-400">Facebook Page</div>
          <div className="font-semibold text-gray-900">{store.facebook}</div>
        </div>
      </div>

      <div className="my-5 h-px w-full bg-gray-100" />

      <div className="text-sm font-semibold text-gray-900">Performance</div>

      <div className="mt-3 flex items-end justify-between gap-4">
        <div className="flex-1 space-y-2">
          <StatRow
            label="Total Parcels Handled:"
            value={store.performance.totalHandled}
            valueClassName="text-[#2563EB]"
          />
          <StatRow
            label="Successfully Delivered:"
            value={store.performance.delivered}
            valueClassName="text-[#10B981]"
          />
          <StatRow
            label="Total Returns:"
            value={store.performance.returns}
            valueClassName="text-[#EF4444]"
          />
        </div>
        <MiniBars bars={store.performance.bars} />
      </div>

      <div className="mt-5 flex items-center gap-3">
        <AppButton
          variantType="outline"
          className="flex-1 bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
          onClick={() => console.log("Edit information:", store.id)}
        >
          Edit Information
        </AppButton>

        {store.canDefaultPickup ? (
          <AppButton
            variantType="approve"
            className="flex-1 bg-[#34C38F] hover:bg-[#34C38F]/90"
            onClick={() => console.log("Default pickup:", store.id)}
          >
            Default Pickup
          </AppButton>
        ) : null}
      </div>
    </div>
  );
}

export default function StoreDetailsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {storesFakeData.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
}
