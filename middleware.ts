import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SessionRepository } from './lib/repositories/session'
import { sql } from '@vercel/postgres'

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token')?.value

  if (request.nextUrl.pathname.startsWith('/profile')) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

    const sessionRepo = new SessionRepository(sql)
    const session = await sessionRepo.getByToken(sessionToken)

    if (!session || session.expiresAt < new Date()) {
      // Delete the session cookie
      const response = NextResponse.redirect(new URL('/signin', request.url))
      response.cookies.delete('session_token')
      return response
    }

    // Extend session duration if it's close to expiring
    if (session.expiresAt.getTime() - Date.now() < 30 * 60 * 1000) { // 30 minutes
      const updatedSession = await sessionRepo.extendSession(session.token)
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

  if (request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/signup') {
    if (sessionToken) {
      const sessionRepo = new SessionRepository(sql)
      const session = await sessionRepo.getByToken(sessionToken)

      if (session && session.expiresAt > new Date()) {
        return NextResponse.redirect(new URL('/profile', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/signin', '/signup'],
}