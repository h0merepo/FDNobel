import { useEffect, useMemo, useRef, useState } from 'react'
import { KIND_LABELS, textOn } from '../data/content'
import { clamp, makeRng } from '../lib/layout'
import { midpointOf, neckPath, slabAnchor } from '../lib/necks'
import { nodeMeta, relatedTo } from '../lib/relations'

const FOCAL_MAX = 128
const SAT_MAX = 64
// How many previously visited nodes stay drawn as a chain off the focal node.
// Older steps remain reachable from the trail bar.
const CHAIN_SHOWN = 3
// The chain leaves the focal node towards the upper right. Steeper angles look
// closer to the reference but run out of vertical room first, so a flatter one
// is taken before the links are allowed to shrink.
const CHAIN_ANGLES = [-0.42, -0.34, -0.26, -0.18, -0.1].map((k) => k * Math.PI)
const CHAIN_SCALES = [1, 0.94, 0.88, 0.82, 0.76, 0.7, 0.64, 0.58]
// Clearance either side of the chain that satellites may not occupy.
const CHAIN_CLEARANCE = 0.65
// The focal node carries a hollow ring on a leader line naming what kind of
// thing it is. It is parked in whatever direction is emptiest, preferring the
// upper left.
const TAG_TARGET = -Math.PI * 0.78
const TAG_RING = 16

const angleDelta = (a, b) => {
  let d = (a - b) % (Math.PI * 2)
  if (d > Math.PI) d -= Math.PI * 2
  if (d < -Math.PI) d += Math.PI * 2
  return d
}

// A pill has only the gap between two circles to live in. Rather than cutting a
// name mid-word, fall back to the form people actually use — a surname, or the
// first significant word — and only trim if even that will not fit.
function pillLabel(label, kind, budget) {
  const words = label.replace(/^(the|a|an)\s+/i, '').split(/\s+/)
  const candidates = [label]
  if (kind === 'person') candidates.push(words[words.length - 1])
  else if (words.length > 1) candidates.push(words[0])
  const fits = candidates.find((c) => c.length <= budget)
  if (fits) return fits
  const shortest = candidates[candidates.length - 1]
  return `${shortest.slice(0, Math.max(3, budget - 1)).trimEnd()}…`
}

function fitFontSize(radius, label) {
  const longest = label.split(' ').reduce((n, w) => Math.max(n, w.length), 0)
  return Math.max(9, Math.min(radius / 4.6, (radius * 1.7) / Math.max(longest, 5), 26))
}

export default function NodeWeb({ selection, trail, onSelect }) {
  const ref = useRef(null)
  const [box, setBox] = useState({ w: 0, h: 0, panelRight: null })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const own = el.getBoundingClientRect()
      const panel = document.querySelector('.story-panel')?.getBoundingClientRect()
      setBox({
        w: el.clientWidth,
        h: el.clientHeight,
        // local coordinates, so the neck can start behind the panel edge
        panelRight: panel ? panel.right - own.left : null,
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [selection])

  const focal = nodeMeta(selection)

  // Nearest step first, so the chain reads outwards from the focal node into
  // the past.
  const history = useMemo(
    () =>
      trail
        .slice(0, -1)
        .slice(-CHAIN_SHOWN)
        .reverse()
        .map((node) => ({ ...node, key: `${node.kind}:${node.id}`, meta: nodeMeta(node) }))
        .filter((node) => node.meta),
    [trail],
  )

  // Anything already on the route is drawn as chain, never duplicated in the
  // ring. Labels are excluded as well as ids, because a story and the milestone
  // it describes often share a name and would read as the same circle twice.
  const satellites = useMemo(() => {
    const visitedKeys = new Set(trail.map((n) => `${n.kind}:${n.id}`))
    const visitedLabels = new Set(trail.map((n) => nodeMeta(n)?.label).filter(Boolean))
    return relatedTo(selection, 12)
      .filter((s) => !visitedKeys.has(s.key) && !visitedLabels.has(s.label))
      .slice(0, 8)
  }, [selection, trail])

  const geometry = useMemo(() => {
    const { w, h, panelRight } = box
    if (!w || !h) return null
    const cx = w / 2
    const cy = h / 2
    const half = Math.min(cx, cy)

    // Everything scales off the smaller half-axis so the web stays inside the
    // viewport on short screens instead of pushing satellites off the edges.
    const satR = clamp(half * 0.2, 34, SAT_MAX)
    // A long chain needs the room back, so the focal node gives some up.
    const wanted = Math.min(history.length, CHAIN_SHOWN)
    const focalR = clamp(half * (wanted >= 2 ? 0.37 : 0.42), 64, FOCAL_MAX)
    const ring = clamp(half - satR - 26, focalR + satR + 18, 360)

    // --- the route so far, chained outwards from the focal node ---
    // Distances are built out from the focal edge, so the chain can never be
    // compressed back underneath it. When the oldest steps will not fit on
    // screen they are dropped rather than squeezed — the trail bar still has them.
    const roomAt = (angle) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return Math.min(
        (cos > 0 ? w - cx : cx) / Math.max(Math.abs(cos), 0.001),
        (sin > 0 ? h - cy : cy) / Math.max(Math.abs(sin), 0.001),
      )
    }

    const place = (count, baseAngle, scale) => {
      const out = []
      let distance = 0
      let previousR = focalR
      for (let i = 0; i < count; i += 1) {
        const r = Math.max(20, satR * 0.9 ** (i + 1) * scale)
        distance += previousR + r + 74 * scale
        previousR = r
        out.push({ ...history[i], r, angle: baseAngle - i * 0.1, dist: distance })
      }
      return out
    }
    const fits = (nodes) => nodes.every((n) => n.dist + n.r + 10 <= roomAt(n.angle))

    // Keep all three links on screen: flatten the chain first, then shrink it,
    // and only drop a link if even the smallest arrangement will not fit.
    let chain = []
    outer: for (let count = wanted; count > 0; count -= 1) {
      for (const scale of CHAIN_SCALES) {
        for (const angle of CHAIN_ANGLES) {
          const attempt = place(count, angle, scale)
          if (fits(attempt)) {
            chain = attempt
            break outer
          }
        }
      }
    }

    const rng = makeRng(satellites.length * 31 + 7)
    // Satellites share whatever arc the chain is not using.
    const spread = chain.length ? Math.abs(chain[chain.length - 1].angle - chain[0].angle) : 0
    const arc = chain.length ? Math.PI * 2 - spread - CHAIN_CLEARANCE * 2 : Math.PI * 2
    const start = chain.length ? chain[0].angle + CHAIN_CLEARANCE : -Math.PI / 2
    const step = arc / Math.max(satellites.length - (chain.length ? 1 : 0), 1)

    const placed = buildNodes()
    // Chain links are too small to hold a long name, so the label sits outside
    // the circle — set clear of the chain on the side the satellites do not use.
    const laid = chain.map((node) => {
      const x = cx + Math.cos(node.angle) * node.dist
      const y = cy + Math.sin(node.angle) * node.dist
      const perpendicular = node.angle - Math.PI / 2
      const reach = node.r + 15
      const width = node.meta.label.length * 6.4
      const inside = (dx, dy) =>
        x + dx - width / 2 > 6 &&
        x + dx + width / 2 < w - 6 &&
        y + dy - 9 > 6 &&
        y + dy + 9 < h - 6

      let ox = Math.cos(perpendicular) * reach
      let oy = Math.sin(perpendicular) * reach
      if (!inside(ox, oy)) {
        if (inside(-ox, -oy)) {
          ox = -ox
          oy = -oy
        } else {
          // Both sides run off an edge, so pull the label back into the frame.
          ox = clamp(ox, 6 + width / 2 - x, w - 6 - width / 2 - x)
          oy = clamp(oy, 15 - y, h - 15 - y)
        }
      }
      return { ...node, x, y, ox, oy }
    })

    // Park the tag in the emptiest direction so its leader line never crosses a
    // circle, preferring the upper left where the reference puts it.
    const occupied = [...placed.map((n) => n.angle), ...laid.map((n) => n.angle)]
    let tag = null
    for (let a = -Math.PI; a < Math.PI; a += 0.06) {
      const clearance = occupied.length
        ? Math.min(...occupied.map((u) => Math.abs(angleDelta(a, u))))
        : Math.PI
      if (clearance < 0.28) continue
      const score = -Math.abs(angleDelta(a, TAG_TARGET))
      if (!tag || score > tag.score) tag = { angle: a, score }
    }
    if (tag) {
      const dist = Math.min(ring * 1.36, roomAt(tag.angle) - TAG_RING - 14)
      if (dist < focalR + 74) {
        tag = null
      } else {
        const cos = Math.cos(tag.angle)
        const sin = Math.sin(tag.angle)
        tag = {
          label: KIND_LABELS[selection.kind] ?? '',
          side: cos < 0 ? 'left' : 'right',
          x: cx + cos * dist,
          y: cy + sin * dist,
          fromX: cx + cos * (focalR + 3),
          fromY: cy + sin * (focalR + 3),
          toX: cx + cos * (dist - TAG_RING),
          toY: cy + sin * (dist - TAG_RING),
        }
      }
    }

    const focalBody = { x: cx, y: cy, r: focalR }
    const necks = [
      ...placed.map((n) => ({ key: `n-${n.key}`, d: neckPath(focalBody, n) })),
      ...laid.map((n, i) => ({
        key: `c-${n.key}`,
        d: neckPath(i === 0 ? focalBody : laid[i - 1], n),
      })),
    ]
    // The panel is joined to the focal node by the same connective tissue.
    if (panelRight !== null) {
      necks.unshift({
        key: 'panel',
        d: neckPath(slabAnchor(panelRight, cy, 150), focalBody, {
          flare: 0.22,
          pinch: 0.5,
          bend: 0.36,
        }),
      })
    }

    // Each step of the route is named by a pill sitting on the neck it arrived
    // along, which keeps long names off the small circles entirely.
    const pills = laid.map((n, i) => {
      const span = midpointOf(i === 0 ? focalBody : laid[i - 1], n)
      // Long names are trimmed to what the gap can hold; the rail along the
      // bottom always carries the full one.
      // The pill may ride a little onto the rim of the circles either side, as
      // in the reference, which is what makes a surname fit at all.
      const room = span.gap + Math.min(span.minR, 60) * 1.5 - 18
      const budget = Math.max(4, Math.floor(room / 6.3))
      return {
        key: n.key,
        label: pillLabel(n.meta.label, n.kind, budget),
        title: n.meta.label,
        node: n,
        ...span,
      }
    })

    return {
      cx,
      cy,
      focalR,
      chain: laid,
      nodes: placed,
      necks,
      pills,
      tag,
    }

    function buildNodes() {
      return satellites.map((s, i) => {
        const angle = start + step * i + (rng() - 0.5) * step * 0.12
        const dist = ring * (0.9 + rng() * 0.18)
        // Long names get a proportionally larger circle so "Microorganisms and
        // Diseases" is not set at half the size of "Genes".
        const grow = clamp(s.label.length / 20, 0.86, 1.2)
        return {
          ...s,
          angle,
          r: satR * grow * (s.kind === 'theme' ? 1 : 0.92),
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
        }
      })
    }
  }, [box, satellites, history, selection])

  if (!focal) return null

  return (
    <div className="node-web" ref={ref}>
      {geometry && (
        <>
          <svg className="web-lines" aria-hidden="true">
            {geometry.necks.map((neck, i) => (
              <path
                className="neck"
                key={neck.key}
                d={neck.d}
                style={{ animationDelay: `${90 + i * 45}ms` }}
              />
            ))}
            {geometry.tag && (
              <line
                className="leader"
                x1={geometry.tag.fromX}
                y1={geometry.tag.fromY}
                x2={geometry.tag.toX}
                y2={geometry.tag.toY}
              />
            )}
          </svg>

          {geometry.tag && (
            <div className="node-tag" style={{ left: geometry.tag.x, top: geometry.tag.y }}>
              <span className="tag-ring" />
              <span className={`tag-label ${geometry.tag.side}`}>{geometry.tag.label}</span>
            </div>
          )}

          {geometry.chain.map((n) => (
            <button
              key={n.key}
              className={`web-node visited ${n.kind}`}
              style={{
                left: n.x,
                top: n.y,
                width: n.r * 2,
                height: n.r * 2,
                background: n.meta.color,
              }}
              onClick={() => onSelect(n)}
              title={`Back to ${n.meta.label}`}
            >
              <span className="sr-only">{n.meta.label}</span>
            </button>
          ))}

          {geometry.pills.map((pill) => (
            <button
              key={pill.key}
              className="neck-pill"
              style={{ left: pill.x, top: pill.y, transform: `translate(-50%, -50%) rotate(${pill.angle}deg)` }}
              onClick={() => onSelect(pill.node)}
              title={pill.title}
            >
              {pill.label}
            </button>
          ))}

          <div
            className="web-focal"
            style={{
              left: geometry.cx,
              top: geometry.cy,
              width: geometry.focalR * 2,
              height: geometry.focalR * 2,
            }}
          >
            <span
              className="focal-face"
              style={{
                background: focal.color,
                color: textOn(focal.color),
                fontSize: fitFontSize(geometry.focalR, focal.label),
              }}
            >
              {focal.label}
            </span>
          </div>

          {geometry.nodes.map((n, i) => (
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
                fontSize: fitFontSize(n.r, n.label),
                animationDelay: `${160 + i * 55}ms`,
              }}
              onClick={() => onSelect({ kind: n.kind, id: n.id })}
            >
              <span className="label">{n.label}</span>
              {n.sub && <span className="meta">{n.sub}</span>}
            </button>
          ))}
        </>
      )}
    </div>
  )
}
