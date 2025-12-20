// configure the Store

import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../features/api/baseApi';
import authReducer from '../features/auth/authSlice';

/**
 * Root Redux store
 *
 * - Registers RTK Query `baseApi` reducer + middleware
 * - Registers `auth` slice (cookie‑backed auth boilerplate)
 */
export const store = configureStore({
  reducer: {
    // RTK Query reducers
    [baseApi.reducerPath]: baseApi.reducer,

    // Auth slice (see `authSlice` for details)
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Typed helpers for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;