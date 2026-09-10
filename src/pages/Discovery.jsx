import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Bubble from '../components/Bubble'
import Ambient from '../components/Ambient'
import PanCanvas from '../components/PanCanvas'
import {
  ARTIFACTS,
  FIELDS,
  LAUREATES,
  MILESTONES,
  THEMES,
  artifactLabel,
  fieldLabel,
  kindColor,
  milestoneTitle,
  themeLabel,
} from '../data/content'
import { t } from '../i18n'
import { STORIES, storyTitle } from '../data/stories'
import { packCircles } from '../lib/layout'

const WORLD = { width: 4200, height: 2800 }

const ShuffleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M3 7h4l3.5 10H17M3 17h4l3.5-10H17" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m15 4 3 3-3 3M15 14l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// Every kind sits on the one plane at the same weight: level 1 and 2 in the
// laureates, milestones and artifacts, level 3 in the stories, themes as the
// signposts between them.
const ITEMS = () => [
  ...LAUREATES.map((l) => ({
    id: l.id,
    kind: 'person',
    label: l.name,
    meta: `${fieldLabel(FIELDS.find((f) => f.id === l.field) ?? { id: l.field, label: l.field }).split(' ')[0]} ${l.year}`,
    r: 92,
    color: kindColor('person', l.id),
  })),
  ...THEMES.map((th) => ({
    id: th.id,
    kind: 'theme',
    label: themeLabel(th),
    r: th.weight === 3 ? 118 : th.weight === 2 ? 92 : 72,
    color: kindColor('theme', th.id),
  })),
  ...MILESTONES.map((m) => ({
    id: m.id,
    kind: 'milestone',
    label: milestoneTitle(m),
    meta: String(m.year),
    r: 96,
    color: kindColor('milestone'),
  })),
  ...STORIES.map((n) => ({
    id: n.id,
    kind: 'story',
    label: storyTitle(n),
    meta: n.sub,
    r: 104,
    color: kindColor('story'),
  })),
  ...ARTIFACTS.map((a) => ({
    id: a.id,
    kind: 'artifact',
    label: artifactLabel(a),
    r: 78,
    color: kindColor('artifact'),
  })),
]

export default function Discovery({ selection, onSelect, search }) {
  const controls = useRef(null)
  // Shuffle re-packs the plane on a new seed, so the circles under the viewport
  // become a different set without the reader having to pan for them.
  const [seed, setSeed] = useState(33)

  const nodes = useMemo(() => packCircles(ITEMS(), { ...WORLD, seed, padding: 34 }), [seed])

  const recentre = useCallback(() => {
    controls.current?.centerOn(WORLD.width / 2, WORLD.height / 2)
  }, [])

  useEffect(() => {
    recentre()
  }, [recentre])

  useEffect(() => {
    if (!selection) return
    const node = nodes.find((n) => n.kind === selection.kind && n.id === selection.id)
    if (node) controls.current?.centerOn(node.x, node.y)
  }, [selection, nodes])

  return (
    <>
      <Ambient count={22} seed={88} />

      <div className="page-hint">
        <h1>{t('discoveryTitle')}</h1>
        <p>{t('discoveryHint')}</p>
      </div>

      <PanCanvas world={WORLD} offsetRef={controls}>
        {nodes.map((node) => (
          <Bubble
            key={`${node.kind}-${node.id}`}
            node={node}
            selected={selection?.kind === node.kind && selection.id === node.id}
            onSelect={(n) => onSelect({ kind: n.kind, id: n.id })}
          />
        ))}
      </PanCanvas>

      {search}

      <button
        className="shuffle"
        onClick={() => {
          setSeed((s) => s + 1)
          recentre()
        }}
      >
        <ShuffleIcon />
        {t('shuffle')}
      </button>
    </>
  )
}
