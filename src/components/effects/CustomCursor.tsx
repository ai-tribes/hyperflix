"use client";

import React, { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.style.opacity = '1';
        cursorDotRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.style.opacity = '0';
        cursorDotRef.current.style.opacity = '0';
      }
    };

    const handleMouseDown = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add(styles.click);
      }
    };

    const handleMouseUp = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove(styles.click);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Add hover effects for interactive elements
    const addHoverEffect = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          if (cursorRef.current) {
            cursorRef.current.classList.add(styles.hover);
          }
        });
        el.addEventListener('mouseleave', () => {
          if (cursorRef.current) {
            cursorRef.current.classList.remove(styles.hover);
          }
        });
      });
    };

    addHoverEffect();

    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        // Smooth cursor follow
        cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15;
        cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15;
        
        dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.5;
        dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.5;

        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
        }
        
        if (cursorDotRef.current) {
          cursorDotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px)`;
        }
      }

      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={styles.cursor}>
        <div className={styles.cursorInner}></div>
      </div>
      <div ref={cursorDotRef} className={styles.cursorDot}></div>
    </>
  );
};

export default CustomCursor;