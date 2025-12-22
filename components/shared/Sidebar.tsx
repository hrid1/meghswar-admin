"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  TruckIcon,
  MapPin,
  User,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/store/hooks";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },

  // ✅ keep previous
  {
    icon: Package,
    label: "Parcel Management",
    href: "/dashboard/parcel-management",
    children: [
      { label: "All Parcel", href: "/dashboard/parcel-management/all-parcel" },
      { label: "Receive Parcel", href: "/dashboard/parcel-management/receive-parcel" },
     
      {
        label: "Unprocessed",
        href: "/dashboard/parcel-management/unprocessed",
      },
      { label: "Processed", href: "/dashboard/parcel-management/processed" },
      {
        label: "Pickup Request",
        href: "/dashboard/parcel-management/pickup-request",
      },
      {
        label: "Third Party",
        href: "/dashboard/parcel-management/third-party",
      },
      {
        label: "Parcel Report",
        href: "/dashboard/parcel-management/parcel-reports",
      },
      {
        label: "Parcel History",
        href: "/dashboard/parcel-management/parcel-history",
      },
     
    ],
  },
  {
    icon: TruckIcon,
    label: "Hub Management",
    href: "/dashboard/hub-management",
    children: [
      { label: "Hub List", href: "/dashboard/hub-management/hub-list" },
      { label: "Create Hub", href: "/dashboard/hub-management/create-hub" },
      {
        label: "Operator Approval",
        href: "/dashboard/hub-management/opperator-approval",
      },
    ],
  },

  // ✅ add missing + keep prev (rider-transfer kept)
  {
    icon: User,
    label: "Rider Management",
    href: "/dashboard/rider-management",
    children: [
      { label: "Rider List", href: "/dashboard/rider-management/rider-list" },
      {
        label: "Approve Rider",
        href: "/dashboard/rider-management/approve-rider",
      }, // ✅ new
      {
        label: "Rider Status",
        href: "/dashboard/rider-management/rider-status",
      },
      {
        label: "Create Rider",
        href: "/dashboard/rider-management/create-rider",
      },
      {
        label: "Rider Performance",
        href: "/dashboard/rider-management/performance",
      }, // ✅ label updated
      { label: "Verify OTP", href: "/dashboard/rider-management/verify-otp" },
    ],
  },

  // ✅ merchant section + missing children
  {
    icon: TruckIcon,
    label: "Merchant Management",
    href: "/dashboard/merchant-management",
    children: [
      {
        label: "Merchant List",
        href: "/dashboard/merchant-management/merchant-list",
      },
      {
        label: "Create Merchant",
        href: "/dashboard/merchant-management/create-merchant",
      },
      {
        label: "Merchant Approval",
        href: "/dashboard/merchant-management/merchant-approval",
      },
      {
        label: "Advance Pay List",
        href: "/dashboard/merchant-management/advance-pay-list",
      },
    ],
  },

  // ✅ new: Finance & Analytics (from screenshot)
  {
    icon: MapPin,
    label: "Finance & Analytics",
    href: "/dashboard/finance-analytics",
    children: [
      {
        label: "Create Merch. Invoice",
        href: "/dashboard/finance-analytics/create-merchant-invoice",
      },
      {
        label: "All Invoice List",
        href: "/dashboard/finance-analytics/all-invoice-list",
      },
      {
        label: "Pending Invoice List",
        href: "/dashboard/finance-analytics/pending-invoice-list",
      },
      {
        label: "Clearance List",
        href: "/dashboard/finance-analytics/clearance-list",
      },
      {
        label: "Create Adv. Invoice",
        href: "/dashboard/finance-analytics/create-advance-invoice",
      },
      {
        label: "Advance Invoice List",
        href: "/dashboard/finance-analytics/advance-invoice-list",
      },
      {
        label: "HUB Cash Collection",
        href: "/dashboard/finance-analytics/hub-cash-collection",
      },
      {
        label: "Account Management",
        href: "/dashboard/finance-analytics/account-management",
      },
      {
        label: "Expense Entry",
        href: "/dashboard/finance-analytics/expense-entry",
      },
      {
        label: "Approve Expense",
        href: "/dashboard/finance-analytics/approve-expense",
      },
      {
        label: "Salary Management",
        href: "/dashboard/finance-analytics/salary-management",
      },
      {
        label: "Payout History",
        href: "/dashboard/finance-analytics/payout-history",
      },
    ],
  },

  // ✅ new: Staff Management
  {
    icon: User,
    label: "Staff Management",
    href: "/dashboard/staff-management",
    children: [
      {
        label: "Staff Creation",
        href: "/dashboard/staff-management/staff-creation",
      },
      { label: "Staff List", href: "/dashboard/staff-management/staff-list" },
    ],
  },

  // ✅ update: Manage Operators now has Report
  {
    icon: MapPin,
    label: "Manage Operator",
    href: "/dashboard/manage-operators",
    children: [{ label: "Report", href: "/dashboard/manage-operators/report" }],
  },

 
];

interface SidebarProps {
  open: boolean;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  onClose: () => void;
}

export function Sidebar({
  open,
  collapsed,
  setCollapsed,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggleExpand = (href: string) => {
    if (collapsed) {
      setCollapsed(false);
      setTimeout(() => {
        setExpandedItems((prev) =>
          prev.includes(href) ? prev.filter((i) => i !== href) : [...prev, href]
        );
      }, 150);
      return;
    }
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isChildActive = (children?: { href: string }[]) =>
    children?.some((child) => pathname.startsWith(child.href));

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/auth");
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`
          fixed left-0 top-0 bottom-0 z-50 sidebar-scroll bg-white border-r border-gray-100
          transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
          ${open ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:top-16 md:h-[calc(100vh-4rem)]
          ${collapsed ? "md:w-20" : "md:w-60"}
        `}
      >
        <div className="h-full flex flex-col justify-between">
          <div className="flex-1 overflow-y-auto sidebar-scroll py-5 px-1 space-y-1">
            {menuItems.map((item) => {
              const isExpanded = expandedItems.includes(item.href);
              const hasActiveChild = isChildActive(item.children);
              const active = isActive(item.href);

              const itemClasses = `
                relative flex items-center w-full p-2 py-3 rounded-xl transition-all duration-200 group
                ${collapsed ? "justify-center" : "justify-between"}
                ${
                  active || hasActiveChild
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }
              `;

              return (
                <div key={item.href} className="mb-2">
                  {collapsed && (
                    <div className="absolute  left-full top-2 ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100  whitespace-nowrap z-50 pointer-events-none shadow-xl transform translate-x-2 group-hover:translate-x-0 transition-transform">
                      {item.label}
                    </div>
                  )}

                  {item.children ? (
                    <button
                      onClick={() => toggleExpand(item.href)}
                      className={itemClasses}
                    >
                      <div
                        className={`flex items-center ${
                          collapsed ? "justify-center w-full" : "gap-3"
                        }`}
                      >
                        <item.icon
                          className={`
                           ${collapsed ? "w-6 h-6" : "w-5 h-5"} 
                           shrink-0 transition-colors 
                           ${
                             hasActiveChild
                               ? "text-orange-600"
                               : "text-gray-400 group-hover:text-gray-600"
                           }
                         `}
                        />

                        {!collapsed && (
                          <span className="font-medium text-sm text-left flex-1 truncate">
                            {item.label}
                          </span>
                        )}
                      </div>

                      {!collapsed && (
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                  ) : (
                    <Link href={item.href} className={itemClasses}>
                      <div
                        className={`flex items-center ${
                          collapsed ? "justify-center w-full" : "gap-3"
                        }`}
                      >
                        <item.icon
                          className={`
                           ${collapsed ? "w-6 h-6" : "w-5 h-5"} 
                           shrink-0 transition-colors
                           ${
                             active
                               ? "text-orange-600"
                               : "text-gray-400 group-hover:text-gray-600"
                           }
                         `}
                        />

                        {!collapsed && (
                          <span className="font-medium text-sm truncate">
                            {item.label}
                          </span>
                        )}
                      </div>
                    </Link>
                  )}

                  <div
                    className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${
                      !collapsed && isExpanded
                        ? "max-h-125 opacity-100 mt-1"
                        : "max-h-0 opacity-0"
                    }
                  `}
                  >
                    {item.children && (
                      <div className="ml-5 pl-4 border-l-2 border-gray-100 space-y-1 py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`
                              block px-3 py-2 text-sm rounded-lg transition-colors border truncate
                              ${
                                isActive(child.href)
                                  ? "text-orange-600 bg-orange-50 font-medium"
                                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                              }
                            `}
                          >
                            {child.label}
                          </Link>
                        ))}
                       
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={`p-2 border-t border-gray-100 ${
              collapsed ? "flex justify-center" : ""
            }`}
          >
            <button
              onClick={handleLogout}
              className={`
               flex items-center rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors group
               ${collapsed ? "p-3 justify-center" : "w-full px-4 py-3 gap-3"}
             `}
            >
              <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              {!collapsed && (
                <span className="text-sm font-medium">Logout</span>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
