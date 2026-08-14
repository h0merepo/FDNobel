import {
  ARTIFACTS,
  LAUREATES,
  MILESTONES,
  findLaureate,
  findMilestone,
  findTheme,
  artifactLabel,
  blurbFor,
  countryName,
  kindColor,
  kindLabel,
  milestoneTitle,
  themeLabel,
} from '../data/content'
import { STORIES, findStory, storyTitle } from '../data/stories'
import { mixFor } from './levels'

const asTheme = (t) => ({ key: `theme:${t.id}`, kind: 'theme', id: t.id, label: themeLabel(t), color: kindColor('theme') })
const asPerson = (p) => ({
  key: `person:${p.id}`,
  kind: 'person',
  id: p.id,
  label: p.name,
  sub: String(p.year),
  color: kindColor('person'),
})
const asMilestone = (m) => ({
  key: `milestone:${m.id}`,
  kind: 'milestone',
  id: m.id,
  label: milestoneTitle(m),
  sub: String(m.year),
  color: kindColor('milestone'),
})
const asStory = (n) => ({
  key: `story:${n.id}`,
  kind: 'story',
  id: n.id,
  label: storyTitle(n),
  sub: n.sub,
  color: kindColor('story'),
})
const asArtifact = (a) => ({ key: `artifact:${a.id}`, kind: 'artifact', id: a.id, label: artifactLabel(a), color: kindColor('artifact') })

// Fill each kind up to the mode's quota, then spend whatever is left over on
// the kinds that still have candidates — so a theme with no story of its own
// still comes back with a full ring. Labels are deduplicated because several
// stories share a name with the milestone they describe, and two
// identically-labelled circles on one ring read as a bug.
function compose(pools, limit, taken, mode) {
  const quota = mixFor(mode)
  const seen = new Set(taken)
  const out = []
  const cursor = {}

  const take = (kind, n) => {
    const pool = pools[kind] ?? []
    cursor[kind] = cursor[kind] ?? 0
    let added = 0
    while (added < n && cursor[kind] < pool.length && out.length < limit) {
      const item = pool[cursor[kind]]
      cursor[kind] += 1
      if (seen.has(item.label)) continue
      seen.add(item.label)
      out.push(item)
      added += 1
    }
    return added
  }

  // quotas first, in the order the mode cares about
  for (const [kind, n] of Object.entries(quota)) take(kind, n)
  // then top up from anything still holding candidates
  const kinds = Object.keys(quota)
  let guard = 0
  while (out.length < limit && guard < 40) {
    const before = out.length
    for (const kind of kinds) take(kind, 1)
    if (out.length === before) break
    guard += 1
  }
  return out
}

export function relatedTo(selection, limit = 8, mode = 'discovery') {
  if (!selection) return []
  const { kind, id } = selection

  if (kind === 'theme') {
    const t = findTheme(id)
    if (!t) return []
    // Story mode has to lead with level 3, and a theme rarely owns enough
    // stories to do that on its own. So every story is ranked by how close it
    // sits to this theme — its own first, then ones sharing a neighbouring
    // theme or a laureate — and the ring takes the best of them.
    const affinity = (n) =>
      (n.themes.includes(id) ? 100 : 0) +
      n.themes.filter((th) => t.related.includes(th)).length * 20 +
      n.laureates.filter((l) => t.laureates.includes(l)).length * 12
    const ranked = [...STORIES].sort((a, b) => affinity(b) - affinity(a))
    return compose(
      {
        story: ranked.map(asStory),
        person: t.laureates.map(findLaureate).filter(Boolean).map(asPerson),
        theme: t.related.map(findTheme).filter(Boolean).map(asTheme),
        milestone: t.milestones.map(findMilestone).filter(Boolean).map(asMilestone),
        artifact: ARTIFACTS.filter((a) => a.themes.includes(id)).map(asArtifact),
      },
      limit,
      [themeLabel(t)],
      mode,
    )
  }

  if (kind === 'person') {
    const p = findLaureate(id)
    if (!p) return []
    return compose(
      {
        story: STORIES.filter((n) => n.laureates.includes(id)).map(asStory),
        theme: p.themes.map(findTheme).filter(Boolean).map(asTheme),
        milestone: MILESTONES.filter((m) => m.laureates.includes(id)).map(asMilestone),
        person: LAUREATES.filter(
          (l) => l.id !== id && l.field === p.field && Math.abs(l.year - p.year) <= 12,
        )
          .slice(0, 4)
          .map(asPerson),
        artifact: ARTIFACTS.filter((a) => a.themes.some((th) => p.themes.includes(th)))
          .slice(0, 3)
          .map(asArtifact),
      },
      limit,
      [p.name],
      mode,
    )
  }

  if (kind === 'milestone') {
    const m = findMilestone(id)
    if (!m) return []
    return compose(
      {
        story: STORIES.filter((n) => n.milestones.includes(id)).map(asStory),
        theme: m.themes.map(findTheme).filter(Boolean).map(asTheme),
        person: [
          ...m.laureates.map(findLaureate).filter(Boolean),
          ...LAUREATES.filter(
            (l) => !m.laureates.includes(l.id) && l.themes.some((th) => m.themes.includes(th)),
          ).slice(0, 4),
        ].map(asPerson),
        milestone: MILESTONES.filter((o) => o.id !== m.id && Math.abs(o.year - m.year) <= 14)
          .slice(0, 4)
          .map(asMilestone),
        artifact: ARTIFACTS.filter((a) => a.themes.some((th) => m.themes.includes(th)))
          .slice(0, 3)
          .map(asArtifact),
      },
      limit,
      [milestoneTitle(m)],
      mode,
    )
  }

  if (kind === 'story') {
    const n = findStory(id)
    if (!n) return []
    return compose(
      {
        person: n.laureates.map(findLaureate).filter(Boolean).map(asPerson),
        theme: n.themes.map(findTheme).filter(Boolean).map(asTheme),
        milestone: n.milestones.map(findMilestone).filter(Boolean).map(asMilestone),
        artifact: ARTIFACTS.filter((a) => a.themes.some((th) => n.themes.includes(th)))
          .slice(0, 3)
          .map(asArtifact),
        story: STORIES.filter((o) => o.id !== id && o.themes.some((th) => n.themes.includes(th))).map(asStory),
      },
      limit,
      [storyTitle(n)],
      mode,
    )
  }

  const a = ARTIFACTS.find((x) => x.id === id)
  if (!a) return []
  return compose(
    {
      theme: a.themes.map(findTheme).filter(Boolean).map(asTheme),
      person: LAUREATES.filter((l) => l.themes.some((th) => a.themes.includes(th)))
        .slice(0, 5)
        .map(asPerson),
      milestone: MILESTONES.filter((m) => m.themes.some((th) => a.themes.includes(th)))
        .slice(0, 4)
        .map(asMilestone),
      story: STORIES.filter((n) => n.themes.some((th) => a.themes.includes(th))).map(asStory),
    },
    limit,
    [artifactLabel(a)],
    mode,
  )
}

export function nodeMeta(selection) {
  if (!selection) return null
  const { kind, id } = selection
  if (kind === 'theme') {
    const t = findTheme(id)
    return t && { kicker: kindLabel('theme'), label: themeLabel(t), blurb: blurbFor('theme', id, t.blurb), color: kindColor('theme') }
  }
  if (kind === 'person') {
    const p = findLaureate(id)
    return (
      p && {
        kicker: kindLabel('person'),
        label: p.name,
        sub: `${p.year} · ${countryName(p.country)}`,
        blurb: blurbFor('person', id, p.blurb),
        color: kindColor('person'),
      }
    )
  }
  if (kind === 'story') {
    const n = findStory(id)
    return n && { kicker: kindLabel('story'), label: storyTitle(n), sub: n.sub, color: kindColor('story') }
  }
  if (kind === 'milestone') {
    const m = findMilestone(id)
    return m && { kicker: kindLabel('milestone'), label: milestoneTitle(m), sub: String(m.year), blurb: blurbFor('milestone', id, m.blurb), color: kindColor('milestone') }
  }
  const a = ARTIFACTS.find((x) => x.id === id)
  return a && { kicker: kindLabel('artifact'), label: artifactLabel(a), blurb: blurbFor('artifact', id, a.blurb), color: kindColor('artifact') }
}
