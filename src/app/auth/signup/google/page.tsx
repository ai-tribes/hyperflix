"use client";

// Force dynamic rendering for this client component
export const dynamic = 'force-dynamic'; 
export const runtime = 'edge';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../signup.module.css';

export default function GoogleSignUpPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard';
  
  const { loginWithProvider } = useAuth();

  // Auto-trigger Google sign-up when the page loads
  useEffect(() => {
    handleGoogleSignUp();
  }, []);

  const handleGoogleSignUp = async () => {
    if (loading) return; // Prevent multiple simultaneous attempts
    
    setError('');
    setSuccessMessage('');
    setLoading(true);
    
    try {
      await loginWithProvider('google', callbackUrl);
      setSuccessMessage('Google sign-up successful! Redirecting...');
      // No need to manually redirect as loginWithProvider handles it
    } catch (err: any) {
      console.error('Google sign-up error:', err);
      
      if (err.code === 'auth/popup-closed-by-user') {
        console.log('User closed the popup window');
        // Don't show error for user-initiated cancellation
      } else if (err.code === 'auth/popup-blocked') {
        setError('Popup was blocked by your browser. Please allow popups for this site.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        console.log('Authentication popup request was cancelled');
        // Don't show error for cancellation
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection and try again.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized for Google authentication. Please contact support.');
      } else {
        setError('Failed to sign up with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bannerContainer}>
        <div className={styles.bannerContent}>
          <h2>Join the Memecoin Revolution</h2>
          <p>HyperFlix gives you the tools to create viral marketing campaigns for your memecoin</p>
          <ul className={styles.featureList}>
            <li>AI-powered content generation</li>
            <li>Multi-platform distribution</li>
            <li>Advanced analytics & tracking</li>
            <li>Customizable marketing templates</li>
          </ul>
        </div>
      </div>
      
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h1>Sign up with <span className={styles.brandName}>Google</span></h1>
          <p>Quick and secure access to HyperFlix</p>
        </div>
        
        {error && <div className={styles.error}>{error}</div>}
        {successMessage && <div className={styles.success}>{successMessage}</div>}
        
        <div className={styles.googleSignupContainer}>
          <button 
            className={`${styles.socialButton} ${styles.googleButton} ${styles.largeButton}`}
            onClick={handleGoogleSignUp}
            disabled={loading}
          >
            <FaGoogle />
            {loading ? 'Connecting to Google...' : 'Sign up with Google'}
          </button>
          
          <div className={styles.privacyNote}>
            By signing up, you agree to our 
            <Link href="/terms"> Terms of Service</Link> and 
            <Link href="/privacy"> Privacy Policy</Link>
          </div>
          
          <div className={styles.divider}>
            <span>or</span>
          </div>
          
          <div className={styles.alternativeOptions}>
            <Link href="/auth/signup" className={styles.alternativeLink}>
              Sign up with email instead
            </Link>
            
            <div className={styles.signin}>
              Already have an account? <Link href="/auth/signin">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 