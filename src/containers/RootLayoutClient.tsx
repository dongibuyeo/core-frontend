'use client'

import { usePathname } from 'next/navigation'
import Menubar from '@/components/Menubar'

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const hideMenubarPaths = [
    '/mypage/settings',
    '/mypage/settings/profile',
    '/recommendation',
  ]

  const hideMenubarDinamicPaths = ['/transfer']

  const shouldHideMenubar =
    hideMenubarPaths.includes(pathname) ||
    hideMenubarDinamicPaths.map((path) => pathname.startsWith(path))

  return (
    <>
      {children}
      {!shouldHideMenubar && <Menubar />}
    </>
  )
}
