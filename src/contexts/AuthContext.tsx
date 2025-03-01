"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  User,
  updateProfile
} from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithProvider: (provider: 'google' | 'twitter') => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const loginWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Email login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Set display name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Email registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const loginWithProvider = async (providerName: 'google' | 'twitter') => {
    try {
      setLoading(true);
      let provider;
      
      if (providerName === 'google') {
        provider = new GoogleAuthProvider();
        // Add scopes for Google provider
        provider.addScope('profile');
        provider.addScope('email');
        // Set custom parameters
        provider.setCustomParameters({
          prompt: 'select_account'
        });
      } else if (providerName === 'twitter') {
        provider = new TwitterAuthProvider();
      } else {
        throw new Error('Invalid provider');
      }
      
      console.log(`Attempting to sign in with ${providerName}...`);
      const result = await signInWithPopup(auth, provider);
      console.log(`Successfully signed in with ${providerName}`, result.user.uid);
      router.push('/dashboard');
    } catch (error: any) {
      console.error(`${providerName} login error:`, error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Log Firebase error details if available
      if (error.customData && error.customData._tokenResponse) {
        console.error('Token response error:', error.customData._tokenResponse);
      }
      
      // Provide more specific error messages based on Firebase error codes
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Sign-in popup was blocked by your browser. Please allow popups for this site.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        throw new Error('The sign-in operation was cancelled. Please try again.');
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        throw new Error('An account already exists with the same email address but different sign-in credentials. Please sign in using the original provider.');
      } else {
        // Throw the original error for other cases
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    loginWithEmail,
    registerWithEmail,
    logout,
    loginWithProvider,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 