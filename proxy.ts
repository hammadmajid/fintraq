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
  const publicRoutes = ["/"]
  const authRoutes = ["/login", "/signup"]
  const protectedRoutes = ["/dashboard"]

  // Check if current route matches any group
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  )
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )
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

  // Redirect unauthenticated users from home to landing
  if (!isAuthenticated && pathname === "/" && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url))
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
