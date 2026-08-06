import { useEffect, useMemo, useRef, useState } from 'react'
import { textOn } from '../data/content'
import { clamp, makeRng } from '../lib/layout'
import { nodeMeta, relatedTo } from '../lib/relations'

const FOCAL_MAX = 128
const SAT_MAX = 64

function fitFontSize(radius, label) {
  const longest = label.split(' ').reduce((n, w) => Math.max(n, w.length), 0)
  return Math.max(9, Math.min(radius / 4.6, (radius * 1.7) / Math.max(longest, 5), 26))
}

export default function NodeWeb({ selection, onSelect }) {
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
  const satellites = useMemo(() => relatedTo(selection), [selection])

  const geometry = useMemo(() => {
    const { w, h } = box
    if (!w || !h) return null
    const cx = w / 2
    const cy = h / 2
    const half = Math.min(cx, cy)

    // Everything scales off the smaller half-axis so the web stays inside the
    // viewport on short screens instead of pushing satellites off the edges.
    const satR = clamp(half * 0.2, 34, SAT_MAX)
    const focalR = clamp(half * 0.42, 68, FOCAL_MAX)
    const ring = clamp(half - satR - 26, focalR + satR + 18, 360)

    const rng = makeRng(satellites.length * 31 + 7)
    const step = (Math.PI * 2) / Math.max(satellites.length, 1)

    return {
      cx,
      cy,
      focalR,
      nodes: satellites.map((s, i) => {
        const angle = -Math.PI / 2 + step * i + (rng() - 0.5) * step * 0.22
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
  }, [box, satellites])

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
          </svg>

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
