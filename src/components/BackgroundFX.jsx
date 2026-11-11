import React, { useEffect, useRef } from 'react'

/**
 * BackgroundFX Component
 * Ambient interactive lighting spotlight and floating cosmic stardust
 */
export default function BackgroundFX() {
  const canvasRef = useRef(null)
  const spotlightRef = useRef(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Ambient mouse spotlight
    const handleMouseMove = (e) => {
      if (spotlightRef.current && !isTouch && !prefersReducedMotion) {
        spotlightRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Stardust Canvas
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion) {
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Particle pool: 36 subtle particles
    const particleCount = 36
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.45 + 0.15,
      color: Math.random() > 0.5 ? '75, 75, 200' : '232, 160, 204'
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="background-fx-container" aria-hidden="true">
      <div ref={spotlightRef} className="ambient-spotlight" />
      <canvas ref={canvasRef} className="stardust-canvas" />
    </div>
  )
}

