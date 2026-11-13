import './backdrop.css'

/**
 * The page background: three large, slow colour lights (teal, gold, blue) drifting like stage lights,
 * a fine grid that fades toward the edges, and a soft light sweep. CSS-only, very cheap to render.
 */
export function Backdrop() {
  return (
    <div className="bd" aria-hidden>
      <span className="bd__orb bd__orb--a" />
      <span className="bd__orb bd__orb--b" />
      <span className="bd__orb bd__orb--c" />
      <span className="bd__grid" />
      <span className="bd__sweep" />
    </div>
  )
}
