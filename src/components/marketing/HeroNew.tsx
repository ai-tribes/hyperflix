"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './HeroNew.module.css';
import ParticleField from '@/components/backgrounds/ParticleField';
import GlitchText from '@/components/effects/GlitchText';

const HeroNew = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const words = ['Revolutionary', 'Viral', 'Explosive', 'Unstoppable'];
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(glitchInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className={styles.hero}>
      <ParticleField />
      
      <motion.div 
        className={styles.videoBackground}
        style={{ y, opacity, scale }}
      >
        <div className={styles.videoMosaic}>
          {[
            'grok-video-340447a1-f2b1-4bcb-9859-bdcff11ad6f6.mp4',
            'grok-video-05a31896-d339-4f5d-aa88-568a6277f380.mp4',
            'grok-video-cc1d1599-8b8c-40ea-91ca-a215a462402d.mp4',
            'grok-video-9a5c1521-ae7b-470c-a078-f3b748a7f955.mp4'
          ].map((video, i) => (
            <motion.video
              key={i}
              autoPlay
              muted
              loop
              playsInline
              className={styles.mosaicVideo}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
            >
              <source src={`/videos/campaigns/${video}`} type="video/mp4" />
            </motion.video>
          ))}
        </div>
        <div className={styles.videoOverlay} />
      </motion.div>

      <div className="container">
        <motion.div 
          ref={ref}
          className={styles.heroContent}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div 
            className={styles.glowOrb}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className={styles.badge}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.live}></span>
            <span>LIVE • 247K Watching</span>
          </motion.div>

          <motion.h1 
            className={`${styles.title} ${isGlitching ? 'glitch-active' : ''}`}
            variants={itemVariants}
          >
            <span className={`${styles.smallTitle} glitch-text`} data-text="The Future is">The Future is</span>
            <span className={styles.mainTitle}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={styles.dynamicWord}
                >
                  {words[currentWord]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className={styles.subtitle}>
              <GlitchText text="AI That Makes Your Token" /> <GlitchText text="Go Parabolic" />
            </span>
          </motion.h1>

          <motion.p 
            className={styles.description}
            variants={itemVariants}
          >
            Watch your memecoin explode from $0 to $100M in days. 
            Our AI creates hypnotic content that breaks TikTok and floods your token with buyers.
          </motion.p>

          <motion.div 
            className={styles.buttons}
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/auth/signup" className={styles.primaryBtn}>
                <span className={styles.btnText}>Launch Now</span>
                <span className={styles.btnGlow}></span>
                <motion.div 
                  className={styles.btnParticles}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className={styles.playBtn}>
                <span className={styles.playIcon}>▶</span>
                Watch Demo
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            className={styles.stats}
            variants={containerVariants}
          >
            {[
              { value: "$2.4B", label: "Volume Generated", trend: "+482%" },
              { value: "847K", label: "Viral Videos", trend: "+127%" },
              { value: "15sec", label: "To First Million", trend: "RECORD" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className={styles.statCard}
                variants={itemVariants}
                animate={floatingAnimation}
                transition={{
                  ...floatingAnimation.transition,
                  delay: index * 0.2
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 15,
                  z: 50
                }}
              >
                <motion.div 
                  className={styles.statGlow}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.9, 1.1, 0.9]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
                <span className={styles.trend}>{stat.trend}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className={styles.floatingIcons}
            animate={floatingAnimation}
          >
            {['💎', '💰', '📈', '🔥', '⚡'].map((emoji, i) => (
              <motion.span
                key={i}
                className={styles.floatingIcon}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.sin(i) * 20, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                style={{
                  position: 'absolute',
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 10}%`
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className={styles.scrollIndicator}
        animate={{
          y: [0, 10, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity
        }}
      >
        <span>Scroll to explore</span>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroNew;