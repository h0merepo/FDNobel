// Builds the table composition: four copies of the shortlist edition laid on
// one surface, over a plane of material that is out of reach.
//
//   VITE_EDITION=shortlist npm run build      # the atlas itself
//   node tools/inline.mjs <out> "<title>"     # folded into one file
//   node tools/build-table.mjs <app> <out>    # four of them on a table
//
// The atlas is carried inside this file rather than framed from its own page:
// the artifact host answers with `frame-ancestors 'self'`, so one artifact
// cannot embed another. Rebuilding this file is how an edit to the shortlist
// reaches all four zones.
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const app = process.argv[2]
const out = process.argv[3]

if (!app || !out) {
  console.error('usage: node tools/build-table.mjs <shortlist.html> <table.html>')
  process.exit(1)
}

const template = readFileSync(resolve(here, 'table.template.html'), 'utf8')
const build = readFileSync(resolve(app))

// Base64 rather than an escaped string literal: the build closes a script tag
// of its own, and no amount of quoting survives that cleanly.
const page = template.replace('__APP_B64__', build.toString('base64'))

writeFileSync(out, page)
console.log({
  app: `${(build.length / 1e6).toFixed(2)} MB`,
  table: `${(Buffer.byteLength(page) / 1e6).toFixed(2)} MB`,
  zones: (page.match(/class="zone /g) ?? []).length,
})
