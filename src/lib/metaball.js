// The gooey neck between two circles: a closed path whose sides are pulled
// out of each circle's edge and bowed towards the other, so the two read as one
// body of liquid rather than two discs joined by a stick.
//
// The construction is the standard one — find the tangent angles on each
// circle, then bow the two sides with cubic handles whose length falls away as
// the circles separate, so a long connection thins to a hair and a short one
// swells into a proper neck.

const HALF_PI = Math.PI / 2

const on = (x, y, radius, angle) => ({
  x: x + radius * Math.cos(angle),
  y: y + radius * Math.sin(angle),
})

const gap = (a, b) => Math.hypot(b.x - a.x, b.y - a.y)

/**
 * @param c1 {{x, y, r}} the body the neck grows out of
 * @param c2 {{x, y, r}} the body it reaches for
 * @param spread how far round each circle the neck attaches, 0..1
 * @param handle how much the sides bow; higher is more liquid
 * @param maxDistance beyond this the two are simply too far apart to fuse
 * @returns an SVG path string, or null when no neck is possible
 */
export function metaballPath(c1, c2, { spread = 0.5, handle = 2.4, maxDistance = 900 } = {}) {
  const d = gap(c1, c2)
  // Nothing to draw if they are coincident, one swallows the other, or they
  // have simply drifted too far apart.
  if (!d || d > maxDistance || d <= Math.abs(c1.r - c2.r)) return null

  // Where the circles overlap the neck starts at the intersection; where they
  // do not it starts at the point facing the other circle.
  let u1 = 0
  let u2 = 0
  if (d < c1.r + c2.r) {
    u1 = Math.acos((c1.r * c1.r + d * d - c2.r * c2.r) / (2 * c1.r * d))
    u2 = Math.acos((c2.r * c2.r + d * d - c1.r * c1.r) / (2 * c2.r * d))
  }

  const between = Math.atan2(c2.y - c1.y, c2.x - c1.x)
  const widest = Math.acos((c1.r - c2.r) / d)

  const a1 = between + u1 + (widest - u1) * spread
  const b1 = between - u1 - (widest - u1) * spread
  const a2 = between + Math.PI - u2 - (Math.PI - u2 - widest) * spread
  const b2 = between - Math.PI + u2 + (Math.PI - u2 - widest) * spread

  const p1a = on(c1.x, c1.y, c1.r, a1)
  const p1b = on(c1.x, c1.y, c1.r, b1)
  const p2a = on(c2.x, c2.y, c2.r, a2)
  const p2b = on(c2.x, c2.y, c2.r, b2)

  const total = c1.r + c2.r
  // The bow relaxes as the circles part, so the neck tapers rather than
  // staying fat all the way out to a distant circle.
  const pull =
    Math.min(spread * handle, gap(p1a, p2a) / total) * Math.min(1, (d * 2) / total)
  const h1 = c1.r * pull
  const h2 = c2.r * pull

  const c1a = on(p1a.x, p1a.y, h1, a1 - HALF_PI)
  const c2a = on(p2a.x, p2a.y, h2, a2 + HALF_PI)
  const c2b = on(p2b.x, p2b.y, h2, b2 - HALF_PI)
  const c1b = on(p1b.x, p1b.y, h1, b1 + HALF_PI)

  const n = (v) => Math.round(v * 100) / 100
  return [
    `M${n(p1a.x)},${n(p1a.y)}`,
    `C${n(c1a.x)},${n(c1a.y)} ${n(c2a.x)},${n(c2a.y)} ${n(p2a.x)},${n(p2a.y)}`,
    `L${n(p2b.x)},${n(p2b.y)}`,
    `C${n(c2b.x)},${n(c2b.y)} ${n(c1b.x)},${n(c1b.y)} ${n(p1b.x)},${n(p1b.y)}`,
    'Z',
  ].join(' ')
}

// True when two circles are close enough that a neck reads as a neck rather
// than a thread — used to decide where the web fuses and where it draws a line.
export const fusable = (c1, c2, slack = 0.55) =>
  gap(c1, c2) - c1.r - c2.r < (c1.r + c2.r) * slack
