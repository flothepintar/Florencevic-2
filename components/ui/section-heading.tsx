import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  children?: ReactNode
  className?: string
}

export function SectionHeading({ eyebrow, title, children, className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', className)}>
      {eyebrow && (
        <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan">
          <span className="h-px w-8 bg-cyan/50" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-3xl font-semibold leading-[1.02] tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {children && (
        <div className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  )
}
