import { ReceiveParcelRow } from "./ReceiveParcelColumns";

export function ReceiveParcelSummary({ selectedRows }: { selectedRows: ReceiveParcelRow[] }) {
  const total = selectedRows.reduce(
    (a, r) => ({
      amount: a.amount + r.collectableAmount,
      weight: a.weight + r.weight,
    }),
    { amount: 0, weight: 0 }
  );

  return (
    <div className="flex gap-4">
      <div>Selected: {selectedRows.length}</div>
      <div>Total Amount: ৳{total.amount}</div>
      <div>Total Weight: {total.weight} kg</div>
    </div>
  );
}
