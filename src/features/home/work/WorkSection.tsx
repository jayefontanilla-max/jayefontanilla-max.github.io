import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, CheckCircle, LockSimple, Play } from '@phosphor-icons/react'
import { chapterPath, nxtgenDemo, workChapters, workSection } from '@/content/home'
import { reelPoster } from '@/content/reels'
import { externalLinks } from '@/content/site'
import './work.css'

/* ---------- Designed media faces, one per chapter ---------- */

function Browser({ url, children }: { url: string; children: ReactNode }) {
  return (
    <span className="wc-browser">
      <span className="wc-browser__bar">
        <i />
        <i />
        <i />
        <span>{url}</span>
      </span>
      <span className="wc-browser__view">{children}</span>
    </span>
  )
}

const FAN = ['pig-wolf', 'monk-lymphatic', 'lesson-napoleon', 'podcast-woman', 'caterpillar']

function VideoFace() {
  return (
    <span className="wc-fan">
      {FAN.map((id, i) => (
        <span key={id} className="wc-fan__card" style={{ '--i': i - 2 } as CSSProperties}>
          <img src={reelPoster(id)} alt="" loading="lazy" decoding="async" />
          {i === 2 ? (
            <span className="wc-fan__play">
              <Play size={18} weight="fill" />
            </span>
          ) : null}
        </span>
      ))}
    </span>
  )
}

function DesignFace() {
  return (
    <span className="wc-design">
      <img className="wc-design__back" src="/images/work/gigabyte-monitor.webp" alt="" loading="lazy" decoding="async" />
      <img className="wc-design__front" src="/images/work/msi-gpu.webp" alt="" loading="lazy" decoding="async" />
    </span>
  )
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const POSTS: [string, string][][] = [
  [['IG', 'Reel']],
  [['TT', 'Hook A'], ['X', 'Thread']],
  [['IG', 'Carousel']],
  [['TT', 'Hook B'], ['IG', 'Story']],
  [['X', 'Clip']],
  [['IG', 'Reel'], ['TT', 'Trend']],
  [['RP', 'Report']],
]

function SocialFace() {
  return (
    <span className="wc-cal">
      <span className="wc-cal__head">
        <b>Content calendar</b>
        <span>Week 46 · 3 accounts</span>
      </span>
      <span className="wc-cal__grid">
        {DAYS.map((d, i) => (
          <span key={d} className="wc-cal__day">
            <small>{d}</small>
            {POSTS[i]!.map(([p, label]) => (
              <span key={p + label} className="wc-cal__post" data-p={p}>
                <b>{p}</b>
                {label}
              </span>
            ))}
          </span>
        ))}
      </span>
    </span>
  )
}

function OsFace() {
  return (
    <span className="wc-os">
      <span className="wc-live">
        <i /> Live demo
      </span>
      <Browser url="nxtgen.os / mission-control">
        <img className="wc-shot wc-shot--top" src="/images/work/nxtgen-os.webp" alt="" loading="lazy" decoding="async" />
      </Browser>
    </span>
  )
}

function OpsFace() {
  return (
    <span className="wc-ops">
      <Browser url="production-tracker">
        <img className="wc-shot" src="/images/work/ops-qa-tracker.webp" alt="" loading="lazy" decoding="async" />
      </Browser>
      <span className="wc-chip wc-chip--a">
        <b>50+</b> videos / week
      </span>
      <span className="wc-chip wc-chip--b">
        <CheckCircle size={14} weight="fill" /> QA passed
      </span>
      <span className="wc-chip wc-chip--c">
        <LockSimple size={12} weight="fill" /> Blurred for privacy
      </span>
    </span>
  )
}

function AdminFace() {
  return (
    <span className="wc-admin">
      <Browser url="records.xlsx">
        <img className="wc-shot" src="/images/work/admin-data.webp" alt="" loading="lazy" decoding="async" />
      </Browser>
      <span className="wc-mail">
        <small>To: Client · Re: your request</small>
        <b>Update on your request</b>
        <span>
          I have reviewed the request and updated the relevant records. One supporting document is still needed, and I will continue the review right away.
        </span>
        <em>Kind regards, Roel</em>
      </span>
    </span>
  )
}

const FACES: Record<string, () => ReactNode> = {
  'ai-video': VideoFace,
  design: DesignFace,
  'social-ops': SocialFace,
  'nxtgen-os': OsFace,
  'content-ops': OpsFace,
  'admin-support': AdminFace,
}

/** Bento order and width: wide cards span two of the three columns. */
const ORDER: { id: string; wide?: true }[] = [
  { id: 'ai-video', wide: true },
  { id: 'design' },
  { id: 'social-ops' },
  { id: 'nxtgen-os', wide: true },
  { id: 'content-ops' },
  { id: 'admin-support', wide: true },
]

/** Feeds the cursor position to CSS (--mx/--my in px, --rx/--ry as -1..1) for the spotlight, glow border and tilt. */
function trackPointer(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse') return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = e.clientX - r.left
  const y = e.clientY - r.top
  el.style.setProperty('--mx', `${x}px`)
  el.style.setProperty('--my', `${y}px`)
  el.style.setProperty('--rx', ((x / r.width) * 2 - 1).toFixed(3))
  el.style.setProperty('--ry', ((y / r.height) * 2 - 1).toFixed(3))
}

/**
 * Work: six case cards. Each has a designed face (a fan of reels, a design pair, a live-looking
 * calendar, framed app screens, a mail card), then its number, title, line and count. Every card
 * opens that chapter's sheet at /work/<chapter>.
 */
export function WorkSection() {
  return (
    <section id="work" className="wk wb" aria-labelledby="work-title">
      <header className="wb__head">
        <div>
          <p className="wk-eyebrow">{workSection.eyebrow}</p>
          <h2 id="work-title" className="wk-title">
            <span className="wk-title__thin">{workSection.titleThin}</span> <span className="wk-title__bold">{workSection.titleBold}</span>
          </h2>
        </div>
        <a className="btn-ghost wb__all" href={externalLinks.library} target="_blank" rel="noopener noreferrer">
          See every image and video
          <ArrowUpRight size={14} weight="bold" aria-hidden />
        </a>
      </header>

      <ul className="wc-grid">
        {ORDER.map(({ id, wide }, i) => {
          const chapter = workChapters.find((c) => c.id === id)
          const Face = FACES[id]
          if (!chapter || !Face) return null
          return (
            <li key={id} className="wc" data-wide={wide ? 'true' : undefined} data-face={id}>
              <Link to={chapterPath(id)} state={{ sheet: true }} preventScrollReset className="wc__link" onPointerMove={trackPointer}>
                <span className="wc__media" aria-hidden>
                  <Face />
                </span>
                <span className="wc__body">
                  <span className="wc__top">
                    <span className="wc__n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="wc__count">
                      {chapter.count} {chapter.unit}
                    </span>
                  </span>
                  <b className="wc__title">{chapter.title}</b>
                  <span className="wc__line">{chapter.line}</span>
                  <span className="wc__go">
                    Open case
                    <ArrowUpRight size={14} weight="bold" aria-hidden />
                  </span>
                </span>
              </Link>
              {id === 'nxtgen-os' ? (
                <a className="wc__demo" href={nxtgenDemo} target="_blank" rel="noopener">
                  Try it live
                  <ArrowUpRight size={14} weight="bold" aria-hidden />
                </a>
              ) : null}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
