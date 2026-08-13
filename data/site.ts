// Central, easy-to-edit configuration for the personal brand site.

export const site = {
  name: 'Florencevic Pondaag',
  initials: 'FP',
  role: 'Technology & E-Commerce Manager',
  positioning: 'Automation · AI · E-Commerce · Business Systems · Mobile',
  statement: 'I BUILD SOFTWARE THAT DOES THE WORK.',
  location: 'Bali, Indonesia',
  available: true,
  availabilityText: 'AVAILABLE FOR INTERESTING PROJECTS',

  links: {
    email: 'mailto:florenspondaag19@gmail.com',
    whatsapp: 'https://wa.me/6287868771451',
    instagram: 'https://instagram.com/yoflorencevic',
    github: '',
    cv: '',
    linkedin: '',
  },
} as const

export type SiteConfig = typeof site

export const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SYSTEM', href: '#system' },
  { label: 'BUILDS', href: '#builds' },
  { label: 'LAB', href: '#lab' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'CONTACT', href: '#contact' },
] as const
