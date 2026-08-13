export interface SystemArchiveItem {
  id: string
  code: string
  name: string
  group: string
  summary: string
  capabilities: string[]
  technologies: string[]
}

// Public-facing names describe outcomes rather than exposing vendor names,
// customer-specific workflows, internal endpoints, or operational identifiers.
export const systemArchive: SystemArchiveItem[] = [
  {
    id: 'omni-channel-manager',
    code: 'OPS-01',
    name: 'OMNI-CHANNEL MARKETPLACE MANAGER',
    group: 'COMMERCE OPERATIONS',
    summary:
      'A unified operations layer for orders, inventory, fulfillment, reporting, and marketplace workflows.',
    capabilities: ['Order polling', 'Picking & packing', 'Inventory control', 'Operational reporting'],
    technologies: ['Node.js', 'Python', 'REST APIs', 'SQLite', 'PowerShell'],
  },
  {
    id: 'fulfillment-engine',
    code: 'OPS-02',
    name: 'AUTONOMOUS FULFILLMENT ENGINE',
    group: 'ORDER AUTOMATION',
    summary:
      'Processes new orders through controlled standard and warehouse-picking paths with recovery safeguards.',
    capabilities: ['New-order detection', 'Picking workflow', 'Recovery queue', 'Operator confirmation'],
    technologies: ['Node.js', 'REST APIs', 'Background Workers', 'Windows Automation'],
  },
  {
    id: 'warehouse-sync',
    code: 'INV-01',
    name: 'MULTI-WAREHOUSE INVENTORY SYNC',
    group: 'INVENTORY INFRASTRUCTURE',
    summary:
      'Keeps stock positions aligned across distributed warehouses through scheduled, deduplicated synchronization.',
    capabilities: ['Scheduled sync', 'Location mapping', 'Conflict protection', 'State recovery'],
    technologies: ['Node.js', 'Browser Automation', 'CSV', 'Scheduled Tasks'],
  },
  {
    id: 'inbound-ledger',
    code: 'INV-02',
    name: 'INBOUND INVENTORY LEDGER',
    group: 'WAREHOUSE AUTOMATION',
    summary:
      'Reconciles inbound movements, validates source availability, and prevents duplicate adjustments.',
    capabilities: ['Inbound tracking', 'Source validation', 'Deduplication', 'Backoff retries'],
    technologies: ['Node.js', 'JSON State', 'Browser Automation', 'PowerShell'],
  },
  {
    id: 'negative-stock-guard',
    code: 'INV-03',
    name: 'NEGATIVE STOCK GUARD',
    group: 'INVENTORY INTELLIGENCE',
    summary:
      'Audits invalid stock positions and applies controlled corrections with dry-run and scheduled modes.',
    capabilities: ['Stock audit', 'Correction rules', 'Dry run', 'Daily scheduling'],
    technologies: ['Node.js', 'REST APIs', 'CSV', 'Task Scheduler'],
  },
  {
    id: 'replenishment-radar',
    code: 'INV-04',
    name: 'REPLENISHMENT INTELLIGENCE RADAR',
    group: 'INVENTORY ANALYTICS',
    summary:
      'Ranks fast-moving and depleted inventory using recent sales, order frequency, and stock position.',
    capabilities: ['Sales projection', 'Stock ranking', 'Restock signals', 'Interactive dashboard'],
    technologies: ['Node.js', 'Analytics', 'CSV', 'Local Web App'],
  },
  {
    id: 'empty-stock-alert',
    code: 'INV-05',
    name: 'WAREHOUSE EMPTY-STOCK RADAR',
    group: 'INVENTORY ALERTING',
    summary:
      'Surfaces recently sold SKUs that are now unavailable, prioritized by warehouse and sales velocity.',
    capabilities: ['Weekly audit', 'Warehouse grouping', 'Priority scoring', 'Snooze workflow'],
    technologies: ['PowerShell', 'CSV', 'Windows Alerts', 'Scheduled Tasks'],
  },
  {
    id: 'bundle-adjustment',
    code: 'INV-06',
    name: 'BUNDLE INVENTORY AUTO-ADJUSTER',
    group: 'STOCK AUTOMATION',
    summary:
      'Translates bundle sales into component-level stock movements and keeps adjustment state observable.',
    capabilities: ['Bundle decomposition', 'Sales monitoring', 'Automatic adjustment', 'Process controls'],
    technologies: ['Node.js', 'Local Web App', 'Background Workers', 'JSON State'],
  },
  {
    id: 'stock-import-toolkit',
    code: 'INV-07',
    name: 'BULK STOCK ADJUSTMENT TOOLKIT',
    group: 'OPERATIONS TOOLING',
    summary:
      'Converts quick operator input and warehouse exports into validated adjustment files and upload flows.',
    capabilities: ['Quick-entry parsing', 'CSV generation', 'Branch selection', 'Upload automation'],
    technologies: ['Python', 'Node.js', 'CSV', 'Browser Automation'],
  },
  {
    id: 'sku-story',
    code: 'INV-08',
    name: 'SKU STORY & STOCK TRACKER',
    group: 'INVENTORY EXPLORATION',
    summary:
      'Turns a SKU lookup into a concise stock history, movement story, and low-stock decision signal.',
    capabilities: ['SKU lookup', 'Movement history', 'Stock thresholding', 'Restock alerts'],
    technologies: ['Python', 'Structured Data', 'CLI', 'Reporting'],
  },
  {
    id: 'catalog-crosslisting',
    code: 'CAT-01',
    name: 'CATALOG CROSSLISTING PIPELINE',
    group: 'CATALOG AUTOMATION',
    summary:
      'Detects new public listings, normalizes product data, and routes items into a central commerce catalog.',
    capabilities: ['Listing detection', 'Data normalization', 'Image handling', 'Channel routing'],
    technologies: ['Node.js', 'Browser Automation', 'REST APIs', 'Local State'],
  },
  {
    id: 'social-publisher',
    code: 'CAT-02',
    name: 'ASSISTED SOCIAL COMMERCE PUBLISHER',
    group: 'LISTING AUTOMATION',
    summary:
      'Builds publication-ready social marketplace drafts from catalog data, media, and operator-defined rules.',
    capabilities: ['SKU selection', 'Media download', 'Form completion', 'Publish controls'],
    technologies: ['Node.js', 'Playwright', 'Image Processing', 'CLI'],
  },
  {
    id: 'product-extractor',
    code: 'CAT-03',
    name: 'PRODUCT DATA EXTRACTION ENGINE',
    group: 'CATALOG INTELLIGENCE',
    summary:
      'Extracts resilient product titles, descriptions, features, and media from inconsistent retail pages.',
    capabilities: ['Fallback selectors', 'Content extraction', 'Media capture', 'Data cleanup'],
    technologies: ['JavaScript', 'DOM Automation', 'Browser Tools', 'JSON'],
  },
  {
    id: 'catalog-uploader',
    code: 'CAT-04',
    name: 'CATALOG CONTENT UPLOADER',
    group: 'PRODUCT OPERATIONS',
    summary:
      'Moves prepared titles, descriptions, and image sets into a structured master-product workflow.',
    capabilities: ['Form automation', 'Rich text input', 'Multi-image upload', 'Save verification'],
    technologies: ['Browser Automation', 'JavaScript', 'File Uploads', 'Workflow Validation'],
  },
  {
    id: 'listing-editor',
    code: 'CAT-05',
    name: 'LIVE LISTING MAINTENANCE CONSOLE',
    group: 'CATALOG OPERATIONS',
    summary:
      'Updates active product records from a URL-driven operator flow with safe dry-run support.',
    capabilities: ['URL targeting', 'Product editing', 'Session checks', 'Dry-run validation'],
    technologies: ['Node.js', 'Browser Automation', 'CLI', 'Persistent Sessions'],
  },
  {
    id: 'document-printing',
    code: 'FUL-01',
    name: 'FULFILLMENT DOCUMENT PIPELINE',
    group: 'WAREHOUSE TOOLING',
    summary:
      'Detects unprinted operational documents and automates invoice and shipping-label preparation.',
    capabilities: ['Document detection', 'PDF capture', 'Print-media handling', 'Batch download'],
    technologies: ['Node.js', 'Playwright', 'PDF', 'Session Automation'],
  },
  {
    id: 'courier-reminder',
    code: 'FUL-02',
    name: 'COURIER HANDOFF REMINDER',
    group: 'FULFILLMENT ALERTING',
    summary:
      'Coordinates daily parcel handoff with timed reminders, operator confirmation, and snooze state.',
    capabilities: ['Schedule rules', 'Confirmation dialog', 'Snooze cycle', 'Daily state'],
    technologies: ['PowerShell', 'Windows Alerts', 'Audio Cues', 'Task Scheduler'],
  },
  {
    id: 'pickup-notifier',
    code: 'FUL-03',
    name: 'PICKUP READINESS NOTIFIER',
    group: 'LOGISTICS AUTOMATION',
    summary:
      'Detects ready-to-ship activity and sends one controlled pickup signal per operating day.',
    capabilities: ['Order monitoring', 'Courier matching', 'Daily deduplication', 'Sleep/wake state'],
    technologies: ['Node.js', 'Messaging Automation', 'REST APIs', 'Windows UI'],
  },
  {
    id: 'parcel-tracker',
    code: 'FUL-04',
    name: 'MULTI-CARRIER PARCEL TRACKER',
    group: 'LOGISTICS PLATFORM',
    summary:
      'Normalizes shipment events from multiple carrier services into a cached tracking experience.',
    capabilities: ['Carrier adapters', 'Status normalization', 'Local caching', 'Tracking dashboard'],
    technologies: ['Web', 'SQLite', 'API Integration', 'Caching'],
  },
  {
    id: 'event-router',
    code: 'COM-01',
    name: 'OPERATIONAL EVENT ROUTER',
    group: 'MESSAGING INFRASTRUCTURE',
    summary:
      'Normalizes events from multiple sources, routes them to the right recipients, and retries partial failures.',
    capabilities: ['Source adapters', 'Event normalization', 'Per-recipient state', 'Retry queue'],
    technologies: ['Node.js', 'Messaging Channels', 'Atomic JSON', 'Background Workers'],
  },
  {
    id: 'response-assistant',
    code: 'COM-02',
    name: 'MULTILINGUAL RESPONSE ASSISTANT',
    group: 'CUSTOMER OPERATIONS',
    summary:
      'Accelerates marketplace responses with staged templates, language-aware follow-ups, and session reuse.',
    capabilities: ['Quick replies', 'Language branching', 'Conversation state', 'Operator handoff'],
    technologies: ['Node.js', 'Browser Automation', 'Persistent Profiles', 'JSON Config'],
  },
  {
    id: 'page-reply-service',
    code: 'COM-03',
    name: 'CUSTOMER MESSAGE RESPONSE SERVICE',
    group: 'CUSTOMER INFRASTRUCTURE',
    summary:
      'Receives customer events through a secure webhook and returns policy-aware automated responses.',
    capabilities: ['Webhook verification', 'Event parsing', 'Reply policies', 'Health endpoint'],
    technologies: ['Node.js', 'Webhooks', 'HTTPS', 'REST APIs'],
  },
  {
    id: 'offer-bridge',
    code: 'COM-04',
    name: 'DIRECT OFFER RECOVERY BRIDGE',
    group: 'CONVERSION AUTOMATION',
    summary:
      'Builds compliant direct offers from order context, verified pricing, shipping estimates, and operator rules.',
    capabilities: ['Order matching', 'Price validation', 'Shipping estimation', 'Privacy-safe state'],
    technologies: ['Browser Extension', 'Node.js', 'Local Bridge', 'Messaging Automation'],
  },
  {
    id: 'lead-intelligence',
    code: 'AI-01',
    name: 'LEAD INTELLIGENCE & OUTREACH SYSTEM',
    group: 'AI AUTOMATION',
    summary:
      'Finds public opportunities, scores fit, drafts contextual responses, and keeps publishing human-reviewed.',
    capabilities: ['Lead detection', 'AI scoring', 'Response drafting', 'Human review'],
    technologies: ['Python', 'LLM APIs', 'SQLite', 'Rate Limiting'],
  },
  {
    id: 'operations-console',
    code: 'CTL-01',
    name: 'AUTOMATION OPERATIONS CONSOLE',
    group: 'DEVELOPER TOOLING',
    summary:
      'A local control center for workers, schedules, sessions, health checks, logs, and startup behavior.',
    capabilities: ['Worker controls', 'Health checks', 'Schedule status', 'Runtime cleanup'],
    technologies: ['Python', 'Web UI', 'PowerShell', 'Windows Automation'],
  },
  {
    id: 'mobile-operations',
    code: 'MOB-01',
    name: 'MOBILE OPERATIONS COMPANION',
    group: 'ANDROID APPLICATION',
    summary:
      'A mobile command surface for order alerts, sales visibility, product lookup, scanning, and stock workflows.',
    capabilities: ['Foreground polling', 'Order alerts', 'QR scanning', 'Offline stock cache'],
    technologies: ['Android', 'Java', 'REST APIs', 'Local Storage'],
  },
  {
    id: 'finance-tracker',
    code: 'APP-01',
    name: 'PERSONAL FINANCE SIGNAL TRACKER',
    group: 'FULL-STACK APPLICATION',
    summary:
      'Tracks expenses, budgets, savings goals, categories, and financial trends with portable backups.',
    capabilities: ['Expense capture', 'Budgeting', 'Goal tracking', 'Trend analysis'],
    technologies: ['JavaScript', 'Web', 'JSON', 'Local Storage'],
  },
  {
    id: 'vision-solver',
    code: 'AI-02',
    name: 'VISION-BASED INTERACTION SOLVER',
    group: 'COMPUTER VISION',
    summary:
      'Reads a mobile screen, identifies visible objects, groups matching patterns, and selects safe actions.',
    capabilities: ['Screen capture', 'Object grouping', 'Move planning', 'Device control'],
    technologies: ['Python', 'OpenCV', 'NumPy', 'Android Debug Bridge'],
  },
  {
    id: 'tax-assistant',
    code: 'MOB-02',
    name: 'MOBILE COMPLIANCE ASSISTANT',
    group: 'MOBILE AUTOMATION',
    summary:
      'Prepares reporting assets and guides a deterministic mobile workflow up to the final human submission step.',
    capabilities: ['Device connection', 'Document preparation', 'Guided navigation', 'Human approval'],
    technologies: ['PowerShell', 'Node.js', 'Android Debug Bridge', 'AI Image Tools'],
  },
  {
    id: 'procurement-agent',
    code: 'AGT-01',
    name: 'ASSISTED PROCUREMENT AGENT',
    group: 'BROWSER AGENTS',
    summary:
      'Turns structured operator input into a reviewable cart-building workflow with explicit quantity control.',
    capabilities: ['Product search', 'Quantity parsing', 'Cart assembly', 'Session persistence'],
    technologies: ['Node.js', 'Browser Automation', 'CLI', 'Persistent Sessions'],
  },
  {
    id: 'transaction-monitor',
    code: 'OPS-03',
    name: 'DISTRIBUTED TRANSACTION MONITOR',
    group: 'OPERATIONS AUTOMATION',
    summary:
      'Checks pending warehouse transactions through persistent sessions and surfaces incomplete operational work.',
    capabilities: ['Transaction checks', 'Pending-state detection', 'Session reuse', 'Operator escalation'],
    technologies: ['Node.js', 'Browser Automation', 'Persistent Profiles', 'CLI'],
  },
  {
    id: 'sales-intelligence',
    code: 'DAT-01',
    name: 'SALES & SKU INTELLIGENCE SUITE',
    group: 'BUSINESS ANALYTICS',
    summary:
      'Transforms commerce records into sales summaries, regional insights, Pareto analysis, and restock decisions.',
    capabilities: ['Sales summaries', 'SKU Pareto', 'Regional analysis', 'PDF reporting'],
    technologies: ['Node.js', 'Analytics', 'PDF Generation', 'REST APIs'],
  },
]
