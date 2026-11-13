import { useState } from 'react'
import { ArrowUpRight, CheckCircle, Play } from '@phosphor-icons/react'
import { drivePreview, driveThumb, longform } from '@/content/longform'
import { externalLinks } from '@/content/site'
import './longform.css'
import { Fx } from '@/components/fx/Fx'

/**
 * Long-form highlight: a wide 16:9 "screen" with the poster and a play button. Pressing play swaps
 * in Google Drive's player (nothing from Drive loads until then).
 */
export function LongformSection() {
  const [playing, setPlaying] = useState(false)
  const l = longform

  return (
    <section id="longform" className="lf wk" aria-labelledby="lf-title">
      <header className="lf__head">
        <p className="wk-eyebrow">{l.eyebrow}</p>
        <h2 id="lf-title" className="wk-title">
          <span className="wk-title__thin">{l.titleThin}</span> <span className="wk-title__bold">{l.titleBold}</span>
        </h2>
      </header>

      <div className="lf__body">
        <div className="lf__screen fx-host">
          <Fx variant="over" />
          {playing ? (
            <iframe src={drivePreview(l.driveId)} title={l.title} allow="autoplay; fullscreen" allowFullScreen />
          ) : (
            <button type="button" className="lf__poster" onClick={() => setPlaying(true)} aria-label={`Play ${l.title}`}>
              <img src={driveThumb(l.driveId)} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
              <span className="lf__play" aria-hidden>
                <Play size={26} weight="fill" />
              </span>
              <span className="lf__badge" aria-hidden>
                16:9 · Long-form
              </span>
            </button>
          )}
        </div>

        <aside className="lf__notes">
          <p className="lf__lede">{l.lede}</p>
          <ul>
            {l.points.map((p) => (
              <li key={p}>
                <CheckCircle size={18} weight="fill" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
          <a className="btn-ghost" href={externalLinks.library} target="_blank" rel="noopener noreferrer">
            Full library on Drive
            <ArrowUpRight size={14} weight="bold" aria-hidden />
          </a>
        </aside>
      </div>
    </section>
  )
}
