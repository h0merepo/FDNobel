import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Bubble from '../components/Bubble'
import FilterPanel from '../components/FilterPanel'
import PanCanvas from '../components/PanCanvas'
import {
  ARTIFACTS,
  FIELDS,
  LAUREATES,
  MILESTONES,
  THEMES,
  findLaureate,
  kindColor,
} from '../data/content'
import { STORIES } from '../data/stories'
import { ghostCircles, packCircles } from '../lib/layout'

const WORLD = { width: 4200, height: 2800 }
const BOUNDS = [1900, 2025]

const COUNTRIES = [...new Set(LAUREATES.map((l) => l.country))].sort()

export default function Discovery({ selection, onSelect }) {
  const controls = useRef(null)
  const [activeFields, setActiveFields] = useState([])
  const [activeCountries, setActiveCountries] = useState([])
  const [range, setRange] = useState(BOUNDS)

  const nodes = useMemo(() => {
    const items = [
      ...LAUREATES.map((l) => ({
        id: l.id,
        kind: 'person',
        label: l.name,
        meta: `${FIELDS.find((f) => f.id === l.field)?.label.split(' ')[0]} ${l.year}`,
        r: 92,
        color: kindColor('person'),
        field: l.field,
        country: l.country,
        year: l.year,
      })),
      ...THEMES.map((t) => ({
        id: t.id,
        kind: 'theme',
        label: t.label,
        r: t.weight === 3 ? 118 : t.weight === 2 ? 92 : 72,
        color: kindColor('theme'),
        fields: [...new Set(t.laureates.map((id) => findLaureate(id)?.field).filter(Boolean))],
        countries: [...new Set(t.laureates.map((id) => findLaureate(id)?.country).filter(Boolean))],
        years: t.laureates.map((id) => findLaureate(id)?.year).filter(Boolean),
      })),
      ...MILESTONES.map((m) => ({
        id: m.id,
        kind: 'milestone',
        label: m.title,
        meta: String(m.year),
        r: 96,
        color: kindColor('milestone'),
        year: m.year,
      })),
      ...STORIES.map((n) => ({
        id: n.id,
        kind: 'story',
        label: n.title,
        meta: n.sub,
        r: 104,
        color: kindColor('story'),
      })),
      ...ARTIFACTS.map((a) => ({
        id: a.id,
        kind: 'artifact',
        label: a.label,
        r: 78,
        color: kindColor('artifact'),
      })),
    ]
    return packCircles(items, { ...WORLD, seed: 33, padding: 34 })
  }, [])

  const ghosts = useMemo(() => ghostCircles(46, { ...WORLD, seed: 88 }), [])

  const matches = useCallback(
    (node) => {
      const nodeFields = node.fields ?? (node.field ? [node.field] : [])
      const nodeCountries = node.countries ?? (node.country ? [node.country] : [])
      const nodeYears = node.years ?? (node.year ? [node.year] : [])

      if (activeFields.length && nodeFields.length && !nodeFields.some((f) => activeFields.includes(f))) {
        return false
      }
      if (
        activeCountries.length &&
        nodeCountries.length &&
        !nodeCountries.some((c) => activeCountries.includes(c))
      ) {
        return false
      }
      if (
        (range[0] !== BOUNDS[0] || range[1] !== BOUNDS[1]) &&
        nodeYears.length &&
        !nodeYears.some((y) => y >= range[0] && y <= range[1])
      ) {
        return false
      }
      return true
    },
    [activeFields, activeCountries, range],
  )

  const visibleCount = nodes.filter(matches).length

  useEffect(() => {
    controls.current?.centerOn(WORLD.width / 2, WORLD.height / 2)
  }, [])

  useEffect(() => {
    if (!selection) return
    const node = nodes.find((n) => n.kind === selection.kind && n.id === selection.id)
    if (node) controls.current?.centerOn(node.x, node.y)
  }, [selection, nodes])

  const toggle = (setter) => (value) =>
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))

  return (
    <>
      <div className="page-hint">
        <h1>Discovery</h1>
        <p>Filter the matrix · drag to explore</p>
      </div>
      <PanCanvas world={WORLD} offsetRef={controls}>
        {ghosts.map((g) => (
          <span
            key={g.id}
            className="world-ghost"
            style={{ left: g.x, top: g.y, width: g.r * 2, height: g.r * 2, opacity: g.o }}
          />
        ))}
        {nodes.map((node) => (
          <Bubble
            key={`${node.kind}-${node.id}`}
            node={node}
            dimmed={!matches(node)}
            selected={selection?.kind === node.kind && selection.id === node.id}
            onSelect={(n) => onSelect({ kind: n.kind, id: n.id })}
          />
        ))}
      </PanCanvas>
      <FilterPanel
        fields={FIELDS}
        activeFields={activeFields}
        onToggleField={toggle(setActiveFields)}
        countries={COUNTRIES}
        activeCountries={activeCountries}
        onToggleCountry={toggle(setActiveCountries)}
        range={range}
        bounds={BOUNDS}
        onRange={setRange}
        onReset={() => {
          setActiveFields([])
          setActiveCountries([])
          setRange(BOUNDS)
        }}
      />
      {visibleCount === 0 && <p className="empty-state">Nothing matches these filters.</p>}
    </>
  )
}
