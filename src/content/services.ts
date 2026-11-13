import type { Service, ToolMark } from './schema'

/** Services carry tool names as small tags; the logo file is unused here. */
const t = (name: string): ToolMark => ({ name, logo: '' })

export const servicesPage = {
  eyebrow: 'Services',
  title: 'How I can support your business.',
  lede: 'Flexible support for operations and growth: pick one, or combine them into one dependable remote role.',
}

/**
 * The Home Services section: a stack of cards dealt onto a pile as the page scrolls.
 */
export const servicesSection = {
  eyebrow: servicesPage.eyebrow,
  titleThin: 'Flexible support',
  titleBold: 'for operations and growth.',
  explore: 'See the work',
  /** The Work chapter each card opens, by service id (a chapter id from home.ts). */
  work: {
    va: 'admin-support',
    ugc: 'ai-video',
    social: 'social-ops',
    ai: 'ai-video',
    support: 'admin-support',
    workflow: 'nxtgen-os',
  } as Record<string, string>,
}

export const services: Service[] = [
  {
    id: 'va',
    title: 'Virtual assistance',
    summary: 'Dependable day-to-day support that keeps your week moving.',
    outcome: 'Time back',
    bullets: ['Scheduling, data entry and file organisation', 'Reporting and documentation', 'Clear status updates without chasing'],
    tools: [t('Google Workspace'), t('Excel'), t('Airtable')],
  },
  {
    id: 'ugc',
    title: 'UGC & SFW content',
    summary: 'Short-form creator content that is ready for the platform it lands on.',
    outcome: 'Scroll-stopping',
    bullets: ['Concepts, hooks and captions', 'Video editing and product-focused visuals', 'Platform-ready delivery in every ratio'],
    tools: [t('CapCut'), t('Seedance'), t('Kling')],
  },
  {
    id: 'social',
    title: 'Social media operations',
    summary: 'Consistent execution across busy accounts, without dropped balls.',
    outcome: 'Always on',
    bullets: ['Content calendars and posting coordination', 'Account monitoring and trend research', 'Performance tracking and EOD reports'],
    tools: [t('Instagram'), t('TikTok'), t('Meta tools')],
  },
  {
    id: 'ai',
    title: 'AI content production',
    summary: 'High-volume image and video generation that still looks consistent and real.',
    outcome: '50+ videos a week',
    bullets: ['Prompt refinement and reference sheets', 'Visual consistency across a whole campaign', 'Quality control before anything ships'],
    tools: [t('Seedance'), t('Nano Banana'), t('ComfyUI')],
  },
  {
    id: 'support',
    title: 'Customer support',
    summary: 'Clear written communication that keeps customers informed and records clean.',
    outcome: 'Calm inboxes',
    bullets: ['Status updates and follow-ups', 'Document requests and organised records', 'Policy and claims experience'],
    tools: [t('Gmail'), t('Google Sheets'), t('Word')],
  },
  {
    id: 'workflow',
    title: 'Workflow improvement',
    summary: 'Systems that turn repetitive work into something repeatable.',
    outcome: 'Less busywork',
    bullets: ['Trackers and SOPs', 'QA loops and review gates', 'Automation with Claude Code and Codex'],
    tools: [t('Claude Code'), t('Codex'), t('Airtable')],
  },
]
