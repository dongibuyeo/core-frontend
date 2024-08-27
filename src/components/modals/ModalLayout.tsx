'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function ModalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      router.back()
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.back()}
      onKeyDown={handleKeyDown}
      className="fixed top-0 w-screen h-screen cursor-pointer bg-[rgba(0,0,0,0.3)] z-[100]"
    >
      {children}
    </div>
  )
}
