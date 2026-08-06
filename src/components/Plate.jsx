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

// Stands in for an archival photograph: a seeded monochrome composition of
// out-of-focus discs over a grain wash, deterministic per node so a story
// always opens with the same plate.
export default function Plate({ seed, variant = 'hero', className = '' }) {
  const id = useMemo(() => `pl${hash(seed + variant).toString(36)}`, [seed, variant])

  const { discs, tilt, base } = useMemo(() => {
    const rng = makeRng(hash(seed))
    const count = variant === 'hero' ? 26 : 12
    return {
      base: 0.1 + rng() * 0.35,
      tilt: rng() * 140 - 70,
      discs: Array.from({ length: count }, () => {
        const r = 3 + rng() ** 2.2 * 30
        return {
          cx: rng() * 100,
          cy: rng() * 100,
          r,
          light: rng() > 0.42,
          o: 0.06 + rng() * 0.42,
          blur: r > 16 ? 1.8 : 0.5,
        }
      }),
    }
  }, [seed, variant])

  return (
    <svg
      className={`plate ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}g`} gradientTransform={`rotate(${tilt} 0.5 0.5)`}>
          <stop offset="0%" stopColor={`hsl(30 6% ${8 + base * 40}%)`} />
          <stop offset="52%" stopColor={`hsl(30 5% ${26 + base * 34}%)`} />
          <stop offset="100%" stopColor={`hsl(30 7% ${6 + base * 22}%)`} />
        </linearGradient>
        <filter id={`${id}s`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
        <filter id={`${id}n`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed={hash(seed) % 500} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect width="100" height="100" fill={`url(#${id}g)`} />
      <g filter={`url(#${id}s)`}>
        {discs.map((d, i) => (
          <circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            fill={d.light ? '#ffffff' : '#000000'}
            opacity={d.o}
          />
        ))}
      </g>
      <rect width="100" height="100" filter={`url(#${id}n)`} opacity="0.14" />
    </svg>
  )
}
