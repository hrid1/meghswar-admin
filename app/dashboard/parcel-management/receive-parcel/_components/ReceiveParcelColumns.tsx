import { Column } from "@/components/reusable/DataTable";
import { Copy, Printer } from "lucide-react";

export interface ReceiveParcelRow {
  id: string;
  merchant: string;
  merchantInvoice: string;
  additionalNote: string;
  customer: string;
  phone: string;
  address: string;
  deliveryArea: string;
  collectableAmount: number;
  deliveryCharge: number;
  codCharge: number;
  weightCharge: number;
  weight: number;
  delivery: number;
}

export const receiveParcelColumns = (): Column<ReceiveParcelRow>[] => [
  {
    key: "id",
    header: "ID",
    width: "13%",
    render: (row) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-sm">
          <span>PID: {row.id}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(row.id);
            }}
            className="hover:text-[#FE5000] transition-colors"
            title="Copy PID"
          >
            <Copy className="w-3 h-3" />
          </button>
        </div>
        <div className="flex items-center gap-1 text-sm text-[#6B6B6B]">
          <span>MID: {row.merchantInvoice}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(row.merchantInvoice);
            }}
            className="hover:text-[#FE5000] transition-colors"
            title="Copy MID"
          >
            <Copy className="w-3 h-3" />
          </button>
        </div>
      </div>
    ),
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "15%",
    render: (row) => <span className="text-sm truncate block">{row.merchant}</span>,
  },
  {
    key: "additionalNote",
    header: "Additional Note",
    width: "14%",
    wrap: true,
    render: (row) => {
      const note = row.additionalNote || "";
      const shouldTruncate = note.length > 50;
      const displayText = shouldTruncate ? `${note.slice(0, 50)}...` : note;

      return (
        <div className="relative group">
          <p className="text-sm">{displayText}</p>
          {shouldTruncate && (
            <div className="absolute left-0 bottom-full mb-1 hidden group-hover:block z-20">
              <div className="bg-black text-white text-xs rounded px-3 py-2 max-w-xs whitespace-normal">
                {note}
              </div>
            </div>
          )}
        </div>
      );
    },
  },
  {
    key: "customer",
    header: "Customer Info",
    width: "20%",
    wrap: true,
    render: (row) => (
      <div className="text-sm">
        <div className="font-semibold truncate">{row.customer}</div>
        <div className="text-[#6B6B6B] truncate">{row.phone}</div>
        <div className="text-xs text-[#8A8A8A] truncate mt-1">{row.address}</div>
      </div>
    ),
  },
  { 
    key: "deliveryArea", 
    header: "Delivery Area", 
    width: "10%",
    render: (row) => <span className="text-sm">{row.deliveryArea}</span>
  },
  {
    key: "collectableAmount",
    header: "Amount",
    width: "8%",
    render: (row) => <span className="font-bold text-sm">৳{row.collectableAmount.toLocaleString()}</span>,
  },
  { 
    key: "weight", 
    header: "Weight", 
    width: "6%",
    render: (row) => <span className="text-sm">{row.weight} kg</span>
  },
  {
    key: "delivery",
    header: "Delivery",
    width: "8%",
    render: (row) => <span className="text-sm">৳{row.delivery}</span>,
  },
  {
    key: "action",
    header: "Action",
    width: "6%",
    render: () => (
      <button 
        className="bg-[#FE5000]/10 text-[#FE5000] px-3 py-1.5 rounded text-sm font-medium hover:bg-[#FE5000]/20 transition-colors flex items-center gap-1"
        onClick={(e) => e.stopPropagation()}
      >
        <Printer className="w-3 h-3" />
        Print
      </button>
    ),
  },
];