"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import styles from './account.module.css';

export default function Account() {
  const { user, updateProfile, logout } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile({ displayName });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Update profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (!user) {
    return <div className={styles.loading}>Loading account information...</div>;
  }

  return (
    <div className={styles.accountContainer}>
      <h1 className={styles.accountTitle}>Account Settings</h1>
      
      <div className={styles.accountGrid}>
        <div className={styles.profileSection}>
          <h2>Profile Information</h2>
          
          {success && <div className={styles.successMessage}>{success}</div>}
          {error && <div className={styles.errorMessage}>{error}</div>}
          
          <form onSubmit={handleUpdateProfile} className={styles.profileForm}>
            <div className={styles.formGroup}>
              <label htmlFor="displayName">Display Name</label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={user.email || ''}
                disabled
                className={`${styles.input} ${styles.disabled}`}
              />
              <p className={styles.fieldNote}>Email cannot be changed</p>
            </div>
            
            <button 
              type="submit" 
              className={styles.updateButton}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
        
        <div className={styles.subscriptionSection}>
          <h2>Subscription</h2>
          
          <div className={styles.subscriptionCard}>
            <div className={styles.subscriptionHeader}>
              <h3>Current Plan</h3>
              <span className={styles.planBadge}>Free Trial</span>
            </div>
            
            <div className={styles.subscriptionDetails}>
              <p>Your free trial ends in 7 days</p>
              <p>50 videos remaining this month</p>
            </div>
            
            <Link href="/pricing" className={styles.upgradeButton}>
              Upgrade Plan
            </Link>
          </div>
        </div>
        
        <div className={styles.securitySection}>
          <h2>Security</h2>
          
          <div className={styles.securityCard}>
            <div className={styles.securityOption}>
              <h3>Password</h3>
              <p>Last changed: Never</p>
              <Link href="/account/change-password" className={styles.securityButton}>
                Change Password
              </Link>
            </div>
            
            <div className={styles.securityOption}>
              <h3>Two-Factor Authentication</h3>
              <p>Status: Not Enabled</p>
              <Link href="/account/two-factor" className={styles.securityButton}>
                Enable 2FA
              </Link>
            </div>
          </div>
        </div>
        
        <div className={styles.dangerSection}>
          <h2>Danger Zone</h2>
          
          <div className={styles.dangerCard}>
            <div className={styles.dangerOption}>
              <h3>Log Out</h3>
              <p>Log out from all devices</p>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Log Out
              </button>
            </div>
            
            <div className={styles.dangerOption}>
              <h3>Delete Account</h3>
              <p>Permanently delete your account and all data</p>
              <Link href="/account/delete" className={styles.deleteButton}>
                Delete Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 