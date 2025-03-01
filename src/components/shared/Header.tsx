import React, { useState } from 'react'
import styles from './Header.module.css'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContainer}>
          <a href="#" className={styles.logo}>Hyper-<span>Flix</span></a>
          
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
              <li><a href="#dashboard">Dashboard</a></li>
              <li><a href="#create">Create UGC</a></li>
              <li><a href="#videos">Videos</a></li>
              <li><a href="#tokens">Tokens</a></li>
              <li><a href="#audios">Audios</a></li>
              <li><a href="#lipsync">Lip Sync <span className={styles.new}>New!</span></a></li>
              <li><a href="#account">Account</a></li>
              <li><a href="#support">Support</a></li>
              <li className={styles.ctaButton}><a href="#pricing">Pricing</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 