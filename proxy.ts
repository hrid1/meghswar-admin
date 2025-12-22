import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = [
  "/dashboard",
];

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);

  const token = req.cookies.get("access_token");
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};