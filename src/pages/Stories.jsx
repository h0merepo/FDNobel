import { useEffect, useMemo, useRef } from 'react'
import Bubble from '../components/Bubble'
import Ambient from '../components/Ambient'
import PanCanvas from '../components/PanCanvas'
import { THEMES, kindColor, themeLabel } from '../data/content'
import { t } from '../i18n'
import { packCircles } from '../lib/layout'

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


  useEffect(() => {
    const node = nodes.find((n) => n.id === selection?.id)
    if (selection?.kind === 'theme' && node) controls.current?.centerOn(node.x, node.y)
  }, [selection, nodes])

  useEffect(() => {
    controls.current?.centerOn(WORLD.width / 2, WORLD.height / 2)
  }, [])

  return (
    <>
      <Ambient count={22} seed={55} />

      <div className="page-hint">
        <h1>{t('storiesTitle')}</h1>
        <p>{t('storiesHint')}</p>
      </div>
      <PanCanvas world={WORLD} offsetRef={controls}>
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
