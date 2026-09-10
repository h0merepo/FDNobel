import { useEffect, useMemo, useRef, useState } from 'react'
import Ambient from '../components/Ambient'
import { PALETTE, textOn } from '../data/content'
import { t } from '../i18n'
import { neckPath } from '../lib/neck'

// The three ways in, hung around the title. Positions are fractions of the
// stage so the arrangement survives any window shape; the necks that join them
// to the centre are drawn in pixels off the measured box, so they stay round.
const HUB = { x: 0.487, y: 0.462, r: 0.006 }

const ENTRIES = [
  {
    id: 'discovery',
    title: 'entryDiscovery',
    copy: 'entryDiscoveryBlurb',
    at: { x: 0.306, y: 0.256 },
    r: 0.153,
    color: PALETTE.gold,
  },
  {
    id: 'milestones',
    title: 'entryMilestone',
    copy: 'entryMilestoneBlurb',
    at: { x: 0.712, y: 0.407 },
    r: 0.109,
    color: PALETTE.theme,
  },
  {
    id: 'stories',
    title: 'entryStory',
    copy: 'entryStoryBlurb',
    at: { x: 0.338, y: 0.738 },
    r: 0.125,
    color: PALETTE.warmGrey,
  },
]

// Below this the arrangement has no room to breathe and the page falls back to
// a plain stack, so the necks are not drawn at all.
const MIN_STAGE = 820

export default function Landing({ onNavigate }) {
  const stage = useRef(null)
  const [box, setBox] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = stage.current
    if (!el) return undefined
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const scattered = box.w >= MIN_STAGE

  // Radii come off the smaller axis so a circle never turns into an ellipse of
  // empty space on a wide, short screen.
  const placed = useMemo(() => {
    const { w, h } = box
    if (!w || !h) return []
    const unit = Math.min(w, h)
    return ENTRIES.map((entry) => ({
      ...entry,
      cx: entry.at.x * w,
      cy: entry.at.y * h,
      cr: entry.r * unit,
    }))
  }, [box])

  const hub = useMemo(
    () => ({ x: HUB.x * box.w, y: HUB.y * box.h, r: Math.max(5, HUB.r * box.w) }),
    [box],
  )

  return (
    <>
      <Ambient count={26} seed={4} />

      <div className={`attractor${scattered ? '' : ' stacked'}`} ref={stage}>
        {scattered && (
          <svg className="attractor-necks" aria-hidden="true">
            {placed.map((entry) => {
              const d = neckPath(
                { x: entry.cx, y: entry.cy, r: entry.cr },
                hub,
                { width: 4.5, fillet: entry.cr * 0.24 },
              )
              return d ? <path key={entry.id} d={d} fill={entry.color} /> : null
            })}
          </svg>
        )}

        <h1 className="attractor-title">
          <span className="line-one">Nobel</span>
          <span className="line-two">Atlas</span>
        </h1>

        <p className="attractor-tagline">{t('landingTagline')}</p>

        {placed.map((entry) => (
          <button
            key={entry.id}
            className="entry"
            style={
              scattered
                ? {
                    position: 'absolute',
                    left: entry.cx,
                    top: entry.cy,
                    width: entry.cr * 2,
                    height: entry.cr * 2,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: entry.color,
                    color: textOn(entry.color),
                  }
                : { backgroundColor: entry.color, color: textOn(entry.color) }
            }
            onClick={() => onNavigate(entry.id)}
            title={t(entry.copy)}
            aria-label={`${t(entry.title)} — ${t(entry.copy)}`}
          >
            <span className="entry-name">{t(entry.title)}</span>
          </button>
        ))}
      </div>
    </>
  )
}
