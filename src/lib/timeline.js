import { clamp, makeRng } from './layout'

export const START_YEAR = 1895
export const END_YEAR = 2030
export const PX_PER_YEAR = 74
export const WORLD = {
  width: (END_YEAR - START_YEAR) * PX_PER_YEAR,
  height: 900,
}

export const yearToX = (year) => (year - START_YEAR) * PX_PER_YEAR

// Nodes settle mostly vertically; x may drift a little either side of its year
// so that busy years can still resolve into a readable, non-overlapping cluster.
const X_DRIFT = 66

function relax(circles, { padding, top, bottom, rng, iterations = 600 }) {
  for (let iter = 0; iter < iterations; iter++) {
    let moved = 0
    for (let i = 0; i < circles.length; i++) {
      for (let j = i + 1; j < circles.length; j++) {
        const a = circles[i]
        const b = circles[j]
        const minD = a.r + b.r + padding
        let dx = b.x - a.x
        let dy = b.y - a.y
        let d = Math.hypot(dx, dy)
        if (d >= minD) continue
        if (d === 0) {
          dx = rng() - 0.5
          dy = rng() - 0.5
          d = Math.hypot(dx, dy) || 1
        }
        const push = (minD - d) / 2
        // bias the separation towards the vertical axis to preserve year order
        const ux = (dx / d) * push * 0.35
        const uy = (dy / d) * push
        a.x -= ux
        a.y -= uy
        b.x += ux
        b.y += uy
        moved += push
      }
    }
    for (const c of circles) {
      c.x = clamp(c.x, c.anchorX - X_DRIFT, c.anchorX + X_DRIFT)
      c.y = clamp(c.y, top + c.r, bottom - c.r)
    }
    if (moved < 0.5) break
  }
  return circles
}

export function layoutByYear(items, { seed = 3, padding = 20, top = 70, bottom = 810 } = {}) {
  const rng = makeRng(seed)
  const placed = items.map((item) => {
    const anchorX = yearToX(item.year)
    return {
      ...item,
      anchorX,
      x: anchorX,
      y: top + item.r + rng() * Math.max(1, bottom - top - item.r * 2),
    }
  })
  return relax(placed, { padding, top, bottom, rng })
}

export const DECADES = Array.from(
  { length: Math.floor((END_YEAR - 1900) / 10) + 1 },
  (_, i) => 1900 + i * 10,
)
