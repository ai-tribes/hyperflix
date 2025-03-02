"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './dashboard.module.css';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function Dashboard() {
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
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.welcomeCard}>
        <h2>Welcome, {user?.displayName || 'User'}!</h2>
        <p>This is your HyperFlix dashboard where you can manage your content and account.</p>
      </div>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Videos Created</h3>
          <p className={styles.statValue}>0</p>
        </div>
        <div className={styles.statCard}>
          <h3>Tokens Remaining</h3>
          <p className={styles.statValue}>100</p>
        </div>
        <div className={styles.statCard}>
          <h3>Account Status</h3>
          <p className={styles.statValue}>Active</p>
        </div>
      </div>
      
      <div className={styles.actionsSection}>
        <h2>Quick Actions</h2>
        <div className={styles.actionButtons}>
          <button className={styles.actionButton}>Create New Video</button>
          <button className={styles.actionButton}>Browse Templates</button>
          <button className={styles.actionButton}>Upload Audio</button>
        </div>
      </div>
    </div>
  );
} 