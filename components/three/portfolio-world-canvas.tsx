'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PortfolioWorld } from './portfolio-world'
import { PortfolioWorldFallback } from './portfolio-world-fallback'
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/use-media'

type NavigatorWithDeviceHints = Navigator & {
  deviceMemory?: number
  connection?: { saveData?: boolean }
}

function shouldUseLiteRenderer(reducedMotion: boolean) {
  if (new URLSearchParams(window.location.search).get('lite') === '1') return true

  const navigatorWithHints = navigator as NavigatorWithDeviceHints
  const constrainedDevice =
    (navigatorWithHints.deviceMemory !== undefined && navigatorWithHints.deviceMemory <= 2) ||
    navigator.hardwareConcurrency <= 2 ||
    navigatorWithHints.connection?.saveData === true

  if (constrainedDevice || reducedMotion) return true

  try {
    const testCanvas = document.createElement('canvas')
    const contextOptions = { failIfMajorPerformanceCaveat: true }
    return !(
      testCanvas.getContext('webgl2', contextOptions) ||
      testCanvas.getContext('webgl', contextOptions)
    )
  } catch {
    return true
  }
}

export function PortfolioWorldCanvas() {
  const [mounted, setMounted] = useState(false)
  const [useLiteRenderer, setUseLiteRenderer] = useState(false)
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    setUseLiteRenderer(shouldUseLiteRenderer(reducedMotion))
    setMounted(true)
  }, [reducedMotion])

  if (!mounted) return null
  if (useLiteRenderer) return <PortfolioWorldFallback />

  return (
    <Canvas
      camera={{ position: [0, 0, isMobile ? 8.7 : 7.2], fov: isMobile ? 52 : 43 }}
      dpr={isMobile ? 1 : [1, 1.6]}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reducedMotion ? 'demand' : 'always'}
      fallback={<PortfolioWorldFallback />}
    >
      <Suspense fallback={null}>
        <PortfolioWorld reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  )
}
