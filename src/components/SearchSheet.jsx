import { useMemo, useRef, useEffect } from 'react'
import { ARTIFACTS, LAUREATES, MILESTONES, PALETTE, THEMES, fieldColor, findLaureate } from '../data/content'

const INDEX = [
  ...THEMES.map((t) => ({
    kind: 'theme',
    id: t.id,
    label: t.label,
    hay: `${t.label} ${t.blurb}`.toLowerCase(),
    color: fieldColor(findLaureate(t.laureates[0])?.field) ?? PALETTE.blue,
  })),
  ...LAUREATES.map((l) => ({
    kind: 'person',
    id: l.id,
    label: l.name,
    hay: `${l.name} ${l.country} ${l.year} ${l.blurb}`.toLowerCase(),
    color: fieldColor(l.field),
  })),
  ...MILESTONES.map((m) => ({
    kind: 'milestone',
    id: m.id,
    label: `${m.title} · ${m.year}`,
    hay: `${m.title} ${m.year} ${m.blurb}`.toLowerCase(),
    color: PALETTE.sand,
  })),
  ...ARTIFACTS.map((a) => ({
    kind: 'artifact',
    id: a.id,
    label: a.label,
    hay: `${a.label} ${a.blurb}`.toLowerCase(),
    color: PALETTE.ink,
  })),
]

export default function SearchSheet({ query, onQuery, onSelect }) {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return INDEX.slice(0, 12)
    return INDEX.filter((item) => item.hay.includes(q)).slice(0, 25)
  }, [query])

  return (
    <div className="search-sheet">
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="Search stories, laureates, milestones…"
        aria-label="Search"
      />
      <div className="search-results">
        {results.length === 0 && <p className="search-empty">Nothing matches “{query}”.</p>}
        {results.map((item) => (
          <button key={`${item.kind}-${item.id}`} onClick={() => onSelect({ kind: item.kind, id: item.id })}>
            <i className="swatch" style={{ background: item.color }} />
            {item.label}
            <span className="kind">{item.kind}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
