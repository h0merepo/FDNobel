import { LOCALE_NAME, getLocale, t } from '../i18n'

// The way in says the choice in full, in each language's own words, rather than
// with the two-letter code the dock uses once you are inside. Swedish first —
// this is a Swedish prize.
const ORDER = ['sv', 'en']

export default function LanguageToggle({ onSelect }) {
  const current = getLocale()

  return (
    <div className="lang-toggle" role="group" aria-label={t('language')}>
      <button
        type="button"
        className={current === 'sv' ? 'on' : undefined}
        aria-pressed={current === 'sv'}
        lang="sv"
        onClick={() => current !== 'sv' && onSelect()}
      >
        {LOCALE_NAME.sv}
      </button>

      <span className="lang-rule" aria-hidden="true" />

      <button
        type="button"
        className={current === 'en' ? 'on' : undefined}
        aria-pressed={current === 'en'}
        lang="en"
        onClick={() => current !== 'en' && onSelect()}
      >
        {LOCALE_NAME.en}
      </button>
    </div>
  )
}
