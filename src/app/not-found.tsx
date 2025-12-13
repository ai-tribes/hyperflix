'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './not-found.module.css'

const glitchTexts = [
  'ERROR_404',
  'NOT_FOUND',
  'NULL_PAGE',
  'VOID_ROUTE',
  '0x404',
  'MISSING',
  'GLITCH',
  '404_ERR'
]

export default function NotFound() {
  const [glitchText, setGlitchText] = useState('404')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setGlitchText(glitchTexts[Math.floor(Math.random() * glitchTexts.length)])
      setTimeout(() => {
        setIsGlitching(false)
        setGlitchText('404')
      }, 200)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.backgroundEffects}>
        <div className={styles.gridPattern}></div>
        <div className={styles.floatingOrbs}>
          <div className={styles.orb} style={{ animationDelay: '0s' }}></div>
          <div className={styles.orb} style={{ animationDelay: '2s' }}></div>
          <div className={styles.orb} style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.errorCode}>
          <h1 
            className={`${styles.mainText} ${isGlitching ? styles.glitch : ''}`}
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
            }}
          >
            <span className={styles.glitchLayer} data-text={glitchText}>{glitchText}</span>
            <span className={styles.glitchLayer} data-text={glitchText}>{glitchText}</span>
            {glitchText}
          </h1>
          <div className={styles.scanline}></div>
        </div>

        <div className={styles.messageContainer}>
          <h2 className={styles.title}>
            <span className={styles.highlightText}>OOPS!</span> You've entered the void
          </h2>
          <p className={styles.subtitle}>
            This page got lost in the metaverse. 
            <br />
            Your memecoins are safe, but this URL isn't.
          </p>
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.primaryButton}>
            <span className={styles.buttonText}>Return to Base</span>
            <div className={styles.buttonGlow}></div>
          </Link>
          
          <button 
            className={styles.secondaryButton}
            onClick={() => window.history.back()}
          >
            <span className={styles.buttonText}>Go Back</span>
          </button>
        </div>

        <div className={styles.funFact}>
          <p className={styles.funFactText}>
            Fun fact: While you're here, HyperFlix AI just created {Math.floor(Math.random() * 100) + 50} viral videos
          </p>
        </div>
      </div>

      <div className={styles.matrixRain}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className={styles.matrixColumn}
            style={{
              left: `${i * 5}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          >
            {Array.from({ length: 30 }).map((_, j) => (
              <span key={j} style={{ opacity: Math.random() }}>
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}