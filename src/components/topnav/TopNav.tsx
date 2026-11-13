import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Link, useLocation } from 'react-router'
import { ArrowUpRight, MagnifyingGlass, Moon, Sun } from '@phosphor-icons/react'
import { navTarget, pages } from '@/app/routes'
import { useShell } from '@/app/shell-context'
import { site, socials } from '@/content/site'
import { useLocalTime } from '@/hooks/use-local-time'
import { useSectionInView } from '@/hooks/use-section-in-view'
import { useTheme } from '@/hooks/use-theme'
import { scrollToSection } from '@/lib/motion/smooth-scroll'
import './topnav.css'
import { SocialIcon } from '@/components/brand/SocialIcon'

/** Every registry page that lives as a Home section, in registry order (Reel, Work, Services...). */
const links = pages.filter((p) => p.group && p.section)
const sectionIds = links.map((p) => p.section!)

/**
 * Desktop navigation: a floating "control strip" pinned to the top. Mark + name + live clock on the
 * left, the section links in the middle with a sliding teal pill under the active one, theme, search
 * and a "Let's talk" call on the right. A thin teal-to-gold line under it tracks scroll progress.
 * It tucks up while you scroll down and drops back when you scroll up.
 */
export function TopNav() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const inView = useSectionInView(sectionIds, onHome)
  const activeId = links.find((p) => p.section === inView)?.id ?? null
  const { theme, toggleTheme } = useTheme()
  const { setSearchOpen } = useShell()
  const time = useLocalTime(site.timeZone)

  const barRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const [hidden, setHidden] = useState(false)
  const [hoverId, setHoverId] = useState<string | null>(null)

  // Hide on scroll down, show on scroll up; write progress into a CSS variable.
  useEffect(() => {
    let last = window.scrollY
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        const max = document.documentElement.scrollHeight - window.innerHeight
        barRef.current?.style.setProperty('--progress', String(max > 0 ? y / max : 0))
        if (Math.abs(y - last) > 6) {
          setHidden(y > last && y > 240)
          last = y
        }
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Slide the pill under the hovered link, else the active one.
  const target = hoverId ?? activeId
  useEffect(() => {
    const list = listRef.current
    const pill = pillRef.current
    if (!list || !pill) return
    const el = target ? list.querySelector<HTMLElement>(`[data-id="${target}"]`) : null
    if (!el) {
      pill.style.opacity = '0'
      return
    }
    pill.style.opacity = '1'
    pill.style.width = `${el.offsetWidth}px`
    pill.style.transform = `translateX(${el.offsetLeft}px)`
  }, [target])

  const glide = (event: MouseEvent, section: string) => {
    if (!onHome || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
    event.preventDefault()
    scrollToSection(section)
  }

  return (
    <header ref={barRef} className="tn" data-hidden={hidden} aria-label="Site">
      <div className="tn__bar">
        <Link to="/" className="tn__brand" onClick={(e) => glide(e, 'top')} aria-label={`${site.brand}, home`}>
          <img src={site.logo.headerDark} alt="" width={34} height={34} />
          <span className="tn__name">
            {site.brandParts[0]}
            <b>{site.brandParts[1]}</b>
          </span>
          <span className="tn__clock">
            <i aria-hidden />
            <time dateTime={time.iso}>{time.label}</time> PH
          </span>
        </Link>

        <nav aria-label="Main">
          <ul ref={listRef} className="tn__links" onPointerLeave={() => setHoverId(null)}>
            <span ref={pillRef} className="tn__pill" aria-hidden />
            {links.map((p) => (
              <li key={p.id}>
                <Link
                  to={navTarget(p)}
                  data-id={p.id}
                  aria-current={p.id === activeId ? 'true' : undefined}
                  onClick={(e) => glide(e, p.section!)}
                  onPointerEnter={() => setHoverId(p.id)}
                  onFocus={() => setHoverId(p.id)}
                  onBlur={() => setHoverId(null)}
                >
                  {p.label}
                  {p.badge ? <sup>{p.badge}</sup> : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="tn__actions">
          {socials.map((s) => (
            <a key={s.icon} className="tn__icon tn__social" data-icon={s.icon} href={s.href} target="_blank" rel="noreferrer" aria-label={`${s.label} (opens in a new tab)`} title={s.label}>
              <SocialIcon icon={s.icon} size={17} />
            </a>
          ))}
          <button type="button" className="tn__icon" onClick={() => setSearchOpen(true)} aria-label="Search (Ctrl K)" title="Search · Ctrl K">
            <MagnifyingGlass size={17} weight="bold" />
          </button>
          <button type="button" className="tn__icon" onClick={() => void toggleTheme()} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark' ? <Sun size={17} weight="bold" /> : <Moon size={17} weight="bold" />}
          </button>
          <Link to="/#contact" className="tn__cta" onClick={(e) => glide(e, 'contact')}>
            Let’s talk
            <ArrowUpRight size={14} weight="bold" aria-hidden />
          </Link>
        </div>
        <span className="tn__progress" aria-hidden />
      </div>
    </header>
  )
}
