import { useMemo } from 'react'
import { makeRng } from '../lib/layout'

// Depth behind the attractor: big out-of-focus circles in the palette. They are
// blurred enough to be plainly out of focus but not so much that they smear
// into a wash — each one still reads as a circle sitting at its own distance.
const TONES = ['#cea152', '#d1ccbe', '#b0a8a1', '#f5318b', '#c25f1b', '#2c8293', '#bac9d9']

export default function Ambient({ count = 20, seed = 12 }) {
  const circles = useMemo(() => {
    const rng = makeRng(seed)
    return Array.from({ length: count }, (_, i) => ({
      id: `bokeh-${i}`,
      x: rng() * 108 - 4,
      y: rng() * 108 - 4,
      d: 150 + rng() * 320,
      o: 0.14 + rng() * 0.3,
      c: TONES[Math.floor(rng() * TONES.length)],
      blur: 16 + rng() * 26,
    })
  )}, [count, seed])

  return (
    <div className="ambient" aria-hidden="true">
      {circles.map((c) => (
        <span
          key={c.id}
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.d,
            height: c.d,
            opacity: c.o,
            background: c.c,
            filter: `blur(${c.blur}px)`,
          }}
        />
      ))}
    </div>
  )
}
