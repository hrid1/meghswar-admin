import { AssignRiderRow } from "./AssignRiderColumns";
import type { PickupRequestRow } from "./PickupRequestColumns";

export const mockPickupRequests: PickupRequestRow[] = [
  {
    parcelid: "REQ-2001",
    additionalNote: "Pickup from Mirpur DOHS gate 1",
    merchant: {
      name: "Daily Mart BD",
      phone: "01711002233",
    },
    area: "Mirpur-12, Dhaka",
    amount: 2,
  },
  {
    parcelid: "REQ-2002",
    additionalNote: "Customer prefers evening pickup",
    merchant: {
      name: "Urban Fashion",
      phone: "01999887744",
    },
    area: "Dhanmondi, Road 27",
    amount: 1,
  },
  {
    parcelid: "REQ-2003",
    additionalNote: "Bring packaging tape",
    merchant: {
      name: "Tech Galaxy",
      phone: "01866554433",
    },
    area: "Uttara Sector 5",
    amount: 14,
  },
];


export const AssignRiderFakeData: AssignRiderRow[] = [
  {
    id: "row-1",
    hub: "Dhanmondi HUB",
    merchant: { name: "Booklet Design BD", phone: "880123456789" },
    comments:
      "Fragile items included, Please handle the parcel with care. Don't hold the parcel too tight.",
    rider: { name: "Ahmed Wasi", phone: "8801234567890" },
    parcelQuantity: 12,
  },
  {
    id: "row-2",
    hub: "Dhanmondi HUB",
    merchant: { name: "Booklet Design BD", phone: "880123456789" },
    comments:
      "Fragile items included, Please handle the parcel with care. Don't hold the parcel too tight.",
    rider: { name: "Ahmed Wasi", phone: "8801234567890" },
    parcelQuantity: 12,
  },
  {
    id: "row-3",
    hub: "Dhanmondi HUB",
    merchant: { name: "Booklet Design BD", phone: "880123456789" },
    comments:
      "Fragile items included, Please handle the parcel with care. Don't hold the parcel too tight.",
    rider: { name: "Ahmed Wasi", phone: "8801234567890" },
    parcelQuantity: 12,
  },
];

