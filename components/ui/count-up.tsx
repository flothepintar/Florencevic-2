'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { usePrefersReducedMotion } from '@/hooks/use-media'

interface CountUpProps {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

/** Animates a number from 0 to `value` when it enters the viewport. */
export function CountUp({ value, suffix = '', duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = usePrefersReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(value)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setDisplay(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
