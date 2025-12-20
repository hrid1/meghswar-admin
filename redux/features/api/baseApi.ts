// api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/redux/store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    // Get access_token from Redux auth state
    const token = (getState() as RootState).auth.access_token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    // Optional: Set other headers
    headers.set("Content-Type", "application/json");

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Post"],
  endpoints: () => ({}),
});
