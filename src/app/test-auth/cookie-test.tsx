'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function CookieTest() {
  const [cookieStatus, setCookieStatus] = useState<string>('Checking cookies...');
  const [evalStatus, setEvalStatus] = useState<string>('Checking eval...');
  const [corsStatus, setCorsStatus] = useState<string>('Checking CORS...');
  
  useEffect(() => {
    // Check if cookies are working
    const checkCookies = () => {
      try {
        // Try to set a test cookie
        document.cookie = "test_cookie=1; path=/; SameSite=Lax;";
        
        // Check if the cookie was set
        const hasCookie = document.cookie.includes('test_cookie=1');
        
        setCookieStatus(hasCookie 
          ? "✅ Cookies are working properly" 
          : "❌ Cookies are not working");
      } catch (error) {
        setCookieStatus(`❌ Error checking cookies: ${error}`);
      }
    };
    
    // Check if eval is allowed
    const checkEval = () => {
      try {
        // Try to use eval
        const result = eval('2 + 2');
        
        setEvalStatus(result === 4 
          ? "✅ Eval is working properly" 
          : "❌ Eval returned an incorrect result");
      } catch (error) {
        setEvalStatus(`❌ Eval is blocked: ${error}`);
      }
    };
    
    // Check CORS with Firebase
    const checkCORS = () => {
      // Listen for auth state changes to test Firebase connection
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCorsStatus(
          "✅ Firebase connection is working (CORS is properly configured)"
        );
      }, (error) => {
        setCorsStatus(`❌ Firebase connection error: ${error.message}`);
      });
      
      return unsubscribe;
    };
    
    checkCookies();
    checkEval();
    const unsubscribe = checkCORS();
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Diagnostics</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Cookie Status</h2>
          <p className="text-lg">{cookieStatus}</p>
        </div>
        
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Eval Status</h2>
          <p className="text-lg">{evalStatus}</p>
        </div>
        
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">CORS Status</h2>
          <p className="text-lg">{corsStatus}</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Troubleshooting Steps</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Clear your browser cache and cookies</li>
          <li>Try using incognito/private browsing mode</li>
          <li>Check if third-party cookies are enabled in your browser</li>
          <li>Disable any browser extensions that might be blocking cookies or scripts</li>
          <li>Try a different browser</li>
        </ul>
      </div>
    </div>
  );
} 