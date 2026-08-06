export function makeRng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

function relax(circles, { width, height, padding, iterations = 400, rng }) {
  for (let iter = 0; iter < iterations; iter++) {
    let moved = 0
    for (let i = 0; i < circles.length; i++) {
      for (let j = i + 1; j < circles.length; j++) {
        const a = circles[i]
        const b = circles[j]
        let dx = b.x - a.x
        let dy = b.y - a.y
        let d = Math.hypot(dx, dy)
        if (d === 0) {
          dx = rng() - 0.5
          dy = rng() - 0.5
          d = Math.hypot(dx, dy) || 1
        }
        const minD = a.r + b.r + padding
        if (d >= minD) continue
        const push = (minD - d) / 2
        const ux = (dx / d) * push
        const uy = (dy / d) * push
        a.x -= ux
        a.y -= uy
        b.x += ux
        b.y += uy
        moved += push
      }
    }
    for (const c of circles) {
      c.x = clamp(c.x, c.r, width - c.r)
      c.y = clamp(c.y, c.r, height - c.r)
    }
    if (moved < 0.5) break
  }
  return circles
}

export function packCircles(items, { width, height, seed = 7, padding = 26, attempts = 400 }) {
  const rng = makeRng(seed)
  const placed = []
  const sorted = [...items].sort((a, b) => b.r - a.r)

  for (const item of sorted) {
    let best = null
    for (let i = 0; i < attempts; i++) {
      const x = item.r + rng() * (width - item.r * 2)
      const y = item.r + rng() * (height - item.r * 2)
      let minGap = Infinity
      for (const p of placed) {
        const gap = Math.hypot(x - p.x, y - p.y) - (item.r + p.r)
        if (gap < minGap) minGap = gap
      }
      if (minGap >= padding) {
        best = { x, y, gap: minGap }
        break
      }
      if (!best || minGap > best.gap) best = { x, y, gap: minGap }
    }
    placed.push({ ...item, x: best.x, y: best.y })
  }

  return relax(placed, { width, height, padding, rng })
}

export function ghostCircles(count, { width, height, seed = 99 }) {
  const rng = makeRng(seed)
  return Array.from({ length: count }, (_, i) => ({
    id: `ghost-${i}`,
    x: rng() * width,
    y: rng() * height,
    r: 40 + rng() * 130,
    o: 0.35 + rng() * 0.4,
  }))
}

export function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v))
}
