"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './InternalHeader.module.css';
import { useAuth } from '@/contexts/AuthContext';

const InternalHeader = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Get page title based on current route
  const getPageTitle = () => {
    if (pathname.includes('/create')) return 'Create UGC Content';
    if (pathname.includes('/dashboard')) return 'Dashboard';
    if (pathname.includes('/videos')) return 'Videos';
    if (pathname.includes('/tokens')) return 'Tokens';
    if (pathname.includes('/audios')) return 'Audios';
    if (pathname.includes('/lipsync')) return 'Lip Sync';
    if (pathname.includes('/account')) return 'Account';
    if (pathname.includes('/support')) return 'Support';
    return 'HyperFlix';
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.pageInfo}>
          <h1 className={styles.pageTitle}>{getPageTitle()}</h1>
          {pathname.includes('/create') && (
            <span className={styles.subtitle}>Generate viral TikTok content in minutes</span>
          )}
        </div>
        
        <div className={styles.headerActions}>
          <div className={styles.quickStats}>
            <span className={styles.stat}>
              <span className={styles.statLabel}>Credits:</span>
              <span className={styles.statValue}>247</span>
            </span>
            <span className={styles.stat}>
              <span className={styles.statLabel}>Plan:</span>
              <span className={styles.statValue}>Pro</span>
            </span>
          </div>

          <div className={styles.userMenu}>
            <button className={styles.notificationBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className={styles.notificationDot}></span>
            </button>

            <div className={styles.userDropdown}>
              <button className={styles.userButton}>
                <div className={styles.userAvatar}>
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className={styles.userName}>
                  {user?.email?.split('@')[0] || 'User'}
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              
              <div className={styles.dropdownMenu}>
                <Link href="/account/profile" className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  Profile
                </Link>
                <Link href="/account/settings" className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
                  </svg>
                  Settings
                </Link>
                <button onClick={handleSignOut} className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default InternalHeader;