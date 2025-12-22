import ParcelTable from "./_components/ParcelTable";

export default function Page() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">All Parcel</h1>
      <ParcelTable />
    </div>
  );
}
