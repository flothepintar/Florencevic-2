'use client'

import dynamic from 'next/dynamic'

/** Lazy-loaded, client-only 3D core. Keeps the R3F/three bundle out of the
 *  critical path so the page paints fast. */
export const LazyCore = dynamic(
  () => import('./core-canvas').then((m) => m.CoreCanvas),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" aria-hidden="true" />,
  },
)
