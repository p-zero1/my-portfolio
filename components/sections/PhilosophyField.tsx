'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import { principles } from '@/content/mindset'

export default function PhilosophyField() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="mindset" className="relative py-32 overflow-hidden">
      {/* Top gradient bleed */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(124,58,237,0.05) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div ref={ref} className="section-container">
        <SectionLabel index="03" label="Mindset" />

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-xl"
        >
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-text-1 tracking-[0.01em] leading-[1.08]">
            Engineering philosophy
          </h2>
          <p className="mt-4 text-text-3 text-lg leading-relaxed font-sans font-light">
            Principles that guide every architecture decision.
          </p>
        </motion.div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {principles.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }}
              className="group relative bg-base p-10 hover:bg-raised transition-colors duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-none"
                style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)' }}
                aria-hidden
              />

              {/* Number + icon */}
              <div className="flex items-start justify-between mb-5">
                <span className="font-mono text-xs text-text-4 tabular-nums">{p.id}</span>
                <span
                  className="text-2xl text-purple/40 group-hover:text-purple/70 transition-colors duration-300"
                  aria-hidden
                >
                  {p.icon}
                </span>
              </div>

              {/* Code annotation */}
              <p className="font-mono text-[10px] text-text-4 mb-3 tracking-wider opacity-50">
                // {p.title.toLowerCase().replace(/ /g, '_')}
              </p>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-text-1 mb-4 tracking-[0.01em] group-hover:text-purple-pale transition-colors duration-300">
                {p.title}
              </h3>

              {/* Body */}
              <p className="text-base text-text-3 leading-relaxed">
                {p.body}
              </p>

              {/* Bottom accent line — appears on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-purple/50 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
