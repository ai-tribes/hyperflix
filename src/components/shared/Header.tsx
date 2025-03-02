"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'
import { useAuth } from '@/contexts/AuthContext'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  
  // Determine if user is authenticated
  const isAuthenticated = !!user;

  // Function to handle logout
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
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
              {isAuthenticated ? (
                // Links for authenticated users
                <>
                  <li>
                    <Link 
                      href="/dashboard" 
                      className={pathname === '/dashboard' ? styles.active : ''}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/create" 
                      className={pathname === '/create' ? styles.active : ''}
                    >
                      Create UGC
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/videos" 
                      className={pathname === '/videos' ? styles.active : ''}
                    >
                      Videos
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/tokens" 
                      className={pathname === '/tokens' ? styles.active : ''}
                    >
                      Tokens
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/audios" 
                      className={pathname === '/audios' ? styles.active : ''}
                    >
                      Audios
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/lipsync" 
                      className={pathname === '/lipsync' ? styles.active : ''}
                    >
                      Lip Sync <span className={styles.new}>New!</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/account" 
                      className={pathname === '/account' ? styles.active : ''}
                    >
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/support" 
                      className={pathname === '/support' ? styles.active : ''}
                    >
                      Support
                    </Link>
                  </li>
                  <li>
                    <a href="#" onClick={handleLogout}>Logout</a>
                  </li>
                </>
              ) : (
                // Links for non-authenticated users
                <>
                  <li>
                    <Link 
                      href="/support" 
                      className={pathname === '/support' ? styles.active : ''}
                    >
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/pricing" 
                      className={pathname === '/pricing' ? styles.active : ''}
                    >
                      Pricing
                    </Link>
                  </li>
                  <li className={styles.ctaButton}>
                    <Link href="/auth/signin">Sign In</Link>
                  </li>
                  <li className={styles.ctaButton}>
                    <Link href="/auth/signup">Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 