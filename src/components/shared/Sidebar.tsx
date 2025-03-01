import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  
  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.logo}>Hyper-<span>Flix</span></Link>
          <button className={styles.closeButton} onClick={toggleSidebar} aria-label="Close sidebar">
            ×
          </button>
        </div>
        
        <nav className={styles.sidebarNav}>
          <ul>
            <li>
              <Link 
                href="/dashboard" 
                className={pathname === '/dashboard' ? styles.active : styles.navLink}
              >
                <span className={styles.icon}>📊</span>
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/create" 
                className={pathname === '/create' ? styles.active : styles.navLink}
              >
                <span className={styles.icon}>🎬</span>
                Create UGC Content
              </Link>
            </li>
            <li>
              <Link 
                href="/videos" 
                className={pathname === '/videos' ? styles.active : styles.navLink}
              >
                <span className={styles.icon}>🎥</span>
                Videos
              </Link>
            </li>
            <li>
              <a href="#tokens">
                <span className={styles.icon}>🪙</span>
                Tokens
              </a>
            </li>
            <li>
              <a href="#audios">
                <span className={styles.icon}>🎵</span>
                Audios
              </a>
            </li>
            <li>
              <a href="#lipsync">
                <span className={styles.icon}>🗣️</span>
                Lip Sync
                <span className={styles.new}>New!</span>
              </a>
            </li>
            <li>
              <a href="#account">
                <span className={styles.icon}>👤</span>
                Account
              </a>
            </li>
            <li>
              <a href="#support">
                <span className={styles.icon}>💬</span>
                Support
              </a>
            </li>
          </ul>
        </nav>
        
        <div className={styles.sidebarFooter}>
          <a href="#pricing" className={styles.pricingButton}>View Pricing</a>
          <p className={styles.versionInfo}>v0.1.0</p>
        </div>
      </div>
      
      {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar; 