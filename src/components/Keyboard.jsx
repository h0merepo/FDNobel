import { t } from '../i18n'

// The atlas runs on glass with no keyboard in front of it, so it carries its
// own. The layout is the Swedish one rather than an English one with the three
// extra letters bolted on the end: Å after P, Ö and Ä after L, where a Swedish
// hand already expects to find them. Nothing here is a dead key — this is a
// search field, not a text editor.
const ROWS = ['QWERTYUIOPÅ', 'ASDFGHJKLÖÄ', 'ZXCVBNM']

const Backspace = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M9 5h11v14H9L3 12z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="m12 9.5 5 5m0-5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const Cross = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
)

export default function Keyboard({ value, onChange, onClose }) {
  const type = (ch) => onChange(value + ch)

  return (
    // A tap on a key must not take the caret out of the field it is typing
    // into, so the whole board refuses focus rather than each key having to.
    <div className="keys" onPointerDown={(e) => e.preventDefault()}>
      <button type="button" className="keys-close" onClick={onClose} aria-label={t('close')}>
        <Cross />
      </button>

      <div className="keys-board">
        {ROWS.map((row, i) => (
          <div className="keys-row" key={row}>
            {[...row].map((ch) => (
              <button type="button" key={ch} onClick={() => type(ch.toLowerCase())}>
                {ch}
              </button>
            ))}
            {i === ROWS.length - 1 && (
              <button
                type="button"
                className="wide"
                onClick={() => onChange(value.slice(0, -1))}
                aria-label={t('backspace')}
              >
                <Backspace />
              </button>
            )}
          </div>
        ))}

        <div className="keys-row">
          <button type="button" className="space" onClick={() => type(' ')} aria-label={t('space')}>
            <span />
          </button>
          <button type="button" className="wide enter" onClick={onClose}>
            {t('enter')}
          </button>
        </div>
      </div>
    </div>
  )
}
