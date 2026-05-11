'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import { contact } from '@/content/contact'

export default function EOFSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="eof" className="relative py-20 pb-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(124,58,237,0.07) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div ref={ref} className="section-container">
        <SectionLabel index="07" label="EOF" />

        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-1 tracking-[0.01em] leading-[1.08] mb-5">
              {contact.heading.line1}
              <br />
              <span className="gradient-text">{contact.heading.line2}</span>
            </h2>
            <p className="font-sans text-base text-text-3 leading-relaxed mb-12 max-w-md font-light">
              {contact.description}
            </p>
          </motion.div>

          {/* Terminal-style contact block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-1 rounded-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-elevated border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="font-mono text-xs text-text-4 ml-2">{contact.terminalFile}</span>
            </div>

            {/* Contact entries */}
            <div className="p-4 space-y-2 font-mono text-sm">
              {contact.links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 group p-2 rounded-lg hover:bg-white/3 transition-all duration-200"
                >
                  <span className="text-terminal text-xs">$</span>
                  <span className="text-purple-light text-xs">{link.cmd}</span>
                  <span className="text-text-4 text-xs">--target</span>
                  <span className="text-text-2 text-xs group-hover:text-text-1 transition-colors">{link.value}</span>
                  <span className="ml-auto text-text-4 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                    → exec
                  </span>
                </motion.a>
              ))}

              {/* Resume download */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + contact.links.length * 0.1 }}
                className="pt-2 border-t border-white/5"
              >
                <a
                  href={`/${contact.resume.filename}`}
                  download
                  className="flex items-center gap-3 group p-2 rounded-lg hover:bg-white/3 transition-all duration-200"
                >
                  <span className="text-terminal text-xs">$</span>
                  <span className="text-fuchsia text-xs">download</span>
                  <span className="text-text-4 text-xs">--file</span>
                  <span className="text-text-2 text-xs group-hover:text-text-1 transition-colors">
                    {contact.resume.filename}
                  </span>
                  <span className="ml-auto font-mono text-[10px] text-terminal opacity-0 group-hover:opacity-100 transition-opacity">
                    ↓ {contact.resume.displaySize}
                  </span>
                </a>
              </motion.div>

              {/* Blinking cursor */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="p-2 flex items-center gap-3"
              >
                <span className="text-purple-light text-xs">{contact.prompt}</span>
                <span className="cursor-blink" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="section-container">
          <div className="flex items-center justify-between text-[11px] font-mono text-text-4">
            <span>{contact.footer.name} — {contact.footer.role}</span>
            <span>{contact.footer.location} · {contact.footer.year}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
