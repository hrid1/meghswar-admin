import React from "react";
import ThirdPartyTable from "./_components/ThirdPartyTable";
import PageTitle from "@/components/reusable/PageTittle";
import CustomTabs from "@/components/reusable/CustomTab";

const myTabs = [
  {
    name: "Parcel List",
    value: "parcel-list",
    content: <ThirdPartyTable />,
  },
  {
    name: "Assigned Parcel",
    value: "assigned-parcel",
    content: <ThirdPartyTable />,
  },
 
];

export default function page() {
  return (
    <div>
      <PageTitle className="px-6" title="Third Party" />
      <CustomTabs  tabs={myTabs} defaultValue="parcel-list" />
    </div>
  );
}
