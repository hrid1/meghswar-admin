import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";

const pricingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPricing: builder.mutation<any, any>({
      query: (pricing) => ({
        url: "/pricing",
        method: "POST",
        body: pricing,
      }),
      invalidatesTags: [TAG_TYPES.Pricing],
    }),
  }),
});

export const { useCreatePricingMutation } = pricingApi;
