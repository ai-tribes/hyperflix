"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './reset-password.module.css';
import { useAuth } from '@/contexts/AuthContext';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setLoading(true);
      await resetPassword(email);
      setSuccessMessage('Password reset email sent! Check your inbox and follow the instructions.');
      setEmail('');
    } catch (err) {
      setError('Failed to send reset email. Please check if the email is correct.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h1>Reset Your Password</h1>
          <p>Enter your email address and we'll send you instructions to reset your password</p>
        </div>
        
        {error && <div className={styles.error}>{error}</div>}
        {successMessage && <div className={styles.success}>{successMessage}</div>}
        
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
          
          <button 
            type="submit" 
            className={styles.resetButton}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Instructions'}
          </button>
        </form>
        
        <div className={styles.links}>
          <Link href="/auth/signin">Back to Sign In</Link>
        </div>
      </div>
      
      <div className={styles.infoContainer}>
        <div className={styles.infoContent}>
          <h2>Password Recovery</h2>
          <p>After submitting your email:</p>
          <ol className={styles.stepsList}>
            <li>Check your email inbox for a reset link</li>
            <li>Click the link in the email</li>
            <li>Create a new secure password</li>
            <li>Sign in with your new password</li>
          </ol>
          <p className={styles.note}>
            If you don't receive the email within a few minutes, check your spam folder or try again.
          </p>
        </div>
      </div>
    </div>
  );
} 