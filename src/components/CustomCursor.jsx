import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/**
 * CustomCursor Component
 * Editorial magnetic trailing cursor with blend-mode inversion and contextual badges
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [cursorText, setCursorText] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReducedMotion) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' })

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true)
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const handleMouseDown = () => setIsActive(true)
    const handleMouseUp = () => setIsActive(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Contextual hover listeners
    const handleTargetOver = (e) => {
      const target = e.target.closest('a, button, .btn, .menu-trigger, .resume-btn, .card, .featured-data-project, .link, .chips li')
      if (!target) {
        setIsHovered(false)
        setCursorText('')
        return
      }

      setIsHovered(true)

      if (target.closest('.card') || target.closest('.featured-data-project')) {
        setCursorText('VIEW')
      } else {
        setCursorText('')
      }
    }

    const handleTargetOut = (e) => {
      const target = e.target.closest('a, button, .btn, .menu-trigger, .resume-btn, .card, .featured-data-project, .link, .chips li')
      if (target) {
        setIsHovered(false)
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleTargetOver)
    document.addEventListener('mouseout', handleTargetOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleTargetOver)
      document.removeEventListener('mouseout', handleTargetOut)
    }
  }, [isVisible])

  return (
    <div
      className={`custom-cursor-container ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''} ${isActive ? 'active' : ''} ${cursorText ? 'has-text' : ''}`}
      aria-hidden="true"
    >
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        {cursorText && <span className="cursor-label">{cursorText}</span>}
      </div>
    </div>
  )
}

