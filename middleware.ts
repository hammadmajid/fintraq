import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { sessionQueries } from './lib/db/session'

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token')?.value

  const pathName = request.nextUrl.pathname;
  if (pathName.startsWith('/settings') || pathName.startsWith('/dashboard')) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

    const [session] = await sessionQueries.getByToken(sessionToken)

    if (!session || session.expiresAt < new Date()) {
      // Delete the session cookie
      const response = NextResponse.redirect(new URL('/signin', request.url))
      response.cookies.delete('session_token')
      return response
    }

    // Extend session duration if it's close to expiring
    if (session.expiresAt.getTime() - Date.now() < 30 * 60 * 1000) { // 30 minutes
      const [updatedSession] = await sessionQueries.extendSession(session.token)
      const response = NextResponse.next()
      response.cookies.set('session_token', updatedSession.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      })
      return response
    }

    return NextResponse.next()
  }

  if (pathName === '/signin' || pathName === '/signup' || pathName === "/") {
    if (sessionToken) {
      const [session] = await sessionQueries.getByToken(sessionToken)

      if (session && session.expiresAt > new Date()) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/settings/:path*', '/dashboard/:path*', '/', '/signin', '/signup'],
}