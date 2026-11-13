import type { MethodStep } from './schema'

/** The three phases of every video. They name the steps of the Home process diagram. */
export const method = {
  eyebrow: 'My process',
  title: 'Prepare. Generate. Finish.',
  summary: 'Every AI video moves through the same gated pipeline.',
  steps: [
    { name: 'Prepare', body: 'Lock the script, build exact reference sheets and pre-flight every prompt before a credit is spent.', inputs: ['Script', 'Ref sheets', 'Pre-flight'] },
    { name: 'Generate', body: 'Batch the clips, then QA every take frame by frame against the references before review.', inputs: ['Seedance', 'Kling', 'Frame QA'] },
    { name: 'Finish', body: 'Edit, grade, caption and export every hook and ratio, then log what was learned as a gate.', inputs: ['Edit', 'Captions', 'Exports'] },
  ] satisfies MethodStep[],
}
