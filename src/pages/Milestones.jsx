import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Bubble from '../components/Bubble'
import PanCanvas from '../components/PanCanvas'
import Scrubber from '../components/Scrubber'
import { MILESTONES, kindColor } from '../data/content'
import { ghostCircles } from '../lib/layout'
import { DECADES, END_YEAR, PX_PER_YEAR, START_YEAR, WORLD, layoutByYear, yearToX } from '../lib/timeline'

// Only key events sit on the timeline; the people who made them are reached by
// opening an event, not by sharing the page with it.
const MILESTONE_RADIUS = { 2: 122, 3: 156, 4: 192 }

export default function Milestones({ selection, onSelect }) {
  const controls = useRef(null)
  const [year, setYear] = useState(1950)

  const nodes = useMemo(
    () =>
      layoutByYear(
        MILESTONES.map((m) => ({
          id: m.id,
          kind: 'milestone',
          label: m.title,
          meta: String(m.year),
          year: m.year,
          r: MILESTONE_RADIUS[m.weight] ?? 122,
          color: kindColor('milestone'),
        })),
        // keep the band clear of the scrubber at the foot of the page
        { seed: 9, top: 92, bottom: 648, padding: 26 },
      ),
    [],
  )

  const ghosts = useMemo(() => ghostCircles(40, { ...WORLD, seed: 71 }), [])

  const scrubTo = useCallback((nextYear) => {
    setYear(nextYear)
    controls.current?.panTo(yearToX(nextYear))
  }, [])

  useEffect(() => {
    scrubTo(1950)
  }, [scrubTo])

  useEffect(() => {
    if (!selection) return
    const node = nodes.find((n) => n.kind === selection.kind && n.id === selection.id)
    if (node) {
      setYear(node.year)
      controls.current?.panTo(node.x)
    }
  }, [selection, nodes])

  const handleOffset = useCallback(({ x }) => {
    const centre = -x + window.innerWidth / 2
    setYear(Math.round(START_YEAR + centre / PX_PER_YEAR))
  }, [])

  return (
    <>
      <div className="page-hint">
        <h1>Milestones</h1>
        <p>Key events across the century · open one to meet its laureates</p>
      </div>
      <PanCanvas world={WORLD} offsetRef={controls} onOffsetChange={handleOffset} lockY>
        {ghosts.map((g) => (
          <span
            key={g.id}
            className="world-ghost"
            style={{ left: g.x, top: g.y, width: g.r * 2, height: g.r * 2, opacity: g.o }}
          />
        ))}
        {DECADES.map((d) => (
          <span key={`rule-${d}`} className="year-rule" style={{ left: yearToX(d), top: 0, height: WORLD.height }} />
        ))}
        {DECADES.map((d) => (
          <span key={`mark-${d}`} className="year-marker" style={{ left: yearToX(d), top: 28 }}>
            {d}
          </span>
        ))}
        {nodes.map((node) => (
          <Bubble
            key={`${node.kind}-${node.id}`}
            node={node}
            selected={selection?.kind === node.kind && selection.id === node.id}
            onSelect={(n) => onSelect({ kind: n.kind, id: n.id })}
          />
        ))}
      </PanCanvas>
      <Scrubber year={year} min={START_YEAR} max={END_YEAR} ticks={DECADES} onScrub={scrubTo} />
    </>
  )
}
