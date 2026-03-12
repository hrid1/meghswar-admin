// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


function parseJwt(token: string) {
  try {
    const base64Payload = token.split(".")[1]
    const payload = Buffer.from(base64Payload, "base64").toString("utf-8")
    return JSON.parse(payload)
  } catch (err) {
    return null
  }
}

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  const isMerchant = request.nextUrl.pathname.startsWith('/dashboard');
  
  // Protect dashboard routes
  if (isMerchant) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    const decodedToken = parseJwt(token);

    if (decodedToken?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  return NextResponse.next();
}





// import { NextRequest, NextResponse } from "next/server";

// const PROTECTED_ROUTES = [
//   "/dashboard",
// ];

// export default function proxy(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);

//   const token = req.cookies.get("access_token");
//   if (isProtectedRoute && !token) {
//     return NextResponse.redirect(new URL("/auth", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/auth/:path*"],
// };