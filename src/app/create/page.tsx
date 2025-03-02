"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './create.module.css';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function Create() {
  const { user, loading } = useAuth();

  // If still loading authentication state, show spinner
  if (loading) {
    return <LoadingSpinner />;
  }

  // If user is not authenticated, they should be redirected by middleware
  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.createPage}>
      <h1>Create Content</h1>
      <p>Welcome to the content creation page, {user?.displayName || 'User'}!</p>
      
      <div className={styles.createOptionsGrid}>
        <div className={styles.createOption}>
          <h2>TikTok Video</h2>
          <p>Create viral TikTok videos for your memecoin</p>
          <button className={styles.createButton}>Start Creating</button>
        </div>
        
        <div className={styles.createOption}>
          <h2>Lip Sync Video</h2>
          <p>Create lip sync videos with custom audio</p>
          <button className={styles.createButton}>Start Creating</button>
        </div>
        
        <div className={styles.createOption}>
          <h2>Meme Video</h2>
          <p>Create hilarious meme videos for social media</p>
          <button className={styles.createButton}>Start Creating</button>
        </div>
      </div>
    </div>
  );
} 