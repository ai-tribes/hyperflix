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
  loginWithWallet: (walletType: 'metamask' | 'phantom' | 'handcash', callbackUrl?: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, password: string, callbackUrl?: string) => Promise<void>;
  logout: () => Promise<void>;
  signOut: () => Promise<void>; // Alias for logout
  signOutFromAllDevices: () => Promise<void>;
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

  const loginWithWallet = async (walletType: 'metamask' | 'phantom' | 'handcash', callbackUrl = '/dashboard') => {
    setError(null);
    try {
      // Dynamically import wallet connectors to avoid SSR issues
      const { WalletConnectors, generateWalletSignMessage } = await import('@/lib/wallet-providers/wallet-auth');
      
      let connectionResult;
      let signature;
      let address;
      let chainId;

      switch (walletType) {
        case 'metamask':
          connectionResult = await WalletConnectors.connectMetaMask();
          if (!connectionResult) {
            throw new Error('Failed to connect to MetaMask');
          }
          address = connectionResult.address;
          chainId = connectionResult.chainId;
          
          const metamaskMessage = generateWalletSignMessage(address);
          signature = await WalletConnectors.signMessageWithMetaMask(address, metamaskMessage);
          
          const metamaskResult = await signIn('wallet', {
            address,
            signature,
            message: metamaskMessage,
            walletType: 'metamask',
            chainId: chainId.toString(),
            callbackUrl,
            redirect: false
          });
          
          if (metamaskResult?.error) {
            throw new Error(metamaskResult.error);
          }
          
          if (metamaskResult?.ok) {
            router.push(callbackUrl);
          }
          break;

        case 'phantom':
          connectionResult = await WalletConnectors.connectPhantom();
          if (!connectionResult) {
            throw new Error('Failed to connect to Phantom');
          }
          address = connectionResult.address;
          
          const phantomMessage = generateWalletSignMessage(address);
          signature = await WalletConnectors.signMessageWithPhantom(phantomMessage);
          
          const phantomResult = await signIn('wallet', {
            address,
            signature,
            message: phantomMessage,
            walletType: 'phantom',
            callbackUrl,
            redirect: false
          });
          
          if (phantomResult?.error) {
            throw new Error(phantomResult.error);
          }
          
          if (phantomResult?.ok) {
            router.push(callbackUrl);
          }
          break;

        case 'handcash':
          // HandCash uses OAuth flow, so redirect to authorization URL
          const { WalletConnectors: WC } = await import('@/lib/wallet-providers/wallet-auth');
          const authUrl = WC.connectHandCash();
          window.location.href = authUrl;
          break;

        default:
          throw new Error(`Unsupported wallet type: ${walletType}`);
      }
    } catch (err: any) {
      console.error(`${walletType} login error:`, err);
      setError(err.message || `Failed to sign in with ${walletType}`);
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

  // Alias for logout to match the interface
  const signOutFunc = logout;

  const signOutFromAllDevices = async () => {
    setError(null);
    try {
      // For NextAuth, signing out from all devices means:
      // 1. Clear all sessions in the database (if using database sessions)
      // 2. Sign out from current session
      // Since we're using JWT sessions, we'll just sign out normally
      // In a production app with database sessions, you'd invalidate all user sessions here
      
      await signOut({ callbackUrl: '/' });
    } catch (err: any) {
      console.error('Sign out from all devices error:', err);
      setError(err.message || 'Failed to sign out from all devices');
      throw err;
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
    loginWithWallet,
    registerWithEmail,
    logout,
    signOut: signOutFunc,
    signOutFromAllDevices,
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