import { useCallback, useEffect, useRef, useState } from 'react'
import Plate from './Plate'
import { narrativeFor } from '../data/narrative'
import { nodeMeta } from '../lib/relations'

// Reading position on the left edge: a solid run for what is on screen, dashes
// for what is still below.
function ScrollRail({ targetRef }) {
  const [{ size, offset }, setState] = useState({ size: 0, offset: 0 })

  const measure = useCallback(() => {
    const el = targetRef.current
    if (!el) return
    const ratio = el.clientHeight / el.scrollHeight
    setState({
      size: Math.min(1, ratio),
      offset: el.scrollHeight > el.clientHeight ? el.scrollTop / el.scrollHeight : 0,
    })
  }, [targetRef])

  useEffect(() => {
    const el = targetRef.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    return () => el.removeEventListener('scroll', measure)
  }, [targetRef, measure])

  if (size >= 1) return null
  return (
    <span className="scroll-rail" aria-hidden="true">
      <i style={{ height: `${size * 100}%`, top: `${offset * 100}%` }} />
    </span>
  )
}

export default function StoryPanel({ selection, onClose }) {
  const bodyRef = useRef(null)
  const meta = nodeMeta(selection)
  if (!meta) return null

  const seed = `${selection.kind}:${selection.id}`

  // Concepts sit one level above the written material: the box is a full-bleed
  // placeholder until the level 3 story for that theme exists. Laureates,
  // artifacts and milestones carry their narrative now.
  if (selection.kind === 'theme') {
    return (
      <div className="story-holder" key={seed}>
        <article className="story-panel placeholder">
          <Plate seed={seed} />
          <span className="placeholder-label">Level 3 story</span>
        </article>
        <button className="close" onClick={onClose} aria-label="Close story">
          ✕
        </button>
      </div>
    )
  }

  const { standfirst, body, caption, credit } = narrativeFor(selection.kind, selection.id, meta.blurb)

  return (
    <div className="story-holder" key={seed}>
      <article className="story-panel">
        <ScrollRail targetRef={bodyRef} />

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

      <div className="story-body" ref={bodyRef}>
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
      <button className="close" onClick={onClose} aria-label="Close story">
        ✕
      </button>
    </div>
  )
}
