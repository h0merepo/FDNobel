import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Bubble from '../components/Bubble'
import PanCanvas from '../components/PanCanvas'
import Scrubber from '../components/Scrubber'
import TimelineWeb, { yearOf } from '../components/TimelineWeb'
import { MILESTONES, kindColor, milestoneTitle } from '../data/content'
import { t } from '../i18n'
import { nodeMeta, relatedTo } from '../lib/relations'
import { ghostCircles } from '../lib/layout'
import { DECADES, END_YEAR, PX_PER_YEAR, START_YEAR, WORLD, layoutByYear, yearToX } from '../lib/timeline'

// Only key events sit on the timeline; the people who made them are reached by
// opening an event, not by sharing the page with it.
const MILESTONE_RADIUS = { 2: 122, 3: 156, 4: 192 }

export default function Milestones({ selection, onSelect }) {
  const controls = useRef(null)
  const [year, setYear] = useState(1950)
  const [offsetX, setOffsetX] = useState(0)
  // The open panel covers the left of the frame, so anything behind it is as
  // out of view as anything past the edge.
  const [inset, setInset] = useState(0)

  const nodes = useMemo(
    () =>
      layoutByYear(
        MILESTONES.map((m) => ({
          id: m.id,
          kind: 'milestone',
          label: milestoneTitle(m),
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

  const handleOffset = useCallback(({ x }) => {
    const centre = -x + window.innerWidth / 2
    setYear(Math.round(START_YEAR + centre / PX_PER_YEAR))
    setOffsetX(x)
  }, [])

  // Measured rather than assumed: the panel's width comes from the stylesheet
  // and narrows on small screens, and the close button sits outside it.
  useEffect(() => {
    if (!selection) {
      setInset(0)
      return undefined
    }
    const measure = () => {
      const panel = document.querySelector('.story-holder')
      setInset(panel ? panel.getBoundingClientRect().right + 66 : 0)
    }
    const frame = requestAnimationFrame(measure)
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', measure)
    }
  }, [selection])

  // World-space bounds of the part of the timeline the reader can actually see.
  const viewport = useMemo(
    () => ({ left: -offsetX + inset, right: -offsetX + window.innerWidth }),
    [offsetX, inset],
  )

  // The page's own circles are the events. Step off one onto a laureate or a
  // story and it has no circle here, so the web draws its own at its year —
  // the network never leaves the timeline.
  const focal = useMemo(() => {
    if (!selection) return null
    const own = nodes.find((n) => n.kind === selection.kind && n.id === selection.id)
    if (own) return own
    const meta = nodeMeta(selection)
    const year = yearOf({ ...selection, label: meta?.label })
    if (!meta || year === null) return null
    return {
      ...selection,
      label: meta.label,
      sub: meta.sub,
      color: meta.color,
      x: yearToX(year),
      y: 370,
      r: 104,
      year,
      standalone: true,
    }
  }, [selection, nodes])

  const related = useMemo(() => (focal ? relatedTo(selection, 7, 'milestones') : []), [focal, selection])

  // Events in the web keep their full weight; everything else recedes.
  const linked = useMemo(
    () => new Set(related.filter((n) => n.kind === 'milestone').map((n) => n.id)),
    [related],
  )

  // Bring the focal node into the clear part of the frame, not under the panel.
  useEffect(() => {
    if (!focal) return
    setYear(focal.year)
    controls.current?.panTo(focal.x - inset / 2)
  }, [focal, inset])

  const travel = useCallback(
    (node) => {
      controls.current?.panTo(node.x - inset / 2)
      setYear(Math.round(START_YEAR + node.x / PX_PER_YEAR))
    },
    [inset],
  )

  return (
    <>
      <div className="page-hint">
        <h1>{t('milestonesTitle')}</h1>
        <p>{t('milestonesHint')}</p>
      </div>
      <PanCanvas world={WORLD} offsetRef={controls} onOffsetChange={handleOffset} lockY>
        {ghosts.map((g) => (
          <span
            key={g.id}
            className="world-ghost"
            style={{
              left: g.x,
              top: g.y,
              width: g.r * 2,
              height: g.r * 2,
              opacity: g.o,
              background: g.c,
              filter: `blur(${g.blur}px)`,
            }}
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
            dimmed={Boolean(focal) && node !== focal && !linked.has(node.id)}
            selected={selection?.kind === node.kind && selection.id === node.id}
            onSelect={(n) => onSelect({ kind: n.kind, id: n.id })}
          />
        ))}
        {focal && (
          <TimelineWeb
            related={related}
            focal={focal}
            viewport={viewport}
            page={nodes}
            onSelect={onSelect}
            onTravel={travel}
          />
        )}
      </PanCanvas>
      <Scrubber year={year} min={START_YEAR} max={END_YEAR} ticks={DECADES} onScrub={scrubTo} />
    </>
  )
}
