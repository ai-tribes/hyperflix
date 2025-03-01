"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile,
  sendPasswordResetEmail,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useSession, signIn, signOut } from 'next-auth/react';

type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  registerWithEmail: (email: string, password: string, name: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithProvider: (provider: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  // Sync Firebase auth state and Next Auth session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync Next Auth session with user state
  useEffect(() => {
    if (session?.user && !user) {
      // User is logged in with Next Auth but not Firebase
      setUser({
        uid: session.user.id,
        email: session.user.email || null,
        displayName: session.user.name || null,
        photoURL: session.user.image || null
      });
    }
  }, [session, user]);

  const registerWithEmail = async (email: string, password: string, name: string) => {
    setError(null);
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      
      // Sign in with Next Auth after registration
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/dashboard'
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    setError(null);
    try {
      setLoading(true);
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/dashboard'
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithProvider = async (provider: string) => {
    setError(null);
    try {
      setLoading(true);
      await signIn(provider, { callbackUrl: '/dashboard' });
    } catch (err: any) {
      setError(err.message || `An error occurred during ${provider} login`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setError(null);
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      setError(err.message || 'An error occurred during password reset');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setError(null);
    try {
      setLoading(true);
      await firebaseSignOut(auth);
      await signOut({ callbackUrl: '/' });
    } catch (err: any) {
      setError(err.message || 'An error occurred during logout');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    registerWithEmail,
    loginWithEmail,
    loginWithProvider,
    resetPassword,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 