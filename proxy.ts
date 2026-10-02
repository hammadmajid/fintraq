import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Get session from auth API
  const sessionResponse = await auth.api.getSession({
    headers: request.headers,
  })

  const isAuthenticated = !!sessionResponse?.session

  // Define route groups
  const authRoutes = ["/login", "/signup", "/reset-password"]
  const protectedRoutes = [
    "/dashboard",
    "/accounts",
    "/budgets",
    "/clients",
    "/invoices",
    "/records",
    "/reports",
    "/settings",
  ]

  // Check if current route matches any group
  const matchesRoute = (route: string) =>
    pathname === route || pathname.startsWith(`${route}/`)
  const isAuthRoute = authRoutes.some(matchesRoute)
  const isProtectedRoute = protectedRoutes.some(matchesRoute)
  const isApiRoute = pathname.startsWith("/api")

  // Allow API routes to pass through
  if (isApiRoute) {
    return NextResponse.next()
  }

  // Redirect authenticated users away from auth routes to dashboard
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Redirect unauthenticated users from protected routes to login
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Allow all other requests
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
