"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import styles from './signin.module.css';
import { useAuth } from '@/contexts/AuthContext';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { loginWithEmail, loginWithProvider } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      await loginWithEmail(email, password);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSocialLogin = async (provider: 'google' | 'twitter') => {
    try {
      setLoading(true);
      setError('');
      await loginWithProvider(provider);
    } catch (err) {
      setError(`Failed to sign in with ${provider}. Please try again.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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