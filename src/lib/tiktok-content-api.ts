import { getSession } from 'next-auth/react';

interface TikTokVideoMetadata {
  title?: string;
  privacy_level: 'PRIVATE_DRAFT' | 'PUBLIC';
  disable_duet?: boolean;
  disable_comment?: boolean;
  disable_stitch?: boolean;
  video_cover_timestamp_ms?: number;
}

interface InitUploadResponse {
  data: {
    upload_url: string;
    access_key: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

interface PublishResponse {
  data: {
    publish_id: string;
    share_url?: string;
    video_id?: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

export class TikTokContentAPI {
  private static readonly API_BASE_URL = 'https://open.tiktokapis.com/v2';
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * Initialize video upload and get upload URL
   */
  private async initializeUpload(): Promise<InitUploadResponse> {
    const response = await fetch(`${TikTokContentAPI.API_BASE_URL}/video/upload/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  }

  /**
   * Upload video file to TikTok
   */
  private async uploadVideo(uploadUrl: string, videoFile: File): Promise<boolean> {
    try {
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'video/mp4',
        },
        body: videoFile,
      });

      return response.ok;
    } catch (error) {
      console.error('Error uploading video to TikTok:', error);
      return false;
    }
  }

  /**
   * Publish the uploaded video
   */
  private async publishVideo(
    accessKey: string,
    metadata: TikTokVideoMetadata
  ): Promise<PublishResponse> {
    const response = await fetch(`${TikTokContentAPI.API_BASE_URL}/video/publish/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        ...metadata,
      }),
    });

    return response.json();
  }

  /**
   * Upload and publish a video to TikTok
   * @param videoFile The video file to upload
   * @param metadata Video metadata including privacy settings
   * @returns The response from TikTok including share_url if public
   */
  async postVideo(
    videoFile: File,
    metadata: Omit<TikTokVideoMetadata, 'privacy_level'> & { isDraft?: boolean }
  ): Promise<PublishResponse> {
    try {
      // Initialize upload
      const initResponse = await this.initializeUpload();
      if (initResponse.error) {
        throw new Error(initResponse.error.message);
      }

      // Upload the video
      const uploadSuccess = await this.uploadVideo(
        initResponse.data.upload_url,
        videoFile
      );
      if (!uploadSuccess) {
        throw new Error('Failed to upload video');
      }

      // Publish the video
      const publishResponse = await this.publishVideo(
        initResponse.data.access_key,
        {
          ...metadata,
          privacy_level: metadata.isDraft ? 'PRIVATE_DRAFT' : 'PUBLIC',
        }
      );

      return publishResponse;
    } catch (error) {
      console.error('Error in TikTok video posting process:', error);
      return {
        error: {
          code: 'POSTING_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
        },
        data: {
          publish_id: '',
        },
      };
    }
  }

  /**
   * Get the status of a published video
   * @param publishId The ID received from the publish response
   */
  async getVideoStatus(publishId: string) {
    const response = await fetch(
      `${TikTokContentAPI.API_BASE_URL}/video/query/status/?publish_id=${publishId}`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      }
    );

    return response.json();
  }
}

/**
 * Create a TikTok Content API instance from the current session
 */
export async function createTikTokContentAPI(): Promise<TikTokContentAPI | null> {
  const session = await getSession();
  if (!session?.tiktok?.accessToken) {
    return null;
  }

  return new TikTokContentAPI(session.tiktok.accessToken);
} 