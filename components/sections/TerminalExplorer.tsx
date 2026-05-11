'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { labs } from '@/content/labs'
import type { LabProject } from '@/lib/types'

const STATUS_CONFIG = {
  active:    { color: '#00ff88', label: 'active',    bg: 'rgba(0,255,136,0.08)' },
  building:  { color: '#a78bfa', label: 'building',  bg: 'rgba(167,139,250,0.08)' },
  archived:  { color: '#475569', label: 'archived',  bg: 'rgba(71,85,105,0.08)' },
  idea:      { color: '#d946ef', label: 'idea',      bg: 'rgba(217,70,239,0.08)' },
}

export default function TerminalExplorer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const [selected, setSelected] = useState<LabProject | null>(null)
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<string>('all')
  const [history, setHistory] = useState<string[]>(['Initialized terminal. Type ls or click to explore.'])
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = filter === 'all' ? labs : labs.filter(l => l.status === filter)

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    setInput('')

    if (trimmed === 'ls' || trimmed === 'ls -la') {
      setHistory(prev => [...prev, `$ ${cmd}`, ...labs.map(l =>
        `${l.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--'}  ${l.name}`
      )])
      setSelected(null)
      return
    }

    if (trimmed === 'clear') {
      setHistory(['Terminal cleared.'])
      setSelected(null)
      return
    }

    const catMatch = trimmed.match(/^cat (.+)$/)
    const openMatch = trimmed.match(/^open (.+)$/)
    const slug = (catMatch || openMatch)?.[1]?.replace(/\/$/, '')

    if (slug) {
      const project = labs.find(l => l.slug === slug || l.name === slug || l.name.replace('.md', '') === slug)
      if (project) {
        setSelected(project)
        setHistory(prev => [...prev, `$ ${cmd}`, `→ Opening ${project.name}...`])
      } else {
        setHistory(prev => [...prev, `$ ${cmd}`, `bash: ${slug}: No such file or directory`])
      }
      return
    }

    setHistory(prev => [...prev, `$ ${cmd}`, `bash: ${trimmed}: command not found. Try: ls, cat <name>, clear`])
  }

  useEffect(() => {
    const el = document.querySelector('.terminal-history')
    if (el) el.scrollTop = el.scrollHeight
  }, [history])

  return (
    <section id="labs" className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 80%, rgba(124,58,237,0.04) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div ref={ref} className="section-container">
        <SectionLabel index="05" label="The Lab" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-1 tracking-[0.01em] leading-[1.08]">
            Projects & Explorations
          </h2>
          <p className="font-sans mt-4 text-base text-text-3 font-light">
            Experiments, tools, and systems. Use the terminal or click to explore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Terminal pane */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 glass-1 rounded-xl overflow-hidden flex flex-col"
            style={{ minHeight: '460px' }}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-elevated border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="font-mono text-xs text-text-4 ml-2">prasad@lab:~/projects</span>
            </div>

            {/* History output */}
            <div
              className="terminal-history flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1"
              style={{ maxHeight: '280px' }}
            >
              {history.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith('$') ? 'text-text-2' :
                    line.startsWith('✓') || line.startsWith('→') ? 'text-terminal' :
                    line.startsWith('drwx') || line.startsWith('-rw') ? 'text-text-3' :
                    line.startsWith('bash:') ? 'text-red-400' :
                    'text-text-4'
                  }
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-t border-white/5 cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              <span className="font-mono text-xs text-purple-light shrink-0">
                prasad@lab:~/projects$
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && input.trim()) handleCommand(input)
                }}
                className="flex-1 bg-transparent font-mono text-xs text-text-1 outline-none caret-terminal"
                placeholder="ls"
                spellCheck={false}
                autoComplete="off"
              />
              <span className="cursor-blink shrink-0" style={{ width: '6px', height: '13px' }} />
            </div>
          </motion.div>

          {/* File listing + detail */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="lg:col-span-2 space-y-3"
          >
            {/* Filter tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {(['all', 'active', 'building', 'idea', 'archived'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all duration-200 ${
                    filter === f
                      ? 'bg-purple/20 text-purple-light border border-purple/40'
                      : 'text-text-4 border border-white/8 hover:border-white/15 hover:text-text-3'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Project cards */}
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    onClick={() => setSelected(selected?.slug === project.slug ? null : project)}
                    className="group cursor-pointer glass-1 rounded-xl p-4 hover:border-purple/25 transition-all duration-200"
                    style={{
                      borderColor: selected?.slug === project.slug ? 'rgba(124,58,237,0.35)' : undefined,
                      background: selected?.slug === project.slug ? 'rgba(124,58,237,0.04)' : undefined,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* File type icon */}
                      <span className="font-mono text-xs text-text-4 mt-0.5 shrink-0 w-4">
                        {project.type === 'dir' ? '📁' : '📄'}
                      </span>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-sm text-text-1 group-hover:text-purple-pale transition-colors">
                            {project.name}
                          </span>
                          <span
                            className="font-mono text-[10px] px-2 py-0.5 rounded"
                            style={{
                              color: STATUS_CONFIG[project.status].color,
                              background: STATUS_CONFIG[project.status].bg,
                            }}
                          >
                            {project.status}
                          </span>
                        </div>
                        <p className="text-xs text-text-3 mt-1 leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {project.tech.map(t => (
                            <span key={t} className="font-mono text-[10px] text-text-4 bg-elevated px-1.5 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <span className="font-mono text-[10px] text-text-4 shrink-0 tabular-nums">{project.date}</span>
                    </div>

                    {/* Expanded detail */}
                    <AnimatePresence>
                      {selected?.slug === project.slug && project.longDescription && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 mt-3 border-t border-white/5">
                            <p className="text-xs text-text-3 leading-relaxed">{project.longDescription}</p>
                            {project.github && (
                              <a
                                href={project.github}
                                className="inline-flex items-center gap-1.5 mt-2 font-mono text-xs text-purple-light hover:text-purple-pale transition-colors"
                              >
                                <span>→</span> View on GitHub
                              </a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
