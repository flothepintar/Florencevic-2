'use client'

import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { TiltCard } from '@/components/ui/tilt-card'
import { techGroups } from '@/data/technologies'

export function TechStack() {
  return (
    <section className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow="The Tools I Build With" title="A focused, practical toolkit.">
            Grouped by purpose — the languages, platforms and systems I actually build with.
          </SectionHeading>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techGroups.map((group, i) => (
            <Reveal key={group.id} delay={(i % 3) * 0.06}>
              <TiltCard intensity={6} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-cyan/40">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-border bg-surface/60 px-3 py-1.5 text-xs text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
