"use client";

interface StatsCardsProps {
  parcelsSelected: number;
  totalCollectedAmount: number;
  totalDeliveryCharge: number;
  totalPayableAmount: number;
}

function money(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export default function StatsCards({
  parcelsSelected,
  totalCollectedAmount,
  totalDeliveryCharge,
  totalPayableAmount,
}: StatsCardsProps) {
  return (
    <div className="contents">
      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 text-center shadow-sm">
        <div className="text-3xl font-extrabold text-orange-600">
          {parcelsSelected}
        </div>
        <div className="mt-1 text-xs font-semibold text-orange-700">
          Parcels Selected
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center shadow-sm">
        <div className="text-2xl font-extrabold text-emerald-700">
          {"\u09F3"}
          {money(totalCollectedAmount)}
        </div>
        <div className="mt-1 text-xs font-semibold text-emerald-700">
          Total Collected Amount
        </div>
      </div>

      <div className="rounded-2xl border border-purple-200 bg-purple-50 p-4 text-center shadow-sm">
        <div className="text-2xl font-extrabold text-purple-700">
          {"\u09F3"}
          {money(totalDeliveryCharge)}
        </div>
        <div className="mt-1 text-xs font-semibold text-purple-700">
          Total Delivery Charge
        </div>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-center shadow-sm">
        <div className="text-2xl font-extrabold text-blue-700">
          {"\u09F3"}
          {money(totalPayableAmount)}
        </div>
        <div className="mt-1 text-xs font-semibold text-blue-700">
          Total Payable Amount
        </div>
      </div>
    </div>
  );
}
