"use client";

// Force dynamic rendering for this client component
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaGoogle, FaTwitter, FaTiktok } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import styles from './signin.module.css';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import WalletSignIn from '@/components/auth/WalletSignIn';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard';

  const { loginWithEmail, loginWithProvider } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setLoading(true);
      await loginWithEmail(email, password, callbackUrl);
    } catch (err: any) {
      console.error('Sign in error:', err);
      
      // Set user-friendly error messages
      if (err.message.includes('Invalid password')) {
        setError('Invalid email or password');
      } else if (err.message.includes('too many requests')) {
        setError('Too many failed login attempts. Please try again later or reset your password');
      } else if (err.message.includes('user-not-found') || err.message.includes('invalid-credential')) {
        setError('Invalid email or password');
      } else {
        setError(err.message || 'Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    
    try {
      await loginWithProvider('google', callbackUrl);
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      
      if (err.message.includes('popup-closed-by-user')) {
        // Don't show error for user-initiated cancellation
        console.log('User closed the popup window');
      } else if (err.message.includes('popup-blocked')) {
        setError('Popup was blocked by your browser. Please allow popups for this site.');
      } else if (err.message.includes('network-request-failed')) {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTwitterSignIn = async () => {
    setError('Twitter authentication is coming soon!');
  };

  const handleTikTokSignIn = async () => {
    setError(null);
    setLoading(true);
    
    try {
      await loginWithProvider('tiktok', callbackUrl);
    } catch (err: any) {
      console.error('TikTok sign-in error:', err);
      setError('Failed to sign in with TikTok. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle URL error parameters
  useEffect(() => {
    const error = searchParams?.get('error');
    if (error) {
      switch (error) {
        case 'CredentialsSignin':
          setError('Invalid email or password.');
          break;
        case 'OAuthSignin':
          setError('Error occurred during OAuth sign in.');
          break;
        case 'OAuthCallback':
          setError('Error occurred in OAuth callback.');
          break;
        case 'OAuthCreateAccount':
          setError('Could not create OAuth account.');
          break;
        case 'EmailCreateAccount':
          setError('Could not create email account.');
          break;
        case 'Callback':
          setError('Error occurred in callback.');
          break;
        case 'OAuthAccountNotLinked':
          setError('OAuth account is not linked to any user.');
          break;
        case 'EmailSignin':
          setError('Check your email for sign in link.');
          break;
        case 'CredentialsSignup':
          setError('Registration failed.');
          break;
        case 'SessionRequired':
          setError('Please sign in to access this page.');
          break;
        default:
          setError('An error occurred during sign in. Please try again.');
          break;
      }
    }
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h1>Welcome to <span className={styles.brandName}>HyperFlix</span></h1>
          <p>Sign in to your account to continue</p>
        </div>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
              required
            />
          </div>

          <div className={styles.forgotPassword}>
            <Link href="/auth/reset-password">Forgot password?</Link>
          </div>
          
          <button
            type="submit"
            className={styles.signInButton}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className={styles.divider}>
          <span>or continue with</span>
        </div>
        
        <div className={styles.socialButtons}>
          <button 
            className={`${styles.socialButton} ${styles.googleButton}`}
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <FaGoogle />
            <span>Sign in with Google</span>
          </button>
          
          <button 
            className={`${styles.socialButton} ${styles.twitterButton}`}
            onClick={handleTwitterSignIn}
            disabled={loading || true}
          >
            <FaTwitter />
            <span>Twitter Coming Soon</span>
          </button>
          
          <button 
            className={`${styles.socialButton} ${styles.tiktokButton}`}
            onClick={handleTikTokSignIn}
            disabled={loading}
          >
            <SiTiktok />
            <span>Sign in with TikTok</span>
          </button>
        </div>
        
        <div className={styles.divider}>
          <span>or connect your wallet</span>
        </div>
        
        <WalletSignIn callbackUrl={callbackUrl} className={styles.walletSection} />
        
        <div className={styles.signup}>
          Don't have an account? <Link href="/auth/signup">Sign up</Link>
        </div>
      </div>
      
      <div className={styles.bannerContainer}>
        <div className={styles.bannerContent}>
          <h2>Boost Your Memecoin Marketing</h2>
          <p>HyperFlix gives you the power to create viral marketing campaigns</p>
          <ul className={styles.featureList}>
            <li>AI-powered content generation</li>
            <li>Multi-platform distribution</li>
            <li>Advanced analytics & tracking</li>
            <li>24/7 support team</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 