"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import styles from './profile.module.css';

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
      setPhotoURL(user.image || '');
    }
  }, [user]);

  if (!user) {
    router.push('/auth/signin?callbackUrl=/account/profile');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      // Update profile logic here
      await updateProfile({ displayName: name, photoURL });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating your profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Your Profile</h1>
        
        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}
        
        {success && (
          <div className={styles.success}>
            <p>Profile updated successfully!</p>
          </div>
        )}
        
        <div className={styles.profileCard}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {photoURL ? (
                <img src={photoURL} alt={name || 'User'} />
              ) : (
                <div className={styles.defaultAvatar}>
                  {name ? name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
            </div>
            <button className={styles.changeAvatarButton}>
              Change Avatar
            </button>
          </div>
          
          <div className={styles.profileForm}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  placeholder="Your email"
                />
                <p className={styles.helpText}>Email cannot be changed</p>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="photoUrl">Profile Photo URL</label>
                <input
                  id="photoUrl"
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/your-photo.jpg"
                />
                <p className={styles.helpText}>Enter a URL to an image</p>
              </div>
              
              <button 
                type="submit" 
                className={styles.saveButton}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 