'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { LazyCore } from '@/components/three/lazy-core'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { systemNodes } from '@/data/system'
import { cn } from '@/lib/utils'

export function System() {
  const [active, setActive] = useState<string | null>(null)
  const activeNode = systemNodes.find((n) => n.id === active) ?? null

  // Radial positions (percentages of the ring container).
  const positioned = systemNodes.map((node, i) => {
    const angle = (i / systemNodes.length) * Math.PI * 2 - Math.PI / 2
    return {
      node,
      x: 50 + Math.cos(angle) * 42,
      y: 50 + Math.sin(angle) * 42,
    }
  })

  return (
    <section id="system" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow="The System" title="I think in systems, not scripts.">
            A collection of software systems built to connect people, data, marketplaces and
            operations.
          </SectionHeading>
        </Reveal>

        {/* Desktop / tablet: radial constellation */}
        <div className="mt-16 hidden md:block">
          <div className="relative mx-auto aspect-square w-full max-w-2xl">
            {/* connection lines */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {positioned.map(({ node, x, y }) => (
                <line
                  key={node.id}
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth={active === node.id ? 0.4 : 0.15}
                  className={cn(
                    'transition-all duration-300',
                    active === node.id ? 'text-cyan' : 'text-border',
                  )}
                  strokeDasharray={active === node.id ? '0' : '1 1.5'}
                />
              ))}
            </svg>

            {/* central core */}
            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2">
              <LazyCore className="h-full w-full" interactive={false} />
            </div>

            {/* nodes */}
            {positioned.map(({ node, x, y }) => (
              <button
                key={node.id}
                type="button"
                onMouseEnter={() => setActive(node.id)}
                onFocus={() => setActive(node.id)}
                onMouseLeave={() => setActive((cur) => (cur === node.id ? null : cur))}
                onBlur={() => setActive((cur) => (cur === node.id ? null : cur))}
                aria-label={`${node.label} systems`}
                className="group absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span
                  className={cn(
                    'flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] backdrop-blur transition-all duration-300',
                    active === node.id
                      ? 'border-cyan/60 bg-cyan/10 text-foreground scale-110'
                      : 'border-border bg-background/70 text-muted-foreground group-hover:text-foreground',
                  )}
                >
                  <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full transition-colors',
                      active === node.id ? 'bg-cyan' : 'bg-muted-foreground',
                    )}
                  />
                  {node.label}
                </span>
              </button>
            ))}
          </div>

          {/* detail panel */}
          <div className="mx-auto mt-4 min-h-32 max-w-2xl">
            <AnimatePresence mode="wait">
              {activeNode ? (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="glass rounded-2xl p-6"
                >
                  <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-cyan">
                    {activeNode.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {activeNode.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {activeNode.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border px-3 py-1 text-xs text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Hover a node to inspect the system
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: accessible accordion list */}
        <div className="mt-12 grid gap-3 md:hidden">
          {systemNodes.map((node) => {
            const isOpen = active === node.id
            return (
              <div key={node.id} className="glass overflow-hidden rounded-2xl">
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? null : node.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em]">
                    <span
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        isOpen ? 'bg-cyan' : 'bg-muted-foreground',
                      )}
                    />
                    {node.label}
                  </span>
                  <span className="text-cyan">{isOpen ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {node.description}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {node.items.map((item) => (
                            <li
                              key={item}
                              className="rounded-full border border-border px-3 py-1 text-xs"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
