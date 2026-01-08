# Auth + Redux Setup (Beginner Guide)

This document explains how authentication is implemented in this codebase and gives a step-by-step guide to reproduce the pattern in a new Next.js + Redux Toolkit project.

**Quick overview of how auth works here**

- Tokens are stored in both Redux (`auth` slice) and in cookies (so tokens persist across reloads).
- API calls use an RTK Query `baseApi` that attaches the current access token to requests.
- `baseQueryWithReauth` handles 401 responses and attempts to refresh tokens using the refresh token. If refresh succeeds, it updates Redux and retries the original request; if it fails, it logs out the user.
- UI-level protection is implemented with a client-side `AuthGuard` component that checks for a token and hydrates the current user via `/auth/me`.
- There is also a Next.js middleware-style redirect (`proxy.ts`) that protects server-side routes by checking the `access_token` cookie.

Files to inspect in this repo:

- [redux/features/auth/authSlice.ts](redux/features/auth/authSlice.ts)
- [redux/features/api/baseApi.ts](redux/features/api/baseApi.ts)
- [redux/features/api/authApi.ts](redux/features/api/authApi.ts)
- [redux/store/index.ts](redux/store/index.ts)
- [components/auth/AuthGuard.tsx](components/auth/AuthGuard.tsx)
- [redux/ReduxProvider.tsx](redux/ReduxProvider.tsx)
- [proxy.ts](proxy.ts)

**How the pieces fit together (detailed)**

- `authSlice` (Redux slice)
  - Holds `access_token`, `refresh_token`, and `user`.
  - On initialization, it attempts to read tokens from cookies so state persists across reloads.
  - Exposes actions: `setCredentials` (login/signup), `setUser` (hydrate user), `setTokens` (refresh), `logOut`.
  - See: [redux/features/auth/authSlice.ts](redux/features/auth/authSlice.ts)

- `baseApi` (RTK Query)
  - `baseQuery` attaches `Authorization: Bearer <access_token>` if available in Redux state.
  - `baseQueryWithReauth` wraps `baseQuery` and on 401 will call `/auth/refresh` with the `refresh_token` and, if successful, dispatch `setTokens` and retry the original request.
  - If refresh fails, it dispatches `logOut()` and optionally redirects to `/auth/login` in the browser.
  - See: [redux/features/api/baseApi.ts](redux/features/api/baseApi.ts)

- `authApi` (endpoints)
  - Exposes `login`, `signup`, `logout`, `getCurrentUser`, and `refreshToken` endpoints.
  - Components use the generated hooks, e.g. `useLoginMutation`, `useGetCurrentUserQuery`.
  - See: [redux/features/api/authApi.ts](redux/features/api/authApi.ts)

- `store` registration
  - Registers `baseApi.reducer` and `auth` reducer.
  - Adds `baseApi.middleware` to the store so RTK Query works and token refresh flow can dispatch actions.
  - See: [redux/store/index.ts](redux/store/index.ts)

- `AuthGuard` (client-side private route)
  - A client component that checks `state.auth.access_token`. If missing, redirects to `/auth`.
  - When token exists, it calls `useGetCurrentUserQuery` to hydrate user data and on 401/403 it clears auth and redirects to `/auth`.
  - Wrap protected layouts/pages with `<AuthGuard>{children}</AuthGuard>`.
  - See: [components/auth/AuthGuard.tsx](components/auth/AuthGuard.tsx)

- `proxy.ts` (Next middleware-like redirect)
  - Server-side edge that checks `access_token` cookie and redirects unauthenticated requests to `/auth` for the configured matchers.
  - See: [proxy.ts](proxy.ts)


Step-by-step: reproduce this setup in a new project

1) Install dependencies

- Minimal dependencies you need (if using Next.js + RTK):

```bash
npm install @reduxjs/toolkit react-redux @reduxjs/toolkit/query react @types/react
```

2) Create an `auth` slice with cookie helpers

- Implement cookie helpers: `getCookie`, `setCookie`, `deleteCookie` (client-only).
- Create an `authSlice` with the following state: `access_token`, `refresh_token`, `user`.
- Provide actions: `setCredentials` (save tokens + user and write cookies), `setTokens` (update tokens only), `setUser`, and `logOut` (clear tokens + cookies).

Use the implementation in [redux/features/auth/authSlice.ts](redux/features/auth/authSlice.ts) as a copy-paste starter.

3) Create RTK Query base API with reauth

- Create `baseApi` that uses `fetchBaseQuery` and `prepareHeaders` to read the token from Redux state and set `Authorization` header.
- Wrap `baseQuery` with `baseQueryWithReauth` that:
  - Runs original request.
  - If response is 401 and the request was not the refresh endpoint, try refreshing by POSTing the `refresh_token` to `/auth/refresh`.
  - On refresh success: dispatch `setTokens({ access_token, refresh_token })` and retry original request.
  - On refresh failure: dispatch `logOut()` and redirect to login if in browser.

See example in [redux/features/api/baseApi.ts](redux/features/api/baseApi.ts).

4) Create `authApi` endpoints

- Inject endpoints for `login`, `signup`, `logout`, `getCurrentUser`, and `refreshToken` using `baseApi.injectEndpoints`.
- Use the generated hooks in components: `useLoginMutation`, `useGetCurrentUserQuery`, etc.
- See [redux/features/api/authApi.ts](redux/features/api/authApi.ts).

5) Register reducers & middleware in the store

- In your store config, add `[baseApi.reducerPath]: baseApi.reducer` and `auth: authReducer`.
- Add `baseApi.middleware` to `getDefaultMiddleware().concat(...)`.
- See: [redux/store/index.ts](redux/store/index.ts)

6) Provide the store to the app

- Use a client-only `ReduxProvider` that wraps your app's client components with `<Provider store={store}>`.
- See: [redux/ReduxProvider.tsx](redux/ReduxProvider.tsx)

7) Implement client-side route guard

- Create an `AuthGuard` component that checks `state.auth.access_token` and redirects to `/auth` when missing.
- Use `useGetCurrentUserQuery` (skip when no token) to hydrate user and handle unauthorized errors by dispatching `logOut()` and redirecting.
- Wrap protected pages/layouts with `<AuthGuard>{children}</AuthGuard>`.
- See: [components/auth/AuthGuard.tsx](components/auth/AuthGuard.tsx)

8) (Optional) Server-side route protection

- If you want server-side route protection in Next.js, create middleware that inspects cookies on the request and redirects when necessary. See `proxy.ts` in this project.

9) Typical login flow (component example)

- Call `const [login] = useLoginMutation()`.
- On successful login response, dispatch `setCredentials({ access_token, refresh_token, user })` (map fields from API to your slice's shape).
- Example flow (pseudo):

```ts
const [login] = useLoginMutation();
const dispatch = useAppDispatch();

async function handleLogin(form) {
  const res = await login(form).unwrap();
  if (res?.data) {
    dispatch(
      setCredentials({
        access_token: res.data.accessToken,
        refresh_token: res.data.refreshToken,
        user: res.data.user,
      })
    );
  }
}
```

10) Logout

- Dispatch `logOut()` to clear tokens and cookies and optionally call the `logout` mutation to inform the backend.


Notes & gotchas

- Cookies are written client-side in the current implementation. For higher security, consider HttpOnly cookies set by your backend.
- The refresh-token flow here stores the refresh token in a readable cookie and in Redux; for production, consider server-side refresh strategies to minimize exposure.
- The RTK Query `baseApi` middleware is required for the `baseQueryWithReauth` pattern to work properly because it allows dispatching actions from `baseQuery` and re-running queries.


Where I placed this guide

- docs/AUTH_SETUP.md (this file)

If you want, I can:

- Add a small example `LoginForm.tsx` component that uses `useLoginMutation` and dispatches `setCredentials`.
- Replace client-cookie storage with a server-set HttpOnly cookie pattern and update `baseApi` accordingly.
- Add tests or stories demonstrating the login/logout flow.

---

If you'd like, I can now create a small `LoginForm` example in `components/auth/` and wire up a demo. Let me know which next step you want.