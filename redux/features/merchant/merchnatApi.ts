import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";

// merchants?status=PENDING&district=Dhaka&page=1&limit=10 

const merchnatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // all merchants
    getMerchants: builder.query<any, {
      status: string;
      district: string;
      page: number;
      limit: number;
    }>({
      query: ({ status, district, page, limit }) => ({
        url: "/merchants",
        params: { status, district, page, limit },
      }),
      providesTags: [TAG_TYPES.Merchants],
    }),
    // merchant by id
    getMerchantById: builder.query<any, {
      id: string;
    }>({
      query: ({ id }) => ({
        url: `/merchants/${id}`,
      }),
      providesTags: [TAG_TYPES.Merchants],
    }),
    // approve merchant
    approveMerchant: builder.mutation<any, {
      id: string;
    }>({
      query: ({ id }) => ({
        url: `/merchants/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: [TAG_TYPES.Merchants],
    }),
    // decline merchant
    declineMerchant: builder.mutation<any, {
      id: string;
    }>({
      query: ({ id }) => ({
        url: `/merchants/${id}/decline`,
        method: "PATCH",
      }),
      invalidatesTags: [TAG_TYPES.Merchants],
    }),





  }),

});

export const { 
  useGetMerchantsQuery, 
  useGetMerchantByIdQuery,
  useApproveMerchantMutation,
  useDeclineMerchantMutation,
} = merchnatApi;