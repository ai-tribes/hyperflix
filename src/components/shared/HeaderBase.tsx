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
              src="/hyperflix-logo.jpg"
              alt="HyperFlix"
              width={150}
              height={150}
              priority
              className={styles.logoImage}
            />
          </Link>
          
          <div className={styles.tagline}>
            <span>HyperFlix - Generate Viral TikTok Content for Memecoins</span>
          </div>
          
          {/* Client-side Navigation with auth state handling */}
          <HeaderNavigation />
        </div>
      </div>
    </header>
  );
} 