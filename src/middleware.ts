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
  
  console.log(`[Middleware] Processing request for path: ${pathname}`)
  
  // Check if the path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
  
  if (isProtectedRoute) {
    // Check for auth token
    const hasToken = request.cookies.has('firebase-auth-token') || 
                     request.cookies.has('next-auth.session-token') || 
                     request.cookies.has('__session')
    
    console.log(`[Middleware] Protected route detected: ${pathname}, Token found: ${hasToken}`)
    
    // If no token, redirect to login
    if (!hasToken) {
      console.log(`[Middleware] Redirecting unauthenticated user from ${pathname} to login`)
      const url = new URL('/auth/signin', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
    
    console.log(`[Middleware] Authenticated user accessing ${pathname}`)
  } else {
    console.log(`[Middleware] Non-protected route: ${pathname}`)
  }
  
  return NextResponse.next()
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all protected routes including nested paths
     */
    '/dashboard/:path*',
    '/create/:path*',
    '/videos/:path*',
    '/tokens/:path*',
    '/audios/:path*',
    '/lipsync/:path*',
    '/account/:path*',
    
    // Also match the root paths
    '/dashboard',
    '/create',
    '/videos',
    '/tokens',
    '/audios',
    '/lipsync',
    '/account',
  ],
} 