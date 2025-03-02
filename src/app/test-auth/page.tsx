"use client";

import { useState } from 'react';
import GoogleSignInButton from '@/components/GoogleSignInButton';

export default function TestAuthPage() {
  const [user, setUser] = useState<any>(null);
  const [authError, setAuthError] = useState<any>(null);

  const handleSuccess = (user: any) => {
    setUser(user);
    setAuthError(null);
  };

  const handleError = (error: any) => {
    setAuthError(error);
    console.error('Auth error details:', error);
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold mb-6">Firebase Direct Authentication Test</h1>
      
      <div className="mb-8">
        <GoogleSignInButton 
          onSuccess={handleSuccess} 
          onError={handleError}
        />
      </div>

      {user && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md mb-6">
          <h2 className="font-semibold text-green-800 mb-2">Authentication Successful</h2>
          <div className="text-sm text-green-700">
            <p><strong>User ID:</strong> {user.uid}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Display Name:</strong> {user.displayName}</p>
          </div>
        </div>
      )}

      {authError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <h2 className="font-semibold text-red-800 mb-2">Authentication Error</h2>
          <div className="text-sm text-red-700">
            <p><strong>Error Code:</strong> {authError.code}</p>
            <p><strong>Error Message:</strong> {authError.message}</p>
            
            <div className="mt-4 p-2 bg-red-100 rounded overflow-auto">
              <pre className="whitespace-pre-wrap text-xs">
                {JSON.stringify(authError, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h2 className="font-semibold text-blue-800 mb-2">Debugging Tips</h2>
        <ul className="list-disc list-inside text-sm text-blue-700">
          <li>Check console for detailed error logs</li>
          <li>The direct method bypasses NextAuth.js and uses Firebase directly</li>
          <li>Make sure Google provider is enabled in Firebase Console</li>
          <li>Verify the redirect URI in Google Cloud Console: <code>https://hyper-flix-f2891.firebaseapp.com/__/auth/handler</code></li>
          <li>Try using an incognito window to avoid cached credentials</li>
        </ul>
      </div>
    </div>
  );
} 