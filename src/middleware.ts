import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected paths that require authentication
const protectedRoutes = [
  '/dashboard',
  '/create',
  '/videos',
  '/tokens',
  '/audios',
  '/lipsync',
  '/account',
]

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
  
  if (isProtectedRoute) {
    // Check for auth token
    const hasToken = request.cookies.has('firebase-auth-token') || 
                     request.cookies.has('next-auth.session-token') || 
                     request.cookies.has('__session')
    
    // If no token, redirect to login
    if (!hasToken) {
      console.log(`[Middleware] Redirecting unauthenticated user from ${pathname} to login`)
      const url = new URL('/auth/signin', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
    
    console.log(`[Middleware] Authenticated user accessing ${pathname}`)
  }
  
  return NextResponse.next()
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match specific protected routes
     */
    '/dashboard',
    '/dashboard/:path*',
    '/create',
    '/create/:path*',
    '/videos',
    '/videos/:path*',
    '/tokens',
    '/tokens/:path*',
    '/audios',
    '/audios/:path*',
    '/lipsync',
    '/lipsync/:path*',
    '/account',
    '/account/:path*',
  ],
} 