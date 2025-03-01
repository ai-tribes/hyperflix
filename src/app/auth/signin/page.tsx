"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { FiMail } from 'react-icons/fi';
import styles from './signin.module.css';
import { useAuth } from '@/contexts/AuthContext';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/';

  const { loginWithEmail, loginWithProvider } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      await loginWithEmail(email, password);
      // Redirect is handled by the context
    } catch (err: any) {
      console.error('Login error:', err);
      
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed login attempts. Please try again later or reset your password');
      } else {
        setError(err.message || 'An error occurred during sign in');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleSocialLogin = async (provider: 'google' | 'twitter' | 'tiktok') => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Initiating ${provider} login...`);
      
      if (provider === 'google') {
        console.log('Google provider initialized with parameters: – ' + JSON.stringify({
          scopes: ['profile', 'email'],
          customParams: { prompt: 'select_account' }
        }));
        
        console.log('Attempting to sign in with google...');
        console.log('Current auth configuration: – ' + JSON.stringify({
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          apiKey: 'AIzaS...',
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
        }));
        
        // Use Next Auth's signIn method instead of Firebase directly
        const result = await signIn('google', { 
          callbackUrl,
          redirect: false 
        });
        
        console.log('Successfully signed in with google – "bhWrMZvP6PZyV01qDbaVIA674LI2"');
        console.log('google login process completed');
        
        if (result?.error) {
          throw new Error(result.error);
        } else if (result?.url) {
          router.push(result.url);
        }
      } else {
        // For other providers, continue using Firebase
        await loginWithProvider(provider);
      }
      
      console.log(`${provider} login process completed`);
    } catch (err: any) {
      console.error(`Social login error (${provider}):`, err);
      
      // Display more specific error messages based on the error type
      if (err.code === 'auth/popup-closed-by-user') {
        setError(`Sign-in window was closed. Please try again.`);
      } else if (err.code === 'auth/popup-blocked') {
        setError(`Sign-in popup was blocked. Please allow popups for this site.`);
      } else if (err.code === 'auth/unauthorized-domain') {
        setError(`This website is not authorized for authentication. Please contact support.`);
      } else if (err.code === 'auth/cancelled-popup-request') {
        setError(`Sign-in was cancelled. Please try again.`);
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        setError(`An account already exists with the same email. Try another sign-in method.`);
      } else if (err.code === 'auth/network-request-failed') {
        setError(`Network error. Please check your internet connection and try again.`);
      } else {
        setError(`Failed to sign in with ${provider}. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Twitter login
  const handleTwitterSignIn = async () => {
    try {
      await signIn('twitter', { callbackUrl });
    } catch (error) {
      console.error('Error during Twitter sign in:', error);
      setError('Failed to sign in with Twitter. Please try again.');
    }
  };

  // Handle TikTok login
  const handleTikTokSignIn = async () => {
    try {
      await signIn('tiktok', { callbackUrl });
    } catch (error) {
      console.error('Error during TikTok sign in:', error);
      setError('Failed to sign in with TikTok. Please try again.');
    }
  };

  // Clear error on component mount
  useEffect(() => {
    const error = searchParams?.get('error');
    if (error) {
      switch (error) {
        case 'CredentialsSignin':
          setError('Invalid email or password.');
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
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
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
              placeholder="••••••••"
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
            onClick={() => handleSocialLogin('google')}
            disabled={loading}
          >
            <FaGoogle />
            Sign in with Google
          </button>
          
          <button 
            className={`${styles.socialButton} ${styles.twitterButton}`}
            onClick={() => handleSocialLogin('twitter')}
            disabled={loading}
          >
            <FaTwitter />
            Sign in with Twitter
          </button>
          
          <button 
            className={`${styles.socialButton} ${styles.tiktokButton}`}
            onClick={() => handleSocialLogin('tiktok')}
            disabled={loading}
          >
            <SiTiktok />
            Sign in with TikTok
          </button>
        </div>
        
        <div className={styles.signup}>
          Don't have an account? <Link href="/auth/signup">Sign up</Link>
        </div>
      </div>
      
      <div className={styles.bannerContainer}>
        <div className={styles.bannerContent}>
          <h2>Boost Your Memecoin Marketing</h2>
          <p>HyperFlix helps you create viral TikTok content that gets results</p>
          <ul className={styles.featureList}>
            <li>AI-powered content generator</li>
            <li>Advanced analytics dashboard</li>
            <li>One-click deployment to multiple platforms</li>
            <li>Campaign performance tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 