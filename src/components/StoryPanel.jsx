import { useCallback, useEffect, useRef, useState } from 'react'
import { ctaFor, narrativeFor } from '../data/narrative'
import { ALL_STORIES, storyScreens, storyTitle } from '../data/stories'
import { nodeMeta } from '../lib/relations'
import { t } from '../i18n'
import curieHtml from '../embeds/marie-curie.html?raw'
import mandelaHtml from '../embeds/nelson-mandela.html?raw'
import { PIECES } from '../data/pieces'
import { buildPiece } from '../lib/scrollpiece'

// A shortlisted laureate opens a long-form piece rather than the prose card.
// Each is a whole document with its own type and palette, so it is given a
// frame of its own inside the box instead of being merged into ours.
//
// Curie and Mandela arrived as finished documents and are embedded exactly as
// supplied. The rest are built from their scripts by the scroll-piece engine,
// which is the Mandela sequence's own mechanics — so they are siblings of it
// rather than a different kind of thing sharing a box with it.
//
// `fit` is the width a piece was drawn at, for one built on rem rather than on
// a scaler of its own. Setting the root size against it makes the composition
// scale to whatever width the box gives it, which is what rem is for — nothing
// inside the piece is touched.
const SUPPLIED = {
  'person:curie': { html: curieHtml, title: 'Marie Curie', fit: 845 },
  'person:mandela': { html: mandelaHtml, title: 'Nelson Mandela', scale: 910 },
}

const PIECE_BY_ID = Object.fromEntries(PIECES.map((script) => [script.id, script]))

/* A story is a laureate's narrative under another name — `helgoland` is
   Heisenberg's, `mould-juice` is Fleming's — and it was the last thing in the
   atlas still read as a stack of cards. Where the laureate it belongs to has a
   piece, the story now opens that: the same account, told as one scroll.

   Where there is none, because the laureate falls outside the edition, one is
   built from the story's own screens instead: the first line of each screen is
   the heading it already had, and the blocks alternate so the column does not
   run down one side. It is a plainer piece than a written script makes, but it
   is a scroll, and no long narrative is left paged. */
const fromScreens = (story) => ({
  id: story.id,
  name: storyTitle(story),
  field: 'peace',
  beats: [
    { block: 'title', name: storyTitle(story), meta: story.sub },
    ...storyScreens(story).map((screen, i) => ({
      block: i === 0 ? 'plate' : i % 2 ? 'note' : 'plate',
      title: screen.heading,
      text: screen.body,
    })),
  ],
})

const scriptForStory = (story) =>
  story.laureates.map((id) => PIECE_BY_ID[id]).find(Boolean) ?? fromScreens(story)

const LONG_FORM = {
  ...Object.fromEntries(
    PIECES.map((script) => [
      `person:${script.id}`,
      { html: buildPiece(script), title: script.name, scale: 910 },
    ]),
  ),
  ...Object.fromEntries(
    ALL_STORIES.map((story) => {
      const script = scriptForStory(story)
      return [`story:${story.id}`, { html: buildPiece(script), title: script.name, scale: 910 }]
    }),
  ),
  // supplied last: a document the client sent is never overwritten by a built one
  ...SUPPLIED,
}

const framed = (html, design) => {
  if (!design) return html
  const shim = `<script>(function(){var d=${design};function f(){document.documentElement.style.fontSize=Math.min(16,innerWidth/d*16)+'px'}f();addEventListener('resize',f)})()<\/script>`
  return html.includes('</body>') ? html.replace('</body>', `${shim}</body>`) : html + shim
}

// Two things a piece needs from the box it is shown in, neither of which
// belongs in the piece itself.
//
// It rounds its own column, and should: opened on its own page there is nothing
// else on screen to round it. Inside our box that corner lands a few pixels in
// from the box's own, and the two read as one mistake.
//
// And a frame scrolls, so the browser draws its bar down the inside edge — the
// dark slab this app stopped showing anywhere else. The piece already carries
// its own beat rail and its own cue; the bar is the third thing saying so.
//
// Added to the frame's own head after the write rather than appended to the
// markup: the tail of the longest of these documents does not survive the
// write, which is the same reason its scripts never start in here.
const dressFrame = (doc) => {
  const style = doc.createElement('style')
  style.textContent = [
    '.column,.track,.layer{border-radius:0 !important}',
    'html{scrollbar-width:none;-ms-overflow-style:none}',
    'html::-webkit-scrollbar,body::-webkit-scrollbar{width:0;height:0;display:none}',
  ].join('')
  doc.head.appendChild(style)
}

// One language for moving through writing, wherever it appears: a dot per
// section, the one you are in filled. It is the beat rail the scroll sequences
// use, brought out of the pieces and into the boxes — so the app never shows a
// browser scrollbar on its own prose.
function SectionRail({ count, active, onGo, label }) {
  if (count < 2) return null
  return (
    <nav className="section-rail" aria-label={label}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-current={i === active}
          aria-label={`${i + 1} / ${count}`}
          onClick={() => onGo(i)}
        />
      ))}
    </nav>
  )
}

// Which section of a scrolling box is being read, and how to get to another.
// Offsets are measured against the scroller rather than taken from offsetTop,
// which is relative to the nearest positioned ancestor and not to this box.
function useSections(scrollerRef, dependency) {
  const [{ count, active }, setState] = useState({ count: 0, active: 0 })

  const offsets = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return []
    const top = el.getBoundingClientRect().top
    return [...el.querySelectorAll('[data-section]')].map(
      (n) => n.getBoundingClientRect().top - top + el.scrollTop,
    )
  }, [scrollerRef])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return undefined
    const measure = () => {
      // Writing that fits in the box has nothing to move through, and a rail
      // over it would promise more than is there.
      if (el.scrollHeight <= el.clientHeight + 4) {
        setState({ count: 0, active: 0 })
        return
      }
      const list = offsets()
      // a section becomes the current one as its head crosses the top of the
      // box — measured from the top rather than from the middle, or the box
      // opens already marking the second section
      const mark = el.scrollTop + 28
      let at = 0
      list.forEach((y, i) => {
        if (y <= mark) at = i
      })
      // At the foot of the box the last section is the one being read, even
      // when it is short enough that its head never crossed the line.
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 4) at = list.length - 1
      setState({ count: list.length, active: at })
    }
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', measure)
      ro.disconnect()
    }
  }, [scrollerRef, offsets, dependency])

  const go = useCallback(
    (i) => {
      const el = scrollerRef.current
      const y = offsets()[i]
      if (el && y !== undefined) el.scrollTo({ top: Math.max(0, y - 10), behavior: 'smooth' })
    },
    [scrollerRef, offsets],
  )

  return { count, active, go }
}

// The pale box carries one tinted disc, and the lead of whatever is in the box
// is set inside it. The tint is the node's own colour, laid over the pale ground
// at low strength so a gold theme and a teal laureate are the same weight of
// mark — the colour identifies, it does not shout.
const Disc = ({ color, className = '', children }) => (
  <div className={`node-disc ${className}`} style={{ '--node': color }}>
    <span className="node-disc-copy">{children}</span>
  </div>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
  </svg>
)

// Half a megabyte of markup does not survive a srcdoc attribute — the document
// arrives whole but its scripts never run — so each piece is served to the
// frame as a real document from a blob instead.
function Piece({ piece }) {
  const frame = useRef(null)

  useEffect(() => {
    const doc = frame.current?.contentDocument
    if (!doc) return
    // Written into the frame rather than handed over as an attribute or a blob:
    // a document half a megabyte long parses either way, but only a real parse
    // runs the scripts these pieces are built on.
    doc.open()
    doc.write(framed(piece.html, piece.fit))
    doc.close()
    dressFrame(doc)

    // A piece that scales itself off a design width is handed that scale
    // directly, so it fits the box it has been given whatever else happens.
    if (!piece.scale) return undefined
    const apply = () => {
      const width = frame.current?.clientWidth
      if (!width) return
      doc.documentElement.style.setProperty('--s', Math.min(1, width / piece.scale).toFixed(4))
    }
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(frame.current)
    return () => ro.disconnect()
  }, [piece])

  return <iframe className="story-embed" title={piece.title} ref={frame} />
}

export default function StoryPanel({ selection, onClose }) {
  const bodyRef = useRef(null)
  const sections = useSections(bodyRef, selection && `${selection.kind}:${selection.id}`)
  const meta = nodeMeta(selection)
  if (!meta) return null

  const seed = `${selection.kind}:${selection.id}`

  const longForm = LONG_FORM[seed]
  if (longForm) {
    return (
      <div className="story-holder wide" key={seed}>
        <article className="story-panel piece">
          <Piece piece={longForm} />
        </article>
        <button className="close" onClick={onClose} aria-label={t('close')}>
          <CloseIcon />
        </button>
      </div>
    )
  }

  // A theme is an invitation, not an article: the box carries a line telling you
  // what following it would give you.
  if (selection.kind === 'theme') {
    return (
      <div className="story-holder" key={seed}>
        <article className="story-panel placeholder">
          <Disc color={meta.color} className="lead">
            {ctaFor(selection.id)}
          </Disc>
        </article>
        <button className="close" onClick={onClose} aria-label={t('close')}>
          <CloseIcon />
        </button>
      </div>
    )
  }

  const { standfirst, body, credit } = narrativeFor(selection.kind, selection.id, meta.blurb)

  return (
    <div className="story-holder" key={seed}>
      {/* The name in the disc, then the writing under it. The disc does the
          work the picture used to do, so there is no picture. */}
      <article className="story-panel prose">
        <SectionRail count={sections.count} active={sections.active} onGo={sections.go} label={t('storyScreens')} />

        <Disc color={meta.color}>
          <span className="node-name">{meta.label}</span>
          {meta.sub && <span className="node-sub">{meta.sub}</span>}
        </Disc>

        <div className="story-body" ref={bodyRef}>
          <p className="standfirst" data-section="">
            {standfirst}
          </p>

          {body.map((paragraph, i) => (
            <div key={i} className="para-row" data-section="">
              <p>{paragraph}</p>
            </div>
          ))}

          <footer className="story-credit">{credit}</footer>
        </div>
      </article>
      <button className="close" onClick={onClose} aria-label={t('close')}>
        <CloseIcon />
      </button>
    </div>
  )
}
