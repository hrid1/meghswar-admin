import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../api/authApi";

/*
 * Simple cookie helpers
 */
const ACCESS_TOKEN_COOKIE_KEY = "access_token";
const REFRESH_TOKEN_COOKIE_KEY = "refresh_token";
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    ?.split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.split("=")[1]) : null;
};

const setCookie = (name: string, value: string, days = 7) => {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setDate(expires.getDate() + days);

  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=/`;
};

const deleteCookie = (name: string) => {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

/**
 * Redux auth state
 * - `token` comes from:
 *   - login/signup success (see `setCredentials`)
 *   - OR existing cookie on first load (see `initialState`)
 */
interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  // On first load, try to hydrate token from cookie (if it exists)
  access_token: getCookie(ACCESS_TOKEN_COOKIE_KEY),
  refresh_token: getCookie(REFRESH_TOKEN_COOKIE_KEY),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /*
     * LOGIN / SIGNUP success handler
     */
    setCredentials: (
      state,
      action: PayloadAction<{
        access_token: string;
        refresh_token: string;
        user: User | null;
      }>
    ) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.user = action.payload.user;
      setCookie(ACCESS_TOKEN_COOKIE_KEY, action.payload.access_token);
      setCookie(REFRESH_TOKEN_COOKIE_KEY, action.payload.refresh_token);
    },

    logOut: (state) => {
      state.access_token = null;
      state.refresh_token = null; 
      state.user = null;
      deleteCookie(ACCESS_TOKEN_COOKIE_KEY);
      deleteCookie(REFRESH_TOKEN_COOKIE_KEY);
    },
  },
});

// Action creators that components will use: login/signup -> setCredentials, logout -> logOut
export const { setCredentials, logOut } = authSlice.actions;

// Default reducer export, to be registered in the Redux store
export default authSlice.reducer;
