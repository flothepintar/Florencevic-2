'use client'

const projectScenes = [
  { id: 'omni-channel-manager', variant: 'network' },
  { id: 'fulfillment-engine', variant: 'pipeline' },
  { id: 'warehouse-sync', variant: 'warehouse' },
  { id: 'inbound-ledger', variant: 'ledger' },
  { id: 'negative-stock-guard', variant: 'guard' },
] as const

export function PortfolioWorldFallback() {
  return (
    <div className="lite-world" aria-hidden="true" data-renderer="css">
      <div className="lite-grid" />
      <div className="lite-origin-core">
        <i />
        <i />
        <span>FP</span>
      </div>

      {projectScenes.map((scene, index) => (
        <div
          className={`lite-project lite-project-${scene.variant}`}
          data-lite-scene={scene.id}
          key={scene.id}
        >
          <span className="lite-frame" />
          <span className="lite-visual">
            {Array.from({ length: scene.variant === 'pipeline' ? 6 : 5 }).map((_, nodeIndex) => (
              <i key={nodeIndex} />
            ))}
          </span>
          <small>{String(index + 1).padStart(2, '0')} / 05</small>
        </div>
      ))}

      <div className="lite-constellation">
        {Array.from({ length: 18 }).map((_, index) => (
          <i key={index} />
        ))}
      </div>
    </div>
  )
}
