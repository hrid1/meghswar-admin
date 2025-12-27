"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetCurrentUserQuery } from "@/redux/features/api/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { logOut, setUser } from "@/redux/features/auth/authSlice";
import { Loader } from "lucide-react";

/**
 * Client-side guard that:
 * - Blocks render when no access_token (redirects to /auth)
 * - Hydrates user via /auth/me
 * - On 401/403, clears auth and redirects to /auth
 *
 * Wrap protected layouts/pages with <AuthGuard>{children}</AuthGuard>
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.access_token);

  // Only call /auth/me when we have a token
  const { data, error, isLoading, isFetching } = useGetCurrentUserQuery(
    undefined,
    {
      skip: !accessToken,
    }
  );

  // If no token, redirect to login
  useEffect(() => {
    if (!accessToken) {
      router.replace("/auth");
    }
  }, [accessToken, router]);

  // On successful fetch, store user
  // useEffect(() => {
  //   if (data?.data?.user) {
  //     dispatch(setUser(data.data.user));
  //   }
  // }, [data, dispatch]);

   // On successful fetch, store user
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  // On unauthorized, clear auth and redirect
  useEffect(() => {
    const status = (error as any)?.status;
    if (status === 401 || status === 403) {
      dispatch(logOut());
      router.replace("/auth");
    }
  }, [error, dispatch, router]);

  // Basic loading gate while hydrating
  if (!accessToken) return null; // redirect in effect
  if (isLoading || isFetching)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="h-12 w-12 animate-spin text-amber-500" />
      </div>
    );
  return <>{children}</>;
}
