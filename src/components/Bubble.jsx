import { textOn } from '../data/content'

function fitFontSize(radius, label) {
  const longest = label.split(' ').reduce((n, w) => Math.max(n, w.length), 0)
  const byRadius = radius / 4.2
  const byWord = (radius * 1.8) / Math.max(longest, 4)
  return Math.max(10, Math.min(byRadius, byWord, 32))
}

export default function Bubble({ node, selected, dimmed, onSelect }) {
  const fontSize = fitFontSize(node.r, node.label)
  return (
    <button
      className={`bubble ${node.kind}${selected ? ' selected' : ''}${dimmed ? ' dimmed' : ''}`}
      style={{
        left: node.x,
        top: node.y,
        width: node.r * 2,
        height: node.r * 2,
        backgroundColor: node.color,
        color: textOn(node.color),
        fontSize,
      }}
      onClick={() => onSelect(node)}
      title={node.label}
    >
      <span className="label">{node.label}</span>
      {node.meta && <span className="meta">{node.meta}</span>}
    </button>
  )
}
