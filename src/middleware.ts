import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const role = token?.role as string;
    const status = token?.status as string;

    // 1. If user is PENDING, restrict access to dashboards (except pending page)
    if (status === "PENDING" && !path.startsWith("/auth/pending")) {
      return NextResponse.redirect(new URL("/auth/pending", req.url));
    }

    // 2. Role-based Path Protection
    if (path.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (path.startsWith("/dmc") && role !== "DMC") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (path.startsWith("/agent") && role !== "AGENT") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/login",
    }
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/dmc/:path*",
    "/agent/:path*",
  ],
};
