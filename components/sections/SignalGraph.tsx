'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import { exploring } from '@/content/exploring'

const CATEGORY_COLORS: Record<string, string> = {
  architecture: '#7c3aed',
  engineering:  '#00ff88',
  ai:           '#d946ef',
  tools:        '#f59e0b',
  exploration:  '#3b82f6',
  frontend:     '#06b6d4',
}

export default function SignalGraph() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const maxWeight = Math.max(...exploring.map(t => t.weight))

  return (
    <section id="signal" className="relative py-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 80% 30%, rgba(217,70,239,0.04) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div ref={ref} className="section-container">
        <SectionLabel index="06" label="Signal" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: heading + legend */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-1 tracking-[0.01em] leading-[1.08] mb-4">
                Currently running
              </h2>
              <p className="font-sans text-base text-text-3 leading-relaxed mb-12 max-w-sm font-light">
                Active threads. The concepts and technologies absorbing the most processing cycles right now.
              </p>
            </motion.div>

            {/* Topics as weighted list */}
            <div className="space-y-3">
              {exploring
                .sort((a, b) => b.weight - a.weight)
                .map((topic, i) => (
                  <motion.div
                    key={topic.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.07 + 0.2 }}
                    className="group flex items-center gap-4"
                  >
                    {/* Weight bar */}
                    <div className="relative w-24 h-1 bg-white/5 rounded-full overflow-hidden shrink-0">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${(topic.weight / maxWeight) * 100}%` } : { width: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.07 + 0.4, ease: [0, 0, 0.2, 1] }}
                        className="absolute h-full rounded-full"
                        style={{ background: CATEGORY_COLORS[topic.category] }}
                      />
                    </div>

                    {/* Name */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-text-2 group-hover:text-text-1 transition-colors truncate">
                          {topic.name}
                        </span>
                        <span
                          className="font-mono text-[10px] px-1.5 py-0.5 rounded shrink-0"
                          style={{
                            color: CATEGORY_COLORS[topic.category],
                            background: `${CATEGORY_COLORS[topic.category]}15`,
                          }}
                        >
                          {topic.category}
                        </span>
                      </div>
                      {topic.description && (
                        <p className="text-[11px] text-text-4 mt-0.5 truncate">{topic.description}</p>
                      )}
                    </div>

                    {/* Weight indicator */}
                    <div className="flex items-center gap-0.5 shrink-0">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div
                          key={j}
                          className="w-1 h-1 rounded-full transition-all duration-300"
                          style={{
                            background: j < topic.weight
                              ? CATEGORY_COLORS[topic.category]
                              : 'rgba(255,255,255,0.08)',
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Right: Node visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="glass-1 rounded-2xl p-6 relative overflow-hidden"
            style={{ minHeight: '360px' }}
          >
            <div className="absolute top-3 left-4 font-mono text-[10px] text-text-4 tracking-widest uppercase">
              active-threads.map
            </div>

            {/* Node cloud */}
            <div className="relative h-full flex items-center justify-center" style={{ minHeight: '320px' }}>
              {exploring.map((topic, i) => {
                const angle = (i / exploring.length) * Math.PI * 2 - Math.PI / 2
                const radius = 36 - (topic.weight / maxWeight) * 10
                const x = 50 + Math.cos(angle) * radius
                const y = 50 + Math.sin(angle) * radius

                return (
                  <motion.div
                    key={topic.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                    className="absolute group cursor-default"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    {/* Node circle */}
                    <div
                      className="rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        width: `${16 + (topic.weight / maxWeight) * 20}px`,
                        height: `${16 + (topic.weight / maxWeight) * 20}px`,
                        background: `${CATEGORY_COLORS[topic.category]}25`,
                        border: `1.5px solid ${CATEGORY_COLORS[topic.category]}60`,
                        boxShadow: `0 0 ${8 + topic.weight * 3}px ${CATEGORY_COLORS[topic.category]}30`,
                      }}
                    >
                      <div
                        className="rounded-full"
                        style={{
                          width: `${4 + (topic.weight / maxWeight) * 4}px`,
                          height: `${4 + (topic.weight / maxWeight) * 4}px`,
                          background: CATEGORY_COLORS[topic.category],
                          animation: `blink ${1.5 + (i % 3) * 0.4}s ease-in-out infinite`,
                        }}
                      />
                    </div>

                    {/* Tooltip */}
                    <div
                      className="absolute opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10"
                      style={{ bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '6px' }}
                    >
                      <div className="bg-elevated border border-white/10 rounded-lg px-3 py-2 whitespace-nowrap">
                        <p className="font-mono text-[10px] text-text-1 font-medium">{topic.name}</p>
                        <p className="font-mono text-[9px] text-text-4 mt-0.5">{topic.category}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              {/* Center: "NOW" label */}
              <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                <div
                  className="font-mono text-[10px] text-text-4 tracking-[0.3em] uppercase"
                  style={{ opacity: 0.5 }}
                >
                  NOW
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5 mt-2">
              {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="font-mono text-[9px] text-text-4">{cat}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
