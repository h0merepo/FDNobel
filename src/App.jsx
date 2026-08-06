import { useCallback, useEffect, useState } from 'react'
import DetailPanel from './components/DetailPanel'
import NavDock from './components/NavDock'
import SearchSheet from './components/SearchSheet'
import Discovery from './pages/Discovery'
import Landing from './pages/Landing'
import Milestones from './pages/Milestones'
import Stories from './pages/Stories'

const PAGE_FOR_KIND = {
  theme: 'stories',
  milestone: 'milestones',
  person: 'discovery',
  artifact: 'discovery',
}

export default function App() {
  const [page, setPage] = useState('landing')
  const [selection, setSelection] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const goHome = useCallback(() => {
    setPage('landing')
    setSelection(null)
    setSearchOpen(false)
  }, [])

  const select = useCallback(
    (next) => {
      setSelection(next)
      setSearchOpen(false)
      const canShowHere =
        (page === 'stories' && next.kind === 'theme') ||
        (page === 'milestones' && (next.kind === 'milestone' || next.kind === 'person')) ||
        page === 'discovery'
      if (!canShowHere) setPage(PAGE_FOR_KIND[next.kind])
    },
    [page],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (searchOpen) setSearchOpen(false)
      else if (selection) setSelection(null)
      else if (page !== 'landing') goHome()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen, selection, page, goHome])

  return (
    <div className="app">
      {page === 'landing' && <Landing onNavigate={setPage} />}
      {page === 'stories' && <Stories selection={selection} onSelect={select} />}
      {page === 'milestones' && <Milestones selection={selection} onSelect={select} />}
      {page === 'discovery' && <Discovery selection={selection} onSelect={select} />}

      <NavDock
        showHome={page !== 'landing'}
        onHome={goHome}
        searchOpen={searchOpen}
        onSearch={() => setSearchOpen((o) => !o)}
        onLanguage={() => {}}
      />

      {searchOpen && <SearchSheet query={query} onQuery={setQuery} onSelect={select} />}

      {selection && (
        <DetailPanel selection={selection} onSelect={select} onClose={() => setSelection(null)} />
      )}
    </div>
  )
}
