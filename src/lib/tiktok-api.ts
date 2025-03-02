/**
 * TikTok API utility functions
 * Contains functions for interacting with the TikTok API
 */

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