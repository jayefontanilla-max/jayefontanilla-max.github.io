import type { Credential, SocialLink } from './schema'

/**
 * Who the site is about. START HERE: every page, the sidebar, the SEO tags and the legal pages read
 * these values, so changing them here changes them everywhere.
 */
export const site = {
  name: 'Roel Joshua Fontanilla',
  /** What people call you: used in greetings. */
  shortName: 'Josh',
  brand: 'Josh Fontanilla',
  /** The brand name as the sidebar logo shows it: the second part takes the accent color. */
  brandParts: ['Josh', 'Fontanilla'],
  logo: {
    light: '/images/brand/jf-mark.svg',
    dark: '/images/brand/jf-mark-light.svg',
    headerLight: '/images/brand/jf-mark.svg',
    headerDark: '/images/brand/jf-mark-light.svg',
  },
  /** The live address, no trailing slash. Canonical URLs, the sitemap and the JSON-LD use it. */
  url: 'https://josh-fontanilla.vercel.app',
  role: 'Virtual Assistant & AI Content Specialist',
  email: 'jayefontanilla@gmail.com',
  emailSubject: 'Working together',
  replyPromise: 'I reply within one business day.',
  location: 'Santa Rosa, Laguna, Philippines (GMT+8)',
  /** Two-letter country code (ISO 3166) for the Person JSON-LD address. */
  countryCode: 'PH',
  timeZone: 'Asia/Manila',
  timePlace: 'in Laguna, PH',
  avatar: { src: '/images/profile/josh.webp', alt: 'Roel Joshua Fontanilla', width: 640, height: 640 },
  /** The sidebar picture (112px, 44px on the rail). */
  avatarSmall: '/images/profile/josh-224.webp',
} as const

/** Shown in the Person JSON-LD. No formal certificate yet, so it names the working focus instead. */
export const certification: Credential = {
  title: 'Remote-ready since 2019',
  detail: '6+ years in operations, support and content',
}

/** Profile links shown as logo keys. Add yours (LinkedIn, etc.) here: `icon` picks the glyph in components/brand/SocialIcon.tsx. */
export const socials: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jirofontanilla05' },
].map((s) => ({ ...s, icon: 'linkedin' as const }))

/** Off-site links the pages point at. */
export const externalLinks = {
  /** The full library of created images and videos (the "full proposal + all samples" folder from the PDF). */
  library: 'https://drive.google.com/drive/folders/10YtqwCSeNksdw1qqgWs9rjEpJfd7nWUK?usp=drive_link',
  resource: '#',
  showcase: '#',
  company: '#',
} as const

export function mailtoHref(): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(site.emailSubject)}`
}
