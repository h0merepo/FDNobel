// Two editions are built from this one codebase. The full atlas carries every
// laureate in the matrix; the shortlist edition carries the twenty-four on the
// client's list and nothing else, so a review can be held on exactly those.
//
// Which one a build is comes from the environment at build time:
//   npm run build                      → the full atlas
//   VITE_EDITION=shortlist npm run build → the shortlist
//
// Themes, milestones and artifacts are the same in both. They are the ground a
// laureate is read against, and a timeline with holes in it is not a timeline —
// so the edition narrows who is in the atlas, not what the atlas is about.
export const EDITION = import.meta.env?.VITE_EDITION ?? 'full'

export const isShortlist = EDITION === 'shortlist'

// The shortlist, in the order the sheet gives them.
export const SHORTLIST = [
  'townes',
  'fleming',
  'lagerlof',
  'heisenberg',
  'curie',
  'rotblat',
  'yousafzai',
  'gbowee',
  'rontgen',
  'mandela',
  'einstein',
  'mullis',
  'doudna',
  'charpentier',
  'beckett',
  'yamanaka',
  'katalin',
  'sen',
  'suttner',
  'goldin',
  'higgs',
  'haber',
  'hassabis',
  'alexievich',
  'morrison',
]

const KEEP = new Set(SHORTLIST)

// Used by the data modules to narrow themselves. In the full edition it is the
// identity function, so nothing pays for the feature it is not using.
export const inEdition = (id) => !isShortlist || KEEP.has(id)
