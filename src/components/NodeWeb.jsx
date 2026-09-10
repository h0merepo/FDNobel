import { useEffect, useMemo, useRef, useState } from 'react'
import { kindLabel, textOn } from '../data/content'
import { clamp, makeRng } from '../lib/layout'
import { fusable, neckPath } from '../lib/neck'
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

// Route circles are secondary, so they may set smaller than a satellite — but
// never so small that a word will not fit. Both the radius floor and the type
// size come off the longest word, so a step can never clip its own name.
const CHAIN_FONT_MIN = 8

const longestWord = (label) => label.split(' ').reduce((n, w) => Math.max(n, w.length), 0)

function chainRadiusFor(label) {
  return Math.max(26, longestWord(label) * 2.6 + 9)
}

function chainFontSize(radius, label) {
  return Math.max(
    CHAIN_FONT_MIN,
    Math.min(radius / 4.6, (radius * 1.7) / Math.max(longestWord(label), 5), 17),
  )
}

function fitFontSize(radius, label) {
  const longest = label.split(' ').reduce((n, w) => Math.max(n, w.length), 0)
  return Math.max(9, Math.min(radius / 4.6, (radius * 1.7) / Math.max(longest, 5), 26))
}

export default function NodeWeb({ selection, trail, mode, onSelect }) {
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
    return relatedTo(selection, 12, mode)
      .filter((s) => !visitedKeys.has(s.key) && !visitedLabels.has(s.label))
      .slice(0, 8)
  }, [selection, trail, mode])

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
        const r = Math.max(
          chainRadiusFor(history[i].meta.label),
          satR * 0.9 ** (i + 1) * scale,
        )
        distance += previousR + r + 42 * scale
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
    // Visited steps carry their own name, at a size their radius guarantees.
    const laid = chain.map((node) => ({
      ...node,
      x: cx + Math.cos(node.angle) * node.dist,
      y: cy + Math.sin(node.angle) * node.dist,
    }))

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
          label: kindLabel(selection.kind),
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
    // A connection ends on a point set just inside the circle it belongs to,
    // rather than running blindly on to its centre.
    const landing = (x1, y1, node) => {
      const d = Math.hypot(node.x - x1, node.y - y1) || 1
      const back = Math.max(6, node.r - 9)
      return { ex: node.x - ((node.x - x1) / d) * back, ey: node.y - ((node.y - y1) / d) * back }
    }
    const links = [
      ...placed.map((n) => ({
        key: `n-${n.key}`,
        x1: cx,
        y1: cy,
        r1: focalR,
        x2: n.x,
        y2: n.y,
        r2: n.r,
        color: n.color,
        ...landing(cx, cy, n),
      })),
      ...laid.map((n, i) => {
        const from = i === 0 ? focalBody : laid[i - 1]
        return {
          key: `c-${n.key}`,
          route: true,
          x1: from.x,
          y1: from.y,
          r1: from.r,
          x2: n.x,
          y2: n.y,
          r2: n.r,
          ...landing(from.x, from.y, n),
        }
      }),
    ]
    // The panel is tethered to the focal node by the same hairline.
    if (panelRight !== null) {
      links.unshift({ key: 'panel', x1: panelRight, y1: cy, x2: cx, y2: cy })
    }

    // Circles sitting close enough are joined by a neck instead of a line, so
    // the route out of the focal node reads as one body rather than a diagram.
    for (const link of links) {
      if (link.r1 === undefined || link.r2 === undefined) continue
      const a = { x: link.x1, y: link.y1, r: link.r1 }
      const b = { x: link.x2, y: link.y2, r: link.r2 }
      if (!fusable(a, b)) continue
      // A neck is a slim line whatever it joins: the width barely tracks the
      // circles, or a large focal node drags every bar out with it.
      const thin = Math.min(a.r, b.r)
      link.neck = neckPath(a, b, {
        width: clamp(thin * 0.085, 3.5, 8),
        fillet: clamp(thin * 0.24, 9, 22),
      })
    }

    return {
      cx,
      cy,
      focalR,
      chain: laid,
      nodes: placed,
      links,
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
            {geometry.links.map((link, i) =>
              link.neck ? (
                <path
                  className={`web-neck${link.route ? ' path' : ''}`}
                  key={link.key}
                  d={link.neck}
                  style={{
                    animationDelay: `${90 + i * 45}ms`,
                    // the neck belongs to the circle it grows out of, so it
                    // carries that circle's colour rather than the line's
                    fill: link.route ? undefined : link.color,
                  }}
                />
              ) : (
                <line
                  className={link.route ? 'path' : undefined}
                  key={link.key}
                  x1={link.x1}
                  y1={link.y1}
                  x2={link.x2}
                  y2={link.y2}
                  style={{ animationDelay: `${90 + i * 45}ms` }}
                />
              ),
            )}
            {/* Each connection lands on a small point rather than running
                blindly into the circle it belongs to. */}
            {geometry.links
              .filter((link) => link.ex !== undefined && !link.neck)
              .map((link, i) => (
                <circle
                  className={`link-end${link.route ? ' path' : ''}`}
                  key={`${link.key}-end`}
                  cx={link.ex}
                  cy={link.ey}
                  r="2.6"
                  style={{ animationDelay: `${140 + i * 45}ms` }}
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
                color: textOn(n.meta.color),
                fontSize: chainFontSize(n.r, n.meta.label),
              }}
              onClick={() => onSelect(n)}
              title={`Back to ${n.meta.label}`}
            >
              <span className="label">{n.meta.label}</span>
              {/* just the year here, as on the ring — the country is in the panel */}
              {n.meta.sub && <span className="meta">{n.meta.sub.split(' · ')[0]}</span>}
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
