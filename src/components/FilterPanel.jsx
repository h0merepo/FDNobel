import { useState } from 'react'

const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m5 9 7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Group({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`filter-group${open ? '' : ' collapsed'}`}>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <Chevron />
        {title}
      </button>
      {open && children}
    </div>
  )
}

export default function FilterPanel({
  fields,
  activeFields,
  onToggleField,
  countries,
  activeCountries,
  onToggleCountry,
  range,
  bounds,
  onRange,
  onReset,
}) {
  const span = bounds[1] - bounds[0]
  const leftPct = ((range[0] - bounds[0]) / span) * 100
  const rightPct = ((range[1] - bounds[0]) / span) * 100

  return (
    <div className="filters">
      <Group title="Fields">
        <div className="filter-options">
          {fields.map((f) => (
            <label key={f.id}>
              <input
                type="checkbox"
                checked={activeFields.includes(f.id)}
                onChange={() => onToggleField(f.id)}
              />
              {f.label}
            </label>
          ))}
        </div>
      </Group>

      <Group title="Timeline">
        <div className="range">
          <div className="range-track">
            <span className="range-fill" style={{ left: `${leftPct}%`, width: `${rightPct - leftPct}%` }} />
          </div>
          <input
            type="range"
            min={bounds[0]}
            max={bounds[1]}
            value={range[0]}
            aria-label="Earliest year"
            onChange={(e) => onRange([Math.min(Number(e.target.value), range[1]), range[1]])}
          />
          <input
            type="range"
            min={bounds[0]}
            max={bounds[1]}
            value={range[1]}
            aria-label="Latest year"
            onChange={(e) => onRange([range[0], Math.max(Number(e.target.value), range[0])])}
          />
        </div>
        <div className="range-labels">
          <span>{range[0]}</span>
          <span>{range[1]}</span>
        </div>
      </Group>

      <Group title="Location" defaultOpen={false}>
        <div className="filter-options">
          {countries.map((c) => (
            <label key={c}>
              <input
                type="checkbox"
                checked={activeCountries.includes(c)}
                onChange={() => onToggleCountry(c)}
              />
              {c}
            </label>
          ))}
        </div>
      </Group>

      <button className="filter-reset" onClick={onReset}>
        Reset filters
      </button>
    </div>
  )
}
