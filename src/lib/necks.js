// Connectors are drawn as tapered necks rather than lines, so nodes read as one
// body of connective tissue with circles sitting on it. Each neck leaves both
// circles along the axis between them and pinches at the waist.

const point = (c, angle, r) => [c.x + Math.cos(angle) * r, c.y + Math.sin(angle) * r]
const fixed = ([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`

export function neckPath(a, b, { flare = 0.62, pinch = 0.46, bend = 0.3 } = {}) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const d = Math.hypot(dx, dy)
  if (!d) return ''

  const theta = Math.atan2(dy, dx)
  // The neck is sized off the smaller circle so a satellite never sprouts a
  // neck wider than itself.
  const half = Math.min(a.r, b.r) * flare
  const spreadA = Math.asin(Math.min(0.94, half / a.r))
  const spreadB = Math.asin(Math.min(0.94, half / b.r))

  const a1 = point(a, theta - spreadA, a.r)
  const a2 = point(a, theta + spreadA, a.r)
  const b1 = point(b, theta + Math.PI + spreadB, b.r)
  const b2 = point(b, theta + Math.PI - spreadB, b.r)

  const waist = half * pinch
  const mx = a.x + Math.cos(theta) * (d / 2)
  const my = a.y + Math.sin(theta) * (d / 2)
  const nx = -Math.sin(theta)
  const ny = Math.cos(theta)
  const w1 = [mx - nx * waist, my - ny * waist]
  const w2 = [mx + nx * waist, my + ny * waist]

  const k = d * bend
  const out = (p) => [p[0] + Math.cos(theta) * k, p[1] + Math.sin(theta) * k]
  const back = (p) => [p[0] - Math.cos(theta) * k, p[1] - Math.sin(theta) * k]

  return [
    `M ${fixed(a1)}`,
    `Q ${fixed(out(a1))} ${fixed(w1)}`,
    `Q ${fixed(back(b1))} ${fixed(b1)}`,
    `L ${fixed(b2)}`,
    `Q ${fixed(back(b2))} ${fixed(w2)}`,
    `Q ${fixed(out(a2))} ${fixed(a2)}`,
    'Z',
  ].join(' ')
}

// The panel is a slab, not a circle, so it is stood in for by a very large
// circle whose edge sits on the panel's right side. The overlap is hidden
// behind the panel itself.
export function slabAnchor(right, centerY, radius = 620) {
  return { x: right - radius, y: centerY, r: radius }
}

// Centred on the free span between the two circles, so the pill sits in the
// gap rather than riding over either of them.
export function midpointOf(a, b) {
  const theta = Math.atan2(b.y - a.y, b.x - a.x)
  const sx = a.x + Math.cos(theta) * a.r
  const sy = a.y + Math.sin(theta) * a.r
  const ex = b.x - Math.cos(theta) * b.r
  const ey = b.y - Math.sin(theta) * b.r
  let angle = theta
  // Keep pill text upright rather than letting it run upside down.
  if (angle > Math.PI / 2) angle -= Math.PI
  if (angle < -Math.PI / 2) angle += Math.PI
  return {
    x: (sx + ex) / 2,
    y: (sy + ey) / 2,
    angle: (angle * 180) / Math.PI,
    gap: Math.hypot(ex - sx, ey - sy),
    minR: Math.min(a.r, b.r),
  }
}
