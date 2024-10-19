import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value || ''

  if (request.nextUrl.pathname.startsWith('/profile')   ) {
    if (!token) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

    // TODO: verify the token's validity, check if it's expired

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/profile/:path',
}