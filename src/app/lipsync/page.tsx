"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { BiPlus, BiVideo, BiImage, BiMusic, BiMicrophone } from 'react-icons/bi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import styles from './lipsync.module.css';

// Define types
interface LipSyncItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  date: string;
  status: 'published' | 'processing' | 'draft';
  avatar: string;
}

const LipSyncPage = () => {
  // State for filters and tabs
  const [activeTab, setActiveTab] = useState('myLipSyncs');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const lipSyncItems: LipSyncItem[] = [
    {
      id: 'ls1',
      title: 'DOGE Coin News Update',
      thumbnail: '/placeholder-thumb-1.jpg',
      duration: '0:45',
      date: '2023-04-15',
      status: 'published',
      avatar: 'Crypto Expert'
    },
    {
      id: 'ls2',
      title: 'Why This New Memecoin Will 100x',
      thumbnail: '/placeholder-thumb-2.jpg',
      duration: '1:25',
      date: '2023-04-12',
      status: 'processing',
      avatar: 'Influencer'
    },
    {
      id: 'ls3',
      title: 'The Future of Meme Trading',
      thumbnail: '/placeholder-thumb-3.jpg',
      duration: '2:10',
      date: '2023-04-08',
      status: 'draft',
      avatar: 'Analyst'
    }
  ];

  // Filter lip sync items
  const filteredItems = lipSyncItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Get status badge class
  const getStatusClass = (status: LipSyncItem['status']) => {
    switch (status) {
      case 'published': return styles.statusPublished;
      case 'processing': return styles.statusProcessing;
      case 'draft': return styles.statusDraft;
      default: return '';
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.lipSyncPage}>
        <div className={styles.pageHeader}>
          <div>
            <h1>AI Lip Sync</h1>
            <p>Generate realistic lip-synced videos with AI avatars</p>
          </div>
          <Link href="/lipsync/create" className={styles.createButton}>
            <BiPlus />
            Create Lip Sync
          </Link>
        </div>
        
        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'myLipSyncs' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('myLipSyncs')}
          >
            My Lip Syncs
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'templates' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('templates')}
          >
            Templates
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'avatars' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('avatars')}
          >
            Avatars
          </button>
        </div>
        
        {activeTab === 'myLipSyncs' && (
          <>
            <div className={styles.filtersContainer}>
              <div className={styles.searchBox}>
                <input
                  type="text"
                  placeholder="Search lip syncs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              
              <div className={styles.filters}>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="processing">Processing</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
            
            <div className={styles.lipSyncGrid}>
              <div className={styles.createCard}>
                <Link href="/lipsync/create" className={styles.createCardContent}>
                  <div className={styles.createIcon}>
                    <BiPlus size={32} />
                  </div>
                  <h3>Create New Lip Sync</h3>
                  <p>Generate a new lip-synced video with AI</p>
                </Link>
              </div>
              
              {filteredItems.map(item => (
                <div key={item.id} className={styles.lipSyncCard}>
                  <div className={styles.cardThumbnail}>
                    <div className={styles.thumbnailPlaceholder}>
                      <BiVideo size={32} />
                    </div>
                    <span className={styles.duration}>{item.duration}</span>
                    <span className={`${styles.statusBadge} ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{item.title}</h3>
                    <div className={styles.cardMeta}>
                      <span className={styles.avatarName}>{item.avatar}</span>
                      <span className={styles.date}>{formatDate(item.date)}</span>
                    </div>
                  </div>
                  <div className={styles.cardActions}>
                    <button className={styles.actionButton}>
                      Edit
                    </button>
                    <button className={styles.actionButton}>
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredItems.length === 0 && (
              <div className={styles.emptyState}>
                <BiVideo size={48} />
                <h3>No lip syncs found</h3>
                <p>Create your first lip sync video or adjust your filters</p>
                <Link href="/lipsync/create" className={styles.createEmptyButton}>
                  <BiPlus />
                  Create Lip Sync
                </Link>
              </div>
            )}
          </>
        )}
        
        {activeTab === 'templates' && (
          <div className={styles.templatesSection}>
            <h2>Lip Sync Templates</h2>
            <p className={styles.sectionDescription}>
              Choose a template to get started quickly with pre-configured settings
            </p>
            
            <div className={styles.templateGrid}>
              <div className={styles.templateCard}>
                <div className={styles.templateIcon}>
                  <BiMusic size={24} />
                </div>
                <h3>Crypto News Update</h3>
                <p>Professional news update about your token</p>
                <button className={styles.useTemplateBtn}>Use Template</button>
              </div>
              
              <div className={styles.templateCard}>
                <div className={styles.templateIcon}>
                  <BiMicrophone size={24} />
                </div>
                <h3>Viral Token Review</h3>
                <p>Enthusiastic review of your memecoin</p>
                <button className={styles.useTemplateBtn}>Use Template</button>
              </div>
              
              <div className={styles.templateCard}>
                <div className={styles.templateIcon}>
                  <BiVideo size={24} />
                </div>
                <h3>Price Prediction</h3>
                <p>Exciting price prediction for your token</p>
                <button className={styles.useTemplateBtn}>Use Template</button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'avatars' && (
          <div className={styles.avatarsSection}>
            <h2>AI Avatars</h2>
            <p className={styles.sectionDescription}>
              Choose from our selection of realistic AI avatars
            </p>
            
            <div className={styles.avatarGrid}>
              <div className={styles.avatarCard}>
                <div className={styles.avatarPlaceholder}>
                  <BiImage size={32} />
                </div>
                <h3>Crypto Expert</h3>
                <p>Professional and trustworthy</p>
                <button className={styles.useAvatarBtn}>Select</button>
              </div>
              
              <div className={styles.avatarCard}>
                <div className={styles.avatarPlaceholder}>
                  <BiImage size={32} />
                </div>
                <h3>Influencer</h3>
                <p>Energetic and trendy</p>
                <button className={styles.useAvatarBtn}>Select</button>
              </div>
              
              <div className={styles.avatarCard}>
                <div className={styles.avatarPlaceholder}>
                  <BiImage size={32} />
                </div>
                <h3>Analyst</h3>
                <p>Detailed and analytical</p>
                <button className={styles.useAvatarBtn}>Select</button>
              </div>
              
              <div className={styles.avatarCard}>
                <div className={styles.avatarPlaceholder}>
                  <BiImage size={32} />
                </div>
                <h3>Enthusiast</h3>
                <p>Excited and passionate</p>
                <button className={styles.useAvatarBtn}>Select</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LipSyncPage; 