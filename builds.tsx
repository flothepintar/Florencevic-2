'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects, type Project } from '@/data/projects'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { TiltCard } from '@/components/ui/tilt-card'
import { ProjectModal } from './project-modal'
import { cn } from '@/lib/utils'

export function Builds() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="builds" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow="Selected Builds" title="Software that removes friction.">
            I don&apos;t build software to demonstrate code. I build software to remove friction.
          </SectionHeading>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {projects.map((project, i) => {
            // Feature the first two builds full-width-ish on larger screens.
            const feature = i < 2
            return (
              <Reveal key={project.id} delay={(i % 2) * 0.06} className={cn(feature && 'sm:col-span-2')}>
                <TiltCard intensity={5} className="h-full">
                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                    className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 text-left transition-colors duration-500 hover:border-cyan/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-9"
                  >
                    {/* hover glow */}
                    <span
                      className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          'radial-gradient(circle, color-mix(in oklch, var(--cyan) 35%, transparent), transparent 70%)',
                      }}
                    />

                    <div className="relative flex items-start justify-between gap-4">
                      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
                        {project.category}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {project.index}
                      </span>
                    </div>

                    <h3
                      className={cn(
                        'relative mt-6 font-semibold tracking-tight text-gradient',
                        feature ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl',
                      )}
                    >
                      {project.name}
                    </h3>

                    <p className="relative mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="relative mt-6 flex flex-1 flex-wrap items-end gap-2">
                      {project.technologies.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="relative mt-8 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
                      View build
                      <ArrowUpRight className="h-3.5 w-3.5 text-cyan transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </button>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
