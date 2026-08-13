'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { caseStudies } from '@/data/caseStudies'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/utils'

const stages = [
  { key: 'problem', label: 'The Problem' },
  { key: 'approach', label: 'The Approach' },
  { key: 'system', label: 'The System' },
  { key: 'result', label: 'The Result' },
] as const

export function CaseStudies() {
  const [active, setActive] = useState(caseStudies[0].id)
  const current = caseStudies.find((c) => c.id === active) ?? caseStudies[0]

  return (
    <section className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow="From Problem → System" title="Every build starts with a problem.">
            Not a technology showcase — a record of friction being turned into reliable systems.
          </SectionHeading>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {caseStudies.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                className={cn(
                  'group flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:shrink',
                  active === c.id
                    ? 'border-cyan/50 bg-cyan/5'
                    : 'border-border hover:border-cyan/30',
                )}
              >
                <span className="font-mono text-[10px] text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={cn(
                    'whitespace-nowrap text-sm font-medium transition-colors lg:whitespace-normal',
                    active === c.id ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {c.title}
                </span>
              </button>
            ))}
          </div>

          {/* Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2"
            >
              {stages.map((stage, i) => (
                <div key={stage.key} className="relative bg-background p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-md border border-cyan/30 font-mono text-[10px] text-cyan">
                      {i + 1}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
                      {stage.label}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {current[stage.key]}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
