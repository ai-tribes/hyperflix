"use client";

// Force dynamic rendering for this client component
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import styles from './settings.module.css';

export default function SettingsPage() {
  const router = useRouter();
  const { user, signOut, signOutFromAllDevices } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !user) {
      router.push('/auth/signin?callbackUrl=/account/settings');
    }
  }, [isClient, user, router]);

  if (!isClient) {
    return null; // Return nothing during server-side rendering
  }

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess(false);

    try {
      // Simulating saving settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Successfully saved
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOutFromAllDevices = async () => {
    if (typeof window !== 'undefined' && window.confirm('Are you sure you want to sign out from all devices? You will need to sign in again on all your devices.')) {
      setIsSigningOut(true);
      setError('');
      
      try {
        await signOutFromAllDevices();
        // No need to set success state as we'll be redirected to the home page
      } catch (err: any) {
        setError(err.message || 'Failed to sign out from all devices');
        setIsSigningOut(false);
      }
    }
  };

  const handleDeleteAccount = () => {
    // In a real implementation, this would show a confirmation dialog
    // and then delete the user's account upon confirmation
    if (typeof window !== 'undefined') {
      window.alert('Account deletion is not implemented in this demo.');
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Settings</h1>
        
        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}
        
        {success && (
          <div className={styles.success}>
            <p>Settings saved successfully!</p>
          </div>
        )}
        
        <div className={styles.settingsCard}>
          <h2>Appearance</h2>
          
          <div className={styles.settingGroup}>
            <div className={styles.settingRow}>
              <div>
                <h3>Dark Mode</h3>
                <p className={styles.settingDescription}>
                  Enable dark mode for a more comfortable viewing experience in low light
                </p>
              </div>
              <label className={styles.switch}>
                <input 
                  type="checkbox" 
                  checked={darkMode} 
                  onChange={() => setDarkMode(!darkMode)}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
          
          <h2>Notifications</h2>
          
          <div className={styles.settingGroup}>
            <div className={styles.settingRow}>
              <div>
                <h3>Email Notifications</h3>
                <p className={styles.settingDescription}>
                  Receive emails about your account, new features, and updates
                </p>
              </div>
              <label className={styles.switch}>
                <input 
                  type="checkbox" 
                  checked={emailNotifications} 
                  onChange={() => setEmailNotifications(!emailNotifications)}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
          
          <button 
            className={styles.saveButton}
            onClick={handleSaveSettings}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
        
        <div className={styles.dangerZone}>
          <h2>Danger Zone</h2>
          
          <div className={styles.dangerCard}>
            <div>
              <h3>Sign Out from All Devices</h3>
              <p className={styles.dangerDescription}>
                This will sign you out from all devices where you're currently logged in
              </p>
            </div>
            <button 
              className={styles.secondaryButton}
              onClick={handleSignOutFromAllDevices}
              disabled={isSigningOut}
            >
              {isSigningOut ? 'Signing Out...' : 'Sign Out Everywhere'}
            </button>
          </div>
          
          <div className={styles.dangerCard}>
            <div>
              <h3>Delete Account</h3>
              <p className={styles.dangerDescription}>
                This will permanently delete your account and all your data
              </p>
            </div>
            <button 
              className={styles.deleteButton}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 