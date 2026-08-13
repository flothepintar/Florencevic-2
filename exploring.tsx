'use client'

import { exploring } from '@/data/experience'

export function Exploring() {
  // Duplicate the list so the marquee loops seamlessly.
  const loop = [...exploring, ...exploring]

  return (
    <section className="relative overflow-hidden border-t border-border py-16">
      <div className="mx-auto mb-8 max-w-6xl px-6">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-dot" />
          Currently Exploring
        </p>
      </div>

      <div
        className="relative flex overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="animate-marquee flex shrink-0 items-center gap-6 pr-6">
          {loop.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-6">
              <span className="whitespace-nowrap text-2xl font-semibold tracking-tight text-muted-foreground md:text-4xl">
                {item}
              </span>
              <span className="text-cyan/50" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
