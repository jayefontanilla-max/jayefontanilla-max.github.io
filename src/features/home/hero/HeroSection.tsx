import type { CSSProperties, MouseEvent } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, Play } from '@phosphor-icons/react'
import { homeHero } from '@/content/home'
import { reelPoster, reels, reelSrc } from '@/content/reels'
import { scrollToSection } from '@/lib/motion/smooth-scroll'
import './hero.css'
import { Fx } from '@/components/fx/Fx'

/** Same-page links glide to their section (Lenis); a new-tab click keeps the link's own behaviour. */
const glideTo = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
  event.preventDefault()
  scrollToSection(id)
}

/**
 * Hero, "the studio desk": words on the left (a bold sans line over a serif-italic line, stats
 * below), and on the right the portrait card with a fan of three phones playing finished reels.
 */
export function HeroSection() {
  const h = homeHero
  const feature = reels.find((r) => r.id === h.feature)
  const stack = h.stack.map((id) => reels.find((r) => r.id === id)).filter((r) => r !== undefined)

  return (
    <section id="top" className="hx" aria-labelledby="hero-title">
      <div className="hx__copy">
        <p className="hx__hello">
          <span className="hx__live" aria-hidden />
          {h.hello}
          <span className="hx__sep" aria-hidden>
            ·
          </span>
          <span className="hx__role">{h.badges[1]}</span>
        </p>

        <h1 id="hero-title" className="hx__title">
          <span className="hx__bold">{h.headlineBold}</span>
          <span className="hx__serif">{h.headlineSerif}</span>
        </h1>

        <p className="hx__sub">{h.subhead}</p>

        <div className="hx__ctas">
          <Link to={h.cta.to} className="btn-line" onClick={glideTo('contact')}>
            {h.cta.label}
            <ArrowUpRight size={16} weight="bold" aria-hidden />
          </Link>
          <Link to={h.secondary.to} className="btn-ghost" onClick={glideTo('reels')}>
            <Play size={14} weight="fill" aria-hidden />
            {h.secondary.label}
          </Link>
        </div>

        <ul className="hx__stats">
          {h.stats.map((s) => (
            <li key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="hx__stage" aria-hidden>
        {feature ? (
          <figure className="hx__portrait hx__feature fx-host">
            <Fx variant="over" />
            <video src={reelSrc(feature.id)} poster={reelPoster(feature.id)} muted loop playsInline autoPlay preload="metadata" />
            <figcaption>
              <span className="hx__now">
                <i /> Time-travel lesson
              </span>
              <b>{feature.title}</b>
            </figcaption>
          </figure>
        ) : null}

        {stack.map((reel, i) => (
          <div key={reel.id} className="hx__phone fx-host" style={{ '--i': i } as CSSProperties}>
            <Fx variant="over" />
            <video src={reelSrc(reel.id)} poster={reelPoster(reel.id)} muted loop playsInline autoPlay preload="metadata" />
            <span className="hx__rec">
              <i /> {reel.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
