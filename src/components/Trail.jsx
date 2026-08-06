import { useEffect, useRef } from 'react'
import { nodeMeta } from '../lib/relations'

const sameNode = (a, b) => a && b && a.kind === b.kind && a.id === b.id

export default function Trail({ trail, selection, onSelect }) {
  const ref = useRef(null)

  // Deep paths overflow the bar, so keep the node the reader is currently on
  // in view rather than leaving them scrolled to the start of their route.
  useEffect(() => {
    const el = ref.current
    if (el) el.scrollLeft = el.scrollWidth
  }, [trail])

  if (!trail.length) return null

  return (
    <nav className="trail" aria-label="Path through the atlas" ref={ref}>
      {trail.map((node, i) => {
        const meta = nodeMeta(node)
        if (!meta) return null
        const here = sameNode(node, selection)
        return (
          <span className="trail-step" key={`${node.kind}:${node.id}`}>
            {i > 0 && <i className="trail-link" aria-hidden="true" />}
            <button
              className={here ? 'here' : undefined}
              onClick={() => onSelect(node)}
              disabled={here}
              aria-current={here ? 'step' : undefined}
            >
              <i className="dot" style={{ background: meta.color }} aria-hidden="true" />
              {meta.label}
            </button>
          </span>
        )
      })}
    </nav>
  )
}
