'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Code2, ArrowUpRight, ImageIcon } from 'lucide-react'
import type { Project } from '@/data/projects'
import { FlowDiagram } from '@/components/ui/flow-diagram'
import { EASE_OUT } from '@/lib/motion'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">{title}</h4>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto overscroll-contain p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} details`}
        >
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="fixed inset-0 -z-10 h-full w-full cursor-default bg-background/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="glass relative my-6 w-full max-w-4xl rounded-3xl p-6 sm:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
                  {project.index} — {project.category}
                </span>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {project.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border transition-colors hover:border-cyan/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            {/* Media placeholder */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface/50 text-muted-foreground">
                <ImageIcon className="h-6 w-6" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                  Screenshot placeholder
                </span>
              </div>
              <div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface/50 text-muted-foreground">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                  Demo placeholder
                </span>
              </div>
            </div>

            {/* Architecture */}
            {project.architecture && (
              <div className="mt-10">
                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
                  Architecture
                </h4>
                <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-surface/40 p-5">
                  <FlowDiagram steps={project.architecture} />
                </div>
              </div>
            )}

            {/* Grouped details */}
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {project.features && <DetailBlock title="Features" items={project.features} />}
              {project.capabilities && (
                <DetailBlock title="Capabilities" items={project.capabilities} />
              )}
              {project.platforms && <DetailBlock title="Platforms" items={project.platforms} />}
              {project.include && <DetailBlock title="Includes" items={project.include} />}
              <DetailBlock title="Technology" items={project.technologies} />
            </div>

            {/* Links */}
            <div className="mt-10 flex flex-wrap gap-3 border-t border-border pt-6">
              <a
                href={project.links.demo ?? '#'}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-background transition-colors hover:bg-cyan"
              >
                View Demo <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={project.links.github ?? '#'}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors hover:border-cyan/40"
              >
                <Code2 className="h-3.5 w-3.5" /> GitHub
              </a>
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Links are placeholders — easy to update in data/projects.ts
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
