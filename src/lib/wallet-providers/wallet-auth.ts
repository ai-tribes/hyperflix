import { ethers } from 'ethers';

export interface WalletSignInData {
  address: string;
  signature: string;
  message: string;
  chainId?: number;
  walletType: 'metamask' | 'phantom' | 'handcash';
}

export interface WalletUser {
  id: string;
  address: string;
  walletType: string;
  chainId?: number;
  name: string;
  image: string;
}

// Generate a message for wallet signing
export function generateWalletSignMessage(address: string): string {
  const timestamp = Date.now();
  return `Sign this message to authenticate with HyperFlix.\n\nAddress: ${address}\nTimestamp: ${timestamp}\n\nThis request will not trigger a blockchain transaction or cost any gas fees.`;
}

// Verify wallet signature
export async function verifyWalletSignature(
  address: string,
  signature: string,
  message: string
): Promise<boolean> {
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === address.toLowerCase();
  } catch (error) {
    console.error('Error verifying wallet signature:', error);
    return false;
  }
}

// Create wallet user object
export function createWalletUser(data: WalletSignInData): WalletUser {
  const { address, walletType, chainId } = data;
  
  return {
    id: `${walletType}:${address}`,
    address,
    walletType,
    chainId,
    name: `${walletType.charAt(0).toUpperCase() + walletType.slice(1)} (${address.slice(0, 6)}...${address.slice(-4)})`,
    image: `https://api.dicebear.com/7.x/identicon/svg?seed=${address}`
  };
}

// Client-side wallet connection functions
export const WalletConnectors = {
  async connectMetaMask(): Promise<{ address: string; chainId: number } | null> {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Get chain ID
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      return {
        address: accounts[0],
        chainId: parseInt(chainId, 16),
      };
    } catch (error) {
      console.error('MetaMask connection error:', error);
      return null;
    }
  },

  async signMessageWithMetaMask(address: string, message: string): Promise<string> {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address],
      });

      return signature;
    } catch (error) {
      console.error('MetaMask signing error:', error);
      throw error;
    }
  },

  async connectPhantom(): Promise<{ address: string } | null> {
    if (typeof window === 'undefined' || !window.solana?.isPhantom) {
      throw new Error('Phantom wallet is not installed');
    }

    try {
      const response = await window.solana.connect();
      return {
        address: response.publicKey.toString(),
      };
    } catch (error) {
      console.error('Phantom connection error:', error);
      return null;
    }
  },

  async signMessageWithPhantom(message: string): Promise<string> {
    if (typeof window === 'undefined' || !window.solana?.isPhantom) {
      throw new Error('Phantom wallet is not installed');
    }

    try {
      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await window.solana.signMessage(encodedMessage);
      return Buffer.from(signedMessage.signature).toString('hex');
    } catch (error) {
      console.error('Phantom signing error:', error);
      throw error;
    }
  },

  // HandCash is different - it uses OAuth, so we'll handle it separately
  connectHandCash(): string {
    const clientId = process.env.NEXT_PUBLIC_HANDCASH_CLIENT_ID;
    if (!clientId) {
      throw new Error('HandCash client ID not configured');
    }
    
    const redirectUri = `${window.location.origin}/api/auth/callback/handcash`;
    const authUrl = `https://app.handcash.io/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user_profile`;
    
    return authUrl;
  }
};

// Type declarations for wallet objects
declare global {
  interface Window {
    ethereum?: any;
    solana?: any;
  }
} 