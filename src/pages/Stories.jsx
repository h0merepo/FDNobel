import { useEffect, useMemo, useRef } from 'react'
import Bubble from '../components/Bubble'
import PanCanvas from '../components/PanCanvas'
import { THEMES, kindColor, themeLabel } from '../data/content'
import { t } from '../i18n'
import { ghostCircles, packCircles } from '../lib/layout'

const WORLD = { width: 2900, height: 2050 }
const RADIUS_BY_WEIGHT = { 1: 74, 2: 104, 3: 140 }

export default function Stories({ selection, onSelect }) {
  const controls = useRef(null)

  const nodes = useMemo(
    () =>
      packCircles(
        THEMES.map((t) => ({
          id: t.id,
          kind: 'theme',
          label: themeLabel(t),
          r: RADIUS_BY_WEIGHT[t.weight] ?? 100,
          color: kindColor('theme', t.id),
        })),
        { ...WORLD, seed: 21, padding: 24 },
      ),
    [],
  )

  const ghosts = useMemo(() => ghostCircles(34, { ...WORLD, seed: 55 }), [])

  useEffect(() => {
    const node = nodes.find((n) => n.id === selection?.id)
    if (selection?.kind === 'theme' && node) controls.current?.centerOn(node.x, node.y)
  }, [selection, nodes])

  useEffect(() => {
    controls.current?.centerOn(WORLD.width / 2, WORLD.height / 2)
  }, [])

  return (
    <>
      <div className="page-hint">
        <h1>{t('storiesTitle')}</h1>
        <p>{t('storiesHint')}</p>
      </div>
      <PanCanvas world={WORLD} offsetRef={controls}>
        {ghosts.map((g) => (
          <span
            key={g.id}
            className="world-ghost"
            style={{
              left: g.x,
              top: g.y,
              width: g.r * 2,
              height: g.r * 2,
              opacity: g.o,
              background: g.c,
              filter: `blur(${g.blur}px)`,
            }}
          />
        ))}
        {nodes.map((node) => (
          <Bubble
            key={node.id}
            node={node}
            selected={selection?.kind === 'theme' && selection.id === node.id}
            onSelect={(n) => onSelect({ kind: 'theme', id: n.id })}
          />
        ))}
      </PanCanvas>
    </>
  )
}
