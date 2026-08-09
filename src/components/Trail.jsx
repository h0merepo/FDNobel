import { useEffect, useRef } from 'react'
import { nodeMeta } from '../lib/relations'

const sameNode = (a, b) => a && b && a.kind === b.kind && a.id === b.id

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 10.8 12 4.2l8 6.6V19a1 1 0 0 1-1 1h-4.4v-4.6H9.4V20H5a1 1 0 0 1-1-1z" />
  </svg>
)

// The route reads as a rail of linked segments along the bottom, alongside the
// tools — one continuous piece of chrome rather than a floating breadcrumb.
export default function Trail({ trail, selection, onSelect, onHome }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (el) el.scrollLeft = el.scrollWidth
  }, [trail])

  return (
    <nav className="trail" aria-label="Path through the atlas" ref={ref}>
      <button className="trail-home" onClick={onHome} aria-label="Home">
        <HomeIcon />
      </button>
      {trail.map((node) => {
        const meta = nodeMeta(node)
        if (!meta) return null
        const here = sameNode(node, selection)
        return (
          <button
            key={`${node.kind}:${node.id}`}
            className={`trail-step${here ? ' here' : ''}`}
            onClick={() => onSelect(node)}
            disabled={here}
            aria-current={here ? 'step' : undefined}
          >
            {meta.label}
          </button>
        )
      })}
    </nav>
  )
}
