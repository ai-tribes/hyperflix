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
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signOut: () => Promise<void>; // Alias for logout
  loginWithProvider: (provider: 'google' | 'twitter') => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (params: UpdateProfileParams) => Promise<void>;
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
      } else {
        setUser(null);
      }
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
        await firebaseUpdateProfile(userCredential.user, {
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
      await firebaseSignOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
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
      console.log('Current auth configuration:', {
        authDomain: auth.app.options.authDomain,
        apiKey: auth.app.options.apiKey?.substring(0, 5) + '...',
        projectId: auth.app.options.projectId
      });
      
      try {
        const result = await signInWithPopup(auth, provider);
        console.log(`Successfully signed in with ${providerName}`, result.user.uid);
        router.push('/dashboard');
      } catch (popupError: any) {
        console.error(`Popup error with ${providerName}:`, popupError);
        console.error('Error code:', popupError.code);
        console.error('Error message:', popupError.message);
        
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
        
        if (popupError.customData?.email) {
          console.log('Email associated with error:', popupError.customData.email);
        }
        
        throw popupError;
      }
    } catch (error: any) {
      console.error(`${providerName} login error:`, error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
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
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}