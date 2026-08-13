// Reusable project data. Add new builds by appending an object to this array.
// Screenshots / demo / repo use placeholders so they can be swapped in later.

export interface Project {
  id: string
  index: string
  name: string
  category: string
  description: string
  // Optional grouped detail sections
  features?: string[]
  platforms?: string[]
  capabilities?: string[]
  include?: string[]
  technologies: string[]
  // A simple vertical flow used for the animated architecture diagram.
  architecture?: string[]
  links: {
    demo?: string
    github?: string
  }
}

export const projects: Project[] = [
  {
    id: 'jubelio-automation',
    index: '01',
    name: 'JUBELIO AUTOMATION',
    category: 'BUSINESS AUTOMATION',
    description:
      'A collection of automation systems for order processing, inventory monitoring, fulfillment, reporting and operational workflows.',
    features: [
      'Order polling',
      'Order processing',
      'Picking / packing workflow',
      'Label printing',
      'Recovery workflow',
      'Sales analytics',
      'Pareto SKU analysis',
      'Fast-moving stock analysis',
      'Negative stock correction',
      'Warehouse stock alerts',
      'Background workers',
      'Scheduled tasks',
    ],
    technologies: ['Python', 'PowerShell', 'REST APIs', 'SQLite', 'Windows Automation'],
    architecture: [
      'MARKETPLACE',
      'API / AUTOMATION',
      'ORDER PROCESSOR',
      'INVENTORY',
      'WAREHOUSE',
      'FULFILLMENT',
    ],
    links: { demo: '#', github: '#' },
  },
  {
    id: 'multi-marketplace-automation',
    index: '02',
    name: 'MULTI-MARKETPLACE AUTOMATION',
    category: 'E-COMMERCE INFRASTRUCTURE',
    description:
      'Automation tools connecting marketplaces, product catalogs, inventory and warehouse operations.',
    platforms: ['Tokopedia', 'TikTok', 'Shopee', 'Facebook Marketplace', 'Amazon', 'Jubelio'],
    capabilities: [
      'Product synchronization',
      'Cross-listing',
      'Catalog management',
      'Multi-warehouse support',
      'Listing automation',
      'Stock synchronization',
      'Marketplace browser automation',
      'AWB printing',
      'Product data processing',
    ],
    technologies: ['Python', 'Browser Automation', 'REST APIs', 'SQLite'],
    architecture: [
      'MARKETPLACES',
      'CATALOG SYNC',
      'LISTING AUTOMATION',
      'STOCK SYNC',
      'WAREHOUSE',
    ],
    links: { demo: '#', github: '#' },
  },
  {
    id: 'inventory-intelligence',
    index: '03',
    name: 'INVENTORY INTELLIGENCE',
    category: 'INVENTORY SYSTEMS',
    description:
      'A collection of tools designed to automate inventory auditing, synchronization and stock correction.',
    include: [
      'Zero Negative Stock',
      'Fast Moving Stock',
      'Warehouse Empty Stock Alert',
      'Bundle Stock Management',
      'Stock Adjustment Web',
      'SKU Manager',
      'Inbound Adjustment',
      'Warehouse Synchronization',
    ],
    technologies: ['Python', 'SQLite', 'REST APIs', 'Web'],
    architecture: ['WAREHOUSE', 'STOCK DATA', 'VALIDATION', 'CORRECTION', 'AUDIT LOG'],
    links: { demo: '#', github: '#' },
  },
  {
    id: 'lead-marketing-ai',
    index: '04',
    name: 'LEAD MARKETING AI',
    category: 'AI + AUTOMATION',
    description:
      'An AI-assisted lead discovery and marketing workflow that scores leads, generates response drafts and provides operator-assisted publishing.',
    features: [
      'Public data collection',
      'Lead detection',
      'AI lead scoring',
      'AI response generation',
      'Human review step',
      'Assisted posting',
      'Rate limiting',
      'Operator dashboard',
    ],
    technologies: ['Python', 'SQLite', 'OpenRouter', 'AI', 'Rate Limiting', 'Dashboard'],
    architecture: [
      'PUBLIC DATA',
      'LEAD DETECTION',
      'AI SCORING',
      'AI RESPONSE',
      'HUMAN REVIEW',
      'ASSISTED POSTING',
    ],
    links: { demo: '#', github: '#' },
  },
  {
    id: 'jubelio-mobile',
    index: '05',
    name: 'JUBELIO MOBILE',
    category: 'ANDROID APPLICATION',
    description:
      'Android application for monitoring orders, products, inventory and sales operations.',
    features: [
      'Order polling',
      'Foreground notifications',
      'Sales dashboard',
      'Product search',
      'Product editing',
      'QR scanning',
      'Stock cache',
      'Receiving',
      'Restock recommendations',
      'Inbound recommendations',
      'Currency conversion',
      'Audit trail',
      'Application update system',
    ],
    technologies: ['Android', 'Java', 'REST APIs', 'Local Storage'],
    architecture: ['REST API', 'ORDER POLLING', 'LOCAL CACHE', 'DASHBOARD', 'NOTIFICATIONS'],
    links: { demo: '#', github: '#' },
  },
  {
    id: 'expense-tracker',
    index: '06',
    name: 'EXPENSE TRACKER',
    category: 'FULL-STACK WEB APPLICATION',
    description:
      'Personal finance application for tracking expenses, budgets, savings goals and financial trends.',
    features: [
      'Expense tracking',
      'Budget management',
      'Savings goals',
      'Category analytics',
      'Trend analysis',
      'JSON backup',
      'Data synchronization',
    ],
    technologies: ['JavaScript', 'Web', 'JSON', 'Local Storage'],
    architecture: ['INPUT', 'CATEGORIES', 'BUDGETS', 'ANALYTICS', 'BACKUP'],
    links: { demo: '#', github: '#' },
  },
  {
    id: 'lacakpaket',
    index: '07',
    name: 'LACAKPAKET',
    category: 'TRACKING PLATFORM',
    description: 'Multi-courier package tracking application with local caching.',
    include: ['JNE', 'J&T', 'Lion Parcel', 'GrabExpress', 'SPX Instant', 'Paxel'],
    technologies: ['Web', 'SQLite', 'API Integration', 'Caching'],
    architecture: ['COURIER APIs', 'TRACKING', 'LOCAL CACHE', 'STATUS VIEW'],
    links: { demo: '#', github: '#' },
  },
  {
    id: 'automation-control-panel',
    index: '08',
    name: 'AUTOMATION CONTROL PANEL',
    category: 'DEVELOPER TOOLING',
    description:
      'Local control center for managing multiple automation workers and scheduled tasks.',
    features: [
      'Start automation',
      'Stop automation',
      'Worker monitoring',
      'Scheduled task monitoring',
      'Marketplace session checks',
      'Health checks',
      'Runtime cleanup',
      'Autostart management',
      'Logging',
    ],
    technologies: ['Python', 'Web', 'Windows Automation', 'Scheduled Tasks'],
    architecture: ['CONTROL PANEL', 'WORKERS', 'SCHEDULER', 'HEALTH CHECKS', 'LOGS'],
    links: { demo: '#', github: '#' },
  },
]

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
