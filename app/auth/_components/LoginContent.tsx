"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/features/api/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { setCredentials } from "@/redux/features/auth/authSlice";

type LoginFormData = {
  identifier: string;
  password: string;
  rememberMe: boolean;
};

export default function LoginContent() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      identifier: "john.admin@courier.com",
      password: "AdminPass123",
      rememberMe: true,
    },
  });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.access_token);
  const [login, { isLoading }] = useLoginMutation();

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [showPassword, setShowPassword] = useState(false);

  // If already authenticated, redirect away from login page
  useEffect(() => {
    if (accessToken) {
      router.replace("/dashboard");
    }
  }, [accessToken, router]);

  /**
   * Handle sign-in flow:
   * 1) Call `login` mutation
   * 2) On success, persist auth in Redux + cookie via `setCredentials`
   * 3) Optionally redirect to a protected route (e.g. `/dashboard`)
   */
  const handleSignIn = async (values: LoginFormData) => {
    try {
      const data = await login({
        identifier: values.identifier,
        password: values.password,
      }).unwrap();

      // Map API response (camelCase) to Redux action (snake_case for consistency)
      dispatch(
        setCredentials({
          access_token: data.data.accessToken, // API returns camelCase, map to snake_case
          refresh_token: data.data.refreshToken, // API returns camelCase, map to snake_case
          user: data.data.user, // Pass the actual user object from API
        })
      );

      setStatus("success");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-linear-gradient from-slate-50 via-white to-amber-50 bg-gradientto-br from-slate-50 via-white to-amber-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-10 lg:flex-row lg:items-center lg:gap-16">
        {/* Intro / marketing side */}
        <section className="w-full lg:w-1/2">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-amber-700">
            <ShieldCheck size={14} className="text-amber-500" />
            secure admin access
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
            Meghswar Admin Portal
            <span className="block text-base font-normal text-slate-500">
              Daylight-clear control over parcels, riders, and finance.
            </span>
          </h1>

          <p className="mt-6 text-base text-slate-600">
            Sign in to orchestrate parcel flows, approve riders, and keep hubs
            running smoothly— with the financial visibility your team needs
            every day.
          </p>
        </section>

        {/* Login card */}
        <section className="w-full lg:w-1/2">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Admin login
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  Welcome back
                </p>
              </div>
            </div>

            <form
              className="mt-8 space-y-5"
              onSubmit={handleSubmit(handleSignIn)}
            >
              <label className="space-y-2 text-sm block">
                <span className="flex items-center gap-2 text-slate-700">
                  <Mail className="h-4 w-4 text-amber-500" />
                  Work email
                </span>
                <Input
                  type="email"
                  placeholder="ops@meghswar.com"
                  className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
                  {...register("identifier", { required: "Email is required" })}
                  aria-invalid={errors.identifier ? "true" : "false"}
                />
                {errors.identifier ? (
                  <p className="text-xs text-rose-500" role="alert">
                    {errors.identifier.message}
                  </p>
                ) : null}
              </label>

              <label className="space-y-2 text-sm block">
                <span className="flex items-center gap-2 text-slate-700">
                  <Lock className="h-4 w-4 text-amber-500" />
                  Password
                </span>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 pr-10"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password ? (
                  <p className="text-xs text-rose-500" role="alert">
                    {errors.password.message}
                  </p>
                ) : null}
              </label>

              <div className="flex items-center justify-between text-sm text-slate-600">
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="remember-me"
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(checked === true)
                        }
                        disabled={field.disabled}
                        className="border-slate-300 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:text-white"
                      />
                      <label htmlFor="remember-me" className="cursor-pointer">
                        Keep me signed in
                      </label>
                    </div>
                  )}
                />
                <Link
                  href="#"
                  className="text-amber-600 underline-offset-4 hover:text-amber-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-amber-500 to-orange-500 py-3 font-semibold text-white shadow-md shadow-amber-300/70 transition hover:brightness-110"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? "Signing in..." : "Access dashboard"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              {status === "success" ? (
                <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                  All set! Redirecting you to the dashboard…
                </p>
              ) : null}
              {status === "error" ? (
                <p className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                  Something went wrong while signing you in. Please check your
                  credentials and try again.
                </p>
              ) : null}
            </form>

            <p className="mt-8 text-center text-xs text-slate-500">
              Need an account?
              <Link
                href="#"
                className="ml-1 text-amber-700 underline-offset-4 hover:text-amber-800 hover:underline"
              >
                Request operator access
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
