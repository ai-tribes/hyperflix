"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Hero.module.css'
import { useAuth } from '@/contexts/AuthContext'

const Hero = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.gradientOrb} style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }} />
        <div className={styles.gridPattern} />
      </div>
      
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🚀</span>
            <span>AI-Powered Viral Marketing</span>
          </div>
          
          <h1 className={`${styles.heroTitle} ${isGlitching ? styles.glitch : ''}`}>
            <span className={`gradient-text ${styles.glitchText}`} data-text="Unleash Viral">Unleash Viral</span>
            <br />
            <span className={`${styles.heroTitleMain} ${styles.glitchText}`} data-text="TikTok Dominance">TikTok Dominance</span>
          </h1>
          
          <p className={styles.heroDescription}>
            Transform your memecoin into the next billion-dollar sensation. 
            Our AI creates hypnotic content that makes holders multiply and prices explode.
          </p>
          
          <div className={styles.heroButtons}>
            {isAuthenticated ? (
              <>
                <Link href="/create" className="btn btn-accent">
                  <span>Launch Viral Campaign</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <a href="#" className="btn btn-outline">Get $FLIX Power</a>
              </>
            ) : (
              <>
                <Link href="/auth/signup" className="btn btn-accent">
                  <span>Start Free Trial</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <a href="#demo" className="btn btn-outline">Watch Demo</a>
              </>
            )}
          </div>
          
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                <span className={styles.statValue}>2.3M</span>
                <span className={styles.statChange}>+127%</span>
              </div>
              <p className={styles.statLabel}>Viral Videos</p>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                <span className={styles.statValue}>$847M</span>
                <span className={styles.statChange}>+892%</span>
              </div>
              <p className={styles.statLabel}>Market Cap Added</p>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                <span className={styles.statValue}>15 sec</span>
                <span className={styles.statBadge}>RECORD</span>
              </div>
              <p className={styles.statLabel}>To First Million Views</p>
            </div>
          </div>
          
          <div className={styles.trustedBy}>
            <p>Trusted by top projects</p>
            <div className={styles.trustedLogos}>
              {['PEPE', 'SHIB', 'DOGE', 'FLOKI', 'WOJAK'].map((name) => (
                <div key={name} className={styles.trustedLogo}>{name}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 