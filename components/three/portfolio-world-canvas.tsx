'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PortfolioWorld } from './portfolio-world'
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/use-media'

export function PortfolioWorldCanvas() {
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Canvas
      camera={{ position: [0, 0, isMobile ? 8.7 : 7.2], fov: isMobile ? 52 : 43 }}
      dpr={isMobile ? 1 : [1, 1.6]}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <Suspense fallback={null}>
        <PortfolioWorld reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  )
}
