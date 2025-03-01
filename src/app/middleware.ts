import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware ensures proper redirection after authentication
export function middleware(request: NextRequest) {
  // Add a custom header to help debug session issues
  const response = NextResponse.next();
  response.headers.set('x-middleware-cache', 'no-cache');
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 