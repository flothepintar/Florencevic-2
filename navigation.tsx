'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { navItems, site } from '@/data/site'
import { cn } from '@/lib/utils'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          'pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500',
          scrolled ? 'glass shadow-lg shadow-black/40' : 'border border-transparent',
        )}
      >
        <a
          href="#top"
          className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold tracking-[0.2em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md border border-cyan/30 text-cyan">
            {site.initials}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {site.available && (
            <span className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground lg:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-dot" />
              {site.availabilityText}
            </span>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-cyan/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto absolute top-20 w-[calc(100%-2rem)] max-w-5xl md:hidden"
          >
            <ul className="glass flex flex-col gap-1 rounded-2xl p-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {site.available && (
                <li className="flex items-center gap-2 px-4 py-3 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-dot" />
                  {site.availabilityText}
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
