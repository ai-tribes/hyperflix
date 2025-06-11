'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { WalletConnectors, generateWalletSignMessage } from '@/lib/wallet-providers/wallet-auth';
import styles from './WalletSignIn.module.css';

interface WalletSignInProps {
  callbackUrl?: string;
  className?: string;
}

export default function WalletSignIn({ callbackUrl = '/dashboard', className }: WalletSignInProps) {
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMetaMaskSignIn = async () => {
    setIsConnecting('metamask');
    setError(null);

    try {
      // Connect to MetaMask
      const connectionResult = await WalletConnectors.connectMetaMask();
      if (!connectionResult) {
        throw new Error('Failed to connect to MetaMask');
      }

      const { address, chainId } = connectionResult;

      // Generate message to sign
      const message = generateWalletSignMessage(address);

      // Sign the message
      const signature = await WalletConnectors.signMessageWithMetaMask(address, message);

      // Authenticate with NextAuth
      const result = await signIn('wallet', {
        address,
        signature,
        message,
        walletType: 'metamask',
        chainId: chainId.toString(),
        callbackUrl,
        redirect: false
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Redirect on success
      if (result?.ok) {
        window.location.href = callbackUrl;
      }
    } catch (error: any) {
      console.error('MetaMask sign-in error:', error);
      setError(error.message || 'Failed to sign in with MetaMask');
    } finally {
      setIsConnecting(null);
    }
  };

  const handlePhantomSignIn = async () => {
    setIsConnecting('phantom');
    setError(null);

    try {
      // Connect to Phantom
      const connectionResult = await WalletConnectors.connectPhantom();
      if (!connectionResult) {
        throw new Error('Failed to connect to Phantom');
      }

      const { address } = connectionResult;

      // Generate message to sign
      const message = generateWalletSignMessage(address);

      // Sign the message
      const signature = await WalletConnectors.signMessageWithPhantom(message);

      // Authenticate with NextAuth
      const result = await signIn('wallet', {
        address,
        signature,
        message,
        walletType: 'phantom',
        callbackUrl,
        redirect: false
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Redirect on success
      if (result?.ok) {
        window.location.href = callbackUrl;
      }
    } catch (error: any) {
      console.error('Phantom sign-in error:', error);
      setError(error.message || 'Failed to sign in with Phantom');
    } finally {
      setIsConnecting(null);
    }
  };

  const handleHandCashSignIn = () => {
    setIsConnecting('handcash');
    setError(null);

    try {
      // HandCash uses OAuth, so redirect to their authorization URL
      const authUrl = WalletConnectors.connectHandCash();
      window.location.href = authUrl;
    } catch (error: any) {
      console.error('HandCash sign-in error:', error);
      setError(error.message || 'Failed to sign in with HandCash');
      setIsConnecting(null);
    }
  };

  return (
    <div className={`${styles.walletSignIn} ${className || ''}`}>
      <div className={styles.header}>
        <h3>Connect Your Wallet</h3>
        <p>Sign in with your crypto wallet to link it to your account</p>
      </div>

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      <div className={styles.walletButtons}>
        <button
          onClick={handleMetaMaskSignIn}
          disabled={isConnecting !== null}
          className={`${styles.walletButton} ${styles.metamask}`}
        >
          <div className={styles.walletIcon}>
            🦊
          </div>
          <div className={styles.walletInfo}>
            <span className={styles.walletName}>MetaMask</span>
            <span className={styles.walletDesc}>Ethereum & EVM chains</span>
          </div>
          {isConnecting === 'metamask' && (
            <div className={styles.spinner}>⏳</div>
          )}
        </button>

        <button
          onClick={handlePhantomSignIn}
          disabled={isConnecting !== null}
          className={`${styles.walletButton} ${styles.phantom}`}
        >
          <div className={styles.walletIcon}>
            👻
          </div>
          <div className={styles.walletInfo}>
            <span className={styles.walletName}>Phantom</span>
            <span className={styles.walletDesc}>Solana blockchain</span>
          </div>
          {isConnecting === 'phantom' && (
            <div className={styles.spinner}>⏳</div>
          )}
        </button>

        <button
          onClick={handleHandCashSignIn}
          disabled={isConnecting !== null}
          className={`${styles.walletButton} ${styles.handcash}`}
        >
          <div className={styles.walletIcon}>
            💰
          </div>
          <div className={styles.walletInfo}>
            <span className={styles.walletName}>HandCash</span>
            <span className={styles.walletDesc}>Bitcoin SV</span>
          </div>
          {isConnecting === 'handcash' && (
            <div className={styles.spinner}>⏳</div>
          )}
        </button>
      </div>

      <div className={styles.disclaimer}>
        <p>
          <small>
            Connecting your wallet will not give us access to your funds. 
            We only use your wallet address for authentication.
          </small>
        </p>
      </div>
    </div>
  );
} 