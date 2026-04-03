'use client'

import { useEffect } from 'react'
import GameClient from './GameClient'

export default function Home() {
  useEffect(() => {
    // Ngăn zoom trên mobile
    const handleTouchMove = (e: TouchEvent) => {
      if ((e as any).touches.length > 1) {
        e.preventDefault()
      }
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => {
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return <GameClient />
}
