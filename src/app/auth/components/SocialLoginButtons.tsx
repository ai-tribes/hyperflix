"use client";

import React, { useState } from 'react';
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

interface SocialLoginButtonsProps {
  onError?: (error: Error) => void;
}

export default function SocialLoginButtons({ onError }: SocialLoginButtonsProps) {
  const { loginWithProvider } = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [twitterLoading, setTwitterLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSocialLogin = async (provider: 'google' | 'twitter') => {
    const setLoading = provider === 'google' ? setGoogleLoading : setTwitterLoading;
    setLoading(true);
    setErrorMessage(null);
    
    try {
      console.log(`Initiating ${provider} login...`);
      await loginWithProvider(provider);
      console.log(`${provider} login process completed`);
    } catch (error: any) {
      console.error(`${provider} login failed:`, error);
      
      // Set friendly error message based on error code
      let message = 'An error occurred during sign in. Please try again.';
      
      if (error.code === 'auth/popup-closed-by-user') {
        message = 'Sign-in window was closed. Please try again.';
      } else if (error.code === 'auth/popup-blocked') {
        message = 'Sign-in popup was blocked. Please allow popups for this site.';
      } else if (error.code === 'auth/unauthorized-domain') {
        message = 'This website is not authorized for authentication. Please contact support.';
      } else if (error.code === 'auth/cancelled-popup-request') {
        message = 'Sign-in was cancelled. Please try again.';
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        message = 'An account already exists with the same email. Try another sign-in method.';
      }
      
      setErrorMessage(message);
      if (onError) onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
          {errorMessage}
        </div>
      )}
      
      <button
        type="button"
        onClick={() => handleSocialLogin('google')}
        disabled={googleLoading || twitterLoading}
        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <FaGoogle className="text-red-500" />
        <span>{googleLoading ? 'Signing in...' : 'Sign in with Google'}</span>
      </button>
      
      <button
        type="button"
        onClick={() => handleSocialLogin('twitter')}
        disabled={googleLoading || twitterLoading}
        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <FaTwitter className="text-blue-400" />
        <span>{twitterLoading ? 'Signing in...' : 'Sign in with Twitter'}</span>
      </button>
    </div>
  );
} 