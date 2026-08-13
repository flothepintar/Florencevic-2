// Problem -> System narratives. Outcomes are qualitative (no invented metrics).

export interface CaseStudy {
  id: string
  title: string
  problem: string
  approach: string
  system: string
  result: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'zero-negative-stock',
    title: 'Zero Negative Stock',
    problem:
      'Inventory records kept drifting into negative quantities across warehouses, creating unreliable stock data and downstream fulfillment errors.',
    approach:
      'Traced where negative values originated, then defined validation rules for what a correct stock state should look like before any correction ran.',
    system:
      'An automated auditing routine that scans stock data, flags negative and inconsistent quantities, and applies controlled corrections with an audit log.',
    result:
      'Stock data became consistent and trustworthy, and negative-quantity edge cases stopped silently breaking operational reports.',
  },
  {
    id: 'jubelio-automation',
    title: 'Jubelio Automation',
    problem:
      'Order processing, fulfillment and reporting were repetitive, manual and easy to get wrong under volume.',
    approach:
      'Mapped the full order lifecycle into discrete stages and identified which steps were purely mechanical and safe to automate.',
    system:
      'Background workers and scheduled tasks that poll orders, process them, handle picking and packing, print labels and generate sales analytics.',
    result:
      'Repetitive operational steps run reliably in the background, freeing people to handle the exceptions that actually need judgment.',
  },
  {
    id: 'marketplace-crosslisting',
    title: 'Marketplace Crosslisting',
    problem:
      'Maintaining the same catalog across multiple marketplaces by hand was slow, inconsistent and error-prone.',
    approach:
      'Modeled a single source of truth for products, then designed how listings and stock should propagate to each platform.',
    system:
      'Automation tools that synchronize products, cross-list catalogs and keep stock aligned across marketplaces, including browser automation where APIs fell short.',
    result:
      'Listings stay aligned across platforms with far less manual duplication and fewer inconsistencies between channels.',
  },
  {
    id: 'lead-marketing-ai',
    title: 'Lead Marketing AI',
    problem:
      'Finding and qualifying leads and drafting relevant responses was time-consuming and hard to do consistently at scale.',
    approach:
      'Broke the funnel into detection, scoring, drafting and publishing, keeping a human review step where quality mattered most.',
    system:
      'An AI-assisted pipeline that detects leads from public data, scores them, drafts responses via LLM APIs and routes everything through operator-assisted posting.',
    result:
      'Lead handling became a structured, repeatable workflow with AI doing the heavy lifting and a human retaining final judgment.',
  },
  {
    id: 'inventory-intelligence',
    title: 'Inventory Intelligence',
    problem:
      'Inventory issues were scattered across many separate manual checks with no unified way to keep stock accurate.',
    approach:
      'Grouped related inventory problems into a common toolkit rather than one-off scripts, standardizing how audits and corrections work.',
    system:
      'A collection of tools for auditing, synchronization and correction — from fast-moving stock analysis to empty-warehouse alerts and bundle stock management.',
    result:
      'Inventory maintenance moved from disconnected manual checks toward a consistent, automated set of systems.',
  },
]
