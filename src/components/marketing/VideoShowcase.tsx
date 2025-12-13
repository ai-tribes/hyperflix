"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './VideoShowcase.module.css';

const VideoShowcase = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const videos = [
    { id: 1, file: 'grok-video-340447a1-f2b1-4bcb-9859-bdcff11ad6f6.mp4', title: 'PEPE PUMP', gains: '+10,000%', color: '#00ff88' },
    { id: 2, file: 'grok-video-05a31896-d339-4f5d-aa88-568a6277f380.mp4', title: 'SHIBA MOON', gains: '+50,000%', color: '#ff6b35' },
    { id: 3, file: 'grok-video-cc1d1599-8b8c-40ea-91ca-a215a462402d.mp4', title: 'DOGE FOMO', gains: '+850%', color: '#ffd700' },
    { id: 4, file: 'grok-video-9a5c1521-ae7b-470c-a078-f3b748a7f955.mp4', title: 'WOJAK BREAK', gains: '+25,000%', color: '#9b59b6' },
    { id: 5, file: 'grok-video-254101d4-e7aa-4d4e-8f73-492a738c874c.mp4', title: 'FLOKI RAID', gains: '+15,000%', color: '#3498db' },
    { id: 6, file: 'grok-video-0ef81ad6-d2e3-4fbc-b30e-0013aeb2e543.mp4', title: 'BONK SLAM', gains: '+75,000%', color: '#e74c3c' },
    { id: 7, file: 'grok-video-465b2077-f3ea-46dc-afa3-323972697d45.mp4', title: 'MOG GLITCH', gains: '+100,000%', color: '#00ffcc' },
    { id: 8, file: 'grok-video-a8aafe46-effa-49b3-b7da-225ef9de4f74.mp4', title: 'TURBO RUSH', gains: '+35,000%', color: '#ff00ff' },
    { id: 9, file: 'grok-video-d24819c0-4542-4229-b606-3522c98cad23.mp4', title: 'BRETT RISE', gains: '+45,000%', color: '#00bfff' },
    { id: 10, file: 'grok-video-8fa11fd0-282b-4c84-bdbb-0b8408ab8686.mp4', title: 'ANDY MAGIC', gains: '+90,000%', color: '#ff1493' }
  ];

  useEffect(() => {
    // Preload and set up videos
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        // Play on hover
        if (hoveredVideo === index) {
          video.play().catch(e => console.log('Video play failed:', e));
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [hoveredVideo]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className={styles.showcase}>
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.badge}>LIVE CAMPAIGNS</span>
          <h2 className={styles.title}>
            <span className="gradient-text">Real Results</span> From Real Campaigns
          </h2>
          <p className={styles.description}>
            Watch how our AI-generated videos are pumping tokens right now. 
            Every campaign below generated millions in volume.
          </p>
        </motion.div>

        <motion.div 
          ref={ref}
          className={styles.videoGrid}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              className={styles.videoCard}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                zIndex: 10,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredVideo(index)}
              onHoverEnd={() => setHoveredVideo(null)}
              onClick={() => setActiveVideo(activeVideo === index ? null : index)}
              style={{
                '--video-color': video.color
              } as React.CSSProperties}
            >
              <div className={styles.videoWrapper}>
                <video
                  ref={el => videoRefs.current[index] = el}
                  src={`/videos/campaigns/${video.file}`}
                  className={styles.video}
                  muted
                  loop
                  playsInline
                />
                
                {hoveredVideo !== index && (
                  <div className={styles.videoOverlay}>
                    <div className={styles.playButton}>
                      <span>▶</span>
                    </div>
                  </div>
                )}
                
                <div className={styles.videoInfo}>
                  <h3>{video.title}</h3>
                  <span className={styles.gains}>{video.gains}</span>
                </div>

                {hoveredVideo === index && (
                  <motion.div 
                    className={styles.liveIndicator}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className={styles.liveDot}></span>
                    <span>LIVE</span>
                  </motion.div>
                )}
              </div>
              
              <motion.div 
                className={styles.glowEffect}
                animate={{
                  opacity: hoveredVideo === index ? 1 : 0.3,
                  scale: hoveredVideo === index ? 1.2 : 1
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={styles.cta}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p>These campaigns generated over <span className={styles.highlight}>$2.4B in volume</span> last month</p>
          <button className={styles.ctaButton}>
            Create Your Viral Campaign
            <span className={styles.arrow}>→</span>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeVideo !== null && (
          <motion.div 
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={`/videos/campaigns/${videos[activeVideo].file}`}
                className={styles.modalVideo}
                autoPlay
                loop
                controls
              />
              <button 
                className={styles.closeButton}
                onClick={() => setActiveVideo(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoShowcase;