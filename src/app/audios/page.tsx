"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { BiPlus, BiSearch, BiImport, BiMusic, BiMicrophone } from 'react-icons/bi';
import DashboardLayout from '@/components/layout/DashboardLayout';
import styles from './audios.module.css';

// Define types for audio items
interface AudioItem {
  id: string;
  title: string;
  category: 'music' | 'voiceover';
  duration: string;
  uploadDate: string;
  size: string;
  used: number;
}

const AudiosPage = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');

  // Mock audio data
  const audioItems: AudioItem[] = [
    {
      id: 'a1',
      title: 'Energetic Crypto Beat',
      category: 'music',
      duration: '2:45',
      uploadDate: '2023-04-12',
      size: '4.2 MB',
      used: 7
    },
    {
      id: 'a2',
      title: 'Professional Voiceover - Token Launch',
      category: 'voiceover',
      duration: '1:30',
      uploadDate: '2023-04-10',
      size: '1.8 MB',
      used: 3
    },
    {
      id: 'a3',
      title: 'Excitement Background',
      category: 'music',
      duration: '3:15',
      uploadDate: '2023-04-08',
      size: '5.6 MB',
      used: 2
    },
    {
      id: 'a4',
      title: 'Memecoin Explainer Voice',
      category: 'voiceover',
      duration: '2:10',
      uploadDate: '2023-04-05',
      size: '2.9 MB',
      used: 5
    },
    {
      id: 'a5',
      title: 'Trending TikTok Beat',
      category: 'music',
      duration: '0:45',
      uploadDate: '2023-04-02',
      size: '1.2 MB',
      used: 12
    }
  ];

  // Filter audio items based on search and category
  const filteredAudios = audioItems.filter(audio => {
    const matchesSearch = audio.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || audio.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Sort audio items
  const sortedAudios = [...filteredAudios].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      case 'oldest':
        return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
      case 'most-used':
        return b.used - a.used;
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <DashboardLayout>
      <div className={styles.audiosPage}>
        <div className={styles.pageHeader}>
          <div>
            <h1>Audios</h1>
            <p>Manage background music and voiceovers for your marketing videos</p>
          </div>
          <div className={styles.headerButtons}>
            <button className={styles.importButton}>
              <BiImport />
              Import Audio
            </button>
            <Link href="/audios/create" className={styles.createButton}>
              <BiPlus />
              Create Voiceover
            </Link>
          </div>
        </div>
        
        <div className={styles.filtersContainer}>
          <div className={styles.searchBox}>
            <BiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search audios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Types</option>
                <option value="music">Music</option>
                <option value="voiceover">Voiceover</option>
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <label htmlFor="sort">Sort By:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="most-used">Most Used</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className={styles.audiosList}>
          {sortedAudios.length > 0 ? (
            sortedAudios.map((audio) => (
              <div key={audio.id} className={styles.audioItem}>
                <div className={styles.audioIcon}>
                  {audio.category === 'music' ? <BiMusic size={24} /> : <BiMicrophone size={24} />}
                </div>
                <div className={styles.audioInfo}>
                  <h3>{audio.title}</h3>
                  <div className={styles.audioMeta}>
                    <span className={styles.duration}>{audio.duration}</span>
                    <span className={styles.category}>
                      {audio.category === 'music' ? 'Background Music' : 'Voiceover'}
                    </span>
                    <span className={styles.uploadDate}>{audio.uploadDate}</span>
                    <span className={styles.size}>{audio.size}</span>
                    <span className={styles.used}>Used in {audio.used} videos</span>
                  </div>
                </div>
                <div className={styles.audioControls}>
                  <button className={styles.playButton}>
                    ▶ Play
                  </button>
                  <button className={styles.useButton}>
                    Use
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <BiMusic size={48} />
              <h3>No audios found</h3>
              <p>Try adjusting your filters or add some new audio files</p>
              <div className={styles.emptyActions}>
                <button className={styles.importButton}>
                  <BiImport />
                  Import Audio
                </button>
                <Link href="/audios/create" className={styles.createButton}>
                  <BiPlus />
                  Create Voiceover
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AudiosPage; 