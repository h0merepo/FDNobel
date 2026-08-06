import Plate from './Plate'
import { narrativeFor } from '../data/narrative'
import { nodeMeta } from '../lib/relations'

export default function StoryPanel({ selection, onClose }) {
  const meta = nodeMeta(selection)
  if (!meta) return null

  const seed = `${selection.kind}:${selection.id}`

  // Concepts sit one level above the written material: the box is a full-bleed
  // placeholder until the level 3 story for that theme exists. Laureates,
  // artifacts and milestones carry their narrative now.
  if (selection.kind === 'theme') {
    return (
      <article className="story-panel placeholder" key={seed}>
        <button className="close" onClick={onClose} aria-label="Close story">
          ✕
        </button>
        <Plate seed={seed} />
        <span className="placeholder-label">Level 3 story</span>
      </article>
    )
  }

  const { standfirst, body, caption, credit } = narrativeFor(selection.kind, selection.id, meta.blurb)

  return (
    <article className="story-panel" key={seed}>
      <button className="close" onClick={onClose} aria-label="Close story">
        ✕
      </button>

      <header className="story-hero">
        <Plate seed={seed} />
        <div className="story-hero-text">
          <span className="kicker">
            {meta.kicker}
            {meta.sub && <span className="sub"> · {meta.sub}</span>}
          </span>
          <h2>{meta.label}</h2>
        </div>
      </header>

      <div className="story-body">
        <p className="standfirst">{standfirst}</p>

        {body.map((paragraph, i) => (
          <div key={i} className="para-row">
            {i === 1 && (
              <figure className="inset">
                <Plate seed={seed} variant="inset" />
                {caption && <figcaption>{caption}</figcaption>}
              </figure>
            )}
            <p>{paragraph}</p>
          </div>
        ))}

        <footer className="story-credit">{credit}</footer>
      </div>
    </article>
  )
}
