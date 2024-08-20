'use client'

import { URL_WITHOUT_MENU } from '@/constants/url-map'
import { usePathname } from 'next/navigation'

const useMenuState = () => {
  const pathname = usePathname()

  if (URL_WITHOUT_MENU.includes(pathname)) return false

  return true
}

export { useMenuState }
