"use client";

import React, { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/shared/Sidebar';
import styles from './protected-layout.module.css';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ProtectedRoute>
      <div className={styles.protectedLayout}>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
} 