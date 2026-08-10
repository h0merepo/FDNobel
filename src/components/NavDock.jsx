import { LOCALE_LABEL, otherLocale, t } from '../i18n'

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" strokeLinecap="round" />
  </svg>
)

export default function NavDock({ onSearch, searchOpen, onLanguage }) {
  return (
    <nav className="dock">
      {/* the code of the language you would switch to, not the one you are in */}
      <button className="lang" onClick={onLanguage} aria-label={t('language')}>
        {LOCALE_LABEL[otherLocale()]}
      </button>
      <button
        onClick={onSearch}
        className={searchOpen ? 'active' : ''}
        aria-label={t('search')}
        aria-pressed={searchOpen}
      >
        <SearchIcon />
      </button>
    </nav>
  )
}
