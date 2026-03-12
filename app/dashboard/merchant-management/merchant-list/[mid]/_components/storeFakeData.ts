"use client";

export type MerchantStoreRow = {
  id: string;
  store_code: string;
  business_name: string;
  business_address: string;
  phone_number: string;
  email: string;
  facebook_page: string;
  is_default: boolean;
  is_carrybee_synced: boolean;

  performance: {
    total_parcels_handled: number;
    successfully_delivered: number;
    total_returns: number;
  };

  hub: string | null;
  district: string;
  thana: string;
  area: string;

  carrybee_store_id: string;
  created_at: string;

  status: "PENDING" | "Active" | "Deactivate";
};

export const merchantStoresFakeData: MerchantStoreRow[] = [
  {
    id: "5570031b-034e-4ff7-81c2-703137fd23e6",
    store_code: "OGG001",
    business_name: "Oggy",
    business_address: "Primary school, Noyarhat, Dhaka, Dhaka",
    phone_number: "01756523968",
    email: "hridoycse1@gmail.com",
    facebook_page: "Velit placeat volup",
    is_default: false,
    is_carrybee_synced: true,
    performance: {
      total_parcels_handled: 0,
      successfully_delivered: 0,
      total_returns: 0,
    },
    hub: null,
    district: "Dhaka",
    thana: "Noyarhat",
    area: "Primary school",
    carrybee_store_id: "9189",
    created_at: "2026-02-22T16:26:36.933Z",
    status: "PENDING",
  },
];