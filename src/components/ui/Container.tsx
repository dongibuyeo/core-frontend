'use client'

import { useMenuState } from '@/hooks/useMenuState'
import { useNavState } from '@/hooks/useNavState'

export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const menuState = useMenuState()
  const navState = useNavState()

  return (
    <div
      className={`relative w-full max-h-dvh min-h-dvh overflow-y-scroll ${navState ? 'pt-[3.75rem]' : ''} ${menuState ? 'pb-[4.5rem]' : ''} px-5`}
    >
      {children}
    </div>
  )
}
