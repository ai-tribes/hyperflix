import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';
import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME, AUTH_STATUS_COOKIE } from '@/lib/auth-utils';

export async function GET(request: Request) {
  // Check for authentication cookies
  const cookieStore = cookies();
  const authStatus = cookieStore.get(AUTH_STATUS_COOKIE)?.value;
  const firebaseToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const nextAuthToken = cookieStore.get('next-auth.session-token')?.value;
  const sessionToken = cookieStore.get('__session')?.value;
  
  // Put together cookie info
  const cookieInfo = {
    authStatus: !!authStatus,
    firebaseToken: !!firebaseToken ? `${firebaseToken.substring(0, 10)}...` : null,
    nextAuthToken: !!nextAuthToken,
    sessionToken: !!sessionToken,
  };
  
  // Return authentication status
  return NextResponse.json({
    authenticated: !!authStatus || !!firebaseToken || !!nextAuthToken || !!sessionToken,
    cookies: cookieInfo,
    serverTime: new Date().toISOString(),
  });
} 