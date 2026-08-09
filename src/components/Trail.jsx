import { nodeMeta } from '../lib/relations'

const sameNode = (a, b) => a && b && a.kind === b.kind && a.id === b.id
// The rail cannot scroll — a scroll container would clip the blur the fused
// shape depends on — so a long route is trimmed from the left and the dropped
// steps collapse into one segment that returns to the start.
const RAIL_STEPS = 4

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 10.8 12 4.2l8 6.6V19a1 1 0 0 1-1 1h-4.4v-4.6H9.4V20H5a1 1 0 0 1-1-1z" />
  </svg>
)

// The rail is drawn twice. The lower layer is shape only, blurred and then
// re-thresholded so neighbouring segments fuse into one body with a pinched
// neck between them; the upper layer carries the text, unfiltered, so nothing
// is softened. Both layers lay out identically, so they stay registered.
export default function Trail({ trail, selection, onSelect, onHome }) {
  const all = trail.map((node) => ({ node, meta: nodeMeta(node) })).filter((s) => s.meta)
  const steps = all.slice(-RAIL_STEPS)
  const dropped = all.length - steps.length

  return (
    <div className="trail">
      <svg className="goo-defs" aria-hidden="true" focusable="false">
        {/* the blur needs room outside the layer box or the ends get cropped */}
        <filter id="rail-goo" x="-5%" y="-80%" width="110%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
          />
        </filter>
      </svg>

      <div className="trail-inner">
        <div className="trail-goo" aria-hidden="true">
          <span className="goo-home" />
          {dropped > 0 && <span className="goo-step short">…</span>}
          {steps.map(({ node, meta }) => (
            <span className="goo-step" key={`${node.kind}:${node.id}`}>
              {meta.label}
            </span>
          ))}
        </div>

        <nav className="trail-face" aria-label="Path through the atlas">
          <button className="trail-home" onClick={onHome} aria-label="Home">
            <HomeIcon />
          </button>
          {dropped > 0 && (
            <button
              className="trail-step short"
              onClick={() => onSelect(all[0].node)}
              aria-label={`Back to the start of the route, ${dropped} earlier steps`}
            >
              …
            </button>
          )}
          {steps.map(({ node, meta }) => {
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
      </div>
    </div>
  )
}
