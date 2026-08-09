import Ambient from '../components/Ambient'
import { PALETTE, textOn } from '../data/content'

const ENTRIES = [
  {
    id: 'stories',
    title: 'STORY',
    copy: 'Discover the story behind remarkable minds',
    color: PALETTE.ink,
  },
  {
    id: 'milestones',
    title: 'MILESTONE',
    copy: 'Move through moments that changed the world',
    color: PALETTE.ink,
  },
  {
    id: 'discovery',
    title: 'DISCOVERY',
    copy: 'Follow your curiosity and explore your own path',
    color: PALETTE.ink,
  },
]

export default function Landing({ onNavigate }) {
  return (
    <>
      <Ambient count={30} seed={4} />
      <div className="landing">
        <header>
          <h1>NOBEL ATLAS</h1>
          <p className="tagline">Tap on what you want to explore today</p>
        </header>
        <div className="entries">
          {ENTRIES.map((entry) => (
            <button
              key={entry.id}
              className="entry"
              style={{ background: entry.color, color: textOn(entry.color) }}
              onClick={() => onNavigate(entry.id)}
            >
              <h2>{entry.title}</h2>
              <p>{entry.copy}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
