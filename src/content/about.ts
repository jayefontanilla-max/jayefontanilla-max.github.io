import { site } from './site'

/**
 * The Home About section: portrait + story, the experience timeline and the toolkit.
 */
export const aboutSection = {
  eyebrow: 'About',
  titleThin: 'Hello,',
  titleBold: `I’m ${site.shortName}.`,
  lede: 'A virtual assistant and AI content specialist who keeps work moving, from content production and social media operations to reporting, customer communication, quality control and process organisation.',
  lead: 'My background combines remote team support, insurance operations, marketing, AI-assisted production and workflow development.',
  highlights: [
    'Comfortable managing high-volume, detail-sensitive workflows.',
    'Experienced in remote collaboration across Australian and international teams.',
    'Able to turn unclear or repetitive work into organised systems and repeatable processes.',
    'Reliable, receptive to feedback, and proactive about learning new tools.',
  ],
  badges: ['Based in the Philippines', 'Available for remote work'],
  picture: { src: site.avatar.src, alt: `Portrait of ${site.name}`, width: site.avatar.width, height: site.avatar.height },
}

export type Role = { years: string; title: string; org: string; body: string }

export const experience: Role[] = [
  { years: '2026', title: 'AI Content Manager', org: 'OneUP Media', body: 'High-volume AI image and video production, trends, prompt refinement and creative iteration.' },
  { years: '2025 – 2026', title: 'Senior Content Manager', org: 'Seraphina Management', body: 'Workflow scheduling, quality improvement, team coordination, forecasting and production support.' },
  { years: '2023 – 2024', title: 'Marketing Manager', org: 'Influencer Marketing & Management', body: 'Social media scheduling, account monitoring, performance review and strategy testing.' },
  { years: '2023 – 2024', title: 'Claims Examiner', org: 'Chubb', body: 'Claims intake, policy verification, customer updates, correspondence and end-to-end case handling.' },
  { years: '2019 – 2023', title: 'Branch & Sales Quality Assistant', org: 'BPI/MS Insurance', body: 'Renewal reporting, customer inquiries, operational reports and data support.' },
]

export type ToolLogo = { src: string; alt: string }

const logo = (file: string, alt: string): ToolLogo => ({ src: `/images/tools/logos/${file}.svg`, alt })

/** Two marquee rows of tool wordmarks (scripts/local/make-tool-logos.mjs builds the SVGs). */
export const toolkit: { group: string; logos: ToolLogo[] }[] = [
  {
    group: 'Admin & productivity',
    logos: [
      logo('microsoft-excel', 'Microsoft Excel'), logo('microsoft-word', 'Microsoft Word'), logo('powerpoint', 'PowerPoint'),
      logo('google-sheets', 'Google Sheets'), logo('google-docs', 'Google Docs'), logo('google-drive', 'Google Drive'),
      logo('gmail', 'Gmail'), logo('airtable', 'Airtable'),
    ],
  },
  {
    group: 'Creative, AI & automation',
    logos: [
      logo('canva', 'Canva'), logo('capcut', 'CapCut'), logo('lightroom', 'Lightroom'), logo('comfyui', 'ComfyUI'),
      logo('kling', 'Kling'), logo('seedance', 'Seedance'), logo('nano-banana', 'Nano Banana'), logo('akool', 'Akool'),
      logo('wavespeed', 'Wavespeed'), logo('higgsfield', 'Higgsfield'), logo('claude-code', 'Claude Code'), logo('codex', 'Codex'),
    ],
  },
]
