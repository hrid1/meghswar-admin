import CustomTabs from "@/components/reusable/CustomTab";
import PickupRequestTable from "./_components/PickupRequestTable";
import AssignRiderTable from "./_components/AssignRiderTable";

const myTabs = [
  {
    name: "Request List",
    value: "request-list",
    content: (
      <>
        <PickupRequestTable />
      </>
    ),
  },
  {
    name: "Assigned Rider",
    value: "assigned-rider",
    content: (
      <>
        <AssignRiderTable/>
      </>
    ),
  },
  {
    name: "Pickup Done",
    value: "pickup-done",
    content: (
      <>
        {/* <PickupRequestTableRider /> */}
      </>
    ),
  },
];

export default function page() {
  return (
    <div>
       <h1 className="text-2xl font-bold mb-4">Pickup Request</h1>

      <CustomTabs tabs={myTabs} defaultValue=""></CustomTabs>
    </div>
  );
}
