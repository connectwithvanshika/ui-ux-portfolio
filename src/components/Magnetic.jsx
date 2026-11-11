import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

/**
 * Magnetic component: Pulls children gently toward mouse cursor on hover
 */
export default function Magnetic({ children, strength = 0.35, className = '', ...props }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Disable on touch screens and if user prefers reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReducedMotion) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distPercentX = (e.clientX - centerX) * strength
      const distPercentY = (e.clientY - centerY) * strength

      xTo(distPercentX)
      yTo(distPercentY)
    }

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1.1, 0.4)'
      })
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      gsap.killTweensOf(el)
    }
  }, [strength])

  return (
    <div ref={containerRef} className={`magnetic-item ${className}`} style={{ display: 'inline-block' }} {...props}>
      {children}
    </div>
  )
}

