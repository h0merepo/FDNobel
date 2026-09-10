import { useMemo } from 'react'
import { makeRng } from '../lib/layout'

function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

// Stands in for the artwork: a smooth spectral wash, deterministic per node so
// a story always opens with the same plate. It settles on Nobel pale rather
// than white, and the hues that bend across it are drawn from the palette —
// gold, pink, teal, rust — held far enough back to stay a light surface.
const SWEEP = [
  { h: 40, s: 34 },
  { h: 330, s: 26 },
  { h: 192, s: 24 },
  { h: 22, s: 30 },
]

export default function Plate({ seed, variant = 'hero', className = '' }) {
  const id = useMemo(() => `pl${hash(seed + variant).toString(36)}`, [seed, variant])

  const { tilt, base, blooms } = useMemo(() => {
    const rng = makeRng(hash(seed))
    const offset = Math.floor(rng() * SWEEP.length)
    return {
      tilt: rng() * 360,
      base: 3 + rng() * 5,
      blooms: SWEEP.map((band, i) => {
        const tone = SWEEP[(i + offset) % SWEEP.length]
        return {
          hue: tone.h,
          saturation: tone.s,
          light: 96 - rng() * 7,
          cx: 12 + rng() * 76,
          cy: 12 + rng() * 76,
          r: 42 + rng() * 46,
          opacity: 0.58 + rng() * 0.4,
        }
      }),
    }
  }, [seed])

  return (
    <svg
      className={`plate ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}b`} gradientTransform={`rotate(${tilt} 0.5 0.5)`}>
          <stop offset="0%" stopColor="#f7f4ec" />
          <stop offset="32%" stopColor={`hsl(44 22% ${94 - base * 0.3}%)`} />
          <stop offset="64%" stopColor={`hsl(38 20% ${88 - base * 0.5}%)`} />
          <stop offset="100%" stopColor={`hsl(30 18% ${82 - base * 0.7}%)`} />
        </linearGradient>

        {blooms.map((bloom, i) => (
          <radialGradient key={i} id={`${id}g${i}`} cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor={`hsl(${bloom.hue} ${bloom.saturation}% ${bloom.light}%)`}
              stopOpacity={bloom.opacity}
            />
            <stop
              offset="55%"
              stopColor={`hsl(${bloom.hue} ${bloom.saturation * 0.6}% ${bloom.light + 1.5}%)`}
              stopOpacity={bloom.opacity * 0.45}
            />
            <stop
              offset="100%"
              stopColor={`hsl(${bloom.hue} ${bloom.saturation}% ${bloom.light}%)`}
              stopOpacity="0"
            />
          </radialGradient>
        ))}
      </defs>

      <rect width="100" height="100" fill={`url(#${id}b)`} />
      {blooms.map((bloom, i) => (
        <circle key={i} cx={bloom.cx} cy={bloom.cy} r={bloom.r} fill={`url(#${id}g${i})`} />
      ))}
    </svg>
  )
}
