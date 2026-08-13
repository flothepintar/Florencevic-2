'use client'

import { Mail, MessageCircle, Instagram } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { site } from '@/data/site'

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-border py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute bottom-0 left-1/2 h-[60vh] w-[80vh] -translate-x-1/2 translate-y-1/3 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--cyan) 20%, transparent), transparent 70%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan">
            Contact
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-gradient sm:text-6xl md:text-7xl">
            Let&apos;s build something useful.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Have a problem worth solving, a system worth improving, or an idea worth building?
            Reach me directly by email or WhatsApp.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <MagneticButton href={site.links.whatsapp}>
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </MagneticButton>
            <MagneticButton href={site.links.email} variant="ghost">
              <Mail className="h-4 w-4" />
              Email Me
            </MagneticButton>
            <MagneticButton href={site.links.instagram} variant="ghost">
              <Instagram className="h-4 w-4" />
              @yoflorencevic
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-col items-center gap-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>florenspondaag19@gmail.com</span>
            <span>+62 878-6877-1451</span>
          </div>
        </Reveal>
      </div>

      <footer className="relative mx-auto mt-24 max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <span className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em]">
            <span className="grid h-7 w-7 place-items-center rounded-md border border-cyan/30 text-cyan">
              {site.initials}
            </span>
            {site.name}
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {site.role} · {site.location}
          </p>
        </div>
      </footer>
    </section>
  )
}
