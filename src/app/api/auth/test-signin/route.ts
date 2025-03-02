import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { AUTH_COOKIE_NAME, AUTH_STATUS_COOKIE } from '@/lib/auth-utils';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // First, try to sign in with provided credentials
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get the token to set cookies
      const token = await user.getIdToken();
      
      // Return successful response with user data and set cookie
      const response = NextResponse.json({
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        },
        message: 'Successfully signed in',
      });
      
      // Set auth cookies
      response.cookies.set(AUTH_COOKIE_NAME, token, {
        httpOnly: false, // Not HttpOnly to allow JS access
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1 hour
        path: '/',
      });
      
      response.cookies.set(AUTH_STATUS_COOKIE, 'authenticated', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1 hour
        path: '/',
      });
      
      return response;
    } catch (signInError: any) {
      // If the sign-in fails because the user doesn't exist, create the test user
      if (signInError.code === 'auth/user-not-found') {
        console.log('Test user not found, creating...');
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          
          // Get the token to set cookies
          const token = await user.getIdToken();
          
          // Return successful response with user data and set cookie
          const response = NextResponse.json({
            success: true,
            user: {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            },
            message: 'Test user created and signed in',
          });
          
          // Set auth cookies
          response.cookies.set(AUTH_COOKIE_NAME, token, {
            httpOnly: false, // Not HttpOnly to allow JS access
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60, // 1 hour
            path: '/',
          });
          
          response.cookies.set(AUTH_STATUS_COOKIE, 'authenticated', {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60, // 1 hour
            path: '/',
          });
          
          return response;
        } catch (createError: any) {
          return NextResponse.json({
            success: false,
            error: {
              code: createError.code,
              message: createError.message,
            },
            message: 'Failed to create test user',
          }, { status: 500 });
        }
      }
      
      // Return error response for other sign-in errors
      return NextResponse.json({
        success: false,
        error: {
          code: signInError.code,
          message: signInError.message,
        },
        message: 'Failed to sign in',
      }, { status: 401 });
    }
  } catch (error: any) {
    console.error('Test signin error:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        message: error.message || 'Unknown error',
      },
      message: 'Server error during authentication',
    }, { status: 500 });
  }
} 