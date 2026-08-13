'use client'

import { motion } from 'motion/react'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { experience } from '@/data/experience'

export function Experience() {
  return (
    <section id="experience" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow="Experience" title="Where the operational lens came from.">
            Years spent inside retail and operations — the source of the business perspective I
            bring to every system I build.
          </SectionHeading>
        </Reveal>

        <ol className="mt-16 border-l border-border">
          {experience.map((item, i) => (
            <motion.li
              key={`${item.year}-${item.company}`}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 pb-10 pl-8 last:pb-0 sm:grid-cols-[80px_1fr]"
            >
              <span
                className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-cyan/60 bg-background"
                aria-hidden="true"
              />
              <span className="font-mono text-sm text-cyan">{item.year}</span>
              <div className="col-start-1 sm:col-start-2 sm:row-start-1">
                <p className="text-base font-medium tracking-tight">{item.role}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{item.company}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
