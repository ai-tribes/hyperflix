"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  User as FirebaseUser,
  updateProfile as firebaseUpdateProfile
} from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { setAuthCookie } from '@/lib/auth-utils';

// Extended User type with image property
interface User extends FirebaseUser {
  image?: string;
}

interface UpdateProfileParams {
  displayName?: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string, callbackUrl?: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, password: string, callbackUrl?: string) => Promise<void>;
  logout: () => Promise<void>;
  signOut: () => Promise<void>; // Alias for logout
  loginWithProvider: (provider: 'google' | 'twitter', callbackUrl?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (params: UpdateProfileParams) => Promise<void>;
  signOutFromAllDevices: () => Promise<void>; // New function to sign out from all devices
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
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Cast to our extended User type and add image property
        const extendedUser = firebaseUser as User;
        extendedUser.image = firebaseUser.photoURL || undefined;
        setUser(extendedUser);
        
        // Set auth cookie when user is authenticated
        setAuthCookie(extendedUser);
      } else {
        setUser(null);
        
        // Remove auth cookie when user is not authenticated
        setAuthCookie(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const loginWithEmail = async (email: string, password: string, callbackUrl = '/dashboard') => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.push(callbackUrl);
    } catch (error) {
      console.error('Email login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (name: string, email: string, password: string, callbackUrl = '/dashboard') => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Set display name
      if (userCredential.user) {
        await firebaseUpdateProfile(userCredential.user, {
          displayName: name
        });
      }
      
      router.push(callbackUrl);
    } catch (error) {
      console.error('Email registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Sign out from all devices by revoking all refresh tokens
  const signOutFromAllDevices = async () => {
    try {
      if (!user) {
        throw new Error('No user logged in');
      }
      
      // Get the current user's ID token
      const idToken = await user.getIdToken(true);
      
      // Call the Firebase Auth REST API to revoke all refresh tokens
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken,
          validSince: Math.floor(Date.now() / 1000), // Current time in seconds
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to revoke tokens: ${errorData.error.message}`);
      }
      
      // Sign out from the current device
      await firebaseSignOut(auth);
      
      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Sign out from all devices error:', error);
      throw error;
    }
  };

  // Add updateProfile function
  const updateProfile = async (params: UpdateProfileParams) => {
    try {
      if (!user) {
        throw new Error('No user logged in');
      }
      
      await firebaseUpdateProfile(user, {
        displayName: params.displayName || user.displayName,
        photoURL: params.photoURL || user.photoURL
      });
      
      // Update the local user state
      const updatedUser = { ...user };
      if (params.displayName) updatedUser.displayName = params.displayName;
      if (params.photoURL) {
        updatedUser.photoURL = params.photoURL;
        updatedUser.image = params.photoURL;
      }
      
      setUser(updatedUser);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const loginWithProvider = async (providerName: 'google' | 'twitter', callbackUrl = '/dashboard') => {
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
        console.log('Google provider initialized with parameters:', JSON.stringify({
          scopes: ['profile', 'email'],
          customParams: { prompt: 'select_account' }
        }));
      } else if (providerName === 'twitter') {
        provider = new TwitterAuthProvider();
      } else {
        throw new Error('Invalid provider');
      }
      
      console.log(`Attempting to sign in with ${providerName}...`);
      
      try {
        const result = await signInWithPopup(auth, provider);
        console.log(`Successfully signed in with ${providerName}`, result.user.uid);
        router.push(callbackUrl);
      } catch (popupError: any) {
        console.error(`Popup error with ${providerName}:`, popupError);
        
        if (popupError.code === 'auth/popup-closed-by-user') {
          console.log('User closed the popup window');
        } else if (popupError.code === 'auth/popup-blocked') {
          console.log('Popup was blocked by the browser');
        } else if (popupError.code === 'auth/cancelled-popup-request') {
          console.log('Authentication popup request was cancelled');
        } else if (popupError.code === 'auth/unauthorized-domain') {
          console.error('CRITICAL: This domain is not authorized in Firebase Console');
          console.log('Please add this domain to Firebase Console → Authentication → Settings → Authorized domains');
        }
        
        throw popupError;
      }
    } catch (error: any) {
      console.error(`${providerName} login error:`, error);
      
      setLoading(false);
      throw error;
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
    signOut: logout, // Alias for logout
    loginWithProvider,
    resetPassword,
    updateProfile,
    signOutFromAllDevices // Add the new function to the context value
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}