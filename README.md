# Nobel Atlas

An interactive exhibit-style app for exploring Nobel laureates as a matrix of
interrelated content — stories, people, milestones and artifacts.

## Running

```bash
npm install
npm run dev
```

## The three entry points

- **Story** — a draggable cloud of thematic bubbles (Chance, Revolt, Invisible
  Worlds, Courage, Dreams…). The cloud is larger than the viewport; drag or
  scroll to reveal what sits off screen.
- **Milestone** — the same content laid out along a century. Horizontal position
  is the year; the scrubber jumps the view to a decade.
- **Discovery** — every entity type in one field, with a filter panel for
  discipline, year range and country. Non-matching bubbles dim rather than
  disappear, so the shape of the collection stays visible.

Selecting anything opens a detail panel whose chips link sideways into the rest
of the matrix — a story lists its laureates, a laureate lists their milestones
and contemporaries, and so on. Search (bottom-left) covers all four entity
types.

## Structure

```
src/
  data/content.js     themes, laureates, milestones, artifacts + cross-references
  lib/layout.js       seeded circle packing with an overlap-relaxation pass
  lib/timeline.js     year-anchored layout for the milestones view
  components/         PanCanvas (drag surface), Bubble, DetailPanel, filters, search
  pages/              Landing, Stories, Milestones, Discovery
```

Layout is deterministic: a seeded RNG places circles, then a relaxation pass
pushes overlapping pairs apart, so every load produces the same readable,
non-overlapping arrangement.
