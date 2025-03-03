"use client";

import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from '@/lib/firebase';

export default function AuthDomainCheck() {
  const [authDomain, setAuthDomain] = useState<string>('');
  const [providerConfig, setProviderConfig] = useState<any>(null);
  const [envVars, setEnvVars] = useState<any>({});
  const [currentDomain, setCurrentDomain] = useState<string>('');
  
  useEffect(() => {
    // Get the auth domain from Firebase config
    const firebaseConfig = auth.app.options;
    setAuthDomain(firebaseConfig.authDomain || 'Not set');
    
    // Get Google provider configuration
    // Access the custom parameters that were set using setCustomParameters
    // @ts-ignore - Accessing internal property for debugging purposes
    const providerParams = googleProvider._customParameters || {};
    setProviderConfig(providerParams);
    
    // Get environment variables
    setEnvVars({
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'Not set',
      NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL || 'Not set'
    });
    
    // Get current domain
    if (typeof window !== 'undefined') {
      setCurrentDomain(window.location.hostname);
    }
  }, []);
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Firebase Authentication Domain Check</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Current Browser Domain:</h3>
        <div className="p-3 bg-gray-100 rounded">
          <code>{currentDomain}</code>
        </div>
        {currentDomain.startsWith('www.') && (
          <p className="mt-2 text-amber-600">
            You are currently on the www subdomain. The middleware should redirect to the non-www domain in production.
          </p>
        )}
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Current Auth Domain:</h3>
        <div className="p-3 bg-gray-100 rounded">
          <code>{authDomain}</code>
        </div>
        {authDomain !== process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN && (
          <p className="mt-2 text-red-600">
            <strong>Warning:</strong> The auth domain does not match your environment variable.
          </p>
        )}
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Google Provider Configuration:</h3>
        <div className="p-3 bg-gray-100 rounded overflow-auto">
          <pre>{JSON.stringify(providerConfig, null, 2)}</pre>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Environment Variables:</h3>
        <div className="p-3 bg-gray-100 rounded overflow-auto">
          <pre>{JSON.stringify(envVars, null, 2)}</pre>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Troubleshooting Steps:</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Verify that both <code>hyper-flix.com</code> and <code>www.hyper-flix.com</code> are added to Firebase Authentication's authorized domains</li>
          <li>Check that both domains are added to Google Cloud Console's authorized redirect URIs</li>
          <li>Ensure your <code>.env.local</code> file has <code>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hyper-flix.com</code></li>
          <li>Rebuild and redeploy your application after making changes to environment variables</li>
          <li>Clear browser cookies and cache</li>
          <li>Try authentication in an incognito/private browsing window</li>
        </ol>
      </div>
      
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-6">
        <p className="text-yellow-800">
          <strong>Note:</strong> If you see <code>www.hyper-flix.com</code> in the authentication popup instead of <code>hyper-flix.com</code>, 
          this is likely because your browser is automatically adding the "www" prefix or because the OAuth flow is using the www subdomain.
          Follow the troubleshooting steps above to resolve this issue.
        </p>
      </div>
      
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Domain Consistency Solution:</h3>
        <p className="mb-2">
          We've implemented a middleware that automatically redirects from <code>www.hyper-flix.com</code> to <code>hyper-flix.com</code> in production.
          This ensures a consistent domain experience for authentication.
        </p>
        <p>
          If you're still experiencing issues, try manually clearing your browser's cookies for both domains and testing again.
        </p>
      </div>
    </div>
  );
} 