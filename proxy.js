import { NextResponse } from 'next/server'
import { betterFetch } from '@better-fetch/fetch'

// Define protected and auth-restricted routes
const protectedRoutes = [
  '/clickAccuracy',
  '/memoryCard',
  '/patternMemory',
  '/moodQuestionnaire',
  '/stroopTest',
  '/reactionTest',
  '/visualPreference',
  '/profile',
]

const authRoutes = ['/login', '/signup']

export async function proxy(request) {
  const path = request.nextUrl.pathname

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  )
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route))

  // Better Auth session cookie check using better-fetch
  const { data: session } = await betterFetch(
    '/api/auth/get-session',
    {
      baseURL: request.nextUrl.origin,
      headers: {
        // Forward cookies from the incoming request to the auth endpoint
        cookie: request.headers.get('cookie') || '',
      },
    }
  )

  const isAuthenticated = !!session?.user

  // 1. If user is logged in and tries to access login/signup, redirect to home
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 2. If user is NOT logged in and tries to access protected activity/profile pages, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', path)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/clickAccuracy/:path*',
    '/memoryCard/:path*',
    '/patternMemory/:path*',
    '/moodQuestionnaire/:path*',
    '/stroopTest/:path*',
    '/reactionTest/:path*',
    '/visualPreference/:path*',
    '/profile/:path*',
  ],
}