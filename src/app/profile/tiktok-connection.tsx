"use client";

import React, { useEffect } from 'react';
import { FaTiktok, FaLink, FaUnlink, FaSync } from 'react-icons/fa';
import useTikTok from '@/hooks/useTikTok';
import styles from './profile.module.css';

export default function TikTokConnection() {
  const {
    loading,
    error,
    isConnected,
    tiktokUser,
    connectTikTok,
    disconnectTikTok,
    fetchTikTokUserInfo
  } = useTikTok();

  // Fetch TikTok user info if connected
  useEffect(() => {
    if (isConnected && !tiktokUser) {
      fetchTikTokUserInfo();
    }
  }, [isConnected, tiktokUser, fetchTikTokUserInfo]);

  return (
    <div className={styles.tiktokConnectionCard}>
      <div className={styles.tiktokHeader}>
        <FaTiktok size={24} />
        <h3>TikTok Account</h3>
      </div>
      
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}
      
      {isConnected ? (
        <div className={styles.connectedAccount}>
          {tiktokUser ? (
            <div className={styles.tiktokUserInfo}>
              {tiktokUser.avatar_url && (
                <img
                  src={tiktokUser.avatar_url}
                  alt={tiktokUser.display_name}
                  className={styles.tiktokAvatar}
                />
              )}
              <div className={styles.tiktokUserDetails}>
                <h4>{tiktokUser.display_name}</h4>
                <div className={styles.tiktokStats}>
                  <div className={styles.tiktokStat}>
                    <strong>{tiktokUser.follower_count?.toLocaleString() || 0}</strong>
                    <span>Followers</span>
                  </div>
                  <div className={styles.tiktokStat}>
                    <strong>{tiktokUser.video_count?.toLocaleString() || 0}</strong>
                    <span>Videos</span>
                  </div>
                </div>
                {tiktokUser.profile_deep_link && (
                  <a
                    href={tiktokUser.profile_deep_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.tiktokProfileLink}
                  >
                    View Profile
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.loading}>
              <FaSync className={styles.loadingIcon} />
              <p>Loading TikTok account info...</p>
            </div>
          )}
          
          <div className={styles.tiktokActions}>
            <button
              className={`${styles.tiktokButton} ${styles.disconnectButton}`}
              onClick={disconnectTikTok}
              disabled={loading}
            >
              <FaUnlink />
              {loading ? 'Disconnecting...' : 'Disconnect Account'}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.connectAccount}>
          <p>
            Connect your TikTok account to publish videos directly from HyperFlix.
            This will allow you to create and post viral content for your memecoin marketing.
          </p>
          
          <button
            className={`${styles.tiktokButton} ${styles.connectButton}`}
            onClick={connectTikTok}
            disabled={loading}
          >
            <FaLink />
            {loading ? 'Connecting...' : 'Connect TikTok Account'}
          </button>
          
          <div className={styles.tiktokPermissions}>
            <p className={styles.tiktokPermissionsTitle}>
              Permissions requested:
            </p>
            <ul className={styles.tiktokPermissionsList}>
              <li>Basic profile information</li>
              <li>Video upload capability</li>
              <li>Access to video list</li>
            </ul>
            <p className={styles.tiktokDisclaimer}>
              We will never post without your explicit permission.
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 