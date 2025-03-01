"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import styles from './tokens.module.css';
import { BiSearch, BiPlus, BiSort, BiFilter, BiRefresh } from 'react-icons/bi';
import { FaEthereum, FaBitcoin, FaDollarSign, FaChartLine } from 'react-icons/fa';

// Define token interfaces
interface TokenPrice {
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  allTimeHigh: number;
}

interface TokenSocial {
  twitter: {
    followers: number;
    engagement: number;
  };
  telegram: {
    members: number;
    activity: number;
  };
  reddit: {
    members: number;
    posts24h: number;
  };
}

interface TokenData {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  network: 'ethereum' | 'bsc' | 'solana' | 'arbitrum';
  contract: string;
  category: 'animal' | 'ai' | 'game' | 'meme' | 'defi';
  launchDate: string;
  price: TokenPrice;
  social: TokenSocial;
  hype: number; // 0-100 score
}

// Mock tokens data
const mockTokens: TokenData[] = [
  {
    id: 't1',
    name: 'HyperDoge',
    symbol: 'HDOGE',
    logo: '/logos/hyperdoge.jpg',
    network: 'ethereum',
    contract: '0x7a32d74397a6732a845911a7f42fd566628897fd',
    category: 'animal',
    launchDate: '2023-11-10',
    price: {
      price: 0.00000825,
      change24h: 12.5,
      volume24h: 3500000,
      marketCap: 28000000,
      allTimeHigh: 0.00001217,
    },
    social: {
      twitter: {
        followers: 42000,
        engagement: 8.2,
      },
      telegram: {
        members: 15600,
        activity: 7.5,
      },
      reddit: {
        members: 8500,
        posts24h: 32,
      },
    },
    hype: 85,
  },
  {
    id: 't2',
    name: 'RocketMoon',
    symbol: 'RMOON',
    logo: '/logos/rocketmoon.jpg',
    network: 'bsc',
    contract: '0x8932a6d44a9c6d73e9b56a69fe93c794671e5ff5',
    category: 'meme',
    launchDate: '2023-09-25',
    price: {
      price: 0.0000452,
      change24h: -5.3,
      volume24h: 1200000,
      marketCap: 15000000,
      allTimeHigh: 0.0000912,
    },
    social: {
      twitter: {
        followers: 28500,
        engagement: 6.7,
      },
      telegram: {
        members: 9800,
        activity: 6.2,
      },
      reddit: {
        members: 3200,
        posts24h: 18,
      },
    },
    hype: 62,
  },
  {
    id: 't3',
    name: 'CryptoKitty',
    symbol: 'KITTY',
    logo: '/logos/cryptokitty.jpg',
    network: 'solana',
    contract: 'C8o15UuR63YM3YJ1gSCzbMjVM8LF4joYQJ6MVjzfGbc1',
    category: 'animal',
    launchDate: '2023-12-05',
    price: {
      price: 0.00123,
      change24h: 28.7,
      volume24h: 8900000,
      marketCap: 32000000,
      allTimeHigh: 0.00145,
    },
    social: {
      twitter: {
        followers: 65400,
        engagement: 9.3,
      },
      telegram: {
        members: 24800,
        activity: 8.9,
      },
      reddit: {
        members: 12300,
        posts24h: 56,
      },
    },
    hype: 94,
  },
  {
    id: 't4',
    name: 'AI Coin',
    symbol: 'AIC',
    logo: '/logos/aicoin.jpg',
    network: 'ethereum',
    contract: '0x4d92fc5d5ac9e4c8e869099968cdb0bef12d0f28',
    category: 'ai',
    launchDate: '2023-10-18',
    price: {
      price: 0.0325,
      change24h: -2.1,
      volume24h: 5700000,
      marketCap: 45000000,
      allTimeHigh: 0.0478,
    },
    social: {
      twitter: {
        followers: 38900,
        engagement: 7.1,
      },
      telegram: {
        members: 18200,
        activity: 6.8,
      },
      reddit: {
        members: 9600,
        posts24h: 37,
      },
    },
    hype: 78,
  },
  {
    id: 't5',
    name: 'Pepe Finance',
    symbol: 'PEPFI',
    logo: '/logos/pepe-finance.jpg',
    network: 'arbitrum',
    contract: '0xc2e9678a71e50e5aed036e00e9c5caeb1ac5987d',
    category: 'meme',
    launchDate: '2023-12-20',
    price: {
      price: 0.00000378,
      change24h: 45.2,
      volume24h: 12000000,
      marketCap: 18000000,
      allTimeHigh: 0.00000412,
    },
    social: {
      twitter: {
        followers: 72000,
        engagement: 9.8,
      },
      telegram: {
        members: 32000,
        activity: 9.2,
      },
      reddit: {
        members: 15800,
        posts24h: 92,
      },
    },
    hype: 98,
  },
];

const TokensPage = () => {
  // State for filters and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [networkFilter, setNetworkFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('hype');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter tokens based on selected criteria
  const filteredTokens = mockTokens.filter((token) => {
    // Search query filter
    const matchesSearch = 
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Network filter
    const matchesNetwork = networkFilter === 'all' || token.network === networkFilter;
    
    // Category filter
    const matchesCategory = categoryFilter === 'all' || token.category === categoryFilter;
    
    return matchesSearch && matchesNetwork && matchesCategory;
  });

  // Sort tokens
  const sortedTokens = [...filteredTokens].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'price') {
      comparison = a.price.price - b.price.price;
    } else if (sortBy === 'change') {
      comparison = a.price.change24h - b.price.change24h;
    } else if (sortBy === 'volume') {
      comparison = a.price.volume24h - b.price.volume24h;
    } else if (sortBy === 'marketCap') {
      comparison = a.price.marketCap - b.price.marketCap;
    } else if (sortBy === 'hype') {
      comparison = a.hype - b.hype;
    } else if (sortBy === 'launch') {
      comparison = new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime();
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Format currency
  const formatCurrency = (value: number, isCrypto: boolean = false) => {
    if (isCrypto) {
      if (value < 0.00001) {
        return value.toExponential(2);
      }
      return value.toFixed(value < 0.001 ? 8 : 4);
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      notation: value >= 1000000 ? 'compact' : 'standard',
    }).format(value);
  };

  // Function to get network icon
  const getNetworkIcon = (network: string) => {
    switch (network) {
      case 'ethereum': return <FaEthereum color="#627EEA" />;
      case 'bsc': return <FaBitcoin color="#F3BA2F" />;
      case 'solana': return <span style={{ color: '#00FFA3' }}>SOL</span>;
      case 'arbitrum': return <span style={{ color: '#28A0F0' }}>ARB</span>;
      default: return null;
    }
  };

  // Change sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  // Handle sort change
  const handleSortChange = (criteria: string) => {
    if (sortBy === criteria) {
      toggleSortDirection();
    } else {
      setSortBy(criteria);
      setSortDirection('desc'); // Default to descending
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.tokensPage}>
        <div className={styles.pageHeader}>
          <div>
            <h1>Memecoin Tokens</h1>
            <p>Track and analyze top memecoins for your marketing campaigns</p>
          </div>
          <button className={styles.addTokenButton}>
            <BiPlus />
            Add Token
          </button>
        </div>

        <div className={styles.filters}>
          <div className={styles.filterControls}>
            <div className={styles.searchBox}>
              <BiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search tokens by name or symbol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.filterGroup}>
              <label>Network:</label>
              <select 
                value={networkFilter} 
                onChange={(e) => setNetworkFilter(e.target.value)}
              >
                <option value="all">All Networks</option>
                <option value="ethereum">Ethereum</option>
                <option value="bsc">BSC</option>
                <option value="solana">Solana</option>
                <option value="arbitrum">Arbitrum</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Category:</label>
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="animal">Animal</option>
                <option value="meme">Meme</option>
                <option value="ai">AI</option>
                <option value="game">Game</option>
                <option value="defi">DeFi</option>
              </select>
            </div>

            <button className={styles.refreshButton}>
              <BiRefresh />
              Refresh
            </button>
          </div>
        </div>

        <div className={styles.tokensTable}>
          <div className={styles.tableHeader}>
            <div className={styles.tokenCell} onClick={() => handleSortChange('name')}>
              Token 
              {sortBy === 'name' && (
                <span className={styles.sortIcon}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </div>
            <div className={styles.priceCell} onClick={() => handleSortChange('price')}>
              Price
              {sortBy === 'price' && (
                <span className={styles.sortIcon}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </div>
            <div className={styles.changeCell} onClick={() => handleSortChange('change')}>
              24h Change
              {sortBy === 'change' && (
                <span className={styles.sortIcon}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </div>
            <div className={styles.volumeCell} onClick={() => handleSortChange('volume')}>
              Volume
              {sortBy === 'volume' && (
                <span className={styles.sortIcon}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </div>
            <div className={styles.marketCapCell} onClick={() => handleSortChange('marketCap')}>
              Market Cap
              {sortBy === 'marketCap' && (
                <span className={styles.sortIcon}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </div>
            <div className={styles.hypeScoreCell} onClick={() => handleSortChange('hype')}>
              Hype Score
              {sortBy === 'hype' && (
                <span className={styles.sortIcon}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </div>
            <div className={styles.actionsCell}>Actions</div>
          </div>

          <div className={styles.tableBody}>
            {sortedTokens.map((token) => (
              <div key={token.id} className={styles.tableRow}>
                <div className={styles.tokenCell}>
                  <div className={styles.tokenLogo}>
                    <div className={styles.logoPlaceholder}>
                      {token.symbol.slice(0, 2)}
                    </div>
                  </div>
                  <div className={styles.tokenInfo}>
                    <div className={styles.tokenName}>{token.name}</div>
                    <div className={styles.tokenSymbol}>
                      {token.symbol}
                      <span className={styles.networkIcon}>
                        {getNetworkIcon(token.network)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.priceCell}>
                  <div className={styles.mainValue}>${formatCurrency(token.price.price, true)}</div>
                  <div className={styles.subValue}>
                    ATH: ${formatCurrency(token.price.allTimeHigh, true)}
                  </div>
                </div>
                <div className={`${styles.changeCell} ${token.price.change24h >= 0 ? styles.positive : styles.negative}`}>
                  <div className={styles.mainValue}>
                    {token.price.change24h >= 0 ? '+' : ''}{token.price.change24h.toFixed(2)}%
                  </div>
                </div>
                <div className={styles.volumeCell}>
                  <div className={styles.mainValue}>{formatCurrency(token.price.volume24h)}</div>
                </div>
                <div className={styles.marketCapCell}>
                  <div className={styles.mainValue}>{formatCurrency(token.price.marketCap)}</div>
                </div>
                <div className={styles.hypeScoreCell}>
                  <div className={styles.hypeScoreBar}>
                    <div 
                      className={styles.hypeScoreFill} 
                      style={{ 
                        width: `${token.hype}%`,
                        backgroundColor: token.hype > 80 ? '#22c55e' : token.hype > 50 ? '#f59e0b' : '#ef4444'
                      }}
                    />
                  </div>
                  <div className={styles.hypeScoreValue}>{token.hype}</div>
                </div>
                <div className={styles.actionsCell}>
                  <button className={styles.actionButton}>
                    <FaChartLine />
                    Analytics
                  </button>
                  <button className={styles.actionButton}>Target</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {sortedTokens.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3>No tokens found</h3>
            <p>Try adjusting your filters or add a new token</p>
            <button className={styles.addTokenButton}>
              <BiPlus />
              Add Token
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TokensPage; 