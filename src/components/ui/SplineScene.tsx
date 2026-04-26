'use client'

import { Suspense, lazy, useCallback, useEffect, useRef } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  /**
   * When true, listens to mousemove on the whole window and forwards it to
   * the Spline canvas, so any mouse-look behaviour set up inside the scene
   * tracks the cursor across the entire page (not just inside the canvas
   * bounds).
   */
  followGlobalMouse?: boolean
}

export function SplineScene({ scene, className, followGlobalMouse = false }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Latch the canvas as soon as Spline mounts it.
  const handleLoad = useCallback(() => {
    if (!containerRef.current) return
    canvasRef.current = containerRef.current.querySelector('canvas')
  }, [])

  useEffect(() => {
    if (!followGlobalMouse) return

    const forward = (e: MouseEvent) => {
      const canvas =
        canvasRef.current || containerRef.current?.querySelector('canvas') || null
      if (!canvas) return

      const init: MouseEventInit & PointerEventInit = {
        clientX: e.clientX,
        clientY: e.clientY,
        screenX: e.screenX,
        screenY: e.screenY,
        bubbles: true,
        cancelable: true,
        view: window,
      }

      // Dispatch both event families because @splinetool/runtime listens to
      // pointer events on recent versions and mouse events on older ones.
      canvas.dispatchEvent(new MouseEvent('mousemove', init))
      canvas.dispatchEvent(
        new PointerEvent('pointermove', {
          ...init,
          pointerType: 'mouse',
          pointerId: 1,
          isPrimary: true,
        }),
      )
    }

    window.addEventListener('mousemove', forward, { passive: true })
    return () => window.removeEventListener('mousemove', forward)
  }, [followGlobalMouse])

  return (
    <div ref={containerRef} className="w-full h-full">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-white/5">
            <div className="w-8 h-8 border-2 border-[#C89A4F]/30 border-t-[#C89A4F] rounded-full animate-spin" />
          </div>
        }
      >
        <Spline scene={scene} className={className} onLoad={handleLoad} />
      </Suspense>
    </div>
  )
}
