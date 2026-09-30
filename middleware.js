import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET
);

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  if (
    pathname.startsWith("/user") ||
    pathname.startsWith("/admin")
  ) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    try {
      const { payload } = await jwtVerify(token, secret);
      if (
        pathname.startsWith("/admin") &&
        payload.role !== "admin"
      ) {
        return NextResponse.redirect(
          new URL("/user", request.url)
        );
      }
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register"
  ) {
    if (!token) {
      return NextResponse.next();
    }

    try {
      const { payload } = await jwtVerify(token, secret);
      if (payload.role === "admin") {
        return NextResponse.redirect(
          new URL("/admin", request.url)
        );
      }

      return NextResponse.redirect(
        new URL("/user", request.url)
      );
    } catch {
      return NextResponse.next();
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/user/:path*",
    "/admin/:path*",
  ],
};