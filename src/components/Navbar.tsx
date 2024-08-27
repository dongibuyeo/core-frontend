'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft } from '@/public/svg/index'
import { URL_LABEL_MAP } from '@/constants/url-map'
import { useNavState } from '@/hooks/useNavState'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const navState = useNavState()

  const getCurrentMapping = () => {
    const currentMapping = URL_LABEL_MAP.find((mapping) =>
      pathname.includes(mapping.path),
    )
    return currentMapping
  }

  const currentMapping = getCurrentMapping()

  if (!navState) return null

  return (
    <nav className="bg-transparent z-10 fixed top-0 left-0 flex items-center h-[3.75rem] w-full px-[.625rem] space-x-[.625rem]">
      {currentMapping?.goBack && (
        <ArrowLeft
          className="cursor-pointer w-6 h-6"
          fill={!currentMapping?.label && '#ffffff'}
          onClick={() => router.back()}
        />
      )}
      <span className="text-lg font-medium ml-[.625rem]">
        {currentMapping?.label}
      </span>
    </nav>
  )
}
