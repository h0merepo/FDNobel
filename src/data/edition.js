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

/* The atlas also runs as one of four stations laid on a single table. There it
   drops its own ground and its own bokeh: the table carries one field under all
   four, and a station that brought its own would draw a seam at its edge.
   The table names the frame before writing the document into it — window.name
   survives a document.write, and unlike a "am I in a frame?" test it stays
   false in the artifact host, which frames the atlas when it runs on its own. */
export const ON_SURFACE = typeof window !== 'undefined' && window.name === 'atlas-surface'

const KEEP = new Set(SHORTLIST)

// Used by the data modules to narrow themselves. In the full edition it is the
// identity function, so nothing pays for the feature it is not using.
export const inEdition = (id) => !isShortlist || KEEP.has(id)
