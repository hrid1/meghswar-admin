// api/baseApi.ts
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "@/redux/store";
import { setTokens, logOut } from "../auth/authSlice";

/**
 * Base query with automatic token refresh on 401 errors
 *
 * Flow:
 * 1. Make request with current access_token
 * 2. If 401 (unauthorized), try to refresh token using refresh_token
 * 3. If refresh succeeds, update tokens in Redux + cookies, retry original request
 * 4. If refresh fails, logout user and redirect to login
 */

// Base query for regular authenticated requests (includes access_token header)
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

// Base query for refresh endpoint (no auth header needed, refresh token is in body)
const baseQueryWithoutAuth = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

/**
 * Wrapper around baseQuery that handles automatic token refresh
 */
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Extract URL to check if this is already a refresh request (prevent infinite loop)
  const url = typeof args === "string" ? args : args.url;
  const isRefreshRequest = url === "/auth/refresh";

  // First attempt: make the original request
  let result = await baseQuery(args, api, extraOptions);

  // If request succeeded or error is not 401, return as-is
  // Also skip refresh logic if this IS the refresh endpoint (to prevent infinite loops)
  if (!result.error || result.error.status !== 401 || isRefreshRequest) {
    return result;
  }

  // 401 Unauthorized: try to refresh token
  const state = api.getState() as RootState;
  const refreshToken = state.auth.refresh_token;

  // No refresh token available, logout user
  if (!refreshToken) {
    api.dispatch(logOut());
    return result;
  }

  // Attempt to refresh token (use baseQueryWithoutAuth since refresh endpoint doesn't need auth header)
  const refreshResult = await baseQueryWithoutAuth(
    {
      url: "/auth/refresh",
      method: "POST",
      body: { refreshToken },
    },
    api,
    extraOptions
  );

  if (refreshResult.data) {
    // Refresh succeeded: update tokens in Redux + cookies
    const refreshData = refreshResult.data as {
      success: boolean;
      data: { accessToken: string; refreshToken: string };
    };

    api.dispatch(
      setTokens({
        access_token: refreshData.data.accessToken,
        refresh_token: refreshData.data.refreshToken,
      })
    );

    // Retry the original request with new access token
    result = await baseQuery(args, api, extraOptions);
  } else {
    // Refresh failed: logout user (token expired/invalid)
    api.dispatch(logOut());

    // Optionally redirect to login (if in browser)
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post", "Riders"],
  endpoints: () => ({}),
});
