'use client'

import { useEffect, useRef, useState } from 'react'

interface SplineSceneProps {
  scene: string
  className?: string
  /**
   * When true, the Spline scene listens to mouse events on the whole window
   * instead of only inside the canvas — so any mouse-look behaviour set up
   * in the scene tracks the cursor across the entire page. Implemented via
   * the `events-target="global"` attribute supported by `<spline-viewer>`.
   */
  followGlobalMouse?: boolean
}

export function SplineScene({ scene, className, followGlobalMouse = false }: SplineSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!hostRef.current) return
    const host = hostRef.current
    let viewer: HTMLElement | null = null
    let cancelled = false

    // The viewer module registers a custom element on import — must run
    // client-side only (this component is already 'use client').
    import('@splinetool/viewer')
      .then(() => {
        if (cancelled || !host.isConnected) return
        viewer = document.createElement('spline-viewer')
        viewer.setAttribute('url', scene)
        if (followGlobalMouse) viewer.setAttribute('events-target', 'global')
        viewer.setAttribute('loading-anim-type', 'none')
        viewer.style.cssText = 'width:100%;height:100%;display:block;background:transparent;'

        // Hide the "Built with Spline" badge via a stylesheet injected into the
        // viewer's shadow DOM. We hide (not remove) #logo because spline-viewer's
        // own code re-queries that element and would crash on a null reference.
        const hideBadge = (attempts = 0) => {
          const root = viewer?.shadowRoot
          if (root) {
            if (!root.getElementById('ethos-hide-spline-badge')) {
              const style = document.createElement('style')
              style.id = 'ethos-hide-spline-badge'
              style.textContent = '#logo{display:none!important;}'
              root.appendChild(style)
            }
            return
          }
          if (attempts < 25) window.setTimeout(() => hideBadge(attempts + 1), 100)
        }

        const onLoad = () => {
          setLoaded(true)
          hideBadge()
        }
        viewer.addEventListener('load', onLoad)
        viewer.addEventListener('load-complete', onLoad)
        host.appendChild(viewer)
        hideBadge()
      })
      .catch((err) => {
        // Don't crash — just hide the loader and let the slot stay empty.
        console.error('[SplineScene] failed to load spline-viewer:', err)
        setLoaded(true)
      })

    return () => {
      cancelled = true
      if (viewer) {
        try {
          viewer.remove()
        } catch {
          // ignore
        }
      }
    }
  }, [scene, followGlobalMouse])

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={hostRef} style={{ position: 'absolute', inset: 0 }} />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
          <div className="w-8 h-8 border-2 border-[#C89A4F]/30 border-t-[#C89A4F] rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
