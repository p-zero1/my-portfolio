'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import { experiences } from '@/content/experience'
import type { ExperienceEntry } from '@/lib/types'

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setValue(target); clearInterval(timer) }
      else setValue(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return value
}

function MetricCard({ metric, label, delay, active }: {
  metric: string; label: string; delay: number; active: boolean
}) {
  const numericPart = parseFloat(metric.replace(/[^0-9.]/g, ''))
  const suffix = metric.replace(/[0-9.]/g, '')
  const count = useCountUp(numericPart, 1200, active)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="glass-1 rounded-xl p-5 flex flex-col gap-1 hover:border-purple/30 transition-colors"
    >
      <div className="text-2xl md:text-3xl font-bold font-mono tabular-nums gradient-text">
        {isNaN(numericPart) ? metric : `${count}${suffix}`}
      </div>
      <div className="text-xs text-text-3 leading-tight">{label}</div>
    </motion.div>
  )
}

function ExperienceDetail({ exp, isInView }: { exp: ExperienceEntry; isInView: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

      {/* Left: Company + metrics + stack */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-terminal tracking-widest uppercase">
              {exp.period}
            </span>
            <div
              className="w-1.5 h-1.5 rounded-full bg-terminal"
              style={{ animation: 'blink 2s ease-in-out infinite' }}
            />
          </div>

          <h2 className="font-display text-5xl md:text-6xl font-bold text-text-1 tracking-[0.01em] leading-[1.05] mb-3">
            {exp.company}
          </h2>
          <p className="font-display text-xl text-purple-light font-medium tracking-[0.01em] mb-6">{exp.role}</p>
          <p className="font-sans text-base text-text-3 leading-relaxed mb-10 max-w-lg font-light">
            {exp.tagline}
          </p>
        </motion.div>

        {/* Impact metrics */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {exp.impact.map((item, i) => (
            <MetricCard
              key={item.label}
              metric={item.metric}
              label={item.label}
              delay={0.15 + i * 0.08}
              active={isInView}
            />
          ))}
        </div>

        {/* Stack tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-2"
        >
          {exp.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-2.5 py-1 rounded-md text-text-3 bg-elevated border border-white/8"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Right: Architecture diagram (primary entry) or highlights list */}
      <div>
        {exp.showArchDiagram ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Architecture diagram header */}
            <div className="glass-1 rounded-t-xl px-4 py-3 flex items-center gap-3 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
              </div>
              <span className="font-mono text-xs text-text-4">
                {exp.company.toLowerCase()}-backend-architecture.svg
              </span>
            </div>

            {/* Architecture visual */}
            <div className="glass-1 rounded-b-xl p-6 rounded-t-none border-t-0">
              <div className="space-y-3">
                <ArchNode label="Region-based Router"  status="active" color="purple"   delay={0.4} active={isInView} stat="60% faster response · 2× throughput" />
                <ArchArrow delay={0.5} active={isInView} />
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Spring Boot API',      stat: '10+ microservices' },
                    { label: 'Custom Microservice',  stat: '+35% processing efficiency' },
                  ].map((svc, i) => (
                    <ArchNode key={svc.label} label={svc.label} status="active" color="terminal" delay={0.55 + i * 0.06} active={isInView} small stat={svc.stat} />
                  ))}
                </div>
                <ArchArrow delay={0.72} active={isInView} />
                <ArchNode label="Apache Kafka" status="active" color="fuchsia" delay={0.78} active={isInView} stat="async processing · region routing" />
                <ArchArrow delay={0.9} active={isInView} />
                <div className="grid grid-cols-2 gap-2">
                  <ArchNode label="MySQL"  status="active" color="purple"   delay={0.95} active={isInView} small stat="primary store" />
                  <ArchNode label="Oracle" status="active" color="terminal" delay={1.0}  active={isInView} small stat="enterprise DB" />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-terminal" style={{ animation: 'blink 1.5s ease-in-out infinite' }} />
                <span className="font-mono text-[10px] text-terminal">ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Highlights list — shown for entries without an arch diagram */
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="glass-1 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-terminal" style={{ animation: 'blink 2s ease-in-out infinite' }} />
              <span className="font-mono text-xs text-text-3 tracking-widest uppercase">Key contributions</span>
            </div>
            <div className="space-y-4">
              {exp.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3 group"
                >
                  <span className="text-terminal font-mono text-xs mt-0.5 shrink-0">→</span>
                  <span className="text-sm text-text-3 leading-relaxed group-hover:text-text-2 transition-colors">{h}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Highlights below the arch diagram (only for arch diagram entries) */}
        {exp.showArchDiagram && (
          <div className="mt-6 space-y-3">
            {exp.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.1 + i * 0.08 }}
                className="flex items-start gap-3 group"
              >
                <span className="text-terminal font-mono text-xs mt-0.5 shrink-0">→</span>
                <span className="text-xs text-text-3 leading-relaxed group-hover:text-text-2 transition-colors">{h}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default function ArchitectureView() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const [selected, setSelected] = useState(0)
  const hasMultiple = experiences.length > 1

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 10% 60%, rgba(0,255,136,0.03) 0%, transparent 50%)',
        }}
        aria-hidden
      />

      <div ref={ref} className="section-container">
        <SectionLabel index="04" label="Systems Built" />

        {/* Timeline selector — only renders when there are 2+ experiences */}
        {hasMultiple && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-stretch gap-0 mb-14 overflow-x-auto pb-1"
          >
            {experiences.map((exp, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`group relative flex items-center gap-4 px-6 py-4 text-left transition-all duration-300 border-b-2 ${
                  selected === i
                    ? 'border-terminal'
                    : 'border-white/8 hover:border-white/20'
                }`}
              >
                {/* Status dot */}
                <div
                  className="w-2 h-2 rounded-full shrink-0 transition-all duration-300"
                  style={{
                    background: selected === i ? '#00ff88' : 'rgba(255,255,255,0.2)',
                    boxShadow: selected === i ? '0 0 8px rgba(0,255,136,0.6)' : 'none',
                  }}
                />
                <div className="min-w-0">
                  <p className={`font-mono text-sm font-medium transition-colors ${
                    selected === i ? 'text-text-1' : 'text-text-3 group-hover:text-text-2'
                  }`}>
                    {exp.company}
                  </p>
                  <p className="font-mono text-[10px] text-text-4 mt-0.5">{exp.period}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {/* Experience detail — animates when switching */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <ExperienceDetail exp={experiences[selected]} isInView={isInView} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function ArchNode({ label, status, color, delay, active, small, stat }: {
  label: string; status: string; color: 'purple' | 'terminal' | 'fuchsia'
  delay: number; active: boolean; small?: boolean; stat?: string
}) {
  const colorMap = {
    purple:   { border: 'rgba(124,58,237,0.4)',  bg: 'rgba(124,58,237,0.08)',  dot: '#a78bfa', text: '#c4b5fd' },
    terminal: { border: 'rgba(0,255,136,0.3)',   bg: 'rgba(0,255,136,0.05)',   dot: '#00ff88', text: '#00cc6a' },
    fuchsia:  { border: 'rgba(217,70,239,0.4)',  bg: 'rgba(217,70,239,0.08)',  dot: '#d946ef', text: '#f0abfc' },
  }
  const c = colorMap[color]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={active ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col px-3 py-2 rounded-lg gap-0.5"
      style={{ background: c.bg, border: `1px solid ${c.border}` }}
    >
      <div className="flex items-center justify-between">
        <span className={`font-mono ${small ? 'text-[10px]' : 'text-xs'} text-text-2 truncate`}>{label}</span>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot, animation: 'blink 2s ease-in-out infinite' }} />
          <span className="font-mono text-[9px]" style={{ color: c.text }}>{status}</span>
        </div>
      </div>
      {stat && (
        <span className="font-mono text-[9px] text-text-4 leading-none">{stat}</span>
      )}
    </motion.div>
  )
}

function ArchArrow({ delay, active }: { delay: number; active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 1 } : {}}
      transition={{ duration: 0.3, delay }}
      className="flex items-center justify-center py-1"
    >
      <div className="w-px h-4 bg-gradient-to-b from-purple/50 to-purple/20" />
    </motion.div>
  )
}
