import { useEffect, useMemo, useRef, useState } from 'react'
import { textOn } from '../data/content'
import { clamp, makeRng } from '../lib/layout'
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
const CHAIN_SCALES = [1, 0.94, 0.88, 0.82, 0.76, 0.7]
// Clearance either side of the chain that satellites may not occupy.
const CHAIN_CLEARANCE = 0.65

function fitFontSize(radius, label) {
  const longest = label.split(' ').reduce((n, w) => Math.max(n, w.length), 0)
  return Math.max(9, Math.min(radius / 4.6, (radius * 1.7) / Math.max(longest, 5), 26))
}

export default function NodeWeb({ selection, trail, onSelect }) {
  const ref = useRef(null)
  const [box, setBox] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

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
    const { w, h } = box
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
        distance += previousR + r + 34 * scale
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

    return {
      cx,
      cy,
      focalR,
      chain: chain.map((node) => ({
        ...node,
        x: cx + Math.cos(node.angle) * node.dist,
        y: cy + Math.sin(node.angle) * node.dist,
      })),
      nodes: satellites.map((s, i) => {
        const angle = start + step * i + (rng() - 0.5) * step * 0.12
        const dist = ring * (0.9 + rng() * 0.18)
        // Long names get a proportionally larger circle so "Microorganisms and
        // Diseases" is not set at half the size of "Genes".
        const grow = clamp(s.label.length / 20, 0.86, 1.2)
        return {
          ...s,
          r: satR * grow * (s.kind === 'theme' ? 1 : 0.92),
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
        }
      }),
    }
  }, [box, satellites, history])

  if (!focal) return null

  return (
    <div className="node-web" ref={ref}>
      {geometry && (
        <>
          <svg className="web-lines" aria-hidden="true">
            {geometry.nodes.map((n, i) => (
              <line
                key={n.key}
                x1={geometry.cx}
                y1={geometry.cy}
                x2={n.x}
                y2={n.y}
                style={{ animationDelay: `${120 + i * 55}ms` }}
              />
            ))}
            {geometry.chain.map((n, i) => {
              const from = i === 0 ? { x: geometry.cx, y: geometry.cy } : geometry.chain[i - 1]
              return <line className="path" key={n.key} x1={from.x} y1={from.y} x2={n.x} y2={n.y} />
            })}
          </svg>

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
                color: textOn(n.meta.color),
                fontSize: fitFontSize(n.r, n.meta.label),
              }}
              onClick={() => onSelect(n)}
              title={`Back to ${n.meta.label}`}
            >
              <span className="label">{n.meta.label}</span>
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
