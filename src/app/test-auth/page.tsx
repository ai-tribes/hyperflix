"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthStatus from '@/components/AuthStatus';
import Link from 'next/link';

export default function TestAuthPage() {
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testPassword, setTestPassword] = useState('test123456');
  const [testName, setTestName] = useState('Test User');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { loginWithEmail, loginWithProvider, registerWithEmail, logout } = useAuth();

  const handleEmailTest = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      await loginWithEmail(testEmail, testPassword);
      setMessage('Email login successful!');
    } catch (error: any) {
      setMessage(`Email login failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterTest = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      await registerWithEmail(testName, testEmail, testPassword);
      setMessage('Registration successful!');
    } catch (error: any) {
      setMessage(`Registration failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleTest = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      await loginWithProvider('google');
      setMessage('Google login successful!');
    } catch (error: any) {
      setMessage(`Google login failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      await logout();
      setMessage('Logout successful!');
    } catch (error: any) {
      setMessage(`Logout failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">HyperFlix Authentication Test</h1>
        <p className="text-gray-600">Test the authentication flow with the new unified system</p>
      </div>

      {/* Current Auth Status */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Current Authentication Status</h2>
        <AuthStatus />
      </div>

      {/* Navigation Links */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Authentication Pages</h2>
        <div className="flex gap-4 flex-wrap">
          <Link 
            href="/auth/signin" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign In Page
          </Link>
          <Link 
            href="/auth/signup" 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Sign Up Page
          </Link>
          <Link 
            href="/dashboard" 
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Dashboard (Protected)
          </Link>
        </div>
      </div>

      {/* Test Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Email Auth Test */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Email Authentication Test</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Test User"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="test@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="test123456"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleEmailTest}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Test Login'}
              </button>
              
              <button
                onClick={handleRegisterTest}
                disabled={isLoading}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Test Register'}
              </button>
            </div>
          </div>
        </div>

        {/* Social Auth Test */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Social Authentication Test</h2>
          
          <div className="space-y-4">
            <button
              onClick={handleGoogleTest}
              disabled={isLoading}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Test Google Login'}
            </button>
            
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Test Logout'}
            </button>
          </div>
        </div>
      </div>

      {/* Test Results */}
      {message && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className={`p-4 rounded-md ${
            message.includes('successful') 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message}
          </div>
        </div>
      )}

      {/* Development Info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold mb-2">Development Info</h3>
        <p className="text-sm text-gray-600">
          This page allows you to test the authentication flow. Use the test credentials above 
          or try social login. Check the browser console for detailed logs.
        </p>
      </div>
    </div>
  );
} 