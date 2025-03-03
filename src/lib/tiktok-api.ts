/**
 * TikTok API utility functions
 * Contains functions for interacting with the TikTok API
 */

import { getSession } from "next-auth/react";
import { Session } from "next-auth";

interface ExtendedSession extends Session {
  accessToken?: string;
}

interface TikTokContentResponse {
  data: {
    publish_id?: string;
    upload_url?: string;
    error?: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

interface TikTokTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  refreshExpiresAt: number;
  scope: string;
}

interface TikTokVideoMetadata {
  title?: string;
  privacy_level: 'PUBLIC' | 'SELF_ONLY';
  disable_duet?: boolean;
  disable_comment?: boolean;
  disable_stitch?: boolean;
  video_cover_timestamp_ms?: number;
}

interface TikTokResponse<T> {
  data: T;
  error?: {
    code: string;
    message: string;
  };
}

export class TikTokAPI {
  private static readonly API_BASE_URL = 'https://open.tiktokapis.com/v2';
  private readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<TikTokResponse<T>> {
    const response = await fetch(`${TikTokAPI.API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`TikTok API error: ${response.status}`);
    }

    return response.json();
  }

  async getUserInfo() {
    return this.request<{
      open_id: string;
      union_id: string;
      avatar_url: string;
      display_name: string;
    }>('/user/info/');
  }

  async getVideos(fields: string[] = ['id', 'cover_image_url', 'share_url', 'title', 'create_time']) {
    return this.request<{ videos: any[] }>('/video/list/', {
      method: 'POST',
      body: JSON.stringify({ fields }),
    });
  }

  async uploadVideo(file: File, metadata: Omit<TikTokVideoMetadata, 'privacy_level'> & { isDraft?: boolean }) {
    try {
      // Step 1: Initialize upload
      const initResponse = await this.request<{
        upload_url: string;
        publish_id: string;
      }>('/post/publish/video/init/', {
        method: 'POST',
        body: JSON.stringify({
          post_info: {
            ...metadata,
            privacy_level: metadata.isDraft ? 'SELF_ONLY' : 'PUBLIC',
          },
        }),
      });

      if (!initResponse.data.upload_url) {
        throw new Error('Failed to get upload URL');
      }

      // Step 2: Upload video
      const uploadResponse = await fetch(initResponse.data.upload_url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'video/*',
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload video');
      }

      // Step 3: Publish video
      return this.request<{
        publish_id: string;
        share_url?: string;
      }>('/post/publish/video/', {
        method: 'POST',
        body: JSON.stringify({
          publish_id: initResponse.data.publish_id,
        }),
      });
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  }

  async getVideoStatus(publishId: string) {
    return this.request<{
      status: string;
      share_url?: string;
      error_code?: string;
    }>(`/video/query/status/?publish_id=${publishId}`);
  }

  static async create(): Promise<TikTokAPI | null> {
    const session = await getSession();
    if (!session?.tiktok?.accessToken) {
      return null;
    }

    return new TikTokAPI(session.tiktok.accessToken);
  }
}

/**
 * Get user information from TikTok
 * @param accessToken The user's TikTok access token
 * @returns User profile information
 */
export async function getTikTokUserInfo(accessToken: string) {
  try {
    const response = await fetch('https://open.tiktokapis.com/v2/user/info/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`TikTok API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching TikTok user info:', error);
    throw error;
  }
}

/**
 * Upload a video to TikTok
 * @param accessToken The user's TikTok access token
 * @param videoData The video data to upload
 * @param caption The video caption
 * @returns The uploaded video information
 */
export async function uploadTikTokVideo(
  accessToken: string, 
  videoData: File, 
  caption: string
) {
  try {
    // Step 1: Initialize the upload
    const initResponse = await fetch('https://open.tiktokapis.com/v2/post/publish/inbox/video/init/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_info: {
          title: caption,
          privacy_level: 'PUBLIC_TO_EVERYONE',
          disable_duet: false,
          disable_comment: false,
          disable_stitch: false,
        },
        source_info: {
          source: 'PULL_FROM_URL',
          video_size: videoData.size,
          chunk_size: 0, // Not using chunked upload
        },
      }),
    });
    
    if (!initResponse.ok) {
      throw new Error(`TikTok API error during upload initialization: ${initResponse.status}`);
    }
    
    const initData = await initResponse.json();
    const { publish_id, upload_url } = initData.data;
    
    // Step 2: Upload the video
    const formData = new FormData();
    formData.append('video', videoData);
    
    const uploadResponse = await fetch(upload_url, {
      method: 'POST',
      body: formData,
    });
    
    if (!uploadResponse.ok) {
      throw new Error(`TikTok API error during video upload: ${uploadResponse.status}`);
    }
    
    // Step 3: Complete the upload
    const completeResponse = await fetch('https://open.tiktokapis.com/v2/post/publish/inbox/video/complete/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        publish_id,
        upload_result: 'UPLOAD_RESULT_SUCCESS',
      }),
    });
    
    if (!completeResponse.ok) {
      throw new Error(`TikTok API error during upload completion: ${completeResponse.status}`);
    }
    
    const completeData = await completeResponse.json();
    return completeData.data;
  } catch (error) {
    console.error('Error uploading video to TikTok:', error);
    throw error;
  }
}

/**
 * Get user's TikTok videos
 * @param accessToken The user's TikTok access token
 * @param fields Optional fields to include
 * @returns List of user's videos
 */
export async function getTikTokVideos(
  accessToken: string,
  fields: string[] = ['id', 'cover_image_url', 'share_url', 'title', 'create_time', 'like_count', 'comment_count', 'share_count', 'view_count']
) {
  try {
    const response = await fetch('https://open.tiktokapis.com/v2/video/list/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: fields,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`TikTok API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data.videos;
  } catch (error) {
    console.error('Error fetching TikTok videos:', error);
    throw error;
  }
}

/**
 * Check if a TikTok access token is valid and not expired
 * @param accessToken The TikTok access token to check
 * @param expiresAt The token expiration timestamp
 * @returns Boolean indicating if the token is valid
 */
export function isTikTokTokenValid(accessToken: string | undefined, expiresAt: number | undefined): boolean {
  if (!accessToken || !expiresAt) {
    return false;
  }
  
  // Check if token is expired (with 5 minute buffer)
  return Date.now() < expiresAt - 300000;
}

/**
 * Refresh a TikTok access token
 * @param refreshToken The refresh token
 * @returns New access token and refresh token
 */
export async function refreshTikTokToken(refreshToken: string) {
  try {
    const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_key: process.env.TIKTOK_CLIENT_KEY || '',
        client_secret: process.env.TIKTOK_CLIENT_SECRET || '',
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`TikTok API error during token refresh: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + data.expires_in * 1000,
    };
  } catch (error) {
    console.error('Error refreshing TikTok token:', error);
    throw error;
  }
}

export async function createTikTokContentAPI(file: File, isDraft: boolean = false) {
  try {
    const session = await getSession() as ExtendedSession;
    if (!session?.accessToken) {
      throw new Error("No access token found");
    }

    // Step 1: Create video
    const createResponse = await fetch("https://open.tiktokapis.com/v2/post/publish/video/init/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_info: {
          title: file.name,
          privacy_level: isDraft ? "SELF_ONLY" : "PUBLIC",
          disable_duet: false,
          disable_comment: false,
          disable_stitch: false,
        },
      }),
    });

    const createData = (await createResponse.json()) as TikTokContentResponse;
    if (!createData.data.upload_url) {
      throw new Error(createData.error?.message || "Failed to get upload URL");
    }

    // Step 2: Upload video
    const uploadResponse = await fetch(createData.data.upload_url, {
      method: "PUT",
      headers: {
        "Content-Type": "video/*",
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload video");
    }

    // Step 3: Publish video
    const publishResponse = await fetch("https://open.tiktokapis.com/v2/post/publish/video/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publish_id: createData.data.publish_id,
      }),
    });

    const publishData = (await publishResponse.json()) as TikTokContentResponse;
    if (publishData.error) {
      throw new Error(publishData.error.message);
    }

    return publishData;
  } catch (error) {
    console.error("Error uploading video to TikTok:", error);
    throw error;
  }
} 