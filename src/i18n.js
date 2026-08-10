import { SV } from './data/sv'

export const LOCALES = ['en', 'sv']
export const LOCALE_LABEL = { en: 'EN', sv: 'SE' }

// The locale is held in a module rather than threaded through every call,
// because the content accessors (nodeMeta, relatedTo, narrativeFor) are plain
// functions used from a dozen components. App writes it during its own render,
// which happens before any child renders, and re-renders the tree by context —
// so no reader can ever see a stale value.
let current = 'en'

export const setLocale = (locale) => {
  current = LOCALES.includes(locale) ? locale : 'en'
}
export const getLocale = () => current
export const otherLocale = () => (current === 'en' ? 'sv' : 'en')

// Swedish where a translation exists, the English original where it does not,
// so an untranslated string degrades to readable rather than to a key.
export function tr(fallback, ...path) {
  if (current === 'en') return fallback
  let node = SV
  for (const key of path) {
    node = node?.[key]
    if (node === undefined) return fallback
  }
  return node ?? fallback
}

export const t = (key) => (current === 'en' ? SV.ui[key]?.en ?? key : SV.ui[key]?.sv ?? SV.ui[key]?.en ?? key)
