'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_OUT } from '@/lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'section' | 'li' | 'span'
}

/** Fades + lifts content into view once, honoring reduced motion automatically
 *  via Motion's respect for prefers-reduced-motion on the transform. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}
