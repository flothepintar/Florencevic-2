// Grouped technologies. Only technologies explicitly listed are included.

export interface TechGroup {
  id: string
  title: string
  items: string[]
}

export const techGroups: TechGroup[] = [
  {
    id: 'languages',
    title: 'Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'PowerShell', 'CMD'],
  },
  {
    id: 'web',
    title: 'Web',
    items: ['Next.js', 'React', 'HTML', 'CSS', 'REST APIs'],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    items: ['Android', 'Java'],
  },
  {
    id: 'data',
    title: 'Data',
    items: ['SQLite', 'JSON', 'CSV', 'Local Storage'],
  },
  {
    id: 'automation',
    title: 'Automation',
    items: [
      'Windows Automation',
      'Scheduled Tasks',
      'Browser Automation',
      'API Integration',
      'Background Workers',
    ],
  },
  {
    id: 'ai',
    title: 'AI',
    items: ['LLM APIs', 'OpenRouter', 'AI-assisted workflows', 'Lead scoring'],
  },
]
