'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/use-media'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  className?: string
  ariaLabel?: string
}

/** A button/link with a subtle magnetic pull toward the cursor. */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  function handleMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * 0.25)
    y.set(relY * 0.25)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  const base = cn(
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    variant === 'primary'
      ? 'bg-foreground text-background hover:bg-cyan hover:text-background'
      : 'glass text-foreground hover:border-cyan/40',
    className,
  )

  const content = (
    <motion.span
      ref={ref as React.Ref<HTMLSpanElement>}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={base}
    >
      {children}
    </motion.span>
  )

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="inline-flex"
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className="inline-flex">
      {content}
    </button>
  )
}
