'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { FlowDiagram } from '@/components/ui/flow-diagram'

const process = [
  'Understand the problem.',
  'Design the system.',
  'Build the solution.',
  'Automate the repetition.',
]

export function Story() {
  return (
    <section id="about" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <div className="mb-8 flex items-center gap-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-cyan/30 bg-surface shadow-[0_0_40px_color-mix(in_oklch,var(--cyan)_10%,transparent)]">
                  <Image
                    src="/profile.jpg"
                    alt="Florencevic Pondaag"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan">About</p>
                  <p className="mt-1 text-lg font-semibold tracking-tight">Florencevic Pondaag</p>
                  <p className="text-sm text-muted-foreground">Technology &amp; E-Commerce Manager</p>
                </div>
              </div>
              <SectionHeading eyebrow="Why I Build" title="Business first. Technology second." />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-pretty leading-relaxed text-muted-foreground">
                <p>
                  I come from a hands-on background in retail, e-commerce and store operations,
                  and I use that experience to build practical technology for real business problems.
                </p>
                <p>
                  My work sits between operations and software — from marketplace automation and
                  inventory systems to AI-assisted workflows, mobile tools and full-stack applications.
                </p>
                <p className="text-foreground">
                  I don&apos;t start with technology. I start with the problem, then build the system that solves it.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:pt-16">
            <div className="glass rounded-3xl p-8 md:p-10">
              <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
                How I work
              </p>
              <ol className="space-y-0">
                {process.map((step, i) => (
                  <li key={step} className="flex flex-col">
                    <div className="flex items-center gap-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cyan/30 font-mono text-xs text-cyan">
                        {i + 1}
                      </span>
                      <span className="text-lg font-medium tracking-tight">{step}</span>
                    </div>
                    {i < process.length - 1 && (
                      <span
                        className="ml-[17px] h-8 w-px bg-gradient-to-b from-cyan/40 to-transparent"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 overflow-x-auto rounded-2xl border border-border bg-surface/30 p-6">
            <FlowDiagram steps={process.map((p) => p.replace('.', '').toUpperCase())} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
