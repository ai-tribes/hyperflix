"use client";

// Force dynamic rendering for this client component
export const dynamic = 'force-dynamic'; 
export const runtime = 'edge';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaGoogle, FaTwitter, FaTiktok } from 'react-icons/fa';
import styles from '../signin/signin.module.css'; // Reuse the same styles
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { registerWithEmail, loginWithProvider } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      await registerWithEmail(name, email, password, callbackUrl);
    } catch (err: any) {
      console.error('Sign up error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Email is already in use');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    setLoading(true);
    
    try {
      await loginWithProvider('google', callbackUrl);
    } catch (err: any) {
      console.error('Google sign up error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        // User closed the popup, no need to show error
      } else if (err.code === 'auth/unauthorized-domain') {
        setError('Authentication failed. This domain is not authorized.');
      } else {
        setError('Failed to sign up with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.authTitle}>Create Account</h1>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password (min. 6 characters)"
              required
              className={styles.input}
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.authButton}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className={styles.divider}>
          <span>OR</span>
        </div>
        
        <div className={styles.socialButtons}>
          <button 
            onClick={handleGoogleSignUp} 
            className={`${styles.socialButton} ${styles.googleButton}`}
            disabled={loading}
          >
            <FaGoogle /> Sign up with Google
          </button>
          
          <button 
            className={`${styles.socialButton} ${styles.twitterButton}`}
            disabled={true}
          >
            <FaTwitter /> Twitter (Coming Soon)
          </button>
          
          <button 
            className={`${styles.socialButton} ${styles.tiktokButton}`}
            disabled={true}
          >
            <FaTiktok /> TikTok (Coming Soon)
          </button>
        </div>
        
        <div className={styles.authFooter}>
          Already have an account? <Link href={`/auth/signin${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}>Sign In</Link>
        </div>
      </div>
    </div>
  );
} 