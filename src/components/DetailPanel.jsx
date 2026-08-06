import {
  ARTIFACTS,
  FIELDS,
  LAUREATES,
  MILESTONES,
  PALETTE,
  fieldColor,
  findLaureate,
  findMilestone,
  findTheme,
} from '../data/content'

const themeColor = (theme) => {
  const first = theme.laureates.map(findLaureate).find(Boolean)
  return first ? fieldColor(first.field) : PALETTE.blue
}

function resolve(selection) {
  if (!selection) return null
  const { kind, id } = selection

  if (kind === 'theme') {
    const t = findTheme(id)
    if (!t) return null
    return {
      kicker: 'Story',
      color: themeColor(t),
      title: t.label,
      blurb: t.blurb,
      sections: [
        { heading: 'Laureates', items: t.laureates.map(findLaureate).filter(Boolean).map(personChip) },
        { heading: 'Milestones', items: t.milestones.map(findMilestone).filter(Boolean).map(milestoneChip) },
        { heading: 'Related stories', items: t.related.map(findTheme).filter(Boolean).map(themeChip) },
        { heading: 'Artifacts', items: ARTIFACTS.filter((a) => a.themes.includes(id)).map(artifactChip) },
      ],
    }
  }

  if (kind === 'person') {
    const p = findLaureate(id)
    if (!p) return null
    const field = FIELDS.find((f) => f.id === p.field)
    return {
      kicker: 'Laureate',
      color: fieldColor(p.field),
      title: p.name,
      sub: `${field?.label ?? p.field} · ${p.year} · ${p.country}`,
      blurb: p.blurb,
      sections: [
        { heading: 'Stories', items: p.themes.map(findTheme).filter(Boolean).map(themeChip) },
        {
          heading: 'Milestones',
          items: MILESTONES.filter((m) => m.laureates.includes(id)).map(milestoneChip),
        },
        {
          heading: 'Contemporaries',
          items: LAUREATES.filter((l) => l.id !== id && Math.abs(l.year - p.year) <= 6)
            .slice(0, 8)
            .map(personChip),
        },
      ],
    }
  }

  if (kind === 'milestone') {
    const m = findMilestone(id)
    if (!m) return null
    return {
      kicker: 'Milestone',
      color: PALETTE.sand,
      title: m.title,
      sub: String(m.year),
      blurb: m.blurb,
      sections: [
        { heading: 'Laureates', items: m.laureates.map(findLaureate).filter(Boolean).map(personChip) },
        { heading: 'Stories', items: m.themes.map(findTheme).filter(Boolean).map(themeChip) },
        {
          heading: 'Same decade',
          items: MILESTONES.filter(
            (o) => o.id !== m.id && Math.floor(o.year / 10) === Math.floor(m.year / 10),
          ).map(milestoneChip),
        },
      ],
    }
  }

  const a = ARTIFACTS.find((x) => x.id === id)
  if (!a) return null
  return {
    kicker: 'Artifact',
    color: PALETTE.ink,
    title: a.label,
    blurb: a.blurb,
    sections: [{ heading: 'Stories', items: a.themes.map(findTheme).filter(Boolean).map(themeChip) }],
  }
}

const themeChip = (t) => ({ key: `theme-${t.id}`, kind: 'theme', id: t.id, label: t.label, color: themeColor(t) })
const personChip = (p) => ({
  key: `person-${p.id}`,
  kind: 'person',
  id: p.id,
  label: p.name,
  color: fieldColor(p.field),
  year: p.year,
})
const milestoneChip = (m) => ({
  key: `milestone-${m.id}`,
  kind: 'milestone',
  id: m.id,
  label: m.title,
  color: PALETTE.sand,
  year: m.year,
})
const artifactChip = (a) => ({
  key: `artifact-${a.id}`,
  kind: 'artifact',
  id: a.id,
  label: a.label,
  color: PALETTE.ink,
})

export default function DetailPanel({ selection, onSelect, onClose }) {
  const data = resolve(selection)
  if (!data) return null

  return (
    <aside className="detail">
      <button className="close" onClick={onClose} aria-label="Close">
        ✕
      </button>
      <span className="kicker">
        <i className="swatch" style={{ background: data.color }} />
        {data.kicker}
      </span>
      <h2>{data.title}</h2>
      {data.sub && <p className="sub">{data.sub}</p>}
      <p className="blurb">{data.blurb}</p>

      {data.sections
        .filter((s) => s.items.length > 0)
        .map((section) => (
          <section key={section.heading}>
            <h3>{section.heading}</h3>
            <div className="chips">
              {section.items.map((item) => (
                <button
                  key={item.key}
                  className="chip"
                  onClick={() => onSelect({ kind: item.kind, id: item.id })}
                >
                  <i className="swatch" style={{ background: item.color }} />
                  {item.label}
                  {item.year && <span className="year">{item.year}</span>}
                </button>
              ))}
            </div>
          </section>
        ))}
    </aside>
  )
}
