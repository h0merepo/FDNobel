import Ambient from '../components/Ambient'
import { PALETTE, textOn } from '../data/content'
import { t } from '../i18n'

const ENTRIES = [
  { id: 'stories', title: 'entryStory', copy: 'entryStoryBlurb', color: PALETTE.gold },
  { id: 'milestones', title: 'entryMilestone', copy: 'entryMilestoneBlurb', color: PALETTE.pale },
  { id: 'discovery', title: 'entryDiscovery', copy: 'entryDiscoveryBlurb', color: PALETTE.theme },
]

export default function Landing({ onNavigate }) {
  return (
    <>
      <Ambient count={30} seed={4} />
      <div className="landing">
        <header>
          <h1>NOBEL ATLAS</h1>
          <p className="tagline">{t('landingTagline')}</p>
        </header>
        <div className="entries">
          {ENTRIES.map((entry) => (
            <button
              key={entry.id}
              className="entry"
              style={{ backgroundColor: entry.color, color: textOn(entry.color) }}
              onClick={() => onNavigate(entry.id)}
            >
              <h2>{t(entry.title)}</h2>
              <p>{t(entry.copy)}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
