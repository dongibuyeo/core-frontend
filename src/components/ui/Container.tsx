'use client'

import { useMenuState } from '@/hooks/useMenuState'

export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const menuState = useMenuState()
  return (
    <div
      className={`relative w-full max-h-dvh overflow-y-scroll pt-[3.75rem] ${menuState ? 'pb-[4.5rem]' : ''} px-5`}
    >
      {children}
    </div>
  )
}
