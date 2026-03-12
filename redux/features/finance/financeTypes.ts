export type Merchant = {
    merchant_id: string;
    merchant_name: string;
    phone_number: string;
    merchant_address: string;
    total_parcel: number;
    parcel_delivered: number;
    parcel_returned: number;
    total_transaction: number;
    total_collected_amount: number;
    total_delivery_charge: number;
    total_return_charge: number;
    total_due_amount: number;
  };
  
  export type Pagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  
  export type Summary = {
    total_merchants: number;
    total_parcel: number;
    total_delivered: number;
    total_returned: number;
    total_transaction: number;
    total_collected_amount: number;
    total_delivery_charge: number;
    total_return_charge: number;
    total_due_amount: number;
  };
  
  export type MerchantInvoiceEligibilityData = {
    merchants: Merchant[];
    pagination: Pagination;
    summary: Summary;
  };
  
  export type GetMerchantInvoiceEligibilityResponse = {
    success: boolean;
    data: MerchantInvoiceEligibilityData;
    message: string;
  };

  export type EligibleParcelDeliveryChargeBreakdown = {
    delivery_charge: number;
    return_charge: number;
    cod_charge: number;
    total_charges: number;
  };

  export type EligibleParcel = {
    parcel_id: string;
    parcel_tx_id: string;
    tracking_number: string;
    status: string;
    cod_amount: number;
    cod_collected: number;
    delivery_charge: number;
    return_charge: number;
    delivery_charge_applicable: boolean;
    return_charge_applicable: boolean;
    net_payable: number;
    merchant_name: string;
    merchant_phone: string;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    special_instructions: string;
    hub_name: string;
    delivery_charge_breakdown: EligibleParcelDeliveryChargeBreakdown;
  };

  export type EligibleParcelsSummary = {
    total_cod_collected: number;
    total_delivery_charges: number;
    total_return_charges: number;
    estimated_payable: number;
  };

  export type GetMerchantInvoiceDetailsByMerchantIdData = {
    merchant_id: string;
    eligible_parcels: EligibleParcel[];
    total_count: number;
    summary: EligibleParcelsSummary;
  };

  export type GetMerchantInvoiceDetailsByMerchantIdResponse = {
    success: boolean;
    data: GetMerchantInvoiceDetailsByMerchantIdData;
    message: string;
  };