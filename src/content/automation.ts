import { method } from './method'

/**
 * The process diagram on Home: how a request moves from brief to delivery,
 * drawn stage by stage as the page scrolls.
 *
 * Coordinates are in the diagram's own 1200 x 600 units: the main path is the top row, the call's
 * outcomes the bottom row. `plane` is who moves it: `lead` = the lead / you, `auto` = the system sends
 * it. `step` is the method step (0, 1 or 2: the three steps in method.ts). Nodes are listed in build order.
 */
export type FlowPlane = 'lead' | 'auto'
export type FlowIcon = 'form' | 'email' | 'booked' | 'reminder' | 'alarm' | 'call' | 'proposal' | 'won' | 'later' | 'nurture' | 'lost'

export type FlowNode = {
  id: string
  title: string
  tag: string
  plane: FlowPlane
  icon: FlowIcon
  x: number
  y: number
  w: number
  h: number
  step: number
  /** One line for the inspector. */
  about: string
}

/** `solid` links are the lead path (arrows a packet runs); `dashed` links reroute it: a reschedule loops back, the call branches out. */
export type FlowLink = { from: string; to: string; style: 'solid' | 'dashed'; label?: string }

const ROWS = [64, 376]
const box = (col: number, row: number) => ({ x: 24 + col * 200, y: ROWS[row]!, w: 156, h: 136 })

export const liveAutomation = {
  eyebrow: 'How a video gets made',
  titleThin: 'From script',
  titleBold: 'to final cut.',
  steps: method.steps.map((step) => ({ name: step.name, body: step.body })),
  panel: { lead: 'Script to', rest: 'Final cut' },
  legend: { auto: 'Quality gate', lead: 'Production path' },
  zones: { booking: 'Pre-production + generation', pipeline: 'Post-production' },
  connected: 'Pipeline live',
  hint: { hover: 'Hover a stage to inspect', tap: 'Tap a stage to inspect' },
  nodes: [
    { id: 'form', title: 'Script + Brief', tag: 'Locked word for word', plane: 'lead', icon: 'form', ...box(0, 0), step: 0, about: 'Break the reference ad or brief into beats, lock the script exactly, and agree hooks, audience, ratio and length.' },
    { id: 'email', title: 'Ref Sheets', tag: 'Cast, sets, props', plane: 'lead', icon: 'email', ...box(1, 0), step: 0, about: 'Build character, environment and prop sheets as exact replicas, so every clip shows the same face, room and objects.' },
    { id: 'booked', title: 'Pre-flight', tag: 'Prompt + cost check', plane: 'auto', icon: 'booked', ...box(2, 0), step: 0, about: 'Check every prompt against the gate list (camera, gaze, pronunciation, pacing, refs attached) and the credit budget before spending anything.' },
    { id: 'day', title: 'Generate', tag: 'Seedance · Kling', plane: 'lead', icon: 'reminder', ...box(3, 0), step: 1, about: 'Generate the clips in batches with the agreed recipe: start frames, reference sheets and voice samples where needed.' },
    { id: 'hour', title: 'Frame QA', tag: 'Faces, hands, lips', plane: 'auto', icon: 'alarm', ...box(4, 0), step: 1, about: 'Review every take frame by frame against the references: identity, hands, props, lip-sync, edges and lighting.' },
    { id: 'call', title: 'Approve', tag: 'Client review', plane: 'lead', icon: 'call', ...box(5, 0), step: 1, about: 'Approved takes move to the edit. Anything off goes back with a specific fix note instead of a blind re-roll.' },
    { id: 'proposal', title: 'Edit + Captions', tag: 'Cut, grade, sound', plane: 'lead', icon: 'proposal', ...box(0, 1), step: 2, about: 'Hard cuts, B-roll, colour grade, room tone, burned-in captions, overlays and the end card.' },
    { id: 'later', title: 'Re-roll', tag: 'Targeted fix', plane: 'auto', icon: 'later', ...box(3, 1), step: 2, about: 'Re-generate only the shot that failed, with the fix written into the prompt, so the budget stays intact.' },
    { id: 'lost', title: 'Flag Risk', tag: 'Policy + budget', plane: 'lead', icon: 'lost', ...box(5, 1), step: 2, about: 'Platform-policy or budget risks get raised early, with options, before they cost credits or a rejected ad.' },
    { id: 'won', title: 'Deliver Hooks', tag: '9:16 · 1:1 · 4:5', plane: 'lead', icon: 'won', ...box(1, 1), step: 2, about: 'Export every hook variant and ratio, named and logged, ready for the ads manager or the posting schedule.' },
    { id: 'nurture', title: 'Gate Log', tag: 'Never repeat a miss', plane: 'auto', icon: 'nurture', ...box(4, 1), step: 2, about: 'Every correction becomes a written gate that the next project starts from, so the same mistake never costs twice.' },
  ] satisfies FlowNode[],
  links: [
    { from: 'form', to: 'email', style: 'solid' },
    { from: 'email', to: 'booked', style: 'solid' },
    { from: 'booked', to: 'day', style: 'solid' },
    { from: 'day', to: 'hour', style: 'solid' },
    { from: 'hour', to: 'call', style: 'solid' },
    { from: 'hour', to: 'booked', style: 'dashed', label: 'Fix note, back to pre-flight' },
    { from: 'call', to: 'proposal', style: 'dashed' },
    { from: 'call', to: 'later', style: 'dashed' },
    { from: 'call', to: 'lost', style: 'dashed' },
    { from: 'proposal', to: 'won', style: 'solid' },
    { from: 'later', to: 'nurture', style: 'solid' },
  ] satisfies FlowLink[],
}
