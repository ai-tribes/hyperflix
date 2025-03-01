import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerCol}>
            <h3>About Hyper-Flix</h3>
            <p>The first AI-powered platform revolutionizing memecoin marketing through viral TikTok content creation. Join thousands of projects already growing their communities.</p>
            <div className={styles.socialLinks}>
              <a href="#"><span>🐦</span></a>
              <a href="#"><span>💬</span></a>
              <a href="#"><span>📱</span></a>
              <a href="#"><span>📸</span></a>
              <a href="#"><span>🎮</span></a>
            </div>
          </div>
          <div className={styles.footerCol}>
            <h3>Platform</h3>
            <ul>
              <li><a href="#value">Features</a></li>
              <li><a href="#roi">ROI Analytics</a></li>
              <li><a href="#platform">How It Works</a></li>
              <li><a href="#token">Token Economics</a></li>
              <li><a href="#">Pricing Plans</a></li>
              <li><a href="#">Success Stories</a></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h3>Resources</h3>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Reference</a></li>
              <li><a href="#">Platform Status</a></li>
              <li><a href="#">Blog & Updates</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Risk Disclosure</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 Hyper-Flix. All rights reserved. $HFLIX is a utility token. Trading cryptocurrencies carries risk.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 