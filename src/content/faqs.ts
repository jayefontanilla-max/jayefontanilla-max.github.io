import type { Faq } from './schema'

/** The questions people ask before they write. */
export const faqs = {
  whatYouBuild: {
    question: 'What kind of work do you take on?',
    answer: 'Remote virtual assistance, content operations, social media support, customer communication, and UGC / AI video and image production. Many clients combine a few of these into one role.',
  },
  startSpeed: {
    question: 'How soon can you start, and what hours do you work?',
    answer: 'Usually within a week. I am based in the Philippines (GMT+8) and have worked with Australian and international teams, so I can overlap with your core hours.',
  },
  needStack: {
    question: 'Do I need specific tools?',
    answer: 'No. I work in Google Workspace, Microsoft Office, Airtable, Canva, CapCut and the main AI image and video tools, and I pick up a new system quickly.',
  },
  aiQuality: {
    question: 'Will AI content look fake?',
    answer: 'Not when it is directed properly. I build reference sheets, keep characters and sets consistent, and QA every clip for lighting, hands, lip-sync and edges before delivery.',
  },
  afterWrite: {
    question: 'What happens after I write?',
    answer: 'I reply within one business day with questions about the goal, audience and deadline, then a short plan for how I would handle it.',
  },
} satisfies Record<string, Faq>

export const allFaqs: Faq[] = Object.values(faqs)
