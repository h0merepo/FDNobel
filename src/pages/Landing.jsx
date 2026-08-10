import Ambient from '../components/Ambient'
import { PALETTE, textOn } from '../data/content'
import { t } from '../i18n'

const ENTRIES = [
  { id: 'stories', title: 'entryStory', copy: 'entryStoryBlurb' },
  { id: 'milestones', title: 'entryMilestone', copy: 'entryMilestoneBlurb' },
  { id: 'discovery', title: 'entryDiscovery', copy: 'entryDiscoveryBlurb' },
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
              style={{ background: PALETTE.ink, color: textOn(PALETTE.ink) }}
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
