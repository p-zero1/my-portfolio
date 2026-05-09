'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  once?: boolean
}

export default function RevealOnScroll({
  children,
  delay = 0,
  direction = 'up',
  className,
  once = true,
}: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-8% 0px' })

  const getInitial = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 32 }
      case 'down': return { opacity: 0, y: -32 }
      case 'left': return { opacity: 0, x: 32 }
      case 'right': return { opacity: 0, x: -32 }
      case 'none': return { opacity: 0 }
    }
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={getInitial()}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : getInitial()}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.0, 0.0, 0.2, 1.0],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
