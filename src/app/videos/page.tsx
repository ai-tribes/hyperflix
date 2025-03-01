"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './videos.module.css';
import { BiSearch, BiGrid, BiListUl, BiPlus } from 'react-icons/bi';
import { FaTwitter, FaYoutube, FaTiktok, FaInstagram } from 'react-icons/fa';
import { BsEmojiFrown } from 'react-icons/bs';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Define types for video items
interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  date: string;
  platform: 'twitter' | 'youtube' | 'tiktok' | 'instagram';
  status: 'published' | 'processing' | 'draft';
}

// Mock data for video items
const mockVideos: VideoItem[] = [
  {
    id: 'v1',
    title: '10X Memecoin Launch Strategy That WORKS',
    thumbnail: '/thumbnails/thumb1.jpg',
    views: 12500,
    likes: 843,
    comments: 156,
    shares: 278,
    date: '2023-09-15',
    platform: 'twitter',
    status: 'published',
  },
  {
    id: 'v2',
    title: 'How I Made $50K From This ONE Memecoin',
    thumbnail: '/thumbnails/thumb2.jpg',
    views: 8700,
    likes: 623,
    comments: 94,
    shares: 187,
    date: '2023-09-12',
    platform: 'youtube',
    status: 'published',
  },
  {
    id: 'v3',
    title: 'Memecoin Marketing 101: Growth Hacking Tips',
    thumbnail: '/thumbnails/thumb3.jpg',
    views: 5400,
    likes: 412,
    comments: 67,
    shares: 128,
    date: '2023-09-10',
    platform: 'tiktok',
    status: 'processing',
  },
  {
    id: 'v4',
    title: "\"This memecoin has the CRAZIEST community I've ever seen\"",
    thumbnail: '/thumbnails/thumb4.jpg',
    views: 3200,
    likes: 215,
    comments: 42,
    shares: 76,
    date: '2023-09-08',
    platform: 'instagram',
    status: 'draft',
  },
  {
    id: 'v5',
    title: 'The Secret to Viral Memecoin Marketing',
    thumbnail: '/thumbnails/thumb5.jpg',
    views: 9800,
    likes: 710,
    comments: 133,
    shares: 254,
    date: '2023-09-05',
    platform: 'twitter',
    status: 'published',
  },
  {
    id: 'v6',
    title: 'Memecoin Launch in 3 Simple Steps',
    thumbnail: '/thumbnails/thumb6.jpg',
    views: 6500,
    likes: 478,
    comments: 89,
    shares: 167,
    date: '2023-09-02',
    platform: 'youtube',
    status: 'published',
  },
];

const VideosPage = () => {
  // State for filter and view options
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter videos based on criteria
  const filteredVideos = mockVideos.filter((video) => {
    // Search query filter
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || video.status === statusFilter;
    
    // Platform filter
    const matchesPlatform = platformFilter === 'all' || video.platform === platformFilter;
    
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  // Sort videos
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'views') {
      return b.views - a.views;
    } else if (sortBy === 'likes') {
      return b.likes - a.likes;
    } else if (sortBy === 'shares') {
      return b.shares - a.shares;
    }
    return 0;
  });

  // Function to get platform icon
  const getPlatformIcon = (platform: VideoItem['platform']) => {
    switch (platform) {
      case 'twitter': return <FaTwitter style={{ color: '#1DA1F2' }} />;
      case 'youtube': return <FaYoutube style={{ color: '#FF0000' }} />;
      case 'tiktok': return <FaTiktok style={{ color: '#000000' }} />;
      case 'instagram': return <FaInstagram style={{ color: '#E1306C' }} />;
      default: return null;
    }
  };

  // Function to get status badge class
  const getStatusClass = (status: VideoItem['status']) => {
    switch (status) {
      case 'published': return styles.statusPublished;
      case 'processing': return styles.statusProcessing;
      case 'draft': return styles.statusDraft;
      default: return '';
    }
  };

  // Function to format numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <DashboardLayout>
      <div className={styles.videosPage}>
        <div className={styles.pageHeader}>
          <div>
            <h1>Your Videos</h1>
            <p>Manage and analyze your AI-generated marketing videos</p>
          </div>
          <Link href="/create" className={styles.createButton}>
            <span><BiPlus /></span>
            Create New Video
          </Link>
        </div>

        <div className={styles.filters}>
          <div className={styles.filterControls}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}><BiSearch /></span>
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.filterGroup}>
              <label>Status:</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="published">Published</option>
                <option value="processing">Processing</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Platform:</label>
              <select 
                value={platformFilter} 
                onChange={(e) => setPlatformFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="twitter">Twitter</option>
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
                <option value="instagram">Instagram</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Sort By:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Newest</option>
                <option value="views">Most Views</option>
                <option value="likes">Most Likes</option>
                <option value="shares">Most Shares</option>
              </select>
            </div>

            <div className={styles.viewToggle}>
              <button 
                className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <BiGrid />
              </button>
              <button 
                className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
                onClick={() => setViewMode('list')}
              >
                <BiListUl />
              </button>
            </div>
          </div>
        </div>

        {sortedVideos.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}><BsEmojiFrown /></div>
            <h3>No videos found</h3>
            <p>Try adjusting your filters or create a new video</p>
            <Link href="/create" className={styles.createButton}>
              <span><BiPlus /></span>
              Create New Video
            </Link>
          </div>
        ) : viewMode === 'grid' ? (
          <div className={styles.videosGrid}>
            {sortedVideos.map((video) => (
              <div key={video.id} className={styles.videoCard}>
                <div className={styles.thumbnailContainer}>
                  {/* We'd normally use real thumbnails here */}
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: '#f0f0f0', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    color: '#777'
                  }}>
                    {video.thumbnail}
                  </div>
                  <div className={styles.videoOverlay}>
                    <span className={`${styles.statusBadge} ${getStatusClass(video.status)}`}>
                      {video.status}
                    </span>
                    <span className={styles.platformBadge}>
                      {getPlatformIcon(video.platform)}
                    </span>
                  </div>
                </div>
                <div className={styles.videoInfo}>
                  <h3 className={styles.videoTitle}>{video.title}</h3>
                  <div className={styles.videoStats}>
                    <span>
                      <strong>{formatNumber(video.views)}</strong>
                      Views
                    </span>
                    <span>
                      <strong>{formatNumber(video.likes)}</strong>
                      Likes
                    </span>
                    <span>
                      <strong>{formatNumber(video.comments)}</strong>
                      Comments
                    </span>
                    <span>
                      <strong>{formatNumber(video.shares)}</strong>
                      Shares
                    </span>
                  </div>
                  <div className={styles.videoDate}>{new Date(video.date).toLocaleDateString()}</div>
                  <div className={styles.videoActions}>
                    <button className={styles.actionButton}>Edit</button>
                    <button className={styles.actionButton}>Share</button>
                    <button className={styles.actionButton}>Analytics</button>
                    <button className={styles.actionButtonDanger}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.videosList}>
            {sortedVideos.map((video) => (
              <div key={video.id} className={styles.videoRow}>
                <div className={styles.thumbnailContainer}>
                  {/* We'd normally use real thumbnails here */}
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: '#f0f0f0', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    color: '#777'
                  }}>
                    {video.thumbnail}
                  </div>
                  <div className={styles.videoOverlay}>
                    <span className={`${styles.statusBadge} ${getStatusClass(video.status)}`}>
                      {video.status}
                    </span>
                    <span className={styles.platformBadge}>
                      {getPlatformIcon(video.platform)}
                    </span>
                  </div>
                </div>
                <div className={styles.videoInfo}>
                  <h3 className={styles.videoTitle}>{video.title}</h3>
                  <div className={styles.videoStats}>
                    <span>
                      <strong>{formatNumber(video.views)}</strong>
                      Views
                    </span>
                    <span>
                      <strong>{formatNumber(video.likes)}</strong>
                      Likes
                    </span>
                    <span>
                      <strong>{formatNumber(video.comments)}</strong>
                      Comments
                    </span>
                    <span>
                      <strong>{formatNumber(video.shares)}</strong>
                      Shares
                    </span>
                  </div>
                  <div className={styles.videoDate}>{new Date(video.date).toLocaleDateString()}</div>
                  <div className={styles.videoActions}>
                    <button className={styles.actionButton}>Edit</button>
                    <button className={styles.actionButton}>Share</button>
                    <button className={styles.actionButton}>Analytics</button>
                    <button className={styles.actionButtonDanger}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VideosPage; 