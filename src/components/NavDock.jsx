const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" strokeLinejoin="round" />
  </svg>
)

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" strokeLinecap="round" />
  </svg>
)

const TranslateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M3 5h9M7.5 5v1.5c0 3.6-2 6.4-4.5 7.5M5 9.5c1.2 2.9 3.6 4.6 6 5.2" strokeLinecap="round" />
    <path d="m12.5 20 4-9 4 9M14 17h5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function NavDock({ onHome, onSearch, searchOpen, onLanguage, showHome = true }) {
  return (
    <nav className="dock">
      {showHome && (
        <button onClick={onHome} aria-label="Home">
          <HomeIcon />
        </button>
      )}
      <button
        onClick={onSearch}
        className={searchOpen ? 'active' : ''}
        aria-label="Search"
        aria-pressed={searchOpen}
      >
        <SearchIcon />
      </button>
      <button onClick={onLanguage} aria-label="Language">
        <TranslateIcon />
      </button>
    </nav>
  )
}
