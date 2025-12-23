import CustomTabs from "@/components/reusable/CustomTab";
import PickupRequestTable from "./_components/PickupRequestTable";
import AssignRiderTable from "./_components/AssignRiderTable";

const myTabs = [
  {
    name: "Request List",
    value: "request-list",
    content: <PickupRequestTable />,
  },
  {
    name: "Assigned Rider",
    value: "assigned-rider",
    content: <AssignRiderTable />,
  },
  {
    name: "Pickup Done",
    value: "pickup-done",
    content: (
      <div className="p-4 text-center text-neutral-500">
        No pickup done records found
      </div>
    ),
  },
];

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Pickup Request</h1>

      <CustomTabs 
        tabs={myTabs} 
        defaultValue="request-list"
        
        // Optional customizations:
        // variant="pills" // For pill-style tabs
        // fullWidth // For equal width tabs
        // tabsListClassName="mb-4" // Additional margin
        // tabContentClassName="p-4 bg-white rounded-lg shadow-sm" // Styled content area
      />
    </div>
  );
}