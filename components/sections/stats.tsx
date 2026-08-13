'use client'

import { CountUp } from '@/components/ui/count-up'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { stats } from '@/data/stats'

export function Stats() {
  const [primary, ...rest] = stats

  return (
    <section id="about" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow="Built, not just written." title="A body of work, not a résumé.">
            A large collection of applications, automation tools, scripts, services and internal
            systems built around real operational problems.
          </SectionHeading>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {/* Feature the headline number */}
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <div className="flex h-full flex-col justify-between gap-8 bg-background p-8 md:p-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
                Total
              </span>
              <div>
                <CountUp
                  value={primary.value}
                  suffix={primary.suffix}
                  className="block text-6xl font-semibold tracking-tight text-gradient md:text-8xl"
                />
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {primary.label}
                </p>
              </div>
            </div>
          </Reveal>

          {rest.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="flex h-full flex-col justify-between gap-6 bg-background p-8">
                <CountUp
                  value={s.value}
                  suffix={s.suffix}
                  className="block text-4xl font-semibold tracking-tight md:text-5xl"
                />
                <p className="text-sm leading-relaxed text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
