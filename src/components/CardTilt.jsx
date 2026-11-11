import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

/**
 * CardTilt Component: 3D perspective tilt and interactive specular reflection
 */
export default function CardTilt({
  children,
  className = '',
  maxTilt = 8,
  perspective = 1100,
  glare = true,
  style = {},
  ...props
}) {
  const cardRef = useRef(null)
  const glareRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReducedMotion) return

    const rotX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power2.out' })
    const rotY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power2.out' })
    const scale = gsap.quickTo(card, 'scale', { duration: 0.5, ease: 'power2.out' })

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const normX = (x - centerX) / centerX
      const normY = (y - centerY) / centerY

      rotY(normX * maxTilt)
      rotX(-normY * maxTilt)
      scale(1.02)

      if (glareRef.current) {
        const percentX = (x / rect.width) * 100
        const percentY = (y / rect.height) * 100
        glareRef.current.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 65%)`
      }
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out'
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
      gsap.killTweensOf(card)
    }
  }, [maxTilt])

  return (
    <div
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d'
      }}
      className="card-tilt-perspective"
    >
      <div
        ref={cardRef}
        className={`card-tilt-inner ${className}`}
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
          ...style
        }}
        {...props}
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            className="card-glare-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              borderRadius: 'inherit',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
              mixBlendMode: 'overlay',
              zIndex: 10
            }}
          />
        )}
      </div>
    </div>
  )
}

