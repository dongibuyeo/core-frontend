import { URL_WITHOUT_NAV } from '@/constants/url-map'
import { usePathname } from 'next/navigation'

const useNavState = () => {
  const pathname = usePathname()

  const pathSegments = pathname.split('/').filter(Boolean)

  const isPathWithoutNav =
    pathSegments.some((segment) => URL_WITHOUT_NAV.includes(`/${segment}`)) ||
    pathSegments.length === 0

  if (isPathWithoutNav) return false

  return true
}

export { useNavState }
