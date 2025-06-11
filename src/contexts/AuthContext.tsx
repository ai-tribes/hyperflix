"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Types
interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  // Auth methods
  loginWithEmail: (email: string, password: string, callbackUrl?: string) => Promise<void>;
  loginWithProvider: (provider: string, callbackUrl?: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, password: string, callbackUrl?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Main Auth Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  
  const loading = status === 'loading';
  
  // Convert NextAuth session to our User type
  const user: User | null = session?.user ? {
    id: session.user.id || '',
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  } : null;

  const loginWithEmail = async (email: string, password: string, callbackUrl = '/dashboard') => {
    setError(null);
    try {
      const result = await signIn('credentials', {
        email,
        password,
        callbackUrl,
        redirect: false,
      });
      
      if (result?.error) {
        throw new Error(result.error);
      }
      
      if (result?.ok) {
        router.push(callbackUrl);
      }
    } catch (err: any) {
      console.error('Email login error:', err);
      setError(err.message || 'Failed to sign in');
      throw err;
    }
  };

  const loginWithProvider = async (provider: string, callbackUrl = '/dashboard') => {
    setError(null);
    try {
      const result = await signIn(provider, {
        callbackUrl,
        redirect: false,
      });
      
      if (result?.error) {
        throw new Error(result.error);
      }
      
      if (result?.ok) {
        router.push(callbackUrl);
      }
    } catch (err: any) {
      console.error(`${provider} login error:`, err);
      setError(err.message || `Failed to sign in with ${provider}`);
      throw err;
    }
  };

  const registerWithEmail = async (name: string, email: string, password: string, callbackUrl = '/dashboard') => {
    setError(null);
    try {
      // For now, we'll use the credentials provider for registration
      // In a production app, you'd want a separate registration endpoint
      const result = await signIn('credentials', {
        email,
        password,
        name,
        callbackUrl,
        redirect: false,
      });
      
      if (result?.error) {
        throw new Error(result.error);
      }
      
      if (result?.ok) {
        router.push(callbackUrl);
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to create account');
      throw err;
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await signOut({ callbackUrl: '/' });
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err.message || 'Failed to sign out');
    }
  };

  const resetPassword = async (email: string) => {
    setError(null);
    try {
      // This would typically call a password reset API endpoint
      // For now, we'll just throw an error to indicate it's not implemented
      throw new Error('Password reset not implemented yet');
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err.message || 'Failed to reset password');
      throw err;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    loginWithEmail,
    loginWithProvider,
    registerWithEmail,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Wrapper component that provides both SessionProvider and AuthProvider
export function AppAuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SessionProvider>
  );
}