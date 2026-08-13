export interface CaseStudyMetric {
  value: string
  label: string
  context: string
}

export interface FeaturedCaseStudy {
  id: string
  challenge: string
  solution: string
  role: string
  architecture: string[]
  impact: string
  metrics: CaseStudyMetric[]
}

// These indicators describe verified system scope and configuration found in
// the workspace. They intentionally avoid customer names, live order totals,
// revenue, credentials, and production records.
export const featuredCaseStudies: FeaturedCaseStudy[] = [
  {
    id: 'omni-channel-manager',
    challenge:
      'Orders, inventory, fulfillment, reporting, and marketplace actions lived in separate operating surfaces, forcing repeated checks and fragmented hand-offs.',
    solution:
      'A unified operations layer normalizes signals from each workflow and gives operators one place to monitor, act, recover, and report.',
    role:
      'System architect and full-stack developer — workflow design, integrations, operator surfaces, state management, and operational safeguards.',
    architecture: [
      'Marketplace signals → normalized operations queue',
      'Workflow engine → order and fulfillment actions',
      'Inventory and reporting adapters → shared operating state',
      'Recovery controls → observable operator hand-off',
    ],
    impact:
      'Replaces repeated cross-channel checking with one operating surface and creates a consistent hand-off between order, stock, fulfillment, and reporting work.',
    metrics: [
      { value: '5', label: 'workflows unified', context: 'orders, stock, fulfillment, reporting, channels' },
      { value: '1', label: 'operating surface', context: 'shared control and visibility layer' },
      { value: '39', label: 'systems mapped', context: 'privacy-safe workspace constellation' },
    ],
  },
  {
    id: 'fulfillment-engine',
    challenge:
      'Routine order handling required repeated polling, confirmation, picking, shipping-state checks, label preparation, and recovery when an upstream step stalled.',
    solution:
      'A supervised worker processes standard and warehouse-picking paths through guarded checkpoints, persistent state, duplicate protection, and a recovery queue.',
    role:
      'Automation architect and developer — domain rules, worker lifecycle, picking flow, label safeguards, recovery behavior, and operator confirmations.',
    architecture: [
      '60-second control cycle → new-order detection',
      'Identity and courier rules → safe candidate queue',
      'Picking → ready-to-ship → AWB → label → completion',
      'Checkpoint state → restart-safe recovery and escalation',
    ],
    impact:
      'Moves routine fulfillment from repeated manual handling to supervised exception-based processing while keeping high-risk actions observable.',
    metrics: [
      { value: '60s', label: 'control cycle', context: 'configured processing interval' },
      { value: '≤30', label: 'orders per cycle', context: 'configured picking batch ceiling' },
      { value: '6', label: 'guarded stages', context: 'confirm through fulfillment completion' },
    ],
  },
  {
    id: 'warehouse-sync',
    challenge:
      'Distributed warehouse stock could drift when exports, mappings, and uploads were handled separately for each location.',
    solution:
      'A scheduled synchronization engine maps each remote location, validates the source export, deduplicates work, uploads controlled adjustments, and preserves recovery state.',
    role:
      'Integration designer and automation developer — warehouse mapping, scheduling, browser workflow, verification, locking, and recovery state.',
    architecture: [
      'Three location jobs → isolated source exports',
      'Location mapper → normalized inventory records',
      'Validation and deduplication → controlled upload queue',
      'Daily scheduler → logs, locks, and recovery state',
    ],
    impact:
      'Removes the repeated export-map-upload routine for each warehouse and establishes one predictable daily stock synchronization path.',
    metrics: [
      { value: '3', label: 'warehouses', context: 'location-specific synchronization jobs' },
      { value: '24h', label: 'sync cadence', context: 'scheduled daily operating cycle' },
      { value: '3', label: 'verified mappings', context: 'one controlled mapping per location' },
    ],
  },
  {
    id: 'inbound-ledger',
    challenge:
      'Inbound movements could create a second stock mutation, target the wrong ownership boundary, or fail midway when source inventory was temporarily unavailable.',
    solution:
      'A source-only ledger validates availability, records one decision per inbound code, separates destination ownership, and retries transient failures with bounded backoff.',
    role:
      'Workflow and reliability engineer — ownership rules, source validation, deduplication keys, retry policy, scheduling, and operator decision fallback.',
    architecture: [
      'Inbound status and note → deterministic source decision',
      'Availability check → source-only adjustment',
      'Inbound-code ledger → duplicate mutation prevention',
      'Shared lock and backoff → safe recovery without blocking peers',
    ],
    impact:
      'Prevents duplicate inbound adjustments by design and separates source deductions from destination synchronization so each stock mutation has one owner.',
    metrics: [
      { value: '48h', label: 'audit cadence', context: 'scheduled source-ledger review' },
      { value: '24h', label: 'retry window', context: 'bounded recovery for unavailable stock' },
      { value: '3', label: 'destinations protected', context: 'never mutated by the source ledger' },
    ],
  },
  {
    id: 'negative-stock-guard',
    challenge:
      'Negative inventory positions could remain hidden inside a large catalog until they disrupted availability, replenishment, or downstream order work.',
    solution:
      'A scheduled guard paginates the catalog, isolates negative positions, groups controlled corrections, supports dry-run review, and writes an audit artifact for every run.',
    role:
      'Inventory automation developer — catalog scanning, detection rules, adjustment grouping, safe modes, scheduling, and output reporting.',
    architecture: [
      'Paginated catalog scan → inventory snapshot',
      'Negative-position detector → location-aware rows',
      'Correction grouper → controlled adjustment payloads',
      'Dry-run or live mode → auditable run artifact',
    ],
    impact:
      'Turns a manual catalog-wide search into a repeatable daily safeguard and keeps every proposed or applied correction reviewable.',
    metrics: [
      { value: '200', label: 'SKUs per page', context: 'configured catalog scan batch' },
      { value: '24h', label: 'audit cadence', context: 'scheduled daily safeguard' },
      { value: '2', label: 'safe modes', context: 'dry-run review and controlled live correction' },
    ],
  },
]

export const featuredCaseStudyById = new Map(
  featuredCaseStudies.map((caseStudy) => [caseStudy.id, caseStudy]),
)
