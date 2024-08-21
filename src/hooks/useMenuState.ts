import { URL_WITHOUT_MENU } from '@/constants/url-map'
import { usePathname } from 'next/navigation'

const useMenuState = () => {
  const pathname = usePathname()

  const pathSegments = pathname.split('/').filter(Boolean)

  const isPathWithoutMenu =
    pathSegments.some((segment) => URL_WITHOUT_MENU.includes(`/${segment}`)) ||
    pathSegments.length === 0

  if (isPathWithoutMenu) return false

  return true
}

export { useMenuState }
