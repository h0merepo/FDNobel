import { useMemo } from 'react'
import { ghostCircles } from '../lib/layout'

export default function Ambient({ count = 26, seed = 12 }) {
  const circles = useMemo(
    () => ghostCircles(count, { width: 100, height: 100, seed }),
    [count, seed],
  )
  return (
    <div className="ambient" aria-hidden="true">
      {circles.map((c) => (
        <span
          key={c.id}
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.r * 1.6,
            height: c.r * 1.6,
            opacity: c.o,
            background: c.c,
            filter: `blur(${c.blur}px)`,
          }}
        />
      ))}
    </div>
  )
}
