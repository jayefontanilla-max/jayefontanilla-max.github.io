# Josh Fontanilla — Portfolio

The portfolio of **Roel Joshua Fontanilla**, virtual assistant and AI content specialist based in Santa Rosa, Laguna, Philippines.

One long Home page: a "studio desk" hero with live reels, a filterable **reel wall** of 17 finished AI videos with a full-screen player, a working-principle statement, a bento of work (AI video, graphic design, NxtGen OS, content operations, admin and social media), services, a brief-to-delivery process diagram, About with experience timeline and toolkit, and contact.

Stack: Vite, React 19, TypeScript, React Router, Tailwind CSS v4 + CSS custom properties, GSAP, Lenis, Phosphor icons. Type: Bricolage Grotesque, Instrument Serif and JetBrains Mono (self-hosted, SIL OFL).

## Run it

Needs Node 20.19+ (or 22.12+).

```bash
npm install
npm run dev        # http://localhost:5190
npm run build      # typecheck + production build to dist/
npm run preview    # serve the build on http://localhost:5191
```

## Where things live

| What | Where |
|---|---|
| Name, role, email, location, photo | `src/content/site.ts` |
| Hero, statement, Work chapters | `src/content/home.ts` |
| Reel wall (videos, titles, categories) | `src/content/reels.ts` + `public/media/reels/` |
| Services, process, About, FAQs, legal | `src/content/services.ts`, `automation.ts`, `about.ts`, `faqs.ts`, `legal.ts` |
| Colours, radius, motion | `src/styles/tokens.css` (dark "midnight studio" + light "paper") |
| Brand layer (titles, pills, aurora background) | `src/styles/brand.css` |
| Section order on Home | `src/features/home/sections.ts` |

### Adding a video

Add a line to `scripts/local/encode-reels.sh` (an id and the source path), run it to make a 540x960 MP4 and a `.webp` poster in `public/media/reels/`, then add the entry to `src/content/reels.ts`.

## Deploy

Static single-page app: `npm run build` and serve `dist/` with unknown paths falling back to `index.html` (Netlify, Vercel, Cloudflare Pages and GitHub Pages with a 404 fallback all work). Set your domain in `site.url` (`src/content/site.ts`) and the `og:` tags in `index.html`.

## Credits and license

Built on [Portfolio Template V2](https://github.com/brewed-ops/portfoliov2-template) by BrewedOps, used under the [PolyForm Noncommercial 1.0.0](LICENSE) license with its additional permission for a personal portfolio. Icons: [Phosphor](https://phosphoricons.com) (MIT). Fonts: Bricolage Grotesque, Instrument Serif, JetBrains Mono (SIL Open Font License 1.1, texts in `public/fonts/`).
