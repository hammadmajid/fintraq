import { auth } from "@/lib/auth"

export default auth((req) => {
    if (!req.auth && req.nextUrl.pathname !== "/login") {
        const newUrl = new URL("/login", req.nextUrl.origin)
        return Response.redirect(newUrl)
    } else if (req.auth && req.nextUrl.pathname === "/login") {
        const newUrl = new URL("/u/0/dashboard", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})

export const config = {
    matcher: ['/u/:path*', '/onboard/:path*', '/', '/login']
}