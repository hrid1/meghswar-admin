"use client";

import React from "react";
import type { Column } from "@/components/reusable/DataTable";
import type { ParcelRow } from "./fakeData";
import { CheckCircle2, ShoppingCart } from "lucide-react";

const money = (n: number) => new Intl.NumberFormat("en-US").format(n);

export const hubCashCollectionDetailsColumns = (): Column<ParcelRow>[] => [
    {
        key: "parcelId",
        header: "Parcel ID",
        width: "10%",
        cellClassName: "align-top pt-4 font-bold text-sm",
        render: (r) => <span>{r.parcelId}</span>,
    },
    {
        key: "customer",
        header: "Customer Info",
        width: "18%",
        cellClassName: "align-top pt-4",
        render: (r) => (
            <div className="flex flex-col gap-1 pr-4">
                <span className="text-sm font-bold text-black leading-tight">{r.customer.name}</span>
                <span className="text-xs text-gray-500 font-medium">{r.customer.phone}</span>
                <span className="text-[10px] text-gray-400 font-medium leading-relaxed mt-1">
                    {r.customer.address}
                </span>
            </div>
        ),
    },
    {
        key: "merchant",
        header: "Merchant",
        width: "14%",
        cellClassName: "align-top pt-4",
        render: (r) => (
            <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={r.merchant.avatarUrl}
                        alt={r.merchant.name}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex flex-col leading-tight">
                    <span className="text-[11px] font-bold text-black">{r.merchant.name}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{r.merchant.phone}</span>
                </div>
            </div>
        ),
    },
    {
        key: "area",
        header: "Area",
        width: "10%",
        cellClassName: "align-top pt-4 font-bold text-[11px]",
        render: (r) => <span>{r.area}</span>,
    },
    {
        key: "rider",
        header: "Rider",
        width: "12%",
        cellClassName: "align-top pt-4",
        render: (r) => (
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={r.rider.avatarUrl}
                        alt={r.rider.name}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex flex-col leading-tight">
                    <span className="text-[11px] font-bold text-black">{r.rider.name}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{r.rider.phone}</span>
                </div>
            </div>
        ),
    },
    {
        key: "status",
        header: "Status",
        width: "12%",
        cellClassName: "align-top pt-4 text-center",
        headerClassName: "text-center",
        render: (r) => {
            const isDelivered = r.status === "Delivered";
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold ${isDelivered ? "bg-[#E6FFF0] text-[#00A533]" : "bg-[#FFF0F0] text-[#FF4D4F]"
                        }`}
                >
                    {isDelivered ? (
                        <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Delivered
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            Return To Merchant
                        </>
                    )}
                </span>
            );
        },
    },
    {
        key: "amount",
        header: "Amount",
        width: "14%",
        cellClassName: "align-top pt-4",
        render: (r) => (
            <div className="flex flex-col gap-1 font-medium">
                <span className="text-[#00A533] font-bold text-sm">
                    {"\u09F3"} {money(r.amount.total)}
                </span>
                <div className="text-[9px] text-gray-400 space-y-0.5 mt-1">
                    <p>Delivery Charge: {"\u09F3"} {r.amount.deliveryCharge}</p>
                    <p>COD Charge: {"\u09F3"} {r.amount.codCharge}</p>
                    <p>Weight Charge: {"\u09F3"} {r.amount.weightCharge}</p>
                    <p className="text-[#FE5000]">Discount: {"\u09F3"} {r.amount.discount}</p>
                </div>
            </div>
        ),
    },
    {
        key: "age",
        header: "Age",
        width: "10%",
        cellClassName: "align-top pt-4 text-right",
        headerClassName: "text-right",
        render: (r) => (
            <div className="flex flex-col items-end gap-1 font-medium">
                <span className="bg-[#FFF4E6] text-[#FE5000] px-3 py-1 rounded-full text-[10px] font-bold">
                    {r.age.days} Days
                </span>
                <div className="text-[9px] text-gray-400 text-right mt-1 space-y-0.5">
                    <p>Created:</p>
                    <p>{r.age.created}</p>
                    <p className="mt-1">Last Updated:</p>
                    <p>{r.age.lastUpdated}</p>
                </div>
            </div>
        ),
    },
];
