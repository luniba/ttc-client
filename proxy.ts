import { NextResponse, type NextRequest } from "next/server"

// Pages behind login: visitors without the CSRF cookie (the session hint) go straight to the
// login page with no flash of the app shell. The client AuthGate still catches sessions that
// expire later.
const privatePaths = ["/admin"]

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  if (
    privatePaths.some((p) => pathname === p || pathname.startsWith(`${p}/`)) &&
    !request.cookies.has("lms_csrf")
  ) {
    const login = new URL("/login", request.url)
    login.searchParams.set("next", pathname + search)
    return NextResponse.redirect(login)
  }
  return NextResponse.next()
}

export const config = { matcher: ["/admin/:path*"] }
