'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import { identity } from '@/content/identity'

export default function CorePresence() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })
  const [uptime, setUptime] = useState(0)

  useEffect(() => {
    const origin = Date.now()
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() - origin) / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="identity" className="relative min-h-screen flex items-center py-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine opacity-30 pointer-events-none" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 20% 50%, rgba(124,58,237,0.04) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div ref={ref} className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">

          {/* Left: Large typography */}
          <div>
            <SectionLabel index="02" label="Core" />

            <div className="space-y-8">
              {identity.statements.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0, 0, 0.2, 1] }}
                  className={
                    i === 0
                      ? 'font-display text-4xl md:text-5xl xl:text-[3.75rem] font-semibold text-text-1 leading-[1.08] tracking-[0.015em]'
                      : i === 1
                      ? 'font-display text-2xl md:text-3xl font-medium text-text-2 leading-snug tracking-[0.01em]'
                      : 'font-sans text-base text-text-3 leading-relaxed max-w-md font-light'
                  }
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0, 0, 0.2, 1] }}
              className="mt-10 h-px bg-gradient-to-r from-purple/50 via-fuchsia/30 to-transparent origin-left"
            />
          </div>

          {/* Right: Config panel */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0, 0, 0.2, 1] }}
              className="glass-2 rounded-2xl p-8 space-y-6"
            >
              {/* Config file header */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <div className="w-2 h-2 rounded-full bg-terminal" style={{ animation: 'blink 3s ease infinite' }} />
                <span className="font-mono text-xs text-terminal">{identity.configFile}</span>
                <span className="ml-auto font-mono text-[10px] text-text-4 opacity-60">read-only</span>
              </div>

              {identity.config.map((trait, i) => (
                <motion.div
                  key={trait.key}
                  initial={{ opacity: 0, x: 12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="flex items-start justify-between gap-6"
                >
                  <span className="font-mono text-xs text-text-4 shrink-0">{trait.key}</span>
                  <span className="font-mono text-xs text-terminal text-right">"{trait.value}"</span>
                </motion.div>
              ))}

              {/* System footer */}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-text-4">location</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-terminal" style={{ animation: 'blink 2s ease-in-out infinite' }} />
                    <span className="font-mono text-xs text-terminal">"{identity.location}"</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-text-4">session_uptime</span>
                  <span className="font-mono text-xs text-terminal tabular-nums">
                    {String(Math.floor(uptime / 60)).padStart(2, '0')}:{String(uptime % 60).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-text-4">status</span>
                  <span className="font-mono text-xs text-terminal">"{identity.availability}"</span>
                </div>
              </div>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-8 pl-5 border-l-2 border-purple/40"
            >
              <p className="text-base text-text-3 italic leading-relaxed">
                "{identity.quote}"
              </p>
            </motion.blockquote>
          </div>

        </div>
      </div>
    </section>
  )
}
