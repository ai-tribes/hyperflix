# Authentication, Cookie, and CSP Fixes

This document summarizes the changes made to fix authentication, cookie, and Content Security Policy (CSP) issues in the HyperFlix application.

## Issues Fixed

1. **Content Security Policy (CSP) blocking eval**: The CSP was blocking the use of `eval()` in JavaScript, which some libraries might be using.
2. **Cross-site cookie issues**: Cookies were being blocked or impacted in cross-site contexts, affecting authentication.
3. **CORS issues**: Cross-Origin Resource Sharing issues were preventing proper communication between domains.

## Changes Made

### 1. Added Content Security Policy Headers

Updated `next.config.js` to add CSP headers that allow `eval` and other necessary resources:

```javascript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://*.firebaseio.com https://*.googleapis.com; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://firestore.googleapis.com wss://*.firebaseio.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://*.googleusercontent.com https://firebasestorage.googleapis.com; frame-src 'self' https://*.firebaseapp.com https://accounts.google.com; object-src 'none'",
}
```

### 2. Updated Cookie Settings

1. Changed SameSite attribute from 'strict' to 'lax' in `auth-utils.ts`:

```javascript
export const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const
};
```

2. Updated cookie settings in `firebase.ts` to ensure consistent SameSite=Lax settings and add secure flag for production:

```javascript
document.cookie = `firebase-auth-token=${token}; path=/; max-age=3600; SameSite=Lax; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`;
```

### 3. Enhanced Middleware for CORS Support

Updated `middleware.ts` to:

1. Define allowed origins:
```javascript
const allowedOrigins = [
  'https://hyperflix.vercel.app',
  'https://hyperflix-njjwcecgx-ai-tribes.vercel.app',
  'https://hyper-flix-f2891.firebaseapp.com',
]
```

2. Handle CORS preflight requests:
```javascript
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
```

3. Add CORS headers to all responses:
```javascript
const response = NextResponse.next()

// Add CORS headers
if (origin) {
  response.headers.set('Access-Control-Allow-Origin', allowedOrigins.includes(origin) ? origin : allowedOrigins[0])
  response.headers.set('Access-Control-Allow-Credentials', 'true')
}
```

### 4. Created Diagnostic Tool

Created a diagnostic page at `/test-auth/cookie-test` to verify that:
- Cookies are working properly
- Eval is allowed by the CSP
- CORS is properly configured for Firebase

## Testing the Changes

1. Deploy the changes to Vercel
2. Visit `https://hyperflix.vercel.app/test-auth/cookie-test` to verify that all diagnostics pass
3. Try signing in with Google to verify that authentication works properly

## Additional Troubleshooting

If issues persist:
1. Clear browser cache and cookies
2. Try using incognito/private browsing mode
3. Check if third-party cookies are enabled in your browser
4. Disable any browser extensions that might be blocking cookies or scripts
5. Try a different browser 