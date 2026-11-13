import './fx.css'

/**
 * Living card background + hover light, shared by every Home section.
 * Put <Fx /> as the first child of an element with the class `fx-host`:
 *   - default: drifting colour blobs + dot grid behind the content, cursor spotlight, glowing edge
 *   - variant "soft": spotlight + edge only (rows, small buttons)
 *   - variant "over": a light sheen + edge ON TOP of media (video, photos), no background
 * Add `fx-tilt` to the host for the slight 3D tilt toward the cursor.
 * Colours come from --c1 / --c2 on the host (defaults: accent / gold).
 */
export function Fx({ variant = 'full' }: { variant?: 'full' | 'soft' | 'over' }) {
  return (
    <span className="fx" data-fx={variant} aria-hidden>
      {variant === 'full' ? <span className="fx__aurora" /> : null}
      <span className="fx__edge" />
    </span>
  )
}
