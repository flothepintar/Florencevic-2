'use client'

import { motion } from 'motion/react'
import { FlaskConical } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { labItems } from '@/data/buildLab'

export function BuildLab() {
  return (
    <section id="lab" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow="Build Lab" title="A laboratory of experiments.">
            Smaller utilities, one-off tools and experiments — the sketches between the systems.
          </SectionHeading>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {labItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
              className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-xl border border-border bg-card/60 p-5 transition-colors duration-300 hover:border-cyan/40"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors group-hover:border-cyan/40 group-hover:text-cyan">
                  <FlaskConical className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                {item.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
