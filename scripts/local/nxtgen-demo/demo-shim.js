'use client';
// Demo mode for the public NxtGen OS preview. Imported first by app/page.js in the demo build only.
// It answers every /api/* call and the WebSocket from invented sample data (demo-data.js), so the real
// interface runs as static files with no backend, no agents and nothing private.
import { DEMO_CHATS, DEMO_DATA, DEMO_JOBS, DEMO_MEMORY_FILES } from './demo-data';

if (typeof window !== 'undefined' && !window.__nxtgenDemo) {
  window.__nxtgenDemo = true;
  const clone = (v) => JSON.parse(JSON.stringify(v));
  const db = clone(DEMO_DATA);
  const kanbans = {};
  const agentOf = (id) => db['/api/config'].agents.find((a) => a.id === id);
  const sessionsFor = (agentId) => [{ id: `${agentId}-s1`, title: 'Walkthrough session', agentId, updatedAt: Date.now() - 3600e3 }];
  const kanbanFor = (agentId) => (kanbans[agentId] ||= {
    todo: [{ text: 'Pre-flight next batch of clips', ts: 1 }],
    doing: [{ text: `${DEMO_JOBS[2][0]} · ${agentOf(agentId)?.role || 'work'}`, ts: 2 }],
    done: DEMO_JOBS.slice(0, 2).map(([id], i) => ({ text: `${id} · delivered`, ts: 3 + i })),
  });

  const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

  function handleGet(path, q) {
    if (path === '/api/chats') return q.get('agentId') ? sessionsFor(q.get('agentId')) : db['/api/chats'];
    if (path === '/api/notes') return q.get('archived') === '1' ? [] : db['/api/notes'];
    let m;
    if ((m = path.match(/^\/api\/chats\/([^/]+)$/))) {
      const id = decodeURIComponent(m[1]);
      const meta = db['/api/chats'].find((c) => c.id === id) || { id, title: 'Walkthrough session' };
      const messages = DEMO_CHATS[id] || [
        { role: 'user', text: 'What do you handle in this pipeline?' },
        { role: 'assistant', text: 'I take the brief from the Dispatcher, do my part, log every step to the job folder, and hand off to the next agent. This is a read-only demo, so runs here are simulated.' },
      ];
      return { ...meta, messages };
    }
    if ((m = path.match(/^\/api\/agent\/([^/]+)$/))) {
      const agent = agentOf(m[1]);
      if (!agent) return null;
      return { agent, skill: null, connectors: db['/api/connectors'].filter((c) => agent.connectors.includes(c.id)), attachedSkills: [], runs: db['/api/runs'].filter((r) => r.agentId === agent.id).slice(0, 25), kanban: kanbanFor(agent.id) };
    }
    if ((m = path.match(/^\/api\/kanban\/([^/]+)$/))) return kanbanFor(m[1]);
    if (path.startsWith('/api/workspace/')) {
      return { files: [
        { type: 'file', name: 'brief.md', rel: 'brief.md', size: 2400 }, { type: 'dir', name: 'refs', rel: 'refs' },
        { type: 'file', name: 'character_sheet.png', rel: 'refs/character_sheet.png', size: 1_800_000 },
        { type: 'dir', name: 'output', rel: 'output' }, { type: 'file', name: 'take_01.mp4', rel: 'output/take_01.mp4', size: 4_200_000 },
        { type: 'file', name: 'log.md', rel: 'log.md', size: 6100 },
      ] };
    }
    if (path === '/api/memory/file') {
      const name = q.get('name');
      return { name, content: DEMO_MEMORY_FILES[name] || `# ${String(name).replace('.md', '').replace(/_/g, ' ')}\n\nShared memory note. Every agent reads these before it starts, so a correction made once is never repeated.` };
    }
    if ((m = path.match(/^\/api\/providers\/([^/]+)\/models$/))) return db['/api/providers'].find((p) => p.id === m[1])?.models || [];
    if (path in db) return db[path];
    return path.endsWith('s') ? [] : {};
  }

  function handleWrite(method, path, body) {
    if (path === '/api/notes' && method === 'POST') {
      const n = { id: `note-${Date.now()}`, title: '', content: '', items: null, noteType: 'note', color: 'default', label: '', pinned: false, archived: false, createdAt: Date.now(), updatedAt: Date.now(), ...body };
      db['/api/notes'].unshift(n);
      return n;
    }
    let m;
    if ((m = path.match(/^\/api\/notes\/([^/]+)$/))) {
      const i = db['/api/notes'].findIndex((n) => n.id === m[1]);
      if (method === 'DELETE') { if (i >= 0) db['/api/notes'].splice(i, 1); return { ok: true }; }
      if (i >= 0) Object.assign(db['/api/notes'][i], body, { updatedAt: Date.now() });
      return db['/api/notes'][i] || { ok: true };
    }
    if ((m = path.match(/^\/api\/kanban\/([^/]+)$/))) { kanbans[m[1]] = body; return body; }
    if (path === '/api/chats' && method === 'POST') return { id: `demo-${Date.now().toString(36)}`, title: 'New session', messages: [], updatedAt: Date.now() };
    return { ok: true, demo: true };
  }

  const realFetch = window.fetch.bind(window);
  window.fetch = async (input, init = {}) => {
    const url = new URL(typeof input === 'string' ? input : input.url, location.href);
    if (!url.pathname.startsWith('/api/')) return realFetch(input, init);
    const method = (init.method || 'GET').toUpperCase();
    await new Promise((r) => setTimeout(r, 120));
    if (method === 'GET') {
      const out = handleGet(url.pathname, url.searchParams);
      return out == null ? json({ error: 'not found' }, 404) : json(clone(out));
    }
    let body = {};
    try { body = init.body && typeof init.body === 'string' ? JSON.parse(init.body) : {}; } catch { body = {}; }
    return json(handleWrite(method, url.pathname, body));
  };

  /* ---------- Simulated WebSocket: runs and missions play back with sample steps ---------- */
  const REPLY = 'This is the public demo of NxtGen OS, so I can’t run real tools here. In the live system I would take this request, write a brief to the job folder, call the generation tools through the connector, QA the result against the references, and hand it to the Editor. Every step shows up in this work log as it happens.';
  const STEPS = [
    { kind: 'plan', label: 'Reading the brief and shared memory' },
    { kind: 'tool', label: 'Media generation' },
    { kind: 'file', label: 'jobs/demo/log.md' },
    { kind: 'think', label: 'Checking against the QA gates' },
  ];
  class DemoSocket {
    constructor() {
      this.readyState = 0;
      setTimeout(() => {
        this.readyState = 1;
        this.onopen?.({});
        this.emit({ type: 'status', providers: db['/api/status'] });
      }, 250);
    }
    emit(m) { this.onmessage?.({ data: JSON.stringify(m) }); }
    later(ms, m) { setTimeout(() => this.emit(m), ms); }
    send(raw) {
      let msg = {};
      try { msg = JSON.parse(raw); } catch { return; }
      const runId = `demo-${Date.now()}`;
      if (msg.type === 'chat' || msg.type === 'rawchat' || msg.type === 'command') {
        const agentId = msg.type === 'rawchat' ? `chat:${msg.chatId}` : msg.type === 'command' ? 'command' : msg.agentId;
        const base = { runId, agentId, chatId: msg.type === 'chat' ? msg.chatId : undefined };
        this.later(200, { type: 'run_start', ...base });
        STEPS.forEach((step, i) => this.later(600 + i * 650, { type: 'agent_event', ...base, ev: { step } }));
        const words = REPLY.split(' ');
        words.forEach((w, i) => this.later(3200 + i * 35, { type: 'agent_event', ...base, ev: { text: (i ? ' ' : '') + w } }));
        this.later(3400 + words.length * 35, { type: 'run_end', ...base, ok: true, code: 0, text: REPLY });
      } else if (msg.type === 'mission') {
        const p = db['/api/config'].pipeline;
        const id = `demo-${new Date().toISOString().slice(0, 10)}-${String(msg.task || 'task').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 24)}`;
        let t = 300;
        const at = (ms, m) => { t += ms; this.later(t, m); };
        this.emit({ type: 'mission_start', task: msg.task });
        at(500, { type: 'mission', stage: 'job_created', id });
        at(300, { type: 'mission', stage: 'stage', phase: 'dispatch', agentId: p.dispatcher, status: 'running' });
        at(1800, { type: 'mission', stage: 'stage', phase: 'dispatch', agentId: p.dispatcher, status: 'done', summary: 'Brief written: deliverable, audience, ratio, references, definition of done.' });
        at(300, { type: 'mission', stage: 'stage', phase: 'generate', agentId: p.generator, status: 'running', round: 1 });
        at(2600, { type: 'mission', stage: 'stage', phase: 'generate', agentId: p.generator, status: 'done', round: 1, summary: '3 takes generated with the locked recipe (sample run).' });
        at(300, { type: 'mission', stage: 'stage', phase: 'qa', agentId: p.qa, status: 'running', round: 1 });
        at(2000, { type: 'mission', stage: 'stage', phase: 'qa', agentId: p.qa, status: 'done', round: 1, verdict: 'pass', summary: 'PASS: identity, hands, props and lip-sync match the references.' });
        at(400, { type: 'mission', stage: 'done', id, status: 'DELIVERED', rounds: 1, verdict: 'pass' });
      } else if (msg.type === 'cancel') {
        this.emit({ type: 'run_end', runId: msg.runId, agentId: 'command', ok: false, code: 130, text: 'Stopped.' });
      }
    }
    close() { this.readyState = 3; }
  }
  window.WebSocket = DemoSocket;

  /* ---------- "Demo" ribbon ---------- */
  const addRibbon = () => {
    if (document.getElementById('nxtgen-demo-ribbon')) return;
    const el = document.createElement('a');
    el.id = 'nxtgen-demo-ribbon';
    el.href = '/#work';
    el.textContent = 'Live demo · sample data · ← back to portfolio';
    el.setAttribute('style', 'position:fixed;z-index:99999;left:50%;bottom:14px;transform:translateX(-50%);padding:8px 14px;border-radius:999px;background:#2f5d8a;color:#fff;font:600 12px/1 system-ui,sans-serif;text-decoration:none;box-shadow:0 8px 24px rgba(0,0,0,.35)');
    document.body.appendChild(el);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addRibbon);
  else addRibbon();

  /* ---------- Job / workspace files are not part of the demo: show a note instead of a dead link ---------- */
  const toast = (text) => {
    let el = document.getElementById('nxtgen-demo-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'nxtgen-demo-toast';
      el.setAttribute('style', 'position:fixed;z-index:99999;left:50%;bottom:56px;transform:translateX(-50%);max-width:min(420px,90vw);padding:10px 14px;border-radius:12px;background:#0b1018;color:#fff;font:500 13px/1.4 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:opacity .2s');
      document.body.appendChild(el);
    }
    el.textContent = text;
    el.style.opacity = '1';
    clearTimeout(el._t);
    el._t = setTimeout(() => (el.style.opacity = '0'), 2600);
  };
  document.addEventListener('click', (e) => {
    const a = e.target instanceof Element ? e.target.closest('a[href]') : null;
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (/^\/(job|workspace|api)\//.test(href)) {
      e.preventDefault();
      toast('Files are not included in the public demo. In the live system this opens the deliverable.');
    }
  }, true);
}
