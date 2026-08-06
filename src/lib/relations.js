import {
  ARTIFACTS,
  LAUREATES,
  MILESTONES,
  findLaureate,
  findMilestone,
  findTheme,
  kindColor,
} from '../data/content'

const asTheme = (t) => ({ key: `theme:${t.id}`, kind: 'theme', id: t.id, label: t.label, color: kindColor('theme') })
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
  label: m.title,
  sub: String(m.year),
  color: kindColor('milestone'),
})
const asArtifact = (a) => ({ key: `artifact:${a.id}`, kind: 'artifact', id: a.id, label: a.label, color: kindColor('artifact') })

// Round-robin across the groups so a node's ring always shows a mix of kinds
// rather than four laureates and nothing else. Labels are deduplicated because
// several stories share a name with the milestone they describe, and two
// identically-labelled circles on one ring read as a bug.
function interleave(groups, limit, taken) {
  const out = []
  const seen = new Set(taken)
  for (let i = 0; out.length < limit; i += 1) {
    const before = out.length
    for (const group of groups) {
      if (out.length >= limit) break
      const item = group[i]
      if (!item || seen.has(item.label)) continue
      seen.add(item.label)
      out.push(item)
    }
    if (out.length === before && groups.every((g) => i >= g.length)) break
  }
  return out
}

export function relatedTo(selection, limit = 8) {
  if (!selection) return []
  const { kind, id } = selection

  if (kind === 'theme') {
    const t = findTheme(id)
    if (!t) return []
    return interleave(
      [
        t.laureates.map(findLaureate).filter(Boolean).map(asPerson),
        t.related.map(findTheme).filter(Boolean).map(asTheme),
        t.milestones.map(findMilestone).filter(Boolean).map(asMilestone),
        ARTIFACTS.filter((a) => a.themes.includes(id)).map(asArtifact),
      ],
      limit,
      [t.label],
    )
  }

  if (kind === 'person') {
    const p = findLaureate(id)
    if (!p) return []
    return interleave(
      [
        p.themes.map(findTheme).filter(Boolean).map(asTheme),
        MILESTONES.filter((m) => m.laureates.includes(id)).map(asMilestone),
        LAUREATES.filter((l) => l.id !== id && l.field === p.field && Math.abs(l.year - p.year) <= 12)
          .slice(0, 3)
          .map(asPerson),
        ARTIFACTS.filter((a) => a.themes.some((th) => p.themes.includes(th)))
          .slice(0, 2)
          .map(asArtifact),
      ],
      limit,
      [p.name],
    )
  }

  if (kind === 'milestone') {
    const m = findMilestone(id)
    if (!m) return []
    return interleave(
      [
        m.themes.map(findTheme).filter(Boolean).map(asTheme),
        m.laureates.map(findLaureate).filter(Boolean).map(asPerson),
        MILESTONES.filter((o) => o.id !== m.id && Math.abs(o.year - m.year) <= 12)
          .slice(0, 3)
          .map(asMilestone),
        ARTIFACTS.filter((a) => a.themes.some((th) => m.themes.includes(th)))
          .slice(0, 2)
          .map(asArtifact),
      ],
      limit,
      [m.title],
    )
  }

  const a = ARTIFACTS.find((x) => x.id === id)
  if (!a) return []
  return interleave(
    [
      a.themes.map(findTheme).filter(Boolean).map(asTheme),
      LAUREATES.filter((l) => l.themes.some((th) => a.themes.includes(th)))
        .slice(0, 4)
        .map(asPerson),
      MILESTONES.filter((m) => m.themes.some((th) => a.themes.includes(th)))
        .slice(0, 3)
        .map(asMilestone),
    ],
    limit,
    [a.label],
  )
}

export function nodeMeta(selection) {
  if (!selection) return null
  const { kind, id } = selection
  if (kind === 'theme') {
    const t = findTheme(id)
    return t && { kicker: 'Story', label: t.label, blurb: t.blurb, color: kindColor('theme') }
  }
  if (kind === 'person') {
    const p = findLaureate(id)
    return (
      p && {
        kicker: 'Laureate',
        label: p.name,
        sub: `${p.year} · ${p.country}`,
        blurb: p.blurb,
        color: kindColor('person'),
      }
    )
  }
  if (kind === 'milestone') {
    const m = findMilestone(id)
    return m && { kicker: 'Milestone', label: m.title, sub: String(m.year), blurb: m.blurb, color: kindColor('milestone') }
  }
  const a = ARTIFACTS.find((x) => x.id === id)
  return a && { kicker: 'Artifact', label: a.label, blurb: a.blurb, color: kindColor('artifact') }
}
