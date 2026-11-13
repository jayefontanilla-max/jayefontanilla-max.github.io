// Replaces client names / local paths hard-coded in the dashboard UI (demo copy only), then fails the
// build if any known private marker is still present.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = process.argv[2]
const edits = [
  ['components/MissionControl.js', 'trial-reel selfies for EMF, due tonight', 'UGC hooks for a skincare ad, due Friday'],
  ['components/Sidebar.js', 'LOCAL · BANGKOK', 'DEMO · SAMPLE DATA'],
  ['components/CommandCenter.js', String.raw`e.g. F:\\WORK\\EMF`, 'e.g. jobs/client-a'],
]
for (const [file, from, to] of edits) {
  const p = join(root, file)
  const src = readFileSync(p, 'utf8')
  if (!src.includes(from)) throw new Error(`mask-ui: "${from}" not found in ${file}`)
  writeFileSync(p, src.split(from).join(to))
}
const markers = [/\bEMF\b/, /BANGKOK/i, /F:\\WORK/, /fonta/i, /OneUP/i, /Tiffany/i]
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]))
for (const f of [...walk(join(root, 'components')), ...walk(join(root, 'app')), ...walk(join(root, 'lib'))]) {
  const txt = readFileSync(f, 'utf8')
  const hit = markers.find((m) => m.test(txt))
  if (hit) throw new Error(`mask-ui: private marker ${hit} still in ${f}`)
}
console.log('mask-ui: clean')
