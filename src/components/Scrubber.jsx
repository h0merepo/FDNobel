import { useRef } from 'react'
import { clamp } from '../lib/layout'

export default function Scrubber({ year, min, max, ticks, onScrub }) {
  const trackRef = useRef(null)
  const dragging = useRef(false)
  const pct = (year - min) / (max - min)

  const scrubTo = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect()
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1)
    onScrub(Math.round(min + ratio * (max - min)))
  }

  return (
    <div className="scrubber">
      <div className="scrubber-years">
        {ticks.map((t) => (
          <span
            key={t}
            className={Math.abs(t - year) < 5 ? 'near' : ''}
            onClick={() => onScrub(t)}
          >
            {t}
          </span>
        ))}
      </div>
      <div
        ref={trackRef}
        className="scrubber-track"
        onPointerDown={(e) => {
          dragging.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          scrubTo(e.clientX)
        }}
        onPointerMove={(e) => dragging.current && scrubTo(e.clientX)}
        onPointerUp={(e) => {
          dragging.current = false
          e.currentTarget.releasePointerCapture(e.pointerId)
        }}
      >
        <span className="scrubber-thumb" style={{ left: `${pct * 100}%` }} />
      </div>
    </div>
  )
}
