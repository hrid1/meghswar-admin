"use client";

import { Provider } from "react-redux";
import { store } from "./store";

/**
 * Client-only Redux provider wrapper.
 *
 * Usage (in a Server Component like `app/layout.tsx`):
 *   <ReduxProvider>{children}</ReduxProvider>
 */
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
