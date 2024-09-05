import { challengeDynamicRouteRegex } from '@/constants/regex'
import { URL_WITHOUT_MENU } from '@/constants/url-map'
import { usePathname } from 'next/navigation'

function shouldShowMenu(pathname: string): boolean {
  if (pathname === '/challenge/list' || pathname === '/challenge/my') {
    return true
  }

  if (challengeDynamicRouteRegex.test(pathname)) {
    return false
  }

  return true
}

const useMenuState = () => {
  const pathname = usePathname()

  const pathSegments = pathname.split('/').filter(Boolean)

  const isPathWithoutMenu =
    !shouldShowMenu(pathname) ||
    pathSegments.some((segment) => URL_WITHOUT_MENU.includes(`/${segment}`)) ||
    pathSegments.length === 0

  if (pathname === '/challenge/list') return true
  if (pathname === '/challenge/my') return true
  if (isPathWithoutMenu) return false

  return true
}

export { useMenuState }
