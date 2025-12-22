import { GetRidersResponse, Rider } from "@/app/dashboard/rider-management/rider-list/types";
import { baseApi } from "../baseApi";


export interface GetRidersArgs {
  hubId?: string;
  isActive?: boolean;
  page: number;
  limit: number;
  search?: string; // if your backend supports it
}

export const ridersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRiders: builder.query<GetRidersResponse, GetRidersArgs>({
      query: ({ hubId, isActive = true, page, limit, search }) => ({
        url: "/riders",
        params: {
          ...(hubId ? { hubId } : {}),
          isActive,
          page,
          limit,
          ...(search ? { search } : {}), // remove if backend doesn't accept
        },
      }),
      providesTags: (result) =>
        result?.data?.riders
          ? [
              ...result.data.riders.map((r: Rider) => ({ type: "Riders" as const, id: r.id })),
              { type: "Riders" as const, id: "LIST" },
            ]
          : [{ type: "Riders" as const, id: "LIST" }],
    }),

    getRiderById: builder.query<Rider, string>({
      query: (id) => `/riders/${id}`,
      providesTags: (result, error, id) => [{ type: "Riders" as const, id }],
    }),
  }),
});

export const { useGetRidersQuery, useGetRiderByIdQuery } = ridersApi;
