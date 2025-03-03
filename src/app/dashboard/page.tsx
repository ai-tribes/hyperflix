"use client";

import React from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className={styles.dashboardPage}>
          <div className={styles.dashboardHeader}>
            <h1>Dashboard</h1>
            <p>Welcome to Your memecoin marketing platform</p>
          </div>
          
          <div className={styles.dashboardGrid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Analytics</h2>
                <span className={styles.badge}>Last 30 days</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.statGrid}>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>0</span>
                    <span className={styles.statLabel}>Videos Created</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>0</span>
                    <span className={styles.statLabel}>Views</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>0</span>
                    <span className={styles.statLabel}>Interactions</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>0</span>
                    <span className={styles.statLabel}>Conversions</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Token Metrics</h2>
                <span className={styles.badge}>Live</span>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.emptyState}>No tokens added yet. Add your first token to track metrics.</p>
                <button className={styles.button}>Add Token</button>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Recent Videos</h2>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.emptyState}>No videos created yet. Start creating viral content for your memecoins!</p>
                <Link href="/create">
                  <button className={styles.button}>Create UGC</button>
                </Link>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Quick Actions</h2>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.actionGrid}>
                  <Link href="/create" className={styles.action}>
                    <span className={styles.actionIcon}>🎬</span>
                    <span className={styles.actionLabel}>Create UGC</span>
                  </Link>
                  <a href="#tokens" className={styles.action}>
                    <span className={styles.actionIcon}>🪙</span>
                    <span className={styles.actionLabel}>Add Token</span>
                  </a>
                  <a href="#videos" className={styles.action}>
                    <span className={styles.actionIcon}>🎥</span>
                    <span className={styles.actionLabel}>My Videos</span>
                  </a>
                  <a href="#lipsync" className={styles.action}>
                    <span className={styles.actionIcon}>🗣️</span>
                    <span className={styles.actionLabel}>Lip Sync</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 