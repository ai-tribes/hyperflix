"use client";

import React, { useState, useEffect } from 'react';
import Header from '../shared/Header';
import Sidebar from '../shared/Sidebar';
import Footer from '../shared/Footer';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Handle sidebar toggle
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle resize events to automatically show/hide sidebar
  useEffect(() => {
    setIsMounted(true);
    
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Don't render anything during SSR to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`${styles.content} ${sidebarOpen ? styles.contentWithSidebar : ''}`}>
        <Header />
        <main className={styles.main}>
          <div className={styles.mainContent}>
            {children}
          </div>
        </main>
        <div className={styles.footerWrapper}>
          <Footer />
        </div>
      </div>
      
      {/* Mobile sidebar toggle button */}
      <button
        className={styles.sidebarToggle}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  );
};

export default DashboardLayout; 