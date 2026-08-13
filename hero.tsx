'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'motion/react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'
import { LazyCore } from '@/components/three/lazy-core'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { site } from '@/data/site'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Hero recedes slightly as you scroll toward the System section.
  const coreScale = useTransform(scrollYProgress, [0, 1], [1, 0.72])
  const coreOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
  }

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--cyan) 22%, transparent), transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(circle at 50% 45%, black, transparent 75%)',
          }}
        />
      </div>

      {/* 3D core */}
      <motion.div
        style={{ scale: coreScale, opacity: coreOpacity }}
        className="absolute inset-0 z-0"
      >
        <LazyCore className="h-full w-full" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="pointer-events-none flex flex-col items-start"
        >
          <motion.p
            variants={item}
            className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan"
          >
            <span className="h-px w-8 bg-cyan/50" />
            {site.role}
          </motion.p>

          <motion.h1
            variants={item}
            className="text-pretty font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground"
          >
            {site.name}
          </motion.h1>

          <motion.h2
            variants={item}
            className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[0.98] tracking-tight text-gradient sm:text-6xl md:text-7xl lg:text-8xl"
          >
            I BUILD SOFTWARE THAT DOES THE WORK.
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            I build automation systems, AI workflows, e-commerce infrastructure, and digital tools
            that turn repetitive business work into reliable systems.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-cyan" />
              {site.location}
            </span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span>Full-Stack Development · Automation · AI · E-Commerce</span>
          </motion.div>

          <motion.div variants={item} className="pointer-events-auto mt-10 flex flex-wrap gap-3">
            <MagneticButton href="#builds">
              Explore My Builds
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Let&apos;s Connect
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span className="flex flex-col items-center gap-2">
          Scroll
          <span className="h-8 w-px bg-gradient-to-b from-cyan/60 to-transparent" />
        </span>
      </motion.div>
    </section>
  )
}
