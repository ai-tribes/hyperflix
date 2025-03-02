"use client";

import React from 'react';
import styles from './SkeletonNavigation.module.css';

export default function SkeletonNavigation() {
  return (
    <div className={styles.skeletonNav}>
      <div className={styles.skeletonItem} style={{ width: '80px' }}></div>
      <div className={styles.skeletonItem} style={{ width: '90px' }}></div>
      <div className={styles.skeletonItem} style={{ width: '60px' }}></div>
      <div className={styles.skeletonItem} style={{ width: '70px' }}></div>
      <div className={styles.authSkeletonItem}></div>
    </div>
  );
} 