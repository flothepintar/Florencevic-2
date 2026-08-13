'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { DigitalCore } from './digital-core'
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/use-media'

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/** Elegant CSS-only fallback shown when WebGL is unavailable. */
function CoreFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center" aria-hidden="true">
      <div className="relative h-56 w-56 md:h-72 md:w-72">
        <div className="absolute inset-0 rounded-full border border-cyan/20" />
        <div className="absolute inset-6 rounded-full border border-cyan/15" />
        <div className="absolute inset-12 rounded-full border border-cyan/10" />
        <div
          className="absolute inset-16 rounded-full opacity-70 blur-xl"
          style={{
            background:
              'radial-gradient(circle at 40% 35%, color-mix(in oklch, var(--cyan) 45%, transparent), transparent 70%)',
          }}
        />
        <div className="absolute inset-[38%] rounded-full bg-cyan/30 blur-md" />
      </div>
    </div>
  )
}

interface CoreCanvasProps {
  className?: string
  /** Interactive scenes track the pointer; set false for background instances. */
  interactive?: boolean
}

export function CoreCanvas({ className, interactive = true }: CoreCanvasProps) {
  const [mounted, setMounted] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(true)
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    setMounted(true)
    setHasWebGL(detectWebGL())
  }, [])

  if (!mounted) {
    return <div className={className} aria-hidden="true" />
  }

  if (!hasWebGL) {
    return (
      <div className={className}>
        <CoreFallback />
      </div>
    )
  }

  const particleCount = isMobile ? 220 : 600

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reducedMotion ? 'demand' : 'always'}
        style={{ pointerEvents: interactive ? 'auto' : 'none' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#e0f7ff" />
        <pointLight position={[-6, -2, -4]} intensity={2} color="#22d3ee" />
        <pointLight position={[4, 3, 2]} intensity={1} color="#ffffff" />

        <Suspense fallback={null}>
          <DigitalCore particleCount={particleCount} reducedMotion={reducedMotion} />
          <Environment resolution={128} frames={reducedMotion ? 1 : undefined}>
            <Lightformer
              intensity={2}
              position={[0, 3, 2]}
              scale={[6, 3, 1]}
              color="#22d3ee"
            />
            <Lightformer
              intensity={1.2}
              position={[-3, -2, -2]}
              scale={[4, 4, 1]}
              color="#ffffff"
            />
            <Lightformer
              intensity={0.8}
              position={[3, -1, 3]}
              scale={[3, 3, 1]}
              color="#7dd3fc"
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  )
}
