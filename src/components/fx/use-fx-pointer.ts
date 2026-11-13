import { useEffect } from 'react'

/** One listener for the whole page: feeds the cursor position to the hovered .fx-host as CSS vars. */
export function useFxPointer() {
  useEffect(() => {
    let host: HTMLElement | null = null
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const t = e.target instanceof Element ? e.target.closest<HTMLElement>('.fx-host') : null
      if (host && host !== t) {
        host.style.removeProperty('--rx')
        host.style.removeProperty('--ry')
      }
      host = t
      if (!t) return
      const r = t.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      t.style.setProperty('--mx', `${x}px`)
      t.style.setProperty('--my', `${y}px`)
      t.style.setProperty('--rx', ((x / r.width) * 2 - 1).toFixed(3))
      t.style.setProperty('--ry', ((y / r.height) * 2 - 1).toFixed(3))
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])
}
