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

// Define public paths that don't require authentication
const publicRoutes = [
  '/',
  '/auth',
  '/api/auth',
  '/test-auth',
]

// Define allowed origins for CORS
// Get allowed origins from environment variables or use defaults
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : [
      'https://hyperflix.vercel.app',
      'https://hyperflix-njjwcecgx-ai-tribes.vercel.app',
      'https://hyper-flix-f2891.firebaseapp.com',
    ]

// Always allow development origins
if (process.env.NODE_ENV === 'development') {
  allowedOrigins.push('http://localhost:3000', 'http://localhost:3001')
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const origin = request.headers.get('origin') || ''
  
  console.log(`[Middleware] Processing request for: ${pathname}`)
  
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 })
    
    response.headers.set('Access-Control-Allow-Origin', allowedOrigins.includes(origin) ? origin : allowedOrigins[0])
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    response.headers.set('Access-Control-Max-Age', '86400')
    
    return response
  }
  
  // Check if the path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
  
  // Check if the path is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
  
  if (isProtectedRoute) {
    // Check for NextAuth session token (multiple possible cookie names)
    const sessionToken = request.cookies.get('next-auth.session-token')?.value ||
                        request.cookies.get('__Secure-next-auth.session-token')?.value ||
                        request.cookies.get('__Host-next-auth.session-token')?.value
    
    // Also check for our custom Firebase token as fallback
    const firebaseToken = request.cookies.get('firebase-auth-token')?.value ||
                         request.cookies.get('auth-token')?.value
    
    const isAuthenticated = !!sessionToken || !!firebaseToken
    
    if (!isAuthenticated) {
      console.log(`[Middleware] Redirecting unauthenticated user from ${pathname} to login`)
      const url = new URL('/auth/signin', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
    
    console.log(`[Middleware] Authenticated user accessing ${pathname}`)
  }
  
  // Create response with CORS headers
  const response = NextResponse.next()
  
  // Add CORS headers to all responses
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }
  
  return response
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
} 