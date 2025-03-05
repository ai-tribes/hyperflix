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

// Define allowed origins for CORS
const allowedOrigins = [
  'https://hyperflix.vercel.app',
  'https://hyperflix-njjwcecgx-ai-tribes.vercel.app',
  'https://hyper-flix-f2891.firebaseapp.com',
]

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const origin = request.headers.get('origin') || ''
  
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 })
    
    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', allowedOrigins.includes(origin) ? origin : allowedOrigins[0])
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    response.headers.set('Access-Control-Max-Age', '86400') // 24 hours
    
    return response
  }
  
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
  
  // Add CORS headers to all responses
  const response = NextResponse.next()
  
  // Add CORS headers
  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', allowedOrigins.includes(origin) ? origin : allowedOrigins[0])
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }
  
  return response
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
    // Also match API routes for CORS
    '/api/:path*',
  ],
} 