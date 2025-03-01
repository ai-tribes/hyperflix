import React from 'react'
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContainer}>
          <a href="#" className={styles.logo}>Hyper-<span>Flix</span></a>
          <nav>
            <ul className={styles.navLinks}>
              <li><a href="#value">Value</a></li>
              <li><a href="#roi">ROI</a></li>
              <li><a href="#platform">Platform</a></li>
              <li><a href="#token">Token</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 