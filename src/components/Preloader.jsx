import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

/**
 * Editorial Preloader Sequence
 * High-speed percentage counter and curtain wipe transition
 */
export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const preloaderRef = useRef(null)

  useEffect(() => {
    // If reduced motion is requested or already visited in this session, skip immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const alreadyLoaded = sessionStorage.getItem('portfolio_preloader_seen')

    if (prefersReducedMotion || alreadyLoaded) {
      setIsLoaded(true)
      onComplete?.()
      return
    }

    let current = 0
    const interval = setInterval(() => {
      // Accelerating curve
      const increment = Math.max(1, Math.floor((100 - current) * 0.16) + 2)
      current += increment

      if (current >= 100) {
        current = 100
        setCount(100)
        clearInterval(interval)

        sessionStorage.setItem('portfolio_preloader_seen', 'true')

        // Wipe animation
        setTimeout(() => {
          if (preloaderRef.current) {
            gsap.to(preloaderRef.current, {
              yPercent: -100,
              duration: 0.9,
              ease: 'power4.inOut',
              onComplete: () => {
                setIsLoaded(true)
                onComplete?.()
              }
            })
          } else {
            setIsLoaded(true)
            onComplete?.()
          }
        }, 250)
      } else {
        setCount(current)
      }
    }, 28)

    return () => clearInterval(interval)
  }, [onComplete])

  if (isLoaded) return null

  return (
    <div ref={preloaderRef} className="preloader-overlay" aria-hidden="true">
      <div className="preloader-top">
        <span className="preloader-tag">VANSHIKA YADAV</span>
        <span className="preloader-tag">PORTFOLIO / 2026</span>
      </div>

      <div className="preloader-center">
        <div className="preloader-title">VANSHIKA</div>
        <div className="preloader-counter">{String(count).padStart(2, '0')}%</div>
        <div className="preloader-bar">
          <div className="preloader-bar-fill" style={{ width: `${count}%` }} />
        </div>
      </div>

      <div className="preloader-bottom">
        <span className="preloader-meta">CREATIVE DEVELOPER & AI DESIGNER</span>
        <span className="preloader-meta">INITIALIZING EXPERIENCE</span>
      </div>
    </div>
  )
}

