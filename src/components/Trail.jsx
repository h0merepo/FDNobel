import { useEffect, useRef } from 'react'
import { nodeMeta } from '../lib/relations'

const sameNode = (a, b) => a && b && a.kind === b.kind && a.id === b.id

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 10.8 12 4.2l8 6.6V19a1 1 0 0 1-1 1h-4.4v-4.6H9.4V20H5a1 1 0 0 1-1-1z" />
  </svg>
)

// One continuous pill holding the whole route: home at the head, then each
// topic behind a dot. A long path scrolls within the pill rather than being
// trimmed, and stays scrolled to the step you are on.
export default function Trail({ trail, selection, onSelect, onHome }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (el) el.scrollLeft = el.scrollWidth
  }, [trail])

  return (
    <nav className="trail" aria-label="Path through the atlas">
      <button className="trail-home" onClick={onHome} aria-label="Home">
        <HomeIcon />
      </button>
      <div className="trail-scroll" ref={ref}>
        {trail.map((node) => {
          const meta = nodeMeta(node)
          if (!meta) return null
          const here = sameNode(node, selection)
          return (
            <span className="trail-item" key={`${node.kind}:${node.id}`}>
              <i className="trail-sep" aria-hidden="true" />
              <button
                className={`trail-step${here ? ' here' : ''}`}
                onClick={() => onSelect(node)}
                disabled={here}
                aria-current={here ? 'step' : undefined}
              >
                {meta.label}
              </button>
            </span>
          )
        })}
      </div>
    </nav>
  )
}
