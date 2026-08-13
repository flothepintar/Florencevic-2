'use client'

import { motion } from 'motion/react'
import { Reveal } from '@/components/ui/reveal'

// Non-executable, illustrative workflow fragments (not production code).
const fragments = [
  'schedule.every("15m").run(pollOrders)',
  'if stock < 0: queue.correct(sku)',
  'lead.score = model.rank(signals)',
  'on("order.new") -> process -> label',
  'sync(catalog).to(marketplaces)',
  'retry(task, backoff="exponential")',
  'watch(warehouse).alert(threshold)',
  'draft = llm.respond(context)',
]

export function Philosophy() {
  return (
    <section className="relative overflow-hidden border-t border-border py-28 md:py-40">
      {/* Animated background fragments */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        {fragments.map((f, i) => (
          <motion.p
            key={f}
            className="absolute whitespace-nowrap font-mono text-xs text-muted-foreground/25"
            style={{ top: `${8 + i * 11}%`, left: `${(i % 3) * 30 + 4}%` }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.06 }}
          >
            {f}
          </motion.p>
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, transparent 20%, var(--background) 78%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan">
            Automation Philosophy
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-balance text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            If a human has to do it repeatedly, it can probably be automated.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            I enjoy finding repetitive, disconnected or error-prone processes and turning them into
            reliable software systems.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
