import React from 'react';
import AuthDomainCheck from '../domain-check';

export default function AuthDomainCheckPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Firebase Authentication Domain Configuration</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Understanding the Domain Issue</h2>
        <p className="mb-4">
          When using Firebase Authentication with a custom domain, you may encounter issues where the authentication popup 
          shows a different domain than expected (e.g., "www.hyper-flix.com" instead of "hyper-flix.com").
        </p>
        <p className="mb-4">
          This happens because:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Browsers may automatically add "www" to domains</li>
          <li>OAuth flows may default to using the www subdomain</li>
          <li>Firebase Authentication may redirect to the www version if it's in the authorized domains list</li>
          <li>Your environment variables may not be correctly configured</li>
        </ul>
        <p>
          The diagnostic tool below will help you identify and fix these issues.
        </p>
      </div>
      
      <AuthDomainCheck />
      
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Complete Solution</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">1. Firebase Configuration</h3>
          <p className="mb-2">
            Ensure both domains are authorized in Firebase Authentication:
          </p>
          <ul className="list-disc pl-6 mb-2">
            <li>hyper-flix.com</li>
            <li>www.hyper-flix.com</li>
          </ul>
          <p>
            <a href="https://console.firebase.google.com/project/hyper-flix-f2891/authentication/settings" 
               target="_blank" rel="noopener noreferrer"
               className="text-blue-600 hover:underline">
              Open Firebase Authentication Settings →
            </a>
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">2. Google OAuth Configuration</h3>
          <p className="mb-2">
            Update your Google OAuth configuration to include both domains:
          </p>
          <ul className="list-disc pl-6 mb-2">
            <li>Add both domains to Authorized JavaScript Origins</li>
            <li>Add both domains to Authorized Redirect URIs</li>
          </ul>
          <p>
            <a href="https://console.cloud.google.com/apis/credentials" 
               target="_blank" rel="noopener noreferrer"
               className="text-blue-600 hover:underline">
              Open Google Cloud Console Credentials →
            </a>
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">3. Environment Variables</h3>
          <p className="mb-2">
            Update your <code>.env.local</code> file:
          </p>
          <pre className="bg-gray-100 p-3 rounded mb-2 overflow-auto">
            NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hyper-flix.com
          </pre>
          <p>
            After updating, rebuild and redeploy your application.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">4. Domain Consistency</h3>
          <p className="mb-2">
            We've implemented a middleware that automatically redirects from www to non-www domains.
            This ensures a consistent domain experience for authentication.
          </p>
          <p>
            The middleware is located at <code>src/middleware.ts</code>.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">5. Final Steps</h3>
          <p className="mb-2">
            After making these changes:
          </p>
          <ul className="list-disc pl-6">
            <li>Clear your browser cache and cookies</li>
            <li>Test in an incognito/private browsing window</li>
            <li>Try accessing both www and non-www versions of your domain</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 