"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'
import { useAuth } from '@/contexts/AuthContext'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  
  // Check if we're on the landing page
  const isLandingPage = pathname === '/';

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await logout();
      setMobileMenuOpen(false); // Close mobile menu after sign out
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Don't show navigation links during authentication loading
  // This prevents the flicker between unauthenticated and authenticated states
  if (loading) {
    return (
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContainer}>
            <Link href="/" className={styles.logo}>Hyper-<span>Flix</span></Link>
            
            <div className={styles.tagline}>
              <span>HyperFlix - Generate Viral TikTok Content for Memecoins</span>
            </div>
            
            {/* Empty space where navigation would be */}
            <div className={styles.navigation}>
              {/* Show nothing during loading */}
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Simple navigation links setup - only render once loading is complete
  const getNavLinks = () => {
    // If we're on the landing page, show minimal navigation
    if (isLandingPage) {
      return (
        <>
          <li><Link href="/pricing">Pricing</Link></li>
          {user ? (
            // For authenticated users, show create content link and sign out
            <>
              <li className={styles.ctaButton}><Link href="/create">Create Content</Link></li>
              <li>
                <button 
                  onClick={handleSignOut}
                  className={styles.signOutButton}
                  aria-label="Sign out"
                >
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            // For non-authenticated users, show auth buttons
            <>
              <li className={styles.authButton}><Link href="/auth/signin">Sign In</Link></li>
              <li className={styles.ctaButton}><Link href="/auth/signup">Sign Up</Link></li>
            </>
          )}
        </>
      );
    }
    
    if (user) {
      // Authenticated user - show full navigation with sign out
      return (
        <>
          <li><Link href="/dashboard" className={pathname === '/dashboard' ? styles.active : ''}>Dashboard</Link></li>
          <li><Link href="/create" className={pathname === '/create' ? styles.active : ''}>Create UGC</Link></li>
          <li><Link href="/videos" className={pathname === '/videos' ? styles.active : ''}>Videos</Link></li>
          <li><Link href="/tokens" className={pathname === '/tokens' ? styles.active : ''}>Tokens</Link></li>
          <li><Link href="/audios" className={pathname === '/audios' ? styles.active : ''}>Audios</Link></li>
          <li><Link href="/lipsync" className={pathname === '/lipsync' ? styles.active : ''}>Lip Sync <span className={styles.new}>New!</span></Link></li>
          <li><Link href="/account/profile" className={pathname.startsWith('/account') ? styles.active : ''}>Account</Link></li>
          <li><Link href="/support" className={pathname === '/support' ? styles.active : ''}>Support</Link></li>
          <li>
            <button 
              onClick={handleSignOut}
              className={styles.signOutButton}
              aria-label="Sign out"
            >
              Sign Out
            </button>
          </li>
        </>
      );
    }
    
    // Non-authenticated user - show auth buttons and pricing
    return (
      <>
        <li><Link href="/pricing" className={pathname === '/pricing' ? styles.active : ''}>Pricing</Link></li>
        <li className={styles.authButton}><Link href="/auth/signin" className={pathname === '/auth/signin' ? styles.active : ''}>Sign In</Link></li>
        <li className={styles.ctaButton}><Link href="/auth/signup" className={pathname === '/auth/signup' ? styles.active : ''}>Sign Up</Link></li>
      </>
    );
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContainer}>
          <Link href="/" className={styles.logo}>Hyper-<span>Flix</span></Link>
          
          <div className={styles.tagline}>
            <span>HyperFlix - Generate Viral TikTok Content for Memecoins</span>
          </div>
          
          <button 
            className={styles.mobileMenuButton} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <nav className={`${styles.navigation} ${mobileMenuOpen ? styles.open : ''}`}>
            <ul className={styles.navLinks}>
              {getNavLinks()}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header 