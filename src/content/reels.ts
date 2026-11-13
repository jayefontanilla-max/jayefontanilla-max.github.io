/**
 * The Reel wall on Home: finished short-form videos, 9:16. Files live in public/media/reels/
 * (540x960 H.264 + a .webp poster), made by scripts/local/encode-reels.sh from the final exports.
 * Titles describe the format, not the client, so no brand is named here.
 */

export type ReelCategory = 'story' | 'ugc' | 'talking' | 'lesson'

export type Reel = {
  id: string
  title: string
  /** One line on what was made and how. */
  note: string
  category: ReelCategory
  /** m:ss */
  duration: string
  /** Tools used, shown as small tags. */
  tools: string[]
}

export const reelCategories: { id: ReelCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'story', label: 'AI story animation' },
  { id: 'ugc', label: 'AI UGC ads' },
  { id: 'talking', label: 'Talking heads & podcasts' },
  { id: 'lesson', label: 'Time-travel lessons' },
]

export const reelsSection = {
  eyebrow: 'The reel',
  titleThin: 'Made with AI,',
  titleBold: 'finished by hand.',
  lede: 'Short-form ads and stories I directed end to end: script, reference sheets, AI generation, QA, edit, captions and delivery. Pick a category, then a video to watch it with sound.',
}

export const reels: Reel[] = [
  { id: 'lesson-napoleon', title: 'Napoleon: too many words', note: 'The narrator time-travels to Napoleon’s camp; he answers in his own language, then the lesson lands.', category: 'lesson', duration: '3:20', tools: ['Seedance', 'Reference sheets', 'Edit'] },
  { id: 'caterpillar', title: 'The caterpillar circle', note: 'Long-take 3D story animation with one continuous camera journey per scene.', category: 'story', duration: '1:20', tools: ['Seedance', 'Nano Banana', 'Edit'] },
  { id: 'monk-lymphatic', title: 'Monk morning routine', note: 'Realistic AI UGC ad: two characters, lip-synced voice, B-roll and three hook variants.', category: 'ugc', duration: '1:25', tools: ['Seedance', 'GPT Image', 'Captions'] },
  { id: 'podcast-woman', title: 'Podcast clip, three hooks', note: 'AI podcast-format ad with a custom guest, studio set and a cloned natural voice.', category: 'talking', duration: '2:09', tools: ['Seedance', 'Voice', 'Edit'] },
  { id: 'rat-bounty', title: 'The rat bounty', note: 'Cinematic history story told in one-shot scenes with whip and blur transitions.', category: 'story', duration: '1:18', tools: ['Seedance', 'Reference sheets'] },
  { id: 'foam-head-dyslexia', title: 'The foam-head test', note: 'Presenter ad in an "uncomfortable test" format, with quiz cards and burned-in captions.', category: 'talking', duration: '0:38', tools: ['Seedance', 'Hypit'] },
  { id: 'history-lesson', title: 'Marcus Aurelius: inner scorecard', note: 'A narrator steps into ancient Rome: 17 clips, exact replica sets, period dialogue.', category: 'lesson', duration: '3:32', tools: ['Seedance', 'Cinema Studio', 'Edit'] },
  { id: 'lesson-noah', title: 'Noah’s ark, in the storm', note: 'Found-footage time travel: rain-soaked narrator, replica ark built from real references.', category: 'lesson', duration: '3:27', tools: ['Seedance', 'Replica sheets'] },
  { id: 'pig-wolf', title: 'The pig and the wolf', note: '2D cartoon app ad with consistent characters, voiced dialogue and a TV-reveal hook.', category: 'story', duration: '1:27', tools: ['Seedance', 'GPT Image'] },
  { id: 'selfie-kitchen', title: 'Selfie UGC, kitchen', note: 'Handheld selfie-style creator ad that feels filmed on a real phone.', category: 'ugc', duration: '0:38', tools: ['Seedance', 'Captions'] },
  { id: 'stage-talk', title: 'On-stage speaker', note: 'Conference-stage format with tweet-card hook and audience cutaways.', category: 'talking', duration: '1:22', tools: ['Seedance', 'Hypit'] },
  { id: 'talking-pelvis', title: 'The talking pelvis', note: '3D cartoon explainer: a character that talks the viewer through each step.', category: 'story', duration: '2:56', tools: ['Seedance', 'Animation'] },
  { id: 'lesson-machiavelli-robes', title: 'Machiavelli: the bishop’s robes', note: 'Renaissance Florence lesson with exact-replica sets and native Italian lines.', category: 'lesson', duration: '2:47', tools: ['Seedance', 'Cinema Studio'] },
  { id: 'monk-fascia', title: 'Monk and student', note: 'Realistic AI UGC with real-photo start frames, colour grade and logo end card.', category: 'ugc', duration: '0:55', tools: ['Seedance', 'Nano Banana Pro'] },
  { id: 'foam-head-dementia', title: 'White-coat presenter', note: 'Doctor-style presenter for a 45+ audience, three presenters, one format.', category: 'talking', duration: '0:31', tools: ['Seedance', 'Hypit'] },
  { id: 'avatar-ugc', title: 'App founder story', note: 'Creator-style avatar ad with app screens and natural voiceover pacing.', category: 'ugc', duration: '0:33', tools: ['Kling', 'GPT Image'] },
  { id: 'lesson-tesla', title: 'Tesla’s lost tower', note: 'Wardenclyffe story with a static-hair spark hook and a headline-led social edit.', category: 'lesson', duration: '3:24', tools: ['Seedance', 'Edit'] },
  { id: 'podcast-man', title: 'Small-talk killers', note: 'Podcast clip with a tweet-card opener, built for a 40+ male audience.', category: 'talking', duration: '2:02', tools: ['Seedance', 'Edit'] },
  { id: 'green-screen-news', title: 'Green-screen news', note: 'News-headline green-screen concept with cut-out reactions and list beats.', category: 'talking', duration: '0:20', tools: ['Seedance', 'BiRefNet'] },
  { id: 'lesson-machiavelli-name', title: 'Machiavelli: make them name it', note: 'Practical-light interiors and calm, lesson-first pacing across a full 3-minute story.', category: 'lesson', duration: '2:48', tools: ['Cinema Studio', 'Seedance'] },
  { id: 'split-screen', title: 'Split-screen reaction', note: 'TikTok edit: presenter cut-out on top, phone with app footage below.', category: 'talking', duration: '1:06', tools: ['Edit', 'Motion'] },
  { id: 'challenge-ugc', title: 'Daily challenge ad', note: 'Dated-challenge format with on-screen countdown text and exercise B-roll.', category: 'ugc', duration: '0:41', tools: ['Seedance', 'Hypit'] },
]

export const reelSrc = (id: string) => `/media/reels/${id}.mp4`
export const reelPoster = (id: string) => `/media/reels/${id}.webp`
