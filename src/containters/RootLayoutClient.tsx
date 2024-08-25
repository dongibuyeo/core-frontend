'use client'

import { usePathname } from 'next/navigation'
import Menubar from '@/components/Menubar'

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const hideMenubarPaths = ['/mypage/settings', '/mypage/settings/profile']
  const shouldHideMenubar = hideMenubarPaths.includes(pathname)

  return (
    <>
      {children}
      {!shouldHideMenubar && <Menubar />}
    </>
  )
}
