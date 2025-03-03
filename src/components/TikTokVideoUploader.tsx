'use client';

import React, { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { TikTokAPI } from '@/lib/tiktok-api';

interface TikTokUploaderProps {
  onSuccess?: (response: any) => void;
  onError?: (error: Error) => void;
  className?: string;
}

export default function TikTokVideoUploader({ 
  onSuccess, 
  onError,
  className = ''
}: TikTokUploaderProps) {
  const { data: session } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDraft, setIsDraft] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Validate file type and size
      if (!file.type.startsWith('video/')) {
        throw new Error('Please select a video file');
      }

      // Maximum file size (500MB)
      const MAX_FILE_SIZE = 500 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        throw new Error('Video file size must be less than 500MB');
      }

      const api = await TikTokAPI.create();
      if (!api) {
        throw new Error('Failed to initialize TikTok API');
      }

      setUploadProgress(20);

      const response = await api.uploadVideo(file, {
        title: file.name.split('.')[0],
        isDraft,
        disable_comment: false,
        disable_duet: false,
        disable_stitch: false,
      });

      setUploadProgress(100);
      onSuccess?.(response);
    } catch (error) {
      console.error('Error uploading video:', error);
      onError?.(error as Error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (!session?.tiktok?.accessToken) {
    return (
      <div className="p-4 text-center bg-gray-100 rounded-lg">
        <p>Please connect your TikTok account to upload videos</p>
      </div>
    );
  }

  return (
    <div className={`p-4 border rounded-lg ${className}`}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Upload Video</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleUpload}
          disabled={isUploading}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
        />
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="isDraft"
          checked={isDraft}
          onChange={(e) => setIsDraft(e.target.checked)}
          disabled={isUploading}
          className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
        />
        <label htmlFor="isDraft" className="ml-2 block text-sm text-gray-900">
          Save as draft
        </label>
      </div>

      {isUploading && (
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-violet-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Upload progress: {uploadProgress}%
          </p>
        </div>
      )}
    </div>
  );
} 