/**
 * The long-form highlight on Home: a 16:9 edit hosted in the user's Google Drive
 * ("AI Content Proposal / Long Form + Motion graphic Video Editing"). It streams from Drive's own
 * player, loaded only when the visitor presses play.
 */
export const longform = {
  eyebrow: 'Long-form',
  titleThin: 'Long-form edit,',
  titleBold: 'motion graphics included.',
  lede: 'Beyond short-form: a full talking-head edit with pacing cuts, B-roll, motion-graphic callouts and captions, built to hold attention start to finish.',
  driveId: '1CzO6dSwGxEV662V6qVQaobSzMuQGBV33',
  title: 'Video Editing: long-form + motion graphics',
  points: ['Story-first pacing and jump cuts', 'Motion-graphic titles and callouts', 'B-roll, sound design and captions', '16:9 for YouTube, LinkedIn and courses'],
}

export const drivePreview = (id: string) => `https://drive.google.com/file/d/${id}/preview`
export const driveThumb = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`
