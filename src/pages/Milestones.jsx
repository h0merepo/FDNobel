import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Bubble from '../components/Bubble'
import PanCanvas from '../components/PanCanvas'
import Scrubber from '../components/Scrubber'
import { LAUREATES, MILESTONES, PALETTE, fieldColor } from '../data/content'
import { ghostCircles } from '../lib/layout'
import { DECADES, END_YEAR, PX_PER_YEAR, START_YEAR, WORLD, layoutByYear, yearToX } from '../lib/timeline'

const MILESTONE_RADIUS = { 2: 108, 3: 142, 4: 176 }

export default function Milestones({ selection, onSelect }) {
  const controls = useRef(null)
  const [year, setYear] = useState(1950)

  const nodes = useMemo(() => {
    const milestones = MILESTONES.map((m) => ({
      id: m.id,
      kind: 'milestone',
      label: m.title,
      year: m.year,
      r: MILESTONE_RADIUS[m.weight] ?? 108,
      color: PALETTE.sand,
    }))
    const people = LAUREATES.map((l) => ({
      id: l.id,
      kind: 'person',
      label: l.name,
      meta: String(l.year),
      year: l.year,
      r: 66,
      color: fieldColor(l.field),
    }))
    return layoutByYear([...milestones, ...people], { seed: 9 })
  }, [])

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
        <p>Drag through the century · scrub below to jump</p>
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
