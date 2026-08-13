// The interactive "System" section nodes orbiting the digital core.

export interface SystemNode {
  id: string
  label: string
  description: string
  items: string[]
}

export const systemNodes: SystemNode[] = [
  {
    id: 'automation',
    label: 'AUTOMATION',
    description:
      'Background workers and scheduled systems that run operational workflows without a human in the loop.',
    items: [
      'Jubelio Automation',
      'Crewdible Automation',
      'WhatsApp Automation',
      'Scheduled Workers',
      'Automation Control Panel',
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-COMMERCE',
    description:
      'Marketplace connectors that keep catalogs, listings and inventory in sync across platforms.',
    items: ['Tokopedia', 'TikTok', 'Shopee', 'Facebook Marketplace', 'Amazon', 'Jubelio'],
  },
  {
    id: 'ai',
    label: 'AI',
    description:
      'LLM-assisted workflows for scoring, drafting and operator-assisted decision making.',
    items: [
      'Lead Marketing AI',
      'AI Lead Scoring',
      'AI Response Generation',
      'OpenRouter integrations',
    ],
  },
  {
    id: 'mobile',
    label: 'MOBILE',
    description:
      'Android applications for monitoring operations and solving focused day-to-day problems.',
    items: ['Jubelio Android', 'Food Tile Solver', 'Spendwise'],
  },
  {
    id: 'inventory',
    label: 'INVENTORY',
    description:
      'Auditing, synchronization and correction tools that keep stock data accurate across warehouses.',
    items: [
      'Stock Adjustment',
      'Bundle Stock',
      'Zero Negative Stock',
      'Fast Moving Stock',
      'Warehouse Alerts',
    ],
  },
  {
    id: 'business-tools',
    label: 'BUSINESS TOOLS',
    description:
      'Internal dashboards and utilities that remove friction from repetitive operational tasks.',
    items: ['Expense Tracker', 'LacakPaket', 'Expense Sync', 'Internal Dashboards'],
  },
]
