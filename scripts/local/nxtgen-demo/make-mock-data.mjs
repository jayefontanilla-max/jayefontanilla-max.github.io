// Builds the NxtGen OS demo's sample data (lib/demo-data.js in the demo build).
// Everything personal is invented here. From the captured local API only PUBLIC catalogs are reused
// (skill library, model cookbook, provider catalog, trend niches), with every file path removed.
// Usage: node make-mock-data.mjs <captured-api-dir> <out-file>
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const [capDir, outFile] = process.argv.slice(2)
const cap = (name) => JSON.parse(readFileSync(join(capDir, `${name}.json`), 'utf8'))
const now = Date.now()
const H = 3600e3
const D = 24 * H

/* ---------- Agents (invented, neutral roles) ---------- */
const A = (n, name, role, provider, model, color, skillRole = null, folder = 'f-studio') => ({
  folder, connectors: provider === 'claude' ? ['conn-gen'] : [], skills: [], model, description: role, prompt: '',
  id: `agent-${n}`, number: n, name, role, provider, skillRole, systemPromptFile: '', extraContext: [], live: false, color, effort: 'medium',
})
const agents = [
  A(1, 'Dispatcher', 'Intake / Coordinator', 'codex', 'gpt-5.5', '#e0894a'),
  A(2, 'Script Writer', 'Hooks, scripts and beat sheets', 'claude', 'claude-opus-4-8', '#a78bfa'),
  A(3, 'Reference Sheets', 'Character, set and prop sheets', 'claude', 'claude-opus-4-8', '#5b8def', 'image-gen'),
  A(4, 'Image Generator', 'Start frames and stills', 'codex', 'gpt-5.5', '#2dd4bf', 'image-gen'),
  A(5, 'Video Generator', 'Seedance / Kling clips', 'claude', 'claude-opus-4-8', '#f472b6', 'video-gen'),
  A(6, 'Voice & Audio', 'Voice samples, room tone, SFX', 'codex', 'gpt-5.5', '#f2c14e'),
  A(7, 'Editor', 'Cut, grade, captions, end card', 'claude', 'claude-sonnet-4-6', '#34d399', 'editor', 'f-post'),
  A(8, 'Trend Researcher', 'Hooks and formats that are working', 'codex', 'gpt-5.5', '#60a5fa', null, 'f-research'),
  A(9, 'QA Critic', 'Frame-by-frame checks against the brief', 'claude', 'claude-opus-4-8', '#ef4444', 'qa', 'f-post'),
  A(10, 'Publisher', 'Exports, naming, delivery log', 'codex', 'gpt-5.5', '#94a3b8', null, 'f-post'),
]
const folders = [
  { id: 'f-studio', name: 'Production' },
  { id: 'f-post', name: 'Post & QA' },
  { id: 'f-research', name: 'Research' },
]
const config = {
  workspace: 'NxtGen OS (demo)', port: 3737, folders, agents,
  pipeline: { dispatcher: 'agent-1', generator: 'agent-5', qa: 'agent-9', editor: 'agent-7', maxRetries: 3 },
}

/* ---------- Jobs, ledger, runs, stats (invented) ---------- */
const jobDefs = [
  ['2026-11-12-skincare-ugc-3hooks', 'UGC ad · skincare serum, 3 hooks, 9:16', 'DELIVERED', 'Brand A / UGC'],
  ['2026-11-11-history-lesson-rome', 'Time-travel lesson · ancient Rome, 17 clips', 'DELIVERED', 'Studio / Lessons'],
  ['2026-11-10-podcast-clip-confidence', 'Podcast clip · confidence tips, tweet-card hook', 'IN QA', 'Brand B / Podcast'],
  ['2026-11-09-product-stills-headphones', 'Product stills · 12 lifestyle frames', 'DELIVERED', 'Brand C / Stills'],
  ['2026-11-08-cartoon-explainer-sleep', '3D cartoon explainer · sleep habits', 'REVISION', 'Studio / Animation'],
  ['2026-11-07-trend-report-week45', 'Trend report · AI reels, week 45', 'DELIVERED', 'Research'],
]
const jobs = {
  jobs: jobDefs.map(([id], i) => ({
    id,
    files: [
      { type: 'file', name: 'brief.md', rel: 'brief.md', size: 2400 + i * 311 },
      { type: 'file', name: 'log.md', rel: 'log.md', size: 6100 + i * 977 },
      { type: 'dir', name: 'refs', rel: 'refs' },
      { type: 'dir', name: 'output', rel: 'output' },
      ...Array.from({ length: 3 }, (_, k) => ({ type: 'file', name: `take_${String(k + 1).padStart(2, '0')}.mp4`, rel: `output/take_${String(k + 1).padStart(2, '0')}.mp4`, size: 4_200_000 + k * 380_000 })),
      { type: 'file', name: 'qa.md', rel: 'qa.md', size: 1800 + i * 120 },
    ],
  })),
}
const ledger = jobDefs.map(([id, deliverable, status, lane], i) => ({
  id, created: id.slice(0, 10), lane, deliverable, deadline: '—', status, retries: String(i % 3 === 1 ? 1 : 0),
  outcome: status === 'DELIVERED'
    ? 'All takes passed frame QA (identity, hands, lip-sync, edges). Exported 9:16 + 1:1, named and logged.'
    : status === 'IN QA' ? 'Waiting on QA Critic: 2 of 3 takes passed, 1 flagged for a hand fix.' : 'Client asked for a slower hook. Re-roll of clip 2 queued with the fix in the prompt.',
}))
const prompts = [
  'Write 3 hook variants for the serum UGC ad, 9:16, under 3 seconds each.',
  'Build the character sheet for the narrator: front, 3/4, side, back, face close-up.',
  'Pre-flight clip 04: check gaze, camera distance and the reference attach order.',
  'Generate clip 04 at 480p with the locked recipe, 8 seconds.',
  'QA the three takes against the brief and the reference sheets.',
  'Cut the final edit: hard cuts, captions, room tone, logo end card.',
  'Pull this week\'s top AI reels in the fitness niche and summarise the hooks.',
  'Export 9:16 and 1:1, name files by hook, update the delivery log.',
]
const runs = Array.from({ length: 40 }, (_, i) => {
  const a = agents[(i * 3) % agents.length]
  return { ts: now - i * 2.7 * H, agentId: a.id, provider: a.provider, model: a.model, kind: i % 5 === 0 ? 'mission' : 'chat', ok: i % 11 !== 4, code: i % 11 === 4 ? 1 : 0, ms: 40_000 + ((i * 7919) % 520_000), preview: prompts[i % prompts.length] }
})
const byAgent = {}
for (const r of runs) {
  const s = (byAgent[r.agentId] ||= { runs: 0, ok: 0, ms: 0 })
  s.runs += 6; s.ok += r.ok ? 6 : 5; s.ms += r.ms * 6
}
const stats = { total: Object.values(byAgent).reduce((n, s) => n + s.runs, 0), byAgent }

/* ---------- Chats, notes, gallery, memory (invented) ---------- */
const chats = [
  { id: 'demo-chat-1', title: 'Hook ideas for a skincare ad', updatedAt: now - 2 * H },
  { id: 'demo-chat-2', title: 'Why does Seedance start lines late?', updatedAt: now - 9 * H },
  { id: 'demo-chat-3', title: 'Caption style for a 40+ audience', updatedAt: now - 30 * H },
]
const chatBodies = {
  'demo-chat-1': [
    { role: 'user', text: 'Give me 3 hooks for a skincare serum UGC ad aimed at women 30+.' },
    { role: 'assistant', text: '1. "I stopped buying three serums the day I tried this one."\n2. "My dermatologist asked what I changed. This."\n3. "POV: your skin finally looks rested before coffee."' },
  ],
  'demo-chat-2': [
    { role: 'user', text: 'Lines start about 2 seconds late after a long silent action. Fix?' },
    { role: 'assistant', text: 'Shorten the silent lead-in to under 1.5 s and tell the model to start speaking the moment the eyes reach the lens. Then whisper-time every take before approving it.' },
  ],
  'demo-chat-3': [
    { role: 'user', text: 'What caption style works for a 40+ audience?' },
    { role: 'assistant', text: 'Larger type (about 7% of frame height), two short lines max, high contrast with a soft shadow, and no word-by-word bounce. Keep key numbers on screen for a full second.' },
  ],
}
const note = (id, title, content, extra = {}) => ({ id, title, content, items: null, noteType: 'note', color: 'default', label: '', pinned: false, archived: false, dueDate: null, repeat: 'none', imageUrl: null, source: 'user', agentId: null, sortOrder: 0, createdAt: now - 4 * D, updatedAt: now - 5 * H, ...extra })
const notes = [
  note('note-1', 'Pre-flight checklist', '', { noteType: 'list', pinned: true, color: 'teal', items: [
    { text: 'Script locked word for word', done: true }, { text: 'Refs attached in order (@image1, @image2)', done: true },
    { text: 'Handheld camera, eye level, 40-60 cm', done: true }, { text: 'Gaze into the lens when speaking', done: false }, { text: 'Credits checked against budget', done: false }] }),
  note('note-2', 'Caption spec', 'Bold sans, 7% of frame height, white with a soft shadow, max 2 lines, 12% safe zone from the bottom.', { color: 'yellow', label: 'Style' }),
  note('note-3', 'Hook bank', '"I tried this so you do not have to" · "Nobody tells you this about…" · POV openers · question-first hooks', { label: 'Ideas' }),
  note('note-4', 'Send weekly report', 'Delivered, in QA, revisions, and next week’s plan.', { noteType: 'reminder', dueDate: new Date(now + 2 * D).toISOString().slice(0, 10), color: 'blue', source: 'agent', agentId: 'agent-10' }),
]
const posters = ['caterpillar', 'monk-lymphatic', 'podcast-woman', 'pig-wolf', 'lesson-napoleon', 'selfie-kitchen', 'foam-head-dyslexia', 'rat-bounty', 'lesson-noah', 'talking-pelvis', 'stage-talk', 'monk-fascia']
const gallery = {
  images: posters.map((p, i) => ({ id: `demo-img-${i}`, name: `${p}.webp`, url: `/media/reels/${p}.webp`, source: 'workspace', size: 60_000 + i * 4_000, mtime: now - i * 6 * H, album: i % 3 === 0 ? 'album-ugc' : null })),
  albums: [{ id: 'album-ugc', name: 'Approved frames' }],
}
const memFiles = ['pipeline_overview.md', 'caption_spec.md', 'feedback_eyes_on_lens.md', 'feedback_natural_vo_pace.md', 'generation_gates.md', 'hook_bank.md', 'qa_checklist.md']
const memory = {
  dir: 'memory/', files: memFiles,
  index: memFiles.map((f) => `- [${f.replace('.md', '').replace(/_/g, ' ')}](${f})`).join('\n'),
}
const memFileBody = {
  'generation_gates.md': '# Generation gates\n\nEvery past failure becomes a gate checked before a clip is generated:\n1. Narrator looks into the lens when speaking.\n2. No floating props; every hand counted.\n3. One stable background per clip.\n4. Lines start within 0.5 s of the lead-in ending.\n5. Natural pace: about 2.8 words per second.',
}
const tags = ['Preference', 'Gate', 'Style', 'Client', 'Tooling']
const facts = [
  'Prefers 9:16 vertical for all social content', 'Narrator always looks into the lens when speaking', 'Captions: max two lines, 7% of frame height',
  'Natural VO pace: ~2.8 words per second', 'Never re-roll blind: write the fix into the prompt', 'Batch clips in parallel once the recipe is agreed',
  'Start frames show the app already open on the phone', 'Logo end card is always the black mark on light', 'Hooks must land in the first 0.5 seconds',
  'Keep a stable background per clip', 'QA frames side by side with the reference', 'Budget: draft at 480p, final at 720p',
]
const nodes = facts.map((text, i) => ({ id: `mem-${i}`, text, tag: tags[i % tags.length], ts: now - i * D, x: 420 + Math.cos(i * 0.52) * (220 + (i % 3) * 70), y: 300 + Math.sin(i * 0.52) * (170 + (i % 3) * 50) }))
const edges = nodes.slice(1).map((n, i) => ({ id: `e-${i}`, from: nodes[i % 4].id, to: n.id, source: nodes[i % 4].id, target: n.id }))

/* ---------- Providers & public catalogs (no keys, no paths) ---------- */
const realProviders = cap('providers')
const providers = realProviders.filter((p) => p.builtin).map(({ apiKey, ...p }) => p) // eslint-disable-line no-unused-vars
providers.push({ id: 'prov-demo-or', name: 'OpenRouter', kind: 'api', baseUrl: 'https://openrouter.ai/api/v1', models: [{ value: 'openrouter/auto', label: 'Auto' }], hasKey: true })
const isLocal = (v) => typeof v === 'string' && (/^[A-Za-z]:[\\/]/.test(v) || v.includes('\\'))
const stripPaths = (list) =>
  list.map(({ path, installedPath, ...rest }) => { // eslint-disable-line no-unused-vars
    for (const k of Object.keys(rest)) if (isLocal(rest[k])) rest[k] = `local/${rest.name || 'skill'}`
    return rest
  })
const skills = stripPaths(cap('skills')).filter((s) => !/pinterest|godmode/i.test(s.name))
const cookbook = { ...cap('cookbook'), hardware: { ramGB: 32, cpu: 'Demo workstation', cores: 16, platform: 'win32', gpu: { name: 'Demo GPU', vramGB: 8 } } }

const data = {
  '/api/config': config,
  '/api/agents': agents,
  '/api/status': { claude: { installed: true, path: 'claude', loggedIn: true, version: 'demo' }, codex: { installed: true, path: 'codex', loggedIn: true, version: 'demo' } },
  '/api/providers': providers,
  '/api/provider-catalog': cap('provider-catalog'),
  '/api/models': cap('models'),
  '/api/chats': chats,
  '/api/connectors': [{ id: 'conn-gen', name: 'Media generation (MCP)', type: 'mcp-http', url: 'https://example.com/mcp', command: '', args: [], env: {}, headers: {} }],
  '/api/skills': skills,
  '/api/skills/library': stripPaths(cap('skills_library')).filter((s) => s.category !== 'red-teaming' && !/godmode|jailbreak/i.test(s.name + s.description)),
  '/api/gallery': gallery,
  '/api/gallery/drafts': [],
  '/api/notes': notes,
  '/api/memory': memory,
  '/api/memory/graph': { nodes, edges },
  '/api/jobs': jobs,
  '/api/runs': runs,
  '/api/ledger': ledger,
  '/api/stats': stats,
  '/api/usage': { since: new Date(now - D).toISOString(), byProvider: { claude: { runs: 42, ms: 9_800_000 }, codex: { runs: 57, ms: 7_300_000 } } },
  '/api/plan-usage': { claude: { fiveHour: { pct: 34, resetsInSeconds: 9000 }, weekly: { pct: 21, resetsInSeconds: 400000 }, live: true }, codex: { fiveHour: { pct: 18, resetsInSeconds: 12000 }, weekly: { pct: 12, resetsInSeconds: 500000 }, planType: 'plus', live: true } },
  '/api/folders': folders,
  '/api/reels/niches': cap('reels_niches'),
  '/api/reels/cached': { ok: true, items: [] },
  '/api/reels/settings': { ytdlpPath: 'yt-dlp', cookiesFile: '', perSeed: 6 },
  '/api/reels/status': { ytdlp: true, version: 'demo', error: null, cookiesFile: '', cookiesFileOk: false },
  '/api/cookbook': cookbook,
  '/api/cookbook/catalog': cap('cookbook_catalog'),
  '/api/cookbook/servers': [],
  '/api/cookbook/settings': { hfToken: '', hasToken: false },
  '/api/imaging': { python: 'python', rembg: true, hasPython: true },
  '/api/editor/project': { name: 'Demo cut', width: 1080, height: 1920, fps: 30, clips: [] },
  '/api/editor/media': [],
  '/api/cli/paths': { claude: 'claude', codex: 'codex' },
  '/api/health': { ok: true, boot: new Date(now).toISOString(), rev: 'demo' },
  '/api/oauth/codex/status': { loggedIn: true },
}

const out = `// GENERATED by make-mock-data.mjs: invented sample data for the public NxtGen OS demo.\n` +
  `export const DEMO_DATA = ${JSON.stringify(data)};\n` +
  `export const DEMO_CHATS = ${JSON.stringify(chatBodies)};\n` +
  `export const DEMO_MEMORY_FILES = ${JSON.stringify(memFileBody)};\n` +
  `export const DEMO_JOBS = ${JSON.stringify(jobDefs)};\n`
writeFileSync(outFile, out)
console.log('wrote', outFile, (out.length / 1024).toFixed(0) + ' KB')
