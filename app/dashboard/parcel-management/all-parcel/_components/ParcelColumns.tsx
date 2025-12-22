import { Column } from "@/components/reusable/DataTable";

export interface ParcelRow {
  id: number;
  parcelId: string;
  marchantId: string;
  customer: string;
  phone: string;
  address: string;
  merchant: string;
  area: string;
  rider: string;
  riderPhone: string;
  riderImg?: string;
  status: string;
  amount?: number;
  amountDetails?: { amount: number };
  attempt?: number | string;
  deliveryTime: string;
  createdAt: string;
}

export const parcelColumns = (): Column<ParcelRow>[] => [
  // 1️⃣ ID (PID / MID) - ~9%
  {
    key: "parcelId",
    header: "ID",
    width: "9%",
    render: (row) => (
      <div className="flex flex-col">
        <span className="text-sm">PID:{row.parcelId}</span>
        <span className="text-sm text-[#6B6B6B]">MID:{row.marchantId}</span>
      </div>
    ),
  },

  // 2️⃣ Customer Info - ~18%
  {
    key: "customer",
    header: "Customer Info",
    width: "18%",
    wrap: true,
    render: (row) => {
      const address = row.address || "";
      const short = address.length > 40 ? address.slice(0, 40) + "…" : address;

      return (
        <div className="text-sm">
          <div className="font-semibold">{row.customer}</div>
          <div className="text-xs text-[#6B6B6B]">{row.phone}</div>
          <div className="relative group mt-1">
            <div className="text-xs text-[#8A8A8A]">{short}</div>
            {address.length > 40 && (
              <div className="absolute left-0 bottom-full mb-1 hidden group-hover:block z-20">
                <div className="bg-black text-white text-xs rounded px-3 py-2 max-w-xs">
                  {address}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    },
  },

  // 3️⃣ Merchant - ~22%
  {
    key: "merchant",
    header: "Merchant",
    width: "22%",
    render: (row) => (
      <div>
        <p className="font-semibold text-sm truncate">{row.merchant}</p>
        <p className="text-xs text-[#6B6B6B] truncate">12345678</p>
      </div>
    ),
  },

  // 4️⃣ Area - ~11%
  {
    key: "area",
    header: "Area",
    width: "11%",
  },

  // 5️⃣ Rider - ~20%
  {
    key: "rider",
    header: "Rider",
    width: "20%",
    render: (row) => (
      <div className="flex items-center gap-3">
        <img
          src={row.riderImg || "https://i.pravatar.cc/50?img=1"}
          className="w-9 h-9 rounded-full border object-cover"
          alt={row.rider}
        />
        <div>
          <p className="text-sm font-medium">{row.rider}</p>
          <p className="text-xs text-[#6B6B6B]">{row.riderPhone}</p>
        </div>
      </div>
    ),
  },

  // 6️⃣ Status - ~13%
  {
    key: "status",
    header: "Status",
    width: "11%",
    render: (row) => {
      const styles: Record<string, string> = {
        "In Progress": "bg-green-100 text-green-700",
        "Partial Delivery": "bg-purple-100 text-purple-700",
        Pending: "bg-orange-100 text-orange-700",
        Delivered: "bg-blue-100 text-blue-700",
        Returned: "bg-red-100 text-red-700",
      };

      return (
        <span
          className={`px-3  py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
            styles[row.status] || "bg-gray-100 text-gray-700 "
          }`}
        >
          {row.status}
        </span>
      );
    },
  },

  // 7️⃣ Amount - ~12%
  {
    key: "amount",
    header: "Amount",
    width: "12%",
    render: (row) => (
      <span className="font-semibold">
        ৳ {row.amount ?? row.amountDetails?.amount ?? 0}
      </span>
    ),
  },

  // 8️⃣ Attempt - ~7%
  {
    key: "attempt",
    header: "Attempt",
    width: "7%",
    render: (row) => (
      <div className="text-center font-semibold">{row.attempt ?? 0}</div>
    ),
  },

  // 9️⃣ Delivery - ~14%
  {
    key: "deliveryTime",
    header: "Delivery",
    width: "14%",
    render: (row) => (
      <div className="text-right">
        <div className="font-semibold text-sm">{row.deliveryTime}</div>
        <div className="text-xs text-[#6B6B6B]">{row.createdAt}</div>
      </div>
    ),
  },
];