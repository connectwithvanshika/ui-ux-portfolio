import React, { useEffect, useRef, useState, useCallback } from 'react'

const DEFAULT_CHARS = '!<>-_\\/[]{}—=+*^?#________'

/**
 * TextScramble Component
 * Futuristic glyph-decoding animation for titles and interactive elements
 */
export default function TextScramble({
  children,
  as: Component = 'span',
  className = '',
  speed = 35,
  triggerOnHover = false,
  triggerInView = true,
  chars = DEFAULT_CHARS,
  ...props
}) {
  const targetText = typeof children === 'string' ? children : String(children ?? '')
  const [displayText, setDisplayText] = useState(targetText)
  const isScrambling = useRef(false)
  const elementRef = useRef(null)
  const hasAnimated = useRef(false)

  const scramble = useCallback(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
      setDisplayText(targetText)
      return
    }

    if (isScrambling.current) return
    isScrambling.current = true

    let frame = 0
    const totalFrames = targetText.length + 15
    const queue = []

    for (let i = 0; i < targetText.length; i++) {
      const from = displayText[i] || ''
      const to = targetText[i] || ''
      const start = Math.floor(Math.random() * 8)
      const end = start + Math.floor(Math.random() * 10) + 4
      queue.push({ from, to, start, end, char: '' })
    }

    let intervalId = null

    const update = () => {
      let output = ''
      let complete = 0

      for (let i = 0; i < queue.length; i++) {
        const item = queue[i]
        if (frame >= item.end) {
          complete++
          output += item.to
        } else if (frame >= item.start) {
          if (!item.char || Math.random() < 0.28) {
            item.char = chars[Math.floor(Math.random() * chars.length)]
          }
          output += `<span class="scramble-char">${item.char}</span>`
        } else {
          output += item.from
        }
      }

      setDisplayText(output)

      if (complete === queue.length) {
        clearInterval(intervalId)
        isScrambling.current = false
        setDisplayText(targetText)
      } else {
        frame++
      }
    }

    intervalId = setInterval(update, speed)
  }, [targetText, displayText, speed, chars])

  useEffect(() => {
    if (!triggerInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          scramble()
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [scramble, triggerInView])

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      scramble()
    }
  }

  return (
    <Component
      ref={elementRef}
      className={`text-scramble-wrapper ${className}`}
      onMouseEnter={handleMouseEnter}
      dangerouslySetInnerHTML={{ __html: displayText }}
      {...props}
    />
  )
}

