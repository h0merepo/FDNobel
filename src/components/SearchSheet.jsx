import { useMemo, useRef, useEffect } from 'react'
import {
  ARTIFACTS,
  LAUREATES,
  MILESTONES,
  THEMES,
  artifactLabel,
  blurbFor,
  countryName,
  kindColor,
  kindLabel,
  milestoneTitle,
  themeLabel,
} from '../data/content'
import { getLocale, t } from '../i18n'
import { STORIES, storyScreens, storyTitle } from '../data/stories'

const buildIndex = () => [
  ...THEMES.map((t) => ({
    kind: 'theme',
    id: t.id,
    label: themeLabel(t),
    hay: `${themeLabel(t)} ${blurbFor('theme', t.id, t.blurb)}`.toLowerCase(),
    color: kindColor('theme'),
  })),
  ...LAUREATES.map((l) => ({
    kind: 'person',
    id: l.id,
    label: l.name,
    hay: `${l.name} ${countryName(l.country)} ${l.year} ${blurbFor('person', l.id, l.blurb)}`.toLowerCase(),
    color: kindColor('person'),
  })),
  ...MILESTONES.map((m) => ({
    kind: 'milestone',
    id: m.id,
    label: `${milestoneTitle(m)} · ${m.year}`,
    hay: `${milestoneTitle(m)} ${m.year} ${blurbFor('milestone', m.id, m.blurb)}`.toLowerCase(),
    color: kindColor('milestone'),
  })),
  ...STORIES.map((n) => ({
    kind: 'story',
    id: n.id,
    label: `${storyTitle(n)} · ${n.sub}`,
    // the whole narrative is searchable, so a story can be found by a detail
    // inside it rather than only by its title
    hay: `${storyTitle(n)} ${n.sub} ${storyScreens(n)
      .map((s) => `${s.heading} ${s.body}`)
      .join(' ')}`.toLowerCase(),
    color: kindColor('story'),
  })),
  ...ARTIFACTS.map((a) => ({
    kind: 'artifact',
    id: a.id,
    label: artifactLabel(a),
    hay: `${artifactLabel(a)} ${blurbFor('artifact', a.id, a.blurb)}`.toLowerCase(),
    color: kindColor('artifact'),
  })),
]

export default function SearchSheet({ query, onQuery, onSelect }) {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const locale = getLocale()
  const index = useMemo(buildIndex, [locale])
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return index.slice(0, 12)
    return index.filter((item) => item.hay.includes(q)).slice(0, 25)
  }, [query, index])

  return (
    <div className="search-sheet">
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder={t('searchPlaceholder')}
        aria-label={t('search')}
      />
      <div className="search-results">
        {results.length === 0 && <p className="search-empty">{t('nothingMatches')} “{query}”.</p>}
        {results.map((item) => (
          <button key={`${item.kind}-${item.id}`} onClick={() => onSelect({ kind: item.kind, id: item.id })}>
            {item.label}
            <span className="kind">{kindLabel(item.kind)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
