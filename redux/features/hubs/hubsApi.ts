import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";

const hubsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Hubs
    getHubs: builder.query<any, any>({
      query: () => ({
        url: "/hubs",
        method: "GET",
      }),
      providesTags: [TAG_TYPES.Hubs],
    }),
    // Create Hub
    createHub: builder.mutation<any, any>({
      query: (hub) => ({
        url: "/hubs",
        method: "POST",
        body: hub,
      }),
      invalidatesTags: [TAG_TYPES.Hubs],
    }),
    // Assign Hub to Store (PATCH to /stores/admin/:storeId/assign-hub/:hubId)
    assignHubToStore: builder.mutation<any, { storeId: string; hubId: string }>({
      query: ({ storeId, hubId }) => ({
        url: `/stores/admin/${storeId}/assign-hub/${hubId}`,
        method: "PATCH",
      }),
      invalidatesTags: [TAG_TYPES.Hubs],
    }),
  }),
});


export const { useGetHubsQuery, useCreateHubMutation, useAssignHubToStoreMutation } = hubsApi;