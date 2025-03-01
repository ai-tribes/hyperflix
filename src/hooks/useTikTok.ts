"use client";

import { useSession, signIn } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { getTikTokUserInfo, getTikTokVideos, isTikTokTokenValid, refreshTikTokToken } from "@/lib/tiktok-api";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Hook for TikTok integration
 * Provides methods to connect with TikTok, fetch user info, and manage videos
 */
export default function useTikTok() {
  const { data: session, update } = useSession();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tiktokUser, setTiktokUser] = useState<any | null>(null);
  const [videos, setVideos] = useState<any[]>([]);

  // Check if the user is connected to TikTok
  const isConnected = !!session?.tiktok?.accessToken;

  // Initialize TikTok connection on mount if connected
  useEffect(() => {
    if (isConnected) {
      fetchTikTokUserInfo();
    }
  }, [isConnected]);

  // Handle TikTok connection
  const connectTikTok = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await signIn("tiktok", { callbackUrl: window.location.href });
    } catch (err: any) {
      setError(err.message || "Failed to connect TikTok account");
      console.error("TikTok connection error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch TikTok user info
  const fetchTikTokUserInfo = useCallback(async () => {
    if (!isConnected || !session?.tiktok) {
      setError("Not connected to TikTok");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Check if token is valid, refresh if needed
      if (!isTikTokTokenValid(session.tiktok.accessToken, session.tiktok.expiresAt)) {
        if (!session.tiktok.refreshToken) {
          throw new Error("TikTok session expired. Please reconnect.");
        }

        // Refresh token
        const newTokens = await refreshTikTokToken(session.tiktok.refreshToken);
        // Update session with new tokens
        await update({
          tiktok: newTokens
        });
      }

      const userInfo = await getTikTokUserInfo(session.tiktok.accessToken);
      setTiktokUser(userInfo);
    } catch (err: any) {
      setError(err.message || "Failed to fetch TikTok user info");
      console.error("TikTok user info error:", err);
    } finally {
      setLoading(false);
    }
  }, [session, isConnected, update]);

  // Fetch user's TikTok videos
  const fetchVideos = useCallback(async () => {
    if (!isConnected || !session?.tiktok) {
      setError("Not connected to TikTok");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Check if token is valid, refresh if needed
      if (!isTikTokTokenValid(session.tiktok.accessToken, session.tiktok.expiresAt)) {
        if (!session.tiktok.refreshToken) {
          throw new Error("TikTok session expired. Please reconnect.");
        }

        // Refresh token
        const newTokens = await refreshTikTokToken(session.tiktok.refreshToken);
        // Update session with new tokens
        await update({
          tiktok: newTokens
        });
      }

      const videos = await getTikTokVideos(session.tiktok.accessToken);
      setVideos(videos || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch TikTok videos");
      console.error("TikTok videos error:", err);
    } finally {
      setLoading(false);
    }
  }, [session, isConnected, update]);

  // Disconnect TikTok account
  const disconnectTikTok = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Just update the session to remove TikTok info
      await update({ tiktok: undefined });
      setTiktokUser(null);
      setVideos([]);
    } catch (err: any) {
      setError(err.message || "Failed to disconnect TikTok account");
      console.error("TikTok disconnection error:", err);
    } finally {
      setLoading(false);
    }
  }, [update]);

  return {
    loading,
    error,
    isConnected,
    tiktokUser,
    videos,
    connectTikTok,
    disconnectTikTok,
    fetchTikTokUserInfo,
    fetchVideos,
  };
} 