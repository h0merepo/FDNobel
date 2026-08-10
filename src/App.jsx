import { useCallback, useEffect, useState } from 'react'
import { otherLocale, setLocale } from './i18n'
import Ambient from './components/Ambient'
import NavDock from './components/NavDock'
import NodeWeb from './components/NodeWeb'
import SearchSheet from './components/SearchSheet'
import StoryPanel from './components/StoryPanel'
import Trail from './components/Trail'
import Discovery from './pages/Discovery'
import Landing from './pages/Landing'
import Milestones from './pages/Milestones'
import Stories from './pages/Stories'

const PAGE_FOR_KIND = {
  theme: 'stories',
  milestone: 'milestones',
  person: 'discovery',
  artifact: 'discovery',
  story: 'discovery',
}

const sameNode = (a, b) => a && b && a.kind === b.kind && a.id === b.id

export default function App() {
  const [locale, setLocaleState] = useState('en')
  // Publish the locale before any child renders, so the content accessors —
  // which are plain functions, not hooks — never read a stale value.
  setLocale(locale)

  const [page, setPage] = useState('landing')
  const [selection, setSelection] = useState(null)
  const [trail, setTrail] = useState([])
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const closeFocus = useCallback(() => {
    setSelection(null)
    setTrail([])
  }, [])

  const goHome = useCallback(() => {
    setPage('landing')
    setSearchOpen(false)
    closeFocus()
  }, [closeFocus])

  const select = useCallback(
    (next) => {
      setSelection(next)
      setSearchOpen(false)
      // The trail is a path, not a history: stepping back onto a node you have
      // already visited truncates to it rather than appending a duplicate.
      setTrail((prev) => {
        const at = prev.findIndex((n) => sameNode(n, next))
        return at >= 0 ? prev.slice(0, at + 1) : [...prev, next]
      })
      // The page underneath is only a landing spot for when the focus closes,
      // so it is chosen once and then left alone while the user branches.
      if (page === 'landing') setPage(PAGE_FOR_KIND[next.kind])
    },
    [page],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (searchOpen) setSearchOpen(false)
      else if (selection) closeFocus()
      else if (page !== 'landing') goHome()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen, selection, page, goHome, closeFocus])

  const focused = Boolean(selection)

  return (
    <div className="app">
      <div className={`page-layer${focused ? ' behind' : ''}`} aria-hidden={focused}>
        {page === 'landing' && <Landing onNavigate={setPage} />}
        {page === 'stories' && <Stories selection={selection} onSelect={select} />}
        {page === 'milestones' && <Milestones selection={selection} onSelect={select} />}
        {page === 'discovery' && <Discovery selection={selection} onSelect={select} />}
      </div>

      {focused && (
        <div className="focus-layer">
          <Ambient count={30} seed={41} />
          <NodeWeb selection={selection} trail={trail} onSelect={select} />
          <StoryPanel selection={selection} onClose={closeFocus} />

        </div>
      )}

      <div className="chrome-bar">
        <NavDock
          searchOpen={searchOpen}
          onSearch={() => setSearchOpen((o) => !o)}
          onLanguage={() => setLocaleState(otherLocale())}
        />
        {page !== 'landing' && (
          <Trail trail={trail} selection={selection} onSelect={select} onHome={goHome} />
        )}
      </div>

      {searchOpen && <SearchSheet query={query} onQuery={setQuery} onSelect={select} />}
    </div>
  )
}
