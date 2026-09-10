// The neck joining two circles: a straight bar of constant width, meeting each
// circle through a rounded corner rather than flaring into it.
//
// Each corner is a fillet — an arc of radius f tangent to both the bar's edge
// and the circle. Its centre sits outside the shape at distance f from the
// edge and r + f from the circle's centre, which fixes how far along the axis
// the straight part can begin:
//
//     a² + (w + f)² = (r + f)²   →   a = √((r − w)(r + w + 2f))

const gap = (a, b) => Math.hypot(b.x - a.x, b.y - a.y)

/**
 * @param c1 {{x, y, r}} @param c2 {{x, y, r}}
 * @param width half-width of the bar
 * @param fillet radius of the rounded corner into each circle
 * @returns an SVG path string, or null when the two are too far apart to join
 */
export function neckPath(c1, c2, { width = 10, fillet = 24 } = {}) {
  const d = gap(c1, c2)
  if (!d) return null

  // The bar can never be wider than the circles it grows out of.
  const w = Math.min(width, c1.r * 0.92, c2.r * 0.92)
  if (w <= 0.5) return null

  const ux = (c2.x - c1.x) / d
  const uy = (c2.y - c1.y) / d
  const px = -uy
  const py = ux

  const foot = (r, f) => Math.sqrt(Math.max(0, (r - w) * (r + w + 2 * f)))

  // A generous corner needs room; where the circles nearly touch there is none,
  // so the fillet is eased down until the two ends stop overrunning each other.
  let f = fillet
  let a1 = foot(c1.r, f)
  let a2 = foot(c2.r, f)
  for (let i = 0; i < 24 && f > 0.5 && a1 + a2 > d; i += 1) {
    f *= 0.75
    a1 = foot(c1.r, f)
    a2 = foot(c2.r, f)
  }
  if (a1 + a2 > d) return null

  // Everything is laid out along the axis, then rotated into place.
  const at = (along, across) => ({
    x: c1.x + ux * along + px * across,
    y: c1.y + uy * along + py * across,
  })

  // Where each fillet touches its circle: on the line from the circle's centre
  // out to the fillet's centre.
  const k1 = c1.r / (c1.r + f)
  const k2 = c2.r / (c2.r + f)
  const n = (v) => Math.round(v * 100) / 100
  const pt = (p) => `${n(p.x)},${n(p.y)}`

  const s1a = at(a1 * k1, (w + f) * k1)
  const e1a = at(a1, w)
  const e2a = at(d - a2, w)
  const s2a = at(d - a2 * k2, (w + f) * k2)
  const s2b = at(d - a2 * k2, -(w + f) * k2)
  const e2b = at(d - a2, -w)
  const e1b = at(a1, -w)
  const s1b = at(a1 * k1, -(w + f) * k1)

  // All four corners are the same concave tuck, and the path walks the outline
  // in one consistent direction — so every one of them sweeps the same way. Two
  // of them mirrored looks right in the algebra and draws the arc the wrong way
  // round, which is what put a lump on one side of every neck.
  const arc = (p) => `A${n(f)},${n(f)} 0 0 1 ${pt(p)}`

  // Down one side and back along the other; the two chords across the circles
  // are hidden underneath them.
  return [
    `M${pt(s1a)}`,
    arc(e1a),
    `L${pt(e2a)}`,
    arc(s2a),
    `L${pt(s2b)}`,
    arc(e2b),
    `L${pt(e1b)}`,
    arc(s1b),
    'Z',
  ].join(' ')
}

// True when two circles are close enough that a neck reads as a neck rather
// than a thread — used to decide where the web fuses and where it draws a line.
export const fusable = (c1, c2, slack = 0.5) =>
  gap(c1, c2) - c1.r - c2.r < (c1.r + c2.r) * slack
