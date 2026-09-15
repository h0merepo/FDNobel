import { useEffect, useMemo, useState } from 'react'
import { DECADES, END_YEAR, START_YEAR, WORLD, yearToX } from '../lib/timeline'

// The decade the reader is standing in is set large enough to be read as
// ground rather than as a label — the years behind the network, not beside it.
// Placed against the window rather than at a fixed depth, so on a wall it sits
// in the middle of the glass instead of near the top of it.
const eraY = (height) => Math.round(height * 0.45)
// The ruler runs under the circles and over the foot of the plane, so the
// timeline reads as a measured thing even where no event happens to fall. It is
// measured off the window rather than the plane, because the scrubber is fixed
// to the foot of the window: this keeps the ruler clear of it on a short screen
// and carries it all the way down on a tall one, instead of stranding it a
// third of the way up a 55-inch panel.
const rulerY = (height) => height - 164

const YEARS = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i)
const tickHeight = (year) => (year % 10 === 0 ? 22 : year % 5 === 0 ? 12 : 6)

export default function TimelineBackdrop({ year }) {
  const near = Math.floor(year / 10) * 10
  const [bed, setBed] = useState(() => ({ ruler: rulerY(innerHeight), era: eraY(innerHeight) }))
  const { ruler, era } = bed

  useEffect(() => {
    const measure = () => setBed({ ruler: rulerY(innerHeight), era: eraY(innerHeight) })
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const ticks = useMemo(
    () => YEARS.map((y) => ({ y, x: yearToX(y), h: tickHeight(y) })),
    [],
  )

  return (
    <div className="timeline-bed" aria-hidden="true">
      {DECADES.map((d) => (
        <span
          key={`era-${d}`}
          className={`era${d === near ? ' near' : ''}`}
          style={{ left: yearToX(d), top: era }}
        >
          {d}
        </span>
      ))}

      {DECADES.map((d) => (
        <span
          key={`rule-${d}`}
          className="year-rule"
          style={{ left: yearToX(d), top: 0, height: ruler }}
        />
      ))}

      <span className="ruler-line" style={{ left: 0, top: ruler, width: WORLD.width }} />

      {/* No years printed here: the decade numeral above already names the
          stretch, and the scrubber below names it again. The ticks are the
          measure, nothing else. */}
      {ticks.map(({ y, x, h }) => (
        <span key={`tick-${y}`} className="ruler-tick" style={{ left: x, top: ruler, height: h }} />
      ))}
    </div>
  )
}
