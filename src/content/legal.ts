import { site } from './site'

export type LegalSection = { heading: string; paragraphs: string[] }

export type LegalDoc = {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

/** What this site actually stores and loads. Keep in sync with src/lib/storage.ts and src/lib/analytics.ts. */
export const privacyPolicy: LegalDoc = {
  title: 'Privacy Policy',
  updated: 'November 13, 2026',
  intro: `This policy covers ${site.url.replace('https://', '')}, the portfolio of ${site.name} trading as ${site.brand}.`,
  sections: [
    {
      heading: 'What this site collects',
      paragraphs: [
        'This site collects nothing about visitors. The contact form only opens your own email app with a message filled in; nothing is sent to or stored on this site.',
        'If you email me, I use your message only to reply and discuss working together. Ask me any time and I will delete it.',
      ],
    },
    {
      heading: 'What your browser stores',
      paragraphs: [
        'Your browser keeps two small settings in localStorage: your light or dark theme choice and whether the sidebar is collapsed. Nothing else.',
      ],
    },
    {
      heading: 'Analytics',
      paragraphs: [
        'This site runs no analytics and no tracking cookies.',
      ],
    },
    {
      heading: 'Hosting',
      paragraphs: [
        'The hosting provider may keep standard server logs (IP address, page requested and time) for security and reliability.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        `You can ask what I hold about you, or ask me to delete it, under the Philippine Data Privacy Act of 2012. Contact: ${site.email}.`,
      ],
    },
    {
      heading: 'Changes',
      paragraphs: ['If this policy changes, the date at the top changes with it.'],
    },
  ],
}

export const termsOfService: LegalDoc = {
  title: 'Terms of Service',
  updated: 'November 13, 2026',
  intro: `These terms cover your use of this portfolio site, run by ${site.name} trading as ${site.brand}.`,
  sections: [
    {
      heading: 'Using this site',
      paragraphs: [
        'You may browse and share links to this site. The videos and designs shown are samples of my work; please do not reuse or re-upload them.',
      ],
    },
    {
      heading: 'Working together',
      paragraphs: [
        'Nothing on this site is a binding offer. Client work starts with a conversation and a written agreement on scope, timing and rate.',
      ],
    },
    {
      heading: 'Intellectual property',
      paragraphs: [
        'The site copy and portfolio pieces are shown with permission or as representative samples. Product names and logos belong to their owners. Private client records shown in screenshots are blurred.',
      ],
    },
    {
      heading: 'No warranties',
      paragraphs: [
        'The site is provided as is. I keep it accurate, but cannot promise it will always be available or error-free.',
      ],
    },
    {
      heading: 'External links',
      paragraphs: ['Links to other sites are for convenience; I am not responsible for their content.'],
    },
    {
      heading: 'Governing law',
      paragraphs: ['These terms are governed by the laws of the Republic of the Philippines.'],
    },
    {
      heading: 'Contact',
      paragraphs: [`Questions about these terms: ${site.email}.`],
    },
  ],
}
