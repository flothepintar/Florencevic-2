'use client'

import dynamic from 'next/dynamic'

export const LazyPortfolioWorld = dynamic(
  () => import('./portfolio-world-canvas').then((module) => module.PortfolioWorldCanvas),
  { ssr: false },
)
