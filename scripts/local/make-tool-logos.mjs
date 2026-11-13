// Builds one-colour wordmark SVGs (brand icon from simple-icons where it exists + the tool name)
// into public/images/tools/logos/. Black ink: the marquee inverts them in dark mode.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const tools = {
  'microsoft-excel': ['Microsoft Excel'], 'microsoft-word': ['Microsoft Word'], powerpoint: ['PowerPoint'],
  'google-sheets': ['Google Sheets', 'googlesheets'], 'google-docs': ['Google Docs', 'googledocs'],
  'google-drive': ['Google Drive', 'googledrive'], gmail: ['Gmail', 'gmail'], airtable: ['Airtable', 'airtable'],
  canva: ['Canva'], capcut: ['CapCut'], lightroom: ['Lightroom'], comfyui: ['ComfyUI'], kling: ['Kling'],
  seedance: ['Seedance'], 'nano-banana': ['Nano Banana'], akool: ['Akool'], wavespeed: ['Wavespeed'],
  higgsfield: ['Higgsfield'], 'claude-code': ['Claude Code', 'claude'], codex: ['Codex'],
}
const esc = (s) => s.replace(/&/g, '&amp;')
for (const [file, [name, icon]] of Object.entries(tools)) {
  const iconPath = icon && `node_modules/simple-icons/icons/${icon}.svg`
  const path = iconPath && existsSync(iconPath) ? readFileSync(iconPath, 'utf8').match(/ d="([^"]+)"/)[1] : null
  const textX = path ? 32 : 0
  const width = Math.round(textX + name.length * 11.2 + 4)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 24" width="${width}" height="24">${
    path ? `<path transform="translate(0 0)" d="${path}"/>` : ''
  }<text x="${textX}" y="18.5" font-family="Segoe UI, Helvetica Neue, Arial, sans-serif" font-size="19" font-weight="700" letter-spacing="-0.4">${esc(name)}</text></svg>`
  writeFileSync(`public/images/tools/logos/${file}.svg`, svg)
}
console.log('wrote', Object.keys(tools).length, 'logos')
