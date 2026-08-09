import { useMemo, useRef, useEffect } from 'react'
import { ARTIFACTS, LAUREATES, MILESTONES, THEMES, kindColor } from '../data/content'

const INDEX = [
  ...THEMES.map((t) => ({
    kind: 'theme',
    id: t.id,
    label: t.label,
    hay: `${t.label} ${t.blurb}`.toLowerCase(),
    color: kindColor('theme'),
  })),
  ...LAUREATES.map((l) => ({
    kind: 'person',
    id: l.id,
    label: l.name,
    hay: `${l.name} ${l.country} ${l.year} ${l.blurb}`.toLowerCase(),
    color: kindColor('person'),
  })),
  ...MILESTONES.map((m) => ({
    kind: 'milestone',
    id: m.id,
    label: `${m.title} · ${m.year}`,
    hay: `${m.title} ${m.year} ${m.blurb}`.toLowerCase(),
    color: kindColor('milestone'),
  })),
  ...ARTIFACTS.map((a) => ({
    kind: 'artifact',
    id: a.id,
    label: a.label,
    hay: `${a.label} ${a.blurb}`.toLowerCase(),
    color: kindColor('artifact'),
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
            {item.label}
            <span className="kind">{item.kind}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
