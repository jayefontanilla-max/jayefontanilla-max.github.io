import { CheckCircle, MapPin } from '@phosphor-icons/react'
import { aboutSection, experience, toolkit } from '@/content/about'
import { socials } from '@/content/site'
import { LogoMarquee } from '@/components/ui/logo-marquee'
import { personJsonLd } from '@/lib/seo'
import './about.css'
import { Fx } from '@/components/fx/Fx'

const personLd = personJsonLd({
  description: aboutSection.lede,
  skills: [...experience.map((r) => r.title), ...toolkit.flatMap((g) => g.logos.map((l) => l.alt))],
  sameAs: socials.filter((s) => !s.partner).map((s) => s.href),
})

/**
 * About: portrait card beside the story and highlights, then the experience timeline (a line with a
 * dot per role) beside the toolkit panel.
 */
export function AboutSection() {
  const s = aboutSection
  return (
    <section id="about" className="ab2 wk" aria-labelledby="ab-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personLd }} />

      <div className="ab2__intro">
        <figure className="ab2__pic fx-host fx-tilt">
          <Fx variant="over" />
          <img src={s.picture.src} alt={s.picture.alt} width={s.picture.width} height={s.picture.height} loading="lazy" decoding="async" />
        </figure>
        <div className="ab2__story">
          <p className="wk-eyebrow">{s.eyebrow}</p>
          <h2 id="ab-title" className="wk-title">
            <span className="wk-title__thin">{s.titleThin}</span> <span className="wk-title__bold">{s.titleBold}</span>
          </h2>
          <p className="ab2__lede">{s.lede}</p>
          <p className="ab2__lead">{s.lead}</p>
          <ul className="ab2__hl">
            {s.highlights.map((h) => (
              <li key={h}>
                <CheckCircle size={18} weight="fill" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
          <p className="ab2__badges">
            {s.badges.map((b, i) => (
              <span key={b} data-kind={i === 0 ? 'place' : 'open'}>
                {i === 0 ? <MapPin size={14} weight="fill" aria-hidden /> : <i aria-hidden />}
                {b}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="ab2__lower">
        <div>
          <h3 className="ab2__h3">Experience</h3>
          <ol className="ab2__tl">
            {experience.map((r) => (
              <li key={r.title + r.years} className="fx-host">
                <Fx variant="soft" />
                <span className="ab2__years">{r.years}</span>
                <div>
                  <b>{r.title}</b>
                  <small>{r.org}</small>
                  <p>{r.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

      </div>

      <div className="ab2__kit" aria-labelledby="kit-title">
        <h3 id="kit-title" className="ab2__h3">
          Toolkit
        </h3>
        {toolkit.map((g, i) => (
          <div key={g.group} className="ab2__kit-row">
            <p className="ab2__kit-label">{g.group}</p>
            <LogoMarquee logos={g.logos} reverse={i % 2 === 0} className="ab2__kit-marquee" />
          </div>
        ))}
      </div>
    </section>
  )
}
