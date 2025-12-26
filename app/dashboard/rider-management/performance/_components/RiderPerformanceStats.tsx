import React from "react";
import { LineChart, Clock, RotateCcw, Users } from "lucide-react";

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  iconBgColor,
  iconColor,
}: any) => (
  <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col h-40 justify-between">
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-4xl font-bold text-gray-900">{value}</h2>
        <p className="text-gray-500 text-sm mt-1">{title}</p>
      </div>
      <div className={`p-3 rounded-lg ${iconBgColor}`}>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
    </div>
  </div>
);

const RiderPerformanceStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Overall Success Rate"
          value="89.2 %"
          icon={LineChart}
          iconBgColor="bg-green-100"
          iconColor="text-green-500"
        />
        <DashboardCard
          title="Total Rescheduled"
          value="142"
          icon={Clock}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-500"
        />
        <DashboardCard
          title="Total Return"
          value="28"
          icon={RotateCcw}
          iconBgColor="bg-red-100"
          iconColor="text-red-500"
        />
        <DashboardCard
          title="Total Active Rider"
          value="24"
          icon={Users}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-500"
        />
    </div>
  );
};

export default RiderPerformanceStats;
