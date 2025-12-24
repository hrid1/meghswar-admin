import CustomTabs from "@/components/reusable/CustomTab";
import ReturnToMerchantTable from "./_components/ReturnToMerchantTable";
import DeliveryRescheduleTable from "./_components/DeliveryRescheduleTable";

const myTabs = [
  {
    name: "Return To Merchant",
    value: "return-to-merchant",
    content: <ReturnToMerchantTable />,
  },
  {
    name: "Delivery Reschedule",
    value: "delivery-reschedule",
    content: <DeliveryRescheduleTable />,
  },
 
];

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Pickup Request</h1>

      <CustomTabs tabs={myTabs} defaultValue="return-to-merchant" />
    </div>
  );
}
