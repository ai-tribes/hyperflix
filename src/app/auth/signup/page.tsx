"use client";

// Force dynamic rendering for this client component
export const dynamic = 'force-dynamic'; 
export const runtime = 'edge';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import styles from './signup.module.css';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard';
  
  const { registerWithEmail, loginWithProvider } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    try {
      setLoading(true);
      await registerWithEmail(name, email, password, callbackUrl);
      setSuccessMessage('Account created successfully! Redirecting...');
    } catch (err: any) {
      console.error('Sign up error:', err);
      
      if (err.message.includes('email-already-in-use')) {
        setError('Email is already in use. Please use a different email or sign in.');
      } else if (err.message.includes('invalid-email')) {
        setError('Invalid email address');
      } else if (err.message.includes('weak-password')) {
        setError('Password is too weak. Please use a stronger password.');
      } else {
        setError(err.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignUp = async () => {
    setError('');
    setSuccessMessage('');
    setLoading(true);
    
    try {
      await loginWithProvider('google', callbackUrl);
      setSuccessMessage('Google sign-up successful! Redirecting...');
    } catch (err: any) {
      console.error('Google sign-up error:', err);
      
      if (err.message.includes('popup-closed-by-user')) {
        console.log('User closed the popup window');
        // Don't show error for user-initiated cancellation
      } else if (err.message.includes('popup-blocked')) {
        setError('Popup was blocked by your browser. Please allow popups for this site.');
      } else if (err.message.includes('network-request-failed')) {
        setError('Network error. Please check your internet connection and try again.');
      } else if (err.message.includes('unauthorized-domain')) {
        setError('This domain is not authorized for Google authentication. Please contact support.');
      } else {
        setError('Failed to sign up with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleTwitterSignUp = async () => {
    setError('Twitter authentication is coming soon!');
  };

  const handleTikTokSignUp = async () => {
    setError('');
    setLoading(true);
    
    try {
      await loginWithProvider('tiktok', callbackUrl);
    } catch (err: any) {
      console.error('TikTok sign-up error:', err);
      setError('Failed to sign up with TikTok. Please try again.');
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
          <h1>Create your <span className={styles.brandName}>HyperFlix</span> account</h1>
          <p>Start creating viral content for your memecoin</p>
        </div>
        
        {error && <div className={styles.error}>{error}</div>}
        {successMessage && <div className={styles.success}>{successMessage}</div>}
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              disabled={loading}
              required
            />
          </div>
          
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
          
          <div className={styles.formRow}>
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
            
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                required
              />
            </div>
          </div>
          
          <div className={styles.terms}>
            By creating an account, you agree to our 
            <Link href="/terms"> Terms of Service</Link> and 
            <Link href="/privacy"> Privacy Policy</Link>
          </div>
          
          <button
            type="submit"
            className={styles.signUpButton}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className={styles.divider}>
          <span>or sign up with</span>
        </div>
        
        <div className={styles.socialButtons}>
          <button 
            className={`${styles.socialButton} ${styles.googleButton}`}
            onClick={handleGoogleSignUp}
            disabled={loading}
          >
            <FaGoogle />
            Sign up with Google
          </button>
          
          <button 
            className={`${styles.socialButton} ${styles.tiktokButton}`}
            onClick={handleTikTokSignUp}
            disabled={loading}
          >
            <SiTiktok />
            Sign up with TikTok
          </button>
          
          <button 
            className={`${styles.socialButton} ${styles.twitterButton}`}
            onClick={handleTwitterSignUp}
            disabled={loading || true}
          >
            <FaTwitter />
            Sign up with Twitter
          </button>
        </div>
        
        <div className={styles.signin}>
          Already have an account? <Link href="/auth/signin">Sign in</Link>
        </div>
      </div>
    </div>
  );
} 