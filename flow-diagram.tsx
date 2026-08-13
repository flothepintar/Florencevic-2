'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface FlowDiagramProps {
  steps: string[]
  className?: string
  orientation?: 'vertical' | 'auto'
}

/** Animated architecture diagram — steps connected by flowing lines. */
export function FlowDiagram({ steps, className, orientation = 'auto' }: FlowDiagramProps) {
  return (
    <ol
      className={cn(
        'flex flex-col items-stretch gap-0',
        orientation === 'auto' && 'md:flex-row md:items-center md:gap-0',
        className,
      )}
    >
      {steps.map((step, i) => (
        <li
          key={step}
          className={cn(
            'flex items-center',
            orientation === 'auto' ? 'flex-col md:flex-row' : 'flex-col',
          )}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="whitespace-nowrap rounded-lg border border-border bg-surface px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-foreground"
          >
            {step}
          </motion.span>
          {i < steps.length - 1 && (
            <span
              className={cn(
                'relative bg-gradient-to-b from-cyan/50 to-cyan/10',
                orientation === 'auto'
                  ? 'h-6 w-px md:h-px md:w-8 md:bg-gradient-to-r'
                  : 'h-6 w-px',
              )}
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  )
}
