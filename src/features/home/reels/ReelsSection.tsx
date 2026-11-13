import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, FolderOpen, SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react'
import { externalLinks } from '@/content/site'
import { reelCategories, reelPoster, reels, reelSrc, reelsSection, type ReelCategory } from '@/content/reels'
import './reels.css'
import { Fx } from '@/components/fx/Fx'

type Cat = ReelCategory
const tabs = reelCategories.filter((c) => c.id !== 'all') as { id: Cat; label: string }[]

/**
 * The Reel, "monitor + playlist": a large 9:16 monitor on the left plays the selected video (muted
 * until the visitor picks one, then with sound), the details and a category playlist sit on the right.
 * Phones stack it: tabs, monitor, details, then the playlist as a swipeable row.
 */
export function ReelsSection() {
  const [cat, setCat] = useState<Cat>('story')
  const items = reels.filter((r) => r.category === cat)
  const [activeId, setActiveId] = useState(items[0]!.id)
  const [sound, setSound] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const active = reels.find((r) => r.id === activeId) ?? items[0]!
  const index = items.findIndex((r) => r.id === active.id)

  const pick = (id: string) => {
    setActiveId(id)
    setSound(true)
  }
  const step = (by: number) => {
    const list = items.length ? items : [active]
    const i = Math.max(0, list.findIndex((r) => r.id === active.id))
    pick(list[(i + by + list.length) % list.length]!.id)
  }
  const switchCat = (id: Cat) => {
    setCat(id)
    setActiveId(reels.find((r) => r.category === id)!.id)
  }

  // Muted preview plays only while the section is on screen; it pauses when scrolled away.
  useEffect(() => {
    const el = sectionRef.current
    const v = videoRef.current
    if (!el || !v) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) v.play().catch(() => {})
      else v.pause()
    }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [activeId])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !sound
    if (sound) v.play().catch(() => {})
  }, [sound, activeId])

  return (
    <section ref={sectionRef} id="reels" className="rl wk" aria-labelledby="reels-title">
      <header className="rl__head">
        <div>
          <p className="wk-eyebrow">{reelsSection.eyebrow}</p>
          <h2 id="reels-title" className="wk-title">
            <span className="wk-title__thin">{reelsSection.titleThin}</span> <span className="wk-title__bold">{reelsSection.titleBold}</span>
          </h2>
        </div>
        <div className="rl__aside">
          <p className="rl__lede">{reelsSection.lede}</p>
          <a className="rl__library fx-host" href={externalLinks.library} target="_blank" rel="noopener noreferrer">
            <Fx variant="soft" />
            <FolderOpen size={20} weight="duotone" aria-hidden />
            <span>
              <b>Open the full library</b>
              <small>Every image and video I’ve made · Google Drive</small>
            </span>
            <ArrowUpRight size={16} weight="bold" aria-hidden />
          </a>
        </div>
      </header>

      <div className="rl__studio">
        <div className="rl__monitor fx-host">
          <Fx variant="over" />
          <video key={active.id} ref={videoRef} src={reelSrc(active.id)} poster={reelPoster(active.id)} muted={!sound} loop={!sound} playsInline autoPlay controls={sound} preload="metadata" />
          {!sound ? (
            <button type="button" className="rl__unmute" onClick={() => setSound(true)}>
              <SpeakerHigh size={16} weight="fill" aria-hidden /> Watch with sound
            </button>
          ) : (
            <button type="button" className="rl__mute" onClick={() => setSound(false)} aria-label="Mute">
              <SpeakerSlash size={16} weight="fill" />
            </button>
          )}
          <span className="rl__live" aria-hidden>
            <i /> {sound ? 'Playing' : 'Preview'}
          </span>
        </div>

        <div className="rl__side">
          <div className="rl__tabs" role="tablist" aria-label="Video type">
            {tabs.map((t) => (
              <button key={t.id} type="button" role="tab" aria-selected={cat === t.id} className="rl__tab" onClick={() => switchCat(t.id)}>
                {t.label}
                <span>{reels.filter((r) => r.category === t.id).length}</span>
              </button>
            ))}
          </div>

          <div className="rl__info" aria-live="polite">
            <p className="rl__kicker">
              {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')} · {active.duration}
            </p>
            <h3>{active.title}</h3>
            <p>{active.note}</p>
            <div className="rl__meta">
              <ul className="rl__tools">
                {active.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="rl__nav">
                <button type="button" onClick={() => step(-1)} aria-label="Previous video">
                  <ArrowLeft size={16} weight="bold" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next video">
                  <ArrowRight size={16} weight="bold" />
                </button>
              </div>
            </div>
          </div>

          <ul className="rl__list">
            {items.map((r) => (
              <li key={r.id}>
                <button type="button" className="rl__item fx-host" aria-current={r.id === active.id ? 'true' : undefined} onClick={() => pick(r.id)}>
                  <Fx variant="soft" />
                  <span className="rl__thumb">
                    <img src={reelPoster(r.id)} alt="" width={540} height={960} loading="lazy" decoding="async" />
                    {r.id === active.id ? (
                      <span className="rl__eq" aria-hidden>
                        <i />
                        <i />
                        <i />
                      </span>
                    ) : null}
                  </span>
                  <span className="rl__item-text">
                    <b>{r.title}</b>
                    <small>{r.duration}</small>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
