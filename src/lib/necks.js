// Geometry for the connectors between circles. Connections are hairlines, so
// the only thing needed is where a label can sit on one.

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
