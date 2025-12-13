import React from 'react';
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
          <Link href="/" className={styles.logo}>
            <span className={styles.brandIcon}>HF</span>
            <span className={styles.brandText}>HyperFlix</span>
          </Link>
          <button className={styles.closeButton} onClick={toggleSidebar} aria-label="Close sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
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
              <Link 
                href="/tokens" 
                className={pathname === '/tokens' ? styles.active : styles.navLink}
              >
                <span className={styles.icon}>🪙</span>
                Tokens
              </Link>
            </li>
            <li>
              <Link href="/audios" className={pathname === '/audios' ? styles.active : styles.navLink}>
                <span className={styles.icon}>🎵</span>
                Audios
              </Link>
            </li>
            <li>
              <Link href="/lipsync" className={pathname === '/lipsync' ? styles.active : styles.navLink}>
                <span className={styles.icon}>🗣️</span>
                Lip Sync
                <span className={styles.new}>New!</span>
              </Link>
            </li>
            <li className={styles.dropdownItem}>
              <div className={styles.dropdownHeader}>
                <span className={styles.icon}>👤</span>
                Account
              </div>
              <div className={styles.dropdownContent}>
                <Link 
                  href="/account/profile" 
                  className={pathname === '/account/profile' ? styles.active : styles.navLink}
                >
                  Profile
                </Link>
                <Link 
                  href="/account/subscription" 
                  className={pathname === '/account/subscription' ? styles.active : styles.navLink}
                >
                  Subscription
                </Link>
                <Link 
                  href="/account/settings" 
                  className={pathname === '/account/settings' ? styles.active : styles.navLink}
                >
                  Settings
                </Link>
              </div>
            </li>
            <li>
              <Link href="/support" className={pathname === '/support' ? styles.active : styles.navLink}>
                <span className={styles.icon}>💬</span>
                Support
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className={styles.sidebarFooter}>
          <Link href="/pricing" className={styles.pricingButton}>View Pricing</Link>
          <p className={styles.versionInfo}>v0.1.0</p>
        </div>
      </div>
      
      {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar; 