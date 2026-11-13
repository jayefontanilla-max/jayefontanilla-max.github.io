import type { Image, ToolMark, WorkChapter, WorkItem } from './schema'
import { reelPoster, reels } from './reels'

/**
 * Home page copy. The hero is a two-column "studio" layout: words on the left, a fanned stack of
 * playing reels on the right (features/home/hero).
 */
export const homeHero = {
  hello: 'Hello, I’m Josh',
  headlineBold: 'Reliable operations.',
  headlineSerif: 'Creative output that ships.',
  subhead:
    'I’m a virtual assistant and AI content specialist. I keep busy teams organised and produce high-volume, platform-ready video and visuals with modern AI tools.',
  cta: { label: 'Work with me', to: '/#contact' },
  secondary: { label: 'Watch the reel', to: '/#reels' },
  stats: [
    { value: '6+', label: 'Years experience' },
    { value: '50+', label: 'AI videos weekly' },
    { value: '15+', label: 'Assets delivered daily' },
  ],
  /** The big card in the hero: a time-travel lesson, playing muted. */
  feature: 'lesson-napoleon',
  /** Reel ids shown in the phones around it: UGC ads, so the hero mixes lessons with ads. */
  stack: ['monk-lymphatic', 'selfie-kitchen', 'podcast-woman'],
  badges: ['Based in the Philippines', 'Available for remote work'],
}

/**
 * The statement under the hero: words light up as the page scrolls, each keyword lands in serif
 * italic and moves the tracker. Keep four keywords (the tracker shows them in order).
 */
export type ManifestoPart = string | { key: string }

export const homeManifesto = {
  eyebrow: 'My working principle',
  parts: [
    'I make the work easy to',
    { key: 'understand,' },
    'easy to',
    { key: 'review,' },
    'and easy for the next person to',
    { key: 'continue.' },
    'Organised, creative and',
    { key: 'systems-minded.' },
  ] satisfies ManifestoPart[],
}

export const homeSections = {
  work: {
    eyebrow: 'Portfolio',
    title: 'A dependable partner behind the scenes.',
  },
  proof: {
    eyebrow: 'Proof',
    title: 'What I run for clients today.',
  },
  objections: {
    eyebrow: 'Before you write',
    title: 'The questions people ask first.',
  },
}

export const ctaBand = {
  title: 'Need a reliable VA who can also create?',
  body: 'I can support your operations, organise your workflows, communicate clearly, and produce modern content that keeps your brand consistent and visible.',
  button: 'Email me',
}

/* ---------- Work section ---------- */

const pic = (file: string, alt: string, width: number, height: number): Image => ({ src: `/images/work/${file}`, alt, width, height })
const mark = (name: string, file: string): ToolMark => ({ name, logo: `/images/tools/own/${file}.svg` })

/** The URL of a chapter's sheet. Real, shareable and in the sitemap. */
export const chapterPath = (id: string) => `/work/${id}`

/** The clickable NxtGen OS demo: the real interface on sample data (scripts/local/nxtgen-demo). */
export const nxtgenDemo = '/demos/nxtgen-os/index.html'

const reelItems: WorkItem[] = reels.map((reel) => ({
  id: reel.id,
  name: reel.title,
  kicker: reel.tools.join(' · '),
  summary: reel.note,
  image: { src: reelPoster(reel.id), alt: `${reel.title}, video still`, width: 540, height: 960 },
  href: `/media/reels/${reel.id}.mp4`,
}))

export const workSection = {
  ...homeSections.work,
  titleThin: 'A dependable partner',
  titleBold: 'behind the scenes.',
}

/**
 * The Work chapters, in bento order (grid areas in work.css are keyed by chapter id).
 */
export const workChapters: WorkChapter[] = [
  {
    id: 'ai-video',
    title: 'AI video production',
    line: 'Short-form ads and stories, from script to final cut.',
    count: reelItems.length,
    unit: 'videos',
    description: 'UGC ads, story animation, talking heads and history lessons, made with Seedance, Kling and image models, then edited and captioned.',
    tile: pic('reel-collage.webp', 'A spread of AI video stills', 1600, 1000),
    items: reelItems,
  },
  {
    id: 'design',
    title: 'Graphic design',
    line: 'Canva-led design with AI-assisted elements.',
    count: 2,
    unit: 'samples',
    description: 'Product creatives for tech brands: layout, typography and brand consistency, with fast revisions. Canva designs with AI-assisted elements.',
    tile: pic('gigabyte-monitor.webp', 'Gaming monitor product creative', 1000, 786),
    items: [
      { id: 'monitor', name: 'Gaming monitor launch', kicker: 'Product creative', summary: '"Versatility doubled up": a curved-monitor hero with neon set and spec badges.', image: pic('gigabyte-monitor.webp', 'Gaming monitor product creative', 1000, 786) },
      { id: 'gpu', name: 'Graphics card social post', kicker: 'Product creative', summary: '"Slim design, mighty action": bold type lock-up over a dark product shot.', image: pic('msi-gpu.webp', 'Graphics card social post', 800, 800) },
    ],
  },
  {
    id: 'nxtgen-os',
    title: 'NxtGen OS',
    line: 'A custom agentic workspace, built with Claude Code and Codex. Try the live demo.',
    count: 1,
    unit: 'system',
    description: 'From repetitive tasks to one hub: mission control, agent status, job tracking, gallery and research, notes and shared memory for AI content operations.',
    lead: pic('nxtgen-os.webp', 'NxtGen OS dashboard: mission control, activity feed and agent status', 1500, 609),
    link: { label: 'Open the live demo', href: nxtgenDemo, external: true },
    items: [],
    gallery: [],
  },
  {
    id: 'content-ops',
    title: 'Content operations',
    line: 'Organised production, from request to QA.',
    count: 2,
    unit: 'boards',
    description: 'Production and QA tracking, editor assignment and content status across accounts. Screenshots are blurred to protect client records and links.',
    items: [
      { id: 'qa-tracker', name: 'Production and QA tracking', kicker: 'Tracker', summary: 'Every asset logged from brief to approval, with status, owner and revision notes.', image: pic('ops-qa-tracker.webp', 'Blurred production and QA tracker', 1400, 478) },
      { id: 'editor-board', name: 'Editor assignment and status', kicker: 'Tracker', summary: 'Who is editing what, which version is live, and what is blocked.', image: pic('ops-editor-board.webp', 'Blurred editor assignment board', 1400, 444) },
    ],
  },
  {
    id: 'admin-support',
    title: 'Admin and support',
    line: 'Accuracy and clear communication.',
    count: 2,
    unit: 'samples',
    description: 'Data entry, records and customer correspondence. The data screenshot is blurred to protect names, addresses, policy information and account details.',
    items: [
      { id: 'records', name: 'Records and reporting', kicker: 'Data', summary: 'Renewal and policy records kept accurate and reconciled, ready for reporting.', image: pic('admin-data.webp', 'Blurred records spreadsheet', 1400, 966) },
      { id: 'client-update', name: 'Client update email', kicker: 'Support', summary: 'A representative reply: request reviewed, records updated, one document still needed, with a clear next step.' },
    ],
  },
  {
    id: 'social-ops',
    title: 'Social media ops',
    line: 'Consistent execution across busy accounts.',
    count: 6,
    unit: 'areas',
    description: 'Content planning, account support, growth research, reporting and collaboration across Instagram, TikTok, X, Reddit, Telegram and Airtable.',
    marks: [mark('Instagram', 'instagram'), mark('TikTok', 'tiktok'), mark('Airtable', 'airtable')],
    items: [
      { id: 'planning', name: 'Content planning', kicker: 'Planning', summary: 'Daily and weekly schedules, content calendars, asset coordination and revision tracking.' },
      { id: 'accounts', name: 'Account support', kicker: 'Accounts', summary: 'Monitoring, posting, profile organisation, secure multi-account workflows and issue reporting.' },
      { id: 'research', name: 'Growth research', kicker: 'Research', summary: 'Trend monitoring, competitor review, hook analysis, niche research and content ideation.' },
      { id: 'reporting', name: 'Reporting', kicker: 'Reporting', summary: 'Performance checks, concise EOD updates, metric comparisons and actionable observations.' },
      { id: 'collab', name: 'Collaboration', kicker: 'Team', summary: 'Working with account managers, creative directors, schedulers, QA teams and management.' },
      { id: 'platforms', name: 'Platforms', kicker: 'Stack', summary: 'Instagram, TikTok, X, Reddit, Telegram, Airtable, Meta tools, CapCut and remote work systems.' },
    ],
  },
]

export const workCount = workChapters.reduce((n, c) => n + c.count, 0)

export const findChapter = (id: string | undefined) => workChapters.find((chapter) => chapter.id === id)
