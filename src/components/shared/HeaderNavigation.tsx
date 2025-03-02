'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import SkeletonNavigation from './SkeletonNavigation';
import styles from './Header.module.css';
import { FaChevronDown } from 'react-icons/fa';

export default function HeaderNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);

  // Check if in development mode
  useEffect(() => {
    setIsDevMode(process.env.NODE_ENV === 'development');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // This will only run on the client
    console.log('HeaderNavigation: Client Component Hydrating', { 
      isAuthenticated: !!user,
      isLoading: loading,
      userType: user ? (('getIdToken' in user) ? 'Firebase User' : 'Serialized User') : 'No User'
    });
  }, [user, loading]);

  // Navigation links based on authentication status
  const getNavLinks = () => {
    if (user) {
      // Authenticated user - show full navigation
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

  if (loading) {
    return (
      <>
        <button 
          className={styles.mobileMenuButton} 
          aria-label="Toggle menu"
          disabled
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <SkeletonNavigation />
      </>
    );
  }

  const isHomePage = pathname === '/';
  const isLandingPage = isHomePage || pathname === '/pricing' || pathname.startsWith('/auth/');
  const isActive = (path: string) => pathname === path;

  return (
    <nav className={`${styles.navigation} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        {isLandingPage ? (
          <>
            <div className={styles.navLinks}>
              {isHomePage && (
                <>
                  <a href="#features" className={styles.navLink}>Features</a>
                  <a href="#platform" className={styles.navLink}>Platform</a>
                  <a href="#token" className={styles.navLink}>Token</a>
                </>
              )}
              <Link href="/pricing" className={`${styles.navLink} ${isActive('/pricing') ? styles.active : ''}`}>
                Pricing
              </Link>
              {isDevMode && (
                <Link 
                  href="/test-auth" 
                  className={`${styles.navLink} ${styles.debugLink} ${isActive('/test-auth') ? styles.active : ''}`}
                >
                  Auth Debug
                </Link>
              )}
            </div>

            <div className={styles.authButtons}>
              {loading ? (
                <div className={styles.loaderSmall} />
              ) : user ? (
                <Link href="/dashboard" className={styles.dashboardButton}>
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/auth/signin" className={`${styles.navLink} ${isActive('/auth/signin') ? styles.active : ''}`}>
                    Sign in
                  </Link>
                  <Link href="/auth/signup" className={styles.signUpButton}>
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </>
        ) : (
          <div className={styles.dashboardNav}>
            <div className={styles.userProfile}>
              {loading ? (
                <div className={styles.loaderSmall} />
              ) : user ? (
                <div className={styles.userInfo}>
                  <span>{user.displayName || user.email}</span>
                  <FaChevronDown />
                </div>
              ) : (
                <Link href="/auth/signin" className={styles.signInLink}>
                  Sign in
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Mobile menu button */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <div className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
        {isLandingPage && isHomePage && (
          <>
            <a 
              href="#features" 
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#platform" 
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Platform
            </a>
            <a 
              href="#token" 
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Token
            </a>
          </>
        )}
        
        <Link 
          href="/pricing" 
          className={styles.mobileNavLink}
          onClick={() => setMobileMenuOpen(false)}
        >
          Pricing
        </Link>
        
        {isDevMode && (
          <Link 
            href="/test-auth" 
            className={`${styles.mobileNavLink} ${styles.debugLink}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Auth Debug
          </Link>
        )}

        {!user ? (
          <>
            <Link 
              href="/auth/signin" 
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign in
            </Link>
            <Link 
              href="/auth/signup" 
              className={styles.mobileSignUpButton}
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign up
            </Link>
          </>
        ) : (
          <Link 
            href="/dashboard" 
            className={styles.mobileDashboardButton}
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
} 