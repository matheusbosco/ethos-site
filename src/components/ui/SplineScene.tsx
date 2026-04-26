'use client'

import { Suspense, lazy, useEffect, useRef } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  followGlobalMouse?: boolean
}

export function SplineScene({ scene, className, followGlobalMouse = false }: SplineSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!followGlobalMouse) return

    const forward = (e: MouseEvent) => {
      const canvas = wrapperRef.current?.querySelector('canvas')
      if (!canvas) return
      canvas.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true,
          cancelable: true,
          view: window,
        }),
      )
    }

    window.addEventListener('mousemove', forward)
    return () => window.removeEventListener('mousemove', forward)
  }, [followGlobalMouse])

  return (
    <div ref={wrapperRef} style={{ display: 'contents' }}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-white/5">
            <div className="w-8 h-8 border-2 border-[#C89A4F]/30 border-t-[#C89A4F] rounded-full animate-spin" />
          </div>
        }
      >
        <Spline scene={scene} className={className} />
      </Suspense>
    </div>
  )
}
