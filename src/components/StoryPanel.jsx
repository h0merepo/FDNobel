import { useCallback, useEffect, useRef, useState } from 'react'
import Plate from './Plate'
import { ctaFor, narrativeFor } from '../data/narrative'
import { findStory, storyScreens, storyTitle } from '../data/stories'
import { nodeMeta } from '../lib/relations'
import { t } from '../i18n'

// Reading position on the left edge: a solid run for what is on screen, dashes
// for what is still below.
function ScrollRail({ targetRef, dependency }) {
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
  }, [targetRef, measure, dependency])

  if (size >= 1) return null
  return (
    <span className="scroll-rail" aria-hidden="true">
      <i style={{ height: `${size * 100}%`, top: `${offset * 100}%` }} />
    </span>
  )
}

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
  </svg>
)

const Chevron = ({ back }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path
      d={back ? 'M15 5 8 12l7 7' : 'M9 5l7 7-7 7'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// A narrative read as a fixed sequence of screens rather than one long scroll,
// so each beat of the story lands on its own.
function StoryReader({ story, seed }) {
  const [screen, setScreen] = useState(0)
  const bodyRef = useRef(null)
  const screens = storyScreens(story)
  const total = screens.length
  const step = useCallback(
    (delta) => setScreen((n) => Math.min(total - 1, Math.max(0, n + delta))),
    [total],
  )

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0
  }, [screen])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step])

  const current = screens[screen]

  return (
    <>
      <span className="screen-rail" aria-hidden="true">
        {screens.map((_, i) => (
          <i key={i} className={i <= screen ? 'read' : undefined} />
        ))}
      </span>

      <header className="story-hero">
        <Plate seed={`${seed}:${screen}`} />
        <div className="story-hero-text">
          <span className="kicker">
            {t('storyKicker')} · {screen + 1} {t('of')} {total}
          </span>
          <h2>{screen === 0 ? storyTitle(story) : current.heading}</h2>
        </div>
      </header>

      <div className="story-body" ref={bodyRef}>
        {screen === 0 && <p className="standfirst">{current.heading}</p>}
        <p className={screen === 0 ? 'para-row' : 'standfirst'}>{current.body}</p>
      </div>

      <ScrollRail targetRef={bodyRef} dependency={screen} />

      <nav className="reader-nav" aria-label={t('storyScreens')}>
        <button onClick={() => step(-1)} disabled={screen === 0} aria-label={t('previousScreen')}>
          <Chevron back />
        </button>
        <span className="reader-count">
          {screen + 1} / {total}
        </span>
        <button
          onClick={() => step(1)}
          disabled={screen === total - 1}
          aria-label={t('nextScreen')}
        >
          <Chevron />
        </button>
      </nav>
    </>
  )
}

export default function StoryPanel({ selection, onClose }) {
  const bodyRef = useRef(null)
  const meta = nodeMeta(selection)
  if (!meta) return null

  const seed = `${selection.kind}:${selection.id}`

  // A theme is an invitation, not an article: the box carries a line telling you
  // what following it would give you.
  if (selection.kind === 'theme') {
    return (
      <div className="story-holder" key={seed}>
        <article className="story-panel placeholder">
          <Plate seed={seed} />
          <span className="placeholder-label">{ctaFor(selection.id)}</span>
        </article>
        <button className="close" onClick={onClose} aria-label={t('close')}>
          <CloseIcon />
        </button>
      </div>
    )
  }

  if (selection.kind === 'story') {
    const story = findStory(selection.id)
    return (
      <div className="story-holder" key={seed}>
        <article className="story-panel reader">
          {story && <StoryReader story={story} seed={seed} />}
        </article>
        <button className="close" onClick={onClose} aria-label={t('close')}>
          <CloseIcon />
        </button>
      </div>
    )
  }

  const { standfirst, body, caption, credit } = narrativeFor(selection.kind, selection.id, meta.blurb)

  return (
    <div className="story-holder" key={seed}>
      {/* Name first, then the writing on its own card, then the picture at the
          foot — the reader meets what a thing is before what it looks like. */}
      <article className="story-panel prose">
        <ScrollRail targetRef={bodyRef} />

        <header className="story-head">
          <h2>{meta.label}</h2>
          <p className="story-tags">
            <span className="chip">{meta.kicker}</span>
            {meta.sub && <span className="sub">· {meta.sub}</span>}
          </p>
        </header>

        <div className="story-body" ref={bodyRef}>
          <p className="standfirst">{standfirst}</p>

          {body.map((paragraph, i) => (
            <div key={i} className="para-row">
              <p>{paragraph}</p>
            </div>
          ))}

          <footer className="story-credit">{credit}</footer>
        </div>

        <figure className="story-plate">
          <Plate seed={seed} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      </article>
      <button className="close" onClick={onClose} aria-label={t('close')}>
        <CloseIcon />
      </button>
    </div>
  )
}
