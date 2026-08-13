import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/sections/hero'
import { Stats } from '@/components/sections/stats'
import { System } from '@/components/sections/system'
import { Builds } from '@/components/sections/builds'
import { CaseStudies } from '@/components/sections/case-studies'
import { Philosophy } from '@/components/sections/philosophy'
import { TechStack } from '@/components/sections/tech-stack'
import { BuildLab } from '@/components/sections/build-lab'
import { Story } from '@/components/sections/story'
import { Experience } from '@/components/sections/experience'
import { Exploring } from '@/components/sections/exploring'
import { Contact } from '@/components/sections/contact'

export default function Page() {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <Navigation />
      <main>
        <Hero />
        <Stats />
        <System />
        <Builds />
        <CaseStudies />
        <Philosophy />
        <TechStack />
        <BuildLab />
        <Story />
        <Experience />
        <Exploring />
        <Contact />
      </main>
    </>
  )
}
