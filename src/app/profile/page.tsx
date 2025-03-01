"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaUser, FaEnvelope, FaLock, FaSignOutAlt, FaCamera, FaLink } from 'react-icons/fa';
import styles from './profile.module.css';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TikTokConnection from './tiktok-connection';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    // Mock update for now - would be connected to Firebase
    setSuccessMessage('Profile updated successfully!');
  };
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    // Mock update for now - would be connected to Firebase
    setSuccessMessage('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };
  
  if (!user) {
    router.push('/auth/signin');
    return null;
  }

  return (
    <DashboardLayout>
      <div className={styles.profileContainer}>
        <div className={styles.header}>
          <h1>Your Profile</h1>
          <p>Manage your account settings and preferences</p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                {user.photoURL ? (
                  <Image 
                    src={user.photoURL} 
                    alt={user.displayName || 'User'} 
                    width={100} 
                    height={100} 
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <FaUser />
                  </div>
                )}
                <button className={styles.uploadButton}>
                  <FaCamera />
                </button>
              </div>
              <h3>{user.displayName || 'User'}</h3>
              <p>{user.email}</p>
            </div>
            
            <div className={styles.tabs}>
              <button 
                className={`${styles.tabButton} ${activeTab === 'profile' ? styles.active : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <FaUser />
                <span>Profile</span>
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 'security' ? styles.active : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <FaLock />
                <span>Security</span>
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 'accounts' ? styles.active : ''}`}
                onClick={() => setActiveTab('accounts')}
              >
                <FaLink />
                <span>Connected Accounts</span>
              </button>
              <button 
                className={styles.logoutButton}
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
          
          <div className={styles.mainContent}>
            {activeTab === 'profile' && (
              <div>
                <h2>Profile Settings</h2>
                
                {error && <div className={styles.error}>{error}</div>}
                {successMessage && <div className={styles.success}>{successMessage}</div>}
                
                <form onSubmit={handleProfileUpdate}>
                  <div className={styles.formGroup}>
                    <label>
                      <FaUser />
                      <span>Display Name</span>
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>
                      <FaEnvelope />
                      <span>Email</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      disabled
                    />
                    <small>Email address cannot be changed</small>
                  </div>
                  
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2>Security Settings</h2>
                
                {error && <div className={styles.error}>{error}</div>}
                {successMessage && <div className={styles.success}>{successMessage}</div>}
                
                <form onSubmit={handlePasswordChange}>
                  <div className={styles.formGroup}>
                    <label>
                      <FaLock />
                      <span>Current Password</span>
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>
                      <FaLock />
                      <span>New Password</span>
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>
                      <FaLock />
                      <span>Confirm New Password</span>
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'accounts' && (
              <div>
                <h2>Connected Accounts</h2>
                <p>Connect your social media accounts to publish content directly from HyperFlix</p>
                
                <TikTokConnection />
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 