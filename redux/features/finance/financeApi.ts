import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";
import {
  GetMerchantInvoiceEligibilityResponse,
  GetMerchantInvoiceDetailsByMerchantIdResponse,
} from "./financeTypes";
const financeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMerchantInvoiceEligibilityList: builder.query<GetMerchantInvoiceEligibilityResponse, any>({
      query: () => ({
        url: "/merchant-invoices/merchant-eligibility-list",
        method: "GET",
      }),
      providesTags: [TAG_TYPES.Finance],
    }),

    getMerchantInvoiceDetailsMerchantId: builder.query<
      GetMerchantInvoiceDetailsByMerchantIdResponse,
      { merchantId: string }
    >({
      query: ({ merchantId }) => ({
        url: `/merchant-invoices/eligible-parcels`,
        method: "GET",
        params: { merchant_id: merchantId },
      }),
      providesTags: [TAG_TYPES.Finance],
    }),

    createMerchantInvoice: builder.mutation<any, { merchantId: string, parcelIds: string[] }>({
      query: ({ merchantId, parcelIds }: { merchantId: string, parcelIds: string[] }) => ({
        url: `/merchant-invoices`,
        method: "POST",
        body: { merchant_id: merchantId, parcel_ids: parcelIds },
      }),
      invalidatesTags: [TAG_TYPES.Finance],
    }),

    // INVOICE LIST
    // {{baseUrl}}/merchant-invoices?invoice_status=UNPAID&fromDate=2024-01-01&toDate=2024-12-31&page=1&limit=10
    getInvoiceList: builder.query<any, { invoiceStatus?: string, page?: number, limit?: number, fromDate?: string, toDate?: string }>({
      query: ({ invoiceStatus, page, limit, fromDate, toDate }) => ({
        url: `/merchant-invoices`,
        method: "GET",
        params: {
          invoice_status: invoiceStatus,
          page,
          limit,
          fromDate,
          toDate,
        },
      }),

      providesTags: [TAG_TYPES.Finance],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
});
export const { useGetMerchantInvoiceEligibilityListQuery, useGetMerchantInvoiceDetailsMerchantIdQuery, useCreateMerchantInvoiceMutation, useGetInvoiceListQuery } = financeApi;


// {
//   "merchant_id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
//   "parcel_ids": [
//     "parcel-uuid-1",
//     "parcel-uuid-2",
//     "parcel-uuid-3"
//   ]
// }