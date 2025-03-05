/**
 * Authentication utility functions
 */

import { User } from 'firebase/auth';
import Cookies from 'js-cookie';

// Cookie constants
export const AUTH_COOKIE_NAME = 'firebase-auth-token';
export const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const
};

/**
 * Store the authentication token in a cookie
 */
export function setAuthCookie(user: User | null): void {
  if (user) {
    user.getIdToken().then(token => {
      console.log('[auth-utils] Setting auth cookie');
      Cookies.set(AUTH_COOKIE_NAME, token, COOKIE_OPTIONS);
    });
  } else {
    console.log('[auth-utils] Removing auth cookie');
    Cookies.remove(AUTH_COOKIE_NAME, { path: '/' });
  }
}

/**
 * Get the current authentication token
 */
export function getAuthCookie(): string | undefined {
  return Cookies.get(AUTH_COOKIE_NAME);
}

/**
 * Check if user is authenticated based on cookie
 */
export function isAuthenticated(): boolean {
  const token = getAuthCookie();
  return !!token;
}

/**
 * Serialize logged in user to safely pass to client
 */
export function serializeUser(user: User | null) {
  if (!user) return null;
  
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    isAnonymous: user.isAnonymous,
  };
} 