'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/use-media'

interface TiltCardProps {
  children: ReactNode
  className?: string
  intensity?: number
}

/** Subtle 3D tilt toward the cursor. Disabled under reduced motion. */
export function TiltCard({ children, className, intensity = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), {
    stiffness: 150,
    damping: 18,
  })
  const ry = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), {
    stiffness: 150,
    damping: 18,
  })

  function handleMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function reset() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX: reduced ? 0 : rx, rotateY: reduced ? 0 : ry, transformPerspective: 900 }}
      className={cn('relative', className)}
    >
      {children}
    </motion.div>
  )
}
