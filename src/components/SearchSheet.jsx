import { useEffect, useMemo, useRef, useState } from 'react'
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
import { completionFor, fold, scoreRecord } from '../lib/fuzzy'
import { STORIES, storyScreens, storyTitle } from '../data/stories'

const words = (text) => fold(text).split(/[^a-z0-9]+/).filter(Boolean)

const buildIndex = () =>
  RECORDS().map((r) => ({ ...r, titleWords: words(r.title), bodyWords: words(r.body) }))

const RECORDS = () => [
  ...THEMES.map((t) => ({
    kind: 'theme',
    id: t.id,
    label: themeLabel(t),
    title: themeLabel(t),
    body: blurbFor('theme', t.id, t.blurb),
    color: kindColor('theme'),
  })),
  ...LAUREATES.map((l) => ({
    kind: 'person',
    id: l.id,
    label: l.name,
    title: l.name,
    body: `${countryName(l.country)} ${l.year} ${blurbFor('person', l.id, l.blurb)}`,
    color: kindColor('person'),
  })),
  ...MILESTONES.map((m) => ({
    kind: 'milestone',
    id: m.id,
    label: `${milestoneTitle(m)} · ${m.year}`,
    title: milestoneTitle(m),
    body: `${m.year} ${blurbFor('milestone', m.id, m.blurb)}`,
    color: kindColor('milestone'),
  })),
  ...STORIES.map((n) => ({
    kind: 'story',
    id: n.id,
    label: `${storyTitle(n)} · ${n.sub}`,
    // the whole narrative is searchable, so a story can be found by a detail
    // inside it rather than only by its title
    title: `${storyTitle(n)} ${n.sub}`,
    body: storyScreens(n).map((s) => `${s.heading} ${s.body}`).join(' '),
    color: kindColor('story'),
  })),
  ...ARTIFACTS.map((a) => ({
    kind: 'artifact',
    id: a.id,
    label: artifactLabel(a),
    title: artifactLabel(a),
    body: blurbFor('artifact', a.id, a.blurb),
    color: kindColor('artifact'),
  })),
]

export default function SearchSheet({ query, onQuery, onSelect, variant = 'dock' }) {
  const inputRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const locale = getLocale()
  const index = useMemo(buildIndex, [locale])
  const results = useMemo(() => {
    const q = query.trim()
    if (!q) return index.slice(0, 10)
    return index
      .map((item) => ({ item, score: scoreRecord(q, item) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map((r) => r.item)
  }, [query, index])

  const completion = useMemo(() => completionFor(query, index), [query, index])

  useEffect(() => setActive(0), [query])

  const accept = (item) => {
    if (item) onSelect({ kind: item.kind, id: item.id })
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((n) => Math.min(results.length - 1, n + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((n) => Math.max(0, n - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      accept(results[active])
    } else if (e.key === 'Tab' && completion) {
      // take the inline suggestion rather than moving focus
      e.preventDefault()
      onQuery(query + completion)
    }
  }

  return (
    <div className={`search-sheet ${variant}`}>
      <div className="search-field">
        {/* the query is echoed invisibly so the ghost sits exactly after it */}
        <span className="search-ghost" aria-hidden="true">
          <i>{query}</i>
          {completion}
        </span>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t('searchAnything')}
          aria-label={t('search')}
          autoComplete="off"
          spellCheck="false"
        />
      </div>
      {(query || variant === 'dock') && (
        <div className="search-results">
          {results.length === 0 && (
            <p className="search-empty">
              {t('nothingMatches')} “{query}”.
            </p>
          )}
          {results.map((item, i) => (
            <button
              key={`${item.kind}-${item.id}`}
              className={i === active ? 'active' : undefined}
              onMouseEnter={() => setActive(i)}
              onClick={() => accept(item)}
            >
              {item.label}
              <span className="kind">{kindLabel(item.kind)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
