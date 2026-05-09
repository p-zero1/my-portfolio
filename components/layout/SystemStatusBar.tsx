'use client'

import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'boot', label: 'INIT' },
  { id: 'identity', label: 'CORE' },
  { id: 'mindset', label: 'ARCH' },
  { id: 'experience', label: 'SYS' },
  { id: 'labs', label: 'LAB' },
  { id: 'signal', label: 'NOW' },
  { id: 'eof', label: 'EOF' },
]

export default function SystemStatusBar() {
  const [active, setActive] = useState('boot')
  const [scrollPct, setScrollPct] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let lastY = 0

    const onScroll = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(max > 0 ? (y / max) * 100 : 0)
      setVisible(y > 100)
      lastY = y

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.5) {
            setActive(SECTIONS[i].id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 transition-all duration-500"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)' }}
    >
      <div className="glass-1 rounded-xl px-3 py-2 flex items-center gap-3">
        {/* Scroll progress */}
        <div className="w-16 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${scrollPct}%`,
              background: 'linear-gradient(to right, #7c3aed, #d946ef)',
            }}
          />
        </div>

        {/* Section dots */}
        <div className="flex items-center gap-1.5">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="group relative flex items-center justify-center"
              title={s.label}
            >
              <div
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  background: active === s.id ? '#a78bfa' : 'rgba(255,255,255,0.2)',
                  boxShadow: active === s.id ? '0 0 6px rgba(167,139,250,0.8)' : 'none',
                  transform: active === s.id ? 'scale(1.4)' : 'scale(1)',
                }}
              />
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-text-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* Active label */}
        <span className="font-mono text-[10px] text-text-3 tabular-nums min-w-[28px]">
          {SECTIONS.find(s => s.id === active)?.label}
        </span>
      </div>
    </div>
  )
}
