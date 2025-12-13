'use client'

import React, { useEffect, useState } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
  interval?: number
  duration?: number
}

export default function GlitchText({ 
  text, 
  className = '', 
  interval = 3000,
  duration = 200 
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), duration)
    }, interval + Math.random() * 2000)

    return () => clearInterval(glitchInterval)
  }, [interval, duration])

  return (
    <span 
      className={`glitch-text ${isGlitching ? 'glitch-active' : ''} ${className}`}
      data-text={text}
    >
      {text}
    </span>
  )
}