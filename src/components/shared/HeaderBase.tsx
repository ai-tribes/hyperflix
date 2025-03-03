import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import HeaderNavigation from './HeaderNavigation';

export default function HeaderBase() {
  // This will only run on the server
  console.log('HeaderBase: Server Component Rendering');
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/hyperflix-logo.png"
              alt="Hyper-Flix.com"
              width={40}
              height={40}
              priority
              className={styles.logoImage}
            />
            <span className={styles.brandText}>Hyper-Flix.com</span>
          </Link>
          
          <div className={styles.tagline}>
            <span>Generate Viral TikTok Content for Memecoins</span>
          </div>
          
          {/* Client-side Navigation with auth state handling */}
          <HeaderNavigation />
        </div>
      </div>
    </header>
  );
} 