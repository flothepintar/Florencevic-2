'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react'
import { LazyCore } from '@/components/three/lazy-core'
import { experience } from '@/data/experience'
import { site } from '@/data/site'
import { stats } from '@/data/stats'
import { systemArchive } from '@/data/system-archive'
import { techGroups } from '@/data/technologies'

const scenes = [
  { id: 'top', label: 'Origin' },
  { id: 'about', label: 'System' },
  { id: 'builds', label: 'Work' },
  { id: 'experience', label: 'Path' },
  { id: 'contact', label: 'Contact' },
] as const

const featuredProjects = systemArchive.slice(0, 5)
const featuredStats = [stats[0], stats[1], stats[2], stats[4]]

export function ImmersivePortfolio() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [activeScene, setActiveScene] = useState('top')
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.35,
  })
  const coreScale = useTransform(
    smoothProgress,
    [0, 0.16, 0.36, 0.62, 0.84, 1],
    [1, 0.72, 1.12, 0.82, 1.24, 0.64],
  )
  const coreY = useTransform(smoothProgress, [0, 0.3, 0.68, 1], ['0%', '-8%', '8%', '0%'])
  const coreRotate = useTransform(smoothProgress, [0, 1], [0, 38])
  const progressScale = useTransform(smoothProgress, [0, 1], [0, 1])

  useEffect(() => {
    const elements = scenes
      .map((scene) => document.getElementById(scene.id))
      .filter((element): element is HTMLElement => Boolean(element))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveScene(visible.target.id)
      },
      { threshold: [0.2, 0.45, 0.7] },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const move = (event: PointerEvent) => {
      root.style.setProperty('--pointer-x', `${(event.clientX / window.innerWidth) * 100}%`)
      root.style.setProperty('--pointer-y', `${(event.clientY / window.innerHeight) * 100}%`)
    }

    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <div ref={rootRef} className="experience-shell">
      <a className="skip-link" href="#about">
        Skip to portfolio
      </a>

      <div className="experience-backdrop" aria-hidden="true">
        <div className="experience-aura" />
        <div className="experience-grid" />
        <motion.div
          className="experience-core"
          style={{ scale: coreScale, y: coreY, rotate: coreRotate }}
        >
          <LazyCore className="h-full w-full" />
        </motion.div>
        <div className="experience-vignette" />
      </div>

      <motion.div className="scroll-progress" style={{ scaleY: progressScale }} aria-hidden="true" />

      <header className="experience-header">
        <a href="#top" className="brand-sigil" aria-label="Back to top">
          <span>{site.initials}</span>
          <span className="brand-signal">SIGNAL / 001</span>
        </a>

        <div className="header-coordinates" aria-hidden="true">
          <span>08.6811° S</span>
          <span>115.1608° E</span>
        </div>

        <nav className="experience-nav" aria-label="Primary">
          <a href="#builds">Work</a>
          <span aria-hidden="true" />
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <aside className="scene-index" aria-label="Page chapters">
        {scenes.map((scene, index) => (
          <a
            key={scene.id}
            href={`#${scene.id}`}
            aria-current={activeScene === scene.id ? 'location' : undefined}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span>{scene.label}</span>
          </a>
        ))}
      </aside>

      <main>
        <section id="top" className="scene scene-hero" data-scene>
          <div className="hero-eyebrow">
            <span className="status-dot" />
            Interactive portfolio / Bali, Indonesia
          </div>

          <div className="hero-orbit" aria-hidden="true">
            <span />
            <span />
          </div>

          <div className="hero-copy">
            <p>{site.role}</p>
            <h1>
              <span>Florencevic</span>
              <span>Pondaag</span>
            </h1>
          </div>

          <div className="hero-statement">
            <span>Systems</span>
            <span className="hero-statement-line" />
            <span>Automation</span>
            <span>AI / Commerce</span>
          </div>

          <a href="#about" className="scroll-cue">
            <span>Enter the system</span>
            <ArrowDown aria-hidden="true" />
          </a>
        </section>

        <section id="about" className="scene scene-about" data-scene>
          <div className="chapter-label">
            <span>01</span>
            System architecture
          </div>

          <div className="about-grid">
            <div>
              <p className="display-kicker">I think in</p>
              <h2>
                Systems,
                <br />
                not scripts.
              </h2>
            </div>

            <div className="about-copy">
              <p>
                I turn repetitive, disconnected, and error-prone business work into dependable
                software—connecting marketplaces, inventory, people, and operations.
              </p>
              <div className="location-line">
                <MapPin aria-hidden="true" />
                {site.location} · building globally
              </div>
            </div>
          </div>

          <div className="signal-stats" aria-label="Workspace statistics">
            {featuredStats.map((stat) => (
              <div key={stat.label}>
                <strong>
                  {stat.value}
                  {stat.suffix}
                </strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="builds" className="builds-sequence" data-scene>
          <div className="builds-intro scene">
            <div className="chapter-label">
              <span>02</span>
              Selected signals
            </div>
            <h2>
              Work that
              <br />
              removes friction.
            </h2>
            <p>Scroll through five systems built around real operational problems.</p>
          </div>

          {featuredProjects.map((project, projectIndex) => (
            <article className="project-scene scene" key={project.id}>
              <div className="project-radar" aria-hidden="true">
                <span>{project.code}</span>
              </div>

              <div className="project-meta">
                <span>{project.code}</span>
                <span>{project.group}</span>
              </div>

              <div className="project-copy">
                <span className="project-counter">
                  {String(projectIndex + 1).padStart(2, '0')} /{' '}
                  {String(featuredProjects.length).padStart(2, '0')}
                </span>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <ul aria-label={`${project.name} technologies`}>
                  {project.technologies.slice(0, 5).map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>

              <div className="project-flow" aria-label={`${project.name} architecture`}>
                {project.capabilities.slice(0, 5).map((node, nodeIndex) => (
                  <span key={node}>
                    <i>{String(nodeIndex + 1).padStart(2, '0')}</i>
                    {node}
                  </span>
                ))}
              </div>
            </article>
          ))}

          <section className="system-archive scene" aria-labelledby="archive-title">
            <div className="archive-heading">
              <div className="chapter-label">
                <span>02.B</span>
                Complete system archive
              </div>
              <h2 id="archive-title">Every build, translated into outcomes.</h2>
              <p>
                A functional map of the automation, application, analytics, mobile, and agent
                systems behind the portfolio.
              </p>
            </div>

            <div className="archive-list">
              {systemArchive.map((system) => (
                <details key={system.id}>
                  <summary>
                    <span>{system.code}</span>
                    <strong>{system.name}</strong>
                    <small>{system.group}</small>
                    <i aria-hidden="true">+</i>
                  </summary>
                  <div className="archive-detail">
                    <p>{system.summary}</p>
                    <ul aria-label={`${system.name} capabilities`}>
                      {system.capabilities.map((capability) => (
                        <li key={capability}>{capability}</li>
                      ))}
                    </ul>
                    <div>
                      {system.technologies.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>
        </section>

        <section id="experience" className="scene scene-path" data-scene>
          <div className="chapter-label">
            <span>03</span>
            Human trajectory
          </div>

          <div className="path-heading">
            <p>Operations became code.</p>
            <h2>Built from the floor up.</h2>
          </div>

          <ol className="experience-track">
            {experience.map((item, index) => (
              <li key={`${item.year}-${item.company}`}>
                <span>{item.year}</span>
                <div>
                  <strong>{item.role}</strong>
                  <small>{item.company}</small>
                </div>
                <i>{String(index + 1).padStart(2, '0')}</i>
              </li>
            ))}
          </ol>

          <div className="tool-stream" aria-label="Technology toolkit">
            {techGroups.flatMap((group) => group.items).slice(0, 18).map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </section>

        <section id="contact" className="scene scene-contact" data-scene>
          <div className="chapter-label">
            <span>04</span>
            Open channel
          </div>

          <div className="contact-copy">
            <p>Have a system worth improving?</p>
            <h2>Let&apos;s build something useful.</h2>
          </div>

          <div className="contact-links">
            <a href={site.links.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" />
              <span>Direct message</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={site.links.email}>
              <Mail aria-hidden="true" />
              <span>Email</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <footer className="experience-footer">
            <span>© {new Date().getFullYear()} Florencevic Pondaag</span>
            <span>Technology · Automation · Commerce</span>
            <a href="#top">Return to origin ↑</a>
          </footer>
        </section>
      </main>
    </div>
  )
}
