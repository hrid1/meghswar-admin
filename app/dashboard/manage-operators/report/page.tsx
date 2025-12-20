import { PageShell } from "@/app/dashboard/_components/PageShell";
import { DeliveryChargeChart } from "./_components/DeliveryChargeChart";
import { ReportStatCard } from "./_components/ReportStatCard";

const highlightStats = [
  {
    label: "Parcels Selected",
    value: "245",
    accentClassName: "border-orange-200 bg-orange-50",
    valueClassName: "text-orange-600",
    description: "Ready for action",
  },
  {
    label: "Total Collected Amount",
    value: "৳14,500",
    accentClassName: "border-emerald-200 bg-emerald-50",
    valueClassName: "text-emerald-600",
    description: "Across 5 hubs",
  },
  {
    label: "Total Delivery Charge",
    value: "৳60",
    accentClassName: "border-purple-200 bg-purple-50",
    valueClassName: "text-purple-600",
    description: "Per consignment",
  },
  {
    label: "Total Payable Amount",
    value: "৳14,500",
    accentClassName: "border-blue-200 bg-blue-50",
    valueClassName: "text-blue-600",
    description: "After reconciliation",
  },
];

const fulfillmentStats = [
  {
    label: "Total Received",
    value: "6,900",
    accentClassName: "border-orange-200 bg-orange-50",
    valueClassName: "text-orange-600",
  },
  {
    label: "Total Delivered",
    value: "4,500",
    accentClassName: "border-emerald-200 bg-emerald-50",
    valueClassName: "text-emerald-600",
  },
  {
    label: "Total Return",
    value: "4,500",
    accentClassName: "border-rose-200 bg-rose-50",
    valueClassName: "text-rose-600",
  },
];

export default function Page() {
  return (
    <PageShell title="Report" description="Delivery performance & finance.">
      <div className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <DeliveryChargeChart />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            {highlightStats.map((stat) => (
              <ReportStatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                description={stat.description}
                accentClassName={stat.accentClassName}
                valueClassName={stat.valueClassName}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fulfillmentStats.map((stat) => (
            <ReportStatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              accentClassName={stat.accentClassName}
              valueClassName={stat.valueClassName}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
