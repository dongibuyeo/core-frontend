/* eslint-disable no-nested-ternary */

'use client'

import { useMenuState } from '@/hooks/useMenuState'
import { useNavState } from '@/hooks/useNavState'
import { usePathname } from 'next/navigation'

export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const menuState = useMenuState()
  const navState = useNavState()

  return (
    <div
      className={`relative w-full ${navState ? 'pt-[3.75rem]' : ''} ${menuState ? 'pb-[4.5rem]' : ''} ${pathname.includes('/challenge/') ? '' : pathname === '/' ? '' : 'px-5'}`}
    >
      {children}
    </div>
  )
}
