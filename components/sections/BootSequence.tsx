'use client'

import { useEffect, useRef, useState } from 'react'
import { hero } from '@/content/hero'
import type { BootLineType } from '@/lib/types'

const CMD_START_DELAY = 400
const CMD_CHAR_MS = 28

interface ParticleNode {
  x: number; y: number; vx: number; vy: number; r: number
}

function initCanvas(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d')!
  if (!ctx) return () => {}

  const W = canvas.width = canvas.offsetWidth
  const H = canvas.height = canvas.offsetHeight
  const COUNT = Math.floor((W * H) / 18000)
  const DIST = Math.min(W, H) * 0.18

  const nodes: ParticleNode[] = Array.from({ length: COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: Math.random() * 1.2 + 0.4,
  }))

  let raf: number

  function draw() {
    ctx.clearRect(0, 0, W, H)

    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy
      if (n.x < 0 || n.x > W) n.vx *= -1
      if (n.y < 0 || n.y > H) n.vy *= -1
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < DIST) {
          const alpha = (1 - d / DIST) * 0.18
          ctx.strokeStyle = `rgba(124,58,237,${alpha})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.stroke()
        }
      }
    }

    for (const n of nodes) {
      ctx.fillStyle = 'rgba(124,58,237,0.45)'
      ctx.beginPath()
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
      ctx.fill()
    }

    raf = requestAnimationFrame(draw)
  }

  draw()
  return () => cancelAnimationFrame(raf)
}

export default function BootSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cmdChars, setCmdChars] = useState(0)
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [showScroll, setShowScroll] = useState(false)
  const [canvasReady, setCanvasReady] = useState(false)

  /* Canvas particle network */
  useEffect(() => {
    if (!canvasRef.current) return
    const stop = initCanvas(canvasRef.current)
    setCanvasReady(true)

    const onResize = () => {
      if (canvasRef.current) initCanvas(canvasRef.current)
    }
    window.addEventListener('resize', onResize)
    return () => { stop(); window.removeEventListener('resize', onResize) }
  }, [])

  /* Typewriter for the command line */
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    const start = setTimeout(() => {
      let i = 0
      interval = setInterval(() => {
        i++
        setCmdChars(i)
        if (i >= hero.command.length) clearInterval(interval)
      }, CMD_CHAR_MS)
    }, CMD_START_DELAY)
    return () => { clearTimeout(start); clearInterval(interval) }
  }, [])

  /* Boot sequence timing */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    hero.bootLines.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines(prev => [...prev, i])
      }, line.delay))
    })

    timers.push(setTimeout(() => setShowScroll(true), 5400))

    return () => timers.forEach(clearTimeout)
  }, [])

  const getLineStyle = (type: BootLineType) => {
    switch (type) {
      case 'success':   return 'text-terminal font-mono text-sm text-glow-terminal'
      case 'info':      return 'text-purple-light font-mono text-sm'
      case 'warning':   return 'text-yellow-400 font-mono text-sm'
      case 'name':      return 'text-text-1 font-mono font-bold tracking-[0.25em] mt-2'
      case 'role':      return 'text-purple-light font-mono text-base md:text-lg tracking-[0.2em] mt-3'
      case 'tagline':   return 'text-text-3 font-mono text-sm mt-4'
      default:          return 'text-text-2 font-mono text-sm'
    }
  }

  const getNameSize = (type: BootLineType) => {
    if (type === 'name') return 'text-5xl md:text-7xl lg:text-8xl'
    return ''
  }

  const cmdDone = cmdChars >= hero.command.length

  return (
    <section
      id="boot"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-base"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: canvasReady ? 1 : 0,
          transition: 'opacity 1.5s ease',
        }}
        aria-hidden
      />

      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, #050508 75%)',
        }}
        aria-hidden
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" aria-hidden />

      {/* Terminal content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 md:px-8">
        {/* Terminal header bar */}
        <div className="flex items-center gap-2 mb-6 opacity-60">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-xs text-text-4">{hero.terminalTitle}</span>
        </div>

        {/* Boot lines */}
        <div className="space-y-1">
          {/* Typewriter command line */}
          <div className="font-mono text-sm min-h-[1.5rem] text-text-2">
            {cmdChars === 0 ? (
              <span>
                <span className="text-purple-light">$</span>
                <span className="cursor-blink ml-1" />
              </span>
            ) : (
              <span>
                {hero.command.slice(0, cmdChars)}
                {!cmdDone && <span className="cursor-blink-purple" />}
              </span>
            )}
          </div>

          {hero.bootLines.map((line, i) => (
            <div
              key={i}
              className={`transition-all duration-500 ${
                visibleLines.includes(i)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-2'
              }`}
            >
              {line.type === 'separator' ? (
                <div className="h-4" />
              ) : (
                <div className={`${getLineStyle(line.type)} ${getNameSize(line.type)}`}>
                  {line.text}
                  {i === hero.bootLines.length - 1 && visibleLines.includes(i) && (
                    <span className="cursor-blink-purple ml-1" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-700"
        style={{
          opacity: showScroll ? 1 : 0,
          transform: `translateX(-50%) translateY(${showScroll ? 0 : 16}px)`,
        }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-text-4 uppercase">scroll to explore</span>
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-8 bg-gradient-to-b from-purple/60 to-transparent" />
          <div
            className="w-1 h-1 rounded-full bg-purple-light"
            style={{ animation: 'blink 2s ease-in-out infinite' }}
          />
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050508)' }}
        aria-hidden
      />
    </section>
  )
}
