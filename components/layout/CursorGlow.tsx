'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const outer = useRef({ x: 0, y: 0 })
  const inner = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      // Outer: slow lerp — ambient field lags for depth
      outer.current.x += (pos.current.x - outer.current.x) * 0.06
      outer.current.y += (pos.current.y - outer.current.y) * 0.06
      // Inner: faster lerp — snappier focus point
      inner.current.x += (pos.current.x - inner.current.x) * 0.14
      inner.current.y += (pos.current.y - inner.current.y) * 0.14

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outer.current.x - 400}px, ${outer.current.y - 400}px)`
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${inner.current.x - 100}px, ${inner.current.y - 100}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Outer ambient field — large, slow-following */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed top-0 left-0 z-0 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0.025) 35%, transparent 65%)',
          willChange: 'transform',
        }}
        aria-hidden
      />
      {/* Inner focus point — sharp, faster-following */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed top-0 left-0 z-0 w-[200px] h-[200px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, rgba(124,58,237,0.03) 50%, transparent 70%)',
          willChange: 'transform',
        }}
        aria-hidden
      />
    </>
  )
}
