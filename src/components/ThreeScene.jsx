import React, { useRef, useState, useEffect, Suspense, Component } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

/**
 * Robust WebGL feature check for graceful fallback
 */
function isWebGLAvailable() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/**
 * Error boundary component to prevent WebGL runtime issues from breaking the portfolio
 */
class ThreeErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.warn('ThreeScene WebGL rendering issue:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }
    return this.props.children
  }
}

/**
 * 3D Artistic Floating Ensemble
 * Features an organic morphing sphere, delicate orbital rings, and dynamic lighting
 */
function FloatingObject({ reducedMotion }) {
  const groupRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const satelliteRef = useRef()
  const orbitAngle = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const { viewport } = useThree()

  // Track pointer movements passively without causing React state re-renders
  useEffect(() => {
    if (reducedMotion) return

    const handlePointerMove = (e) => {
      // Normalized coordinates: -1 to 1
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const handlePointerLeave = () => {
      mouseRef.current.targetX = 0
      mouseRef.current.targetY = 0
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [reducedMotion])

  // Responsive layout:
  // Mobile (< 5.2): centered in upper breathing space above portrait
  // Tablet (5.2 - 8.5): gently shifted toward the right
  // Desktop (> 8.5): elegant balance in the upper right quadrant
  const isMobile = viewport.width < 5.2
  const isTablet = !isMobile && viewport.width < 8.5

  const targetBaseX = isMobile ? 0 : isTablet ? viewport.width * 0.18 : viewport.width * 0.22
  const targetBaseY = isMobile ? viewport.height * 0.16 : 0.35
  const baseScale = isMobile ? 0.72 : isTablet ? 0.88 : 1.05

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Cap delta to prevent animation jumping after tab refocus
    const dt = Math.min(delta, 0.05)

    if (reducedMotion) {
      groupRef.current.position.set(targetBaseX, targetBaseY, 0)
      groupRef.current.scale.setScalar(baseScale)
      return
    }

    // Smooth lerp towards mouse position
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05

    // Dynamic position: base offset + subtle parallax
    groupRef.current.position.x = targetBaseX + mouseRef.current.x * 0.35
    groupRef.current.position.y = targetBaseY + mouseRef.current.y * 0.25
    groupRef.current.scale.setScalar(baseScale)

    // Smooth continuous rotation + interactive tilt
    groupRef.current.rotation.y += dt * 0.22
    groupRef.current.rotation.x = mouseRef.current.y * 0.2
    groupRef.current.rotation.z = -mouseRef.current.x * 0.15

    // Orbiting rings differential rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += dt * 0.18
      ring1Ref.current.rotation.x += dt * 0.05
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += dt * 0.14
      ring2Ref.current.rotation.z -= dt * 0.08
    }

    // Satellite pearl orbital path
    if (satelliteRef.current) {
      orbitAngle.current += dt * 0.45
      satelliteRef.current.position.x = Math.cos(orbitAngle.current) * 1.82
      satelliteRef.current.position.z = Math.sin(orbitAngle.current) * 1.82
      satelliteRef.current.position.y = Math.sin(orbitAngle.current * 1.6) * 0.45
    }
  })

  return (
    <Float
      speed={reducedMotion ? 0 : 2}
      rotationIntensity={reducedMotion ? 0 : 0.4}
      floatIntensity={reducedMotion ? 0 : 0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={groupRef}>
        {/* Core Organic Morphing Sphere */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#cfd9f6"
            roughness={0.16}
            metalness={0.78}
            clearcoat={1.0}
            clearcoatRoughness={0.12}
            distort={reducedMotion ? 0 : 0.34}
            speed={reducedMotion ? 0 : 1.6}
          />
        </mesh>

        {/* Primary Orbital Ring (Brand Indigo) */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[1.5, 0.012, 16, 96]} />
          <meshStandardMaterial color="#4b4bc8" metalness={0.92} roughness={0.12} />
        </mesh>

        {/* Secondary Orbital Ring (Brand Orchid Pink) */}
        <mesh ref={ring2Ref} rotation={[-Math.PI / 4, 0, Math.PI / 5]}>
          <torusGeometry args={[1.82, 0.008, 16, 96]} />
          <meshStandardMaterial color="#e8a0cc" metalness={0.88} roughness={0.18} />
        </mesh>

        {/* Orbiting Satellite Pearl */}
        <mesh ref={satelliteRef}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.08} />
        </mesh>

        {/* Subtle Accent Micro-Spheres for Cinematic Depth */}
        <mesh position={[-1.25, -0.9, 0.7]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#4b4bc8" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[1.35, 1.15, -0.5]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#e8a0cc" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  )
}

/**
 * ThreeScene Component
 * Embeds high-performance, non-blocking React Three Fiber canvas
 */
export default function ThreeScene() {
  const [canRender, setCanRender] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Detect WebGL capability safely in browser
    setCanRender(isWebGLAvailable())

    // Respect user's motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleMotionChange = (e) => setReducedMotion(e.matches)
    mediaQuery.addEventListener?.('change', handleMotionChange)

    return () => {
      mediaQuery.removeEventListener?.('change', handleMotionChange)
    }
  }, [])

  if (!canRender) {
    return (
      <div className="hero-three-wrapper" aria-hidden="true">
        <div className="hero-three-fallback" />
      </div>
    )
  }

  return (
    <div className="hero-three-wrapper" aria-hidden="true">
      <ThreeErrorBoundary fallback={<div className="hero-three-fallback" />}>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          }}
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          {/* Lighting architecture matching the hero palette */}
          <ambientLight intensity={0.75} color="#dff0ff" />
          <directionalLight position={[5, 6, 5]} intensity={2.4} color="#4b4bc8" />
          <directionalLight position={[-5, -4, -2]} intensity={2.0} color="#e8a0cc" />
          <pointLight position={[2, 3, 3]} intensity={1.2} color="#ffffff" />

          <Suspense fallback={null}>
            <FloatingObject reducedMotion={reducedMotion} />
          </Suspense>
        </Canvas>
      </ThreeErrorBoundary>
    </div>
  )
}

