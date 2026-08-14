import { useMemo } from 'react'
import { textOn } from '../data/content'
import { t } from '../i18n'
import { LAUREATES, MILESTONES } from '../data/content'
import { STORIES } from '../data/stories'
import { yearToX } from '../lib/timeline'

// Where a related node belongs in time. Laureates sit at their prize year and
// milestones at their own; a story sits with the laureate it is about. Themes
// and artifacts have no date, so they stay beside the node that raised them.
export function yearOf(node) {
  if (node.kind === 'milestone') return MILESTONES.find((m) => m.id === node.id)?.year ?? null
  if (node.kind === 'person') return LAUREATES.find((l) => l.id === node.id)?.year ?? null
  if (node.kind === 'story') {
    const story = STORIES.find((s) => s.id === node.id)
    const laureate = story?.laureates.map((id) => LAUREATES.find((l) => l.id === id)).find(Boolean)
    return laureate?.year ?? null
  }
  return null
}

const Arrow = ({ back }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path
      d={back ? 'M14 5 7 12l7 7M18 5l-7 7 7 7' : 'M10 5l7 7-7 7M6 5l7 7-7 7'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// The network stays on the timeline: each related node keeps its place in time
// rather than being pulled into a ring. When a connection runs off the edge of
// the frame the connector ends in a button that travels to it.
export default function TimelineWeb({ related, focal, viewport, page = [], onSelect, onTravel }) {
  const placed = useMemo(() => {
    if (!focal) return []
    const out = []
    // Nothing may land on top of another satellite, or on one of the page's own
    // circles — the timeline underneath has to stay readable.
    const obstacles = page.filter((b) => b !== focal)
    const clears = (x, y, r) =>
      out.every((o) => o.onPage || Math.hypot(o.x - x, o.y - y) > o.r + r + 18) &&
      obstacles.every((o) => Math.hypot(o.x - x, o.y - y) > o.r + r + 14)
    let undated = 0

    for (const node of related) {
      // An event the page already draws keeps its own circle — the web lights
      // it up where it stands rather than stacking a second one on top.
      const own = page.find((b) => b.kind === node.kind && b.id === node.id)
      if (own && own !== focal) {
        out.push({ ...node, x: own.x, y: own.y, r: own.r, dated: true, onPage: true })
        continue
      }

      const year = yearOf(node)
      const r = year === null ? 58 : 64

      if (year === null) {
        // No date of its own, so it hangs off the focal node rather than
        // claiming a year it does not have. Angles are tried in turn until one
        // sits clear of everything already on the timeline.
        undated += 1
        let spot = null
        for (let ring = 0; ring < 3 && !spot; ring += 1) {
          const radius = focal.r + r + 26 + ring * (r * 2 + 16)
          for (let step = 0; step < 12; step += 1) {
            const angle = ((undated * 5 + step) % 12) * (Math.PI / 6)
            const x = focal.x + Math.cos(angle) * radius
            const y = focal.y + Math.sin(angle) * radius
            if (y > 140 && y < 690 && clears(x, y, r)) {
              spot = { x, y }
              break
            }
          }
        }
        out.push({
          ...node,
          x: spot?.x ?? focal.x + focal.r + r + 20 + undated * 24,
          y: spot?.y ?? focal.y + (undated % 2 ? -1 : 1) * (focal.r * 0.45 + 74),
          r,
          dated: false,
        })
        continue
      }

      // Its year fixes x, so only y is free. A node far enough along the
      // timeline can sit on the focal's own line; one close by is lifted just
      // clear of the focal circle, then stacked to avoid its neighbours.
      const x = yearToX(year)
      const need = focal.r + r + 26
      const dx = Math.abs(x - focal.x)
      const lift = dx >= need ? 0 : Math.sqrt(need * need - dx * dx)
      const step = r * 2 + 20
      let y = null
      outer: for (let k = 0; k < 5 && y === null; k += 1) {
        for (const dir of [1, -1]) {
          const candidate = focal.y + dir * (lift + k * step)
          if (candidate > 140 && candidate < 690 && clears(x, candidate, r)) {
            y = candidate
            break outer
          }
        }
      }
      out.push({ ...node, x, y: y ?? focal.y + lift + step, r, dated: true })
    }
    return out
  }, [related, focal, page])

  const { left, right } = viewport

  // Connections that run off the frame end in a control at the edge instead of
  // a line to nowhere. Several can meet the edge at the same height, so each
  // side is spread out afterwards rather than left in a pile.
  const edges = useMemo(() => {
    if (!focal) return []
    const list = []
    for (const n of placed) {
      const offLeft = n.x - n.r < left
      const offRight = n.x + n.r > right
      if (!offLeft && !offRight) continue
      const edgeX = offLeft ? left + 16 : right - 16
      const ratio = Math.min(1, Math.max(0, (edgeX - focal.x) / (n.x - focal.x || 1)))
      list.push({ n, offLeft, x: edgeX, y: focal.y + (n.y - focal.y) * ratio })
    }
    for (const side of [true, false]) {
      const column = list.filter((e) => e.offLeft === side).sort((a, b) => a.y - b.y)
      for (let i = 1; i < column.length; i += 1) {
        if (column[i].y - column[i - 1].y < 40) column[i].y = column[i - 1].y + 40
      }
    }
    return list
  }, [placed, focal, left, right])

  if (!focal) return null

  const offFrame = new Set(edges.map((e) => e.n.key))

  return (
    <>
      <svg className="timeline-links" aria-hidden="true">
        {placed.map((n) => (
          <line key={n.key} x1={focal.x} y1={focal.y} x2={n.x} y2={n.y} />
        ))}
      </svg>

      {/* A laureate or story reached from an event is not one of the page's own
          circles, so the web draws it at its own year to anchor itself. */}
      {focal.standalone && (
        <span
          className={`web-node focal ${focal.kind}`}
          style={{
            left: focal.x,
            top: focal.y,
            width: focal.r * 2,
            height: focal.r * 2,
            background: focal.color,
            color: textOn(focal.color),
          }}
        >
          <span className="label">{focal.label}</span>
          {focal.sub && <span className="meta">{focal.sub}</span>}
        </span>
      )}

      {edges.map(({ n, offLeft, x, y }) => {
        const label = `${offLeft ? t('jumpBack') : t('jumpForward')} ${n.label}`
        return (
          <button
            key={n.key}
            className={`timeline-jump ${offLeft ? 'back' : 'fwd'}`}
            style={{ left: x, top: y }}
            onClick={() => onTravel(n)}
            title={label}
            aria-label={label}
          >
            {offLeft && <Arrow back />}
            <span>{n.label}</span>
            {!offLeft && <Arrow />}
          </button>
        )
      })}

      {placed.map((n) => {
        // A circle the page already draws is left to the page, and one that is
        // off the frame is reached by its control instead.
        if (n.onPage || offFrame.has(n.key)) return null
        return (
          <button
            key={n.key}
            className={`web-node ${n.kind}`}
            style={{
              left: n.x,
              top: n.y,
              width: n.r * 2,
              height: n.r * 2,
              background: n.color,
              color: textOn(n.color),
              fontSize: 11,
            }}
            onClick={() => onSelect({ kind: n.kind, id: n.id })}
          >
            <span className="label">{n.label}</span>
            {n.sub && <span className="meta">{n.sub}</span>}
          </button>
        )
      })}
    </>
  )
}
