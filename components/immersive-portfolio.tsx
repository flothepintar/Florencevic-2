'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight, X } from 'lucide-react'
import { LazyPortfolioWorld } from '@/components/three/lazy-portfolio-world'
import { experience } from '@/data/experience'
import { featuredCaseStudyById } from '@/data/featured-case-studies'
import { site } from '@/data/site'
import { systemArchive } from '@/data/system-archive'

const featuredProjects = systemArchive.slice(0, 5)

const chapters = [
  { id: 'origin', label: 'Origin' },
  { id: 'practice', label: 'Practice' },
  ...featuredProjects.map((project) => ({ id: project.id, label: project.code })),
  { id: 'constellation', label: 'Archive' },
  { id: 'trajectory', label: 'Path' },
  { id: 'contact', label: 'Contact' },
]

const systemFilters = ['Commerce', 'Inventory', 'Intelligence', 'Mobile', 'Agents']

const operationalUniverseNodes = [
  { projectId: 'omni-channel-manager', x: '50%', y: '18%', tone: 'cyan' },
  { projectId: 'warehouse-sync', x: '20%', y: '36%', tone: 'lime' },
  { projectId: 'fulfillment-engine', x: '80%', y: '36%', tone: 'cyan' },
  { projectId: 'inbound-ledger', x: '20%', y: '78%', tone: 'cyan' },
  { projectId: 'negative-stock-guard', x: '80%', y: '78%', tone: 'violet' },
] as const

export function ImmersivePortfolio() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [activeScene, setActiveScene] = useState('origin')
  const [loadProgress, setLoadProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const caseStudyCloseRef = useRef<HTMLButtonElement>(null)
  const caseStudyTriggerRef = useRef<HTMLButtonElement>(null)
  const activeIndex = Math.max(0, chapters.findIndex((chapter) => chapter.id === activeScene))
  const selectedProject = featuredProjects.find((project) => project.id === selectedProjectId)
  const selectedCaseStudy = selectedProjectId
    ? featuredCaseStudyById.get(selectedProjectId)
    : undefined

  const archiveGroups = useMemo(() => {
    const groups = new Map<string, typeof systemArchive>()
    systemArchive.forEach((system) => {
      const key = system.code.split('-')[0]
      groups.set(key, [...(groups.get(key) ?? []), system])
    })
    return [...groups.entries()]
  }, [])

  useEffect(() => {
    let current = 0
    const timer = window.setInterval(() => {
      current += current < 70 ? 8 : current < 92 ? 3 : 1
      if (current >= 100) {
        current = 100
        window.clearInterval(timer)
        window.setTimeout(() => setIsLoaded(true), 260)
      }
      setLoadProgress(current)
    }, 48)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!selectedProjectId) return

    const previousOverflow = document.body.style.overflow
    const focusFrame = window.requestAnimationFrame(() => caseStudyCloseRef.current?.focus())
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProjectId(null)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
      caseStudyTriggerRef.current?.focus()
    }
  }, [selectedProjectId])

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((element): element is HTMLElement => Boolean(element))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveScene(visible.target.id)
      },
      { threshold: [0.22, 0.5, 0.72] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      rootRef.current?.style.setProperty('--journey-progress', `${progress}`)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      ref={rootRef}
      className="journey-shell"
      data-loaded={isLoaded}
      data-active-scene={activeScene}
    >
      <div className="journey-loader" aria-hidden={isLoaded}>
        <div className="loader-signal">
          <span>FP</span>
          <i style={{ '--load': loadProgress } as React.CSSProperties}>{loadProgress}</i>
        </div>
        <p>Constructing system world</p>
      </div>

      <a className="journey-skip" href="#practice">
        Skip experience
      </a>

      <div className="journey-canvas" aria-hidden="true">
        <LazyPortfolioWorld />
      </div>
      <div className="journey-atmosphere" aria-hidden="true" />
      <div className="journey-grain" aria-hidden="true" />

      <header className="journey-header">
        <a className="journey-mark" href="#origin" aria-label="Return to origin">
          <span>{site.initials}</span>
          <small>FL / SYSTEMS</small>
        </a>

        <div className="journey-coordinates" aria-hidden="true">
          <span>08.6811° S</span>
          <span>115.1608° E</span>
        </div>

        <nav className="journey-nav" aria-label="Primary navigation">
          <a href="#omni-channel-manager">Work</a>
          <i aria-hidden="true" />
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <aside className="journey-chapters" aria-label="Journey chapters">
        {chapters.map((chapter, index) => (
          <a
            href={`#${chapter.id}`}
            key={chapter.id}
            aria-current={chapter.id === activeScene ? 'location' : undefined}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <small>{chapter.label}</small>
          </a>
        ))}
      </aside>

      <aside className="system-selector" aria-label="System disciplines">
        <p>Explore the system</p>
        {systemFilters.map((filter, index) => (
          <span key={filter} data-active={index === activeIndex % systemFilters.length}>
            → {filter}
          </span>
        ))}
        <a href="#constellation">Open all signals</a>
      </aside>

      <div className="journey-progress" aria-hidden="true">
        <span />
      </div>

      <main className="journey-main">
        <section id="origin" className="journey-scene journey-origin" data-scene>
          <div
            className="origin-universe"
            role="group"
            aria-label="Interactive operational universe"
          >
            <div className="origin-universe-media" aria-hidden="true">
              <Image
                src="/og-operational-systems.png"
                alt=""
                fill
                priority
                sizes="(max-width: 640px) 118vw, (max-width: 1200px) 82vw, 1248px"
              />
            </div>
            <p className="origin-universe-instruction">
              <span>Select a live node</span>
              <small>Tap to inspect the system</small>
            </p>
            {operationalUniverseNodes.map((node) => {
              const project = featuredProjects.find((item) => item.id === node.projectId)
              if (!project) return null

              return (
                <button
                  className="universe-node"
                  data-tone={node.tone}
                  type="button"
                  key={node.projectId}
                  style={
                    {
                      '--node-x': node.x,
                      '--node-y': node.y,
                    } as React.CSSProperties
                  }
                  aria-label={`Open ${project.name} case study`}
                  onClick={(event) => {
                    caseStudyTriggerRef.current = event.currentTarget
                    setSelectedProjectId(project.id)
                  }}
                >
                  <span className="universe-node-core" aria-hidden="true" />
                  <span className="universe-node-label">
                    <small>{project.code}</small>
                    <strong>{project.name}</strong>
                  </span>
                </button>
              )
            })}
          </div>
          <div className="origin-intro">
            <span>Interactive systems portfolio · Bali, Indonesia</span>
            <p>{site.role}</p>
            <h1>
              <span>Florencevic</span>
              <span>Pondaag</span>
            </h1>
          </div>
          <div className="origin-actions" aria-label="Portfolio actions">
            <a href="#omni-channel-manager">
              Explore selected system <ArrowDown aria-hidden="true" />
            </a>
            <a href="#contact">
              Discuss an operation <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <a className="journey-scroll" href="#practice">
            <span>Scroll to travel</span>
            <ArrowDown aria-hidden="true" />
          </a>
        </section>

        <section id="practice" className="journey-scene journey-practice" data-scene>
          <div className="scene-copy scene-copy-left">
            <span className="scene-kicker">01 / Practice</span>
            <h2>Systems that operate.</h2>
            <p>
              I transform disconnected commerce, inventory, and operational work into dependable
              software that keeps moving when nobody is watching.
            </p>
          </div>
        </section>

        {featuredProjects.map((project, index) => (
          <section
            id={project.id}
            className={`journey-scene journey-project project-${index + 1}`}
            data-scene
            key={project.id}
          >
            <div className={`scene-copy ${index % 2 ? 'scene-copy-left' : 'scene-copy-right'}`}>
              <div className="project-signal">
                <span>{project.code}</span>
                <span>{String(index + 1).padStart(2, '0')} / 05</span>
              </div>
              <small>{project.group}</small>
              <h2>{project.name}</h2>
              <p>{project.summary}</p>
              <div className="project-tech">
                {project.technologies.slice(0, 4).map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
              <button
                className="project-explore"
                type="button"
                onClick={(event) => {
                  caseStudyTriggerRef.current = event.currentTarget
                  setSelectedProjectId(project.id)
                }}
              >
                Explore selected system <ArrowUpRight aria-hidden="true" />
              </button>
            </div>
          </section>
        ))}

        <section id="constellation" className="journey-scene journey-archive" data-scene>
          <div className="archive-intro">
            <span className="scene-kicker">07 / Complete constellation</span>
            <h2>{systemArchive.length} systems. One operational universe.</h2>
            <p>
              Every signal below comes from a working automation, application, agent, or
              operational tool found in the workspace.
            </p>
          </div>

          <div className="constellation-list">
            {archiveGroups.map(([group, systems]) => (
              <div key={group}>
                <span>{group}</span>
                <ul>
                  {systems.map((system) => (
                    <li key={system.id}>
                      <small>{system.code}</small>
                      <strong>{system.name}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="trajectory" className="journey-scene journey-trajectory" data-scene>
          <div className="scene-copy scene-copy-left">
            <span className="scene-kicker">08 / Human trajectory</span>
            <h2>Built inside the operation.</h2>
            {experience.map((item) => (
              <div className="trajectory-card" key={`${item.year}-${item.company}`}>
                <span>{item.year}</span>
                <div>
                  <strong>{item.role}</strong>
                  <small>{item.company}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="journey-scene journey-contact" data-scene>
          <div className="contact-stage">
            <span>Open channel / 09</span>
            <p>Have an operation worth transforming?</p>
            <h2>Let&apos;s build the system.</h2>
            <div>
              <a href={site.links.whatsapp} target="_blank" rel="noreferrer">
                Direct message <ArrowUpRight aria-hidden="true" />
              </a>
              <a href={site.links.email}>
                Email <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
          <footer>
            <span>© {new Date().getFullYear()} Florencevic Pondaag</span>
            <span>Technology · Automation · Commerce</span>
            <a href="#origin">Return to origin ↑</a>
          </footer>
        </section>
      </main>

      {selectedProject && selectedCaseStudy ? (
        <div
          className="case-study-layer"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProjectId(null)
          }}
        >
          <article
            className="case-study-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`case-study-title-${selectedProject.id}`}
            onKeyDown={(event) => {
              if (event.key !== 'Tab') return

              const focusable = Array.from(
                event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
              )
              const first = focusable[0]
              const last = focusable.at(-1)

              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault()
                last?.focus()
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first?.focus()
              }
            }}
          >
            <header>
              <div>
                <span>{selectedProject.code} / System detail</span>
                <h2 id={`case-study-title-${selectedProject.id}`}>{selectedProject.name}</h2>
              </div>
              <button
                ref={caseStudyCloseRef}
                type="button"
                aria-label="Close system detail"
                onClick={() => setSelectedProjectId(null)}
              >
                <X aria-hidden="true" />
              </button>
            </header>

            <div className="case-study-metrics" aria-label="Verified system indicators">
              {selectedCaseStudy.metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                  <small>{metric.context}</small>
                </div>
              ))}
            </div>

            <div className="case-study-grid">
              <section>
                <span>01 / Problem</span>
                <p>{selectedCaseStudy.challenge}</p>
              </section>
              <section>
                <span>02 / Solution</span>
                <p>{selectedCaseStudy.solution}</p>
              </section>
              <section>
                <span>03 / My role</span>
                <p>{selectedCaseStudy.role}</p>
              </section>
              <section className="case-study-architecture">
                <span>04 / Architecture</span>
                <ol>
                  {selectedCaseStudy.architecture.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>
              <section className="case-study-impact">
                <span>05 / Impact</span>
                <p>{selectedCaseStudy.impact}</p>
              </section>
            </div>

            <footer>
              <small>
                Indicators describe verified configuration and system scope, not private production volume.
              </small>
              <a href="#contact" onClick={() => setSelectedProjectId(null)}>
                Discuss an operation <ArrowUpRight aria-hidden="true" />
              </a>
            </footer>
          </article>
        </div>
      ) : null}
    </div>
  )
}
