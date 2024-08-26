'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft, Settings } from '@/public/svg/index'
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

  if (!currentMapping?.label) return null
  if (!navState) return null

  const isSettingsPage = pathname === '/mypage'

  return (
    <nav className="bg-white z-10 fixed top-0 left-0 flex items-center justify-between h-[3.75rem] w-full px-[.625rem]">
      <div className="flex items-center space-x-[.625rem]">
        {currentMapping?.goBack && (
          <ArrowLeft
            className="cursor-pointer w-7 h-7"
            onClick={() => router.back()}
          />
        )}
        <span className="text-lg font-medium">{currentMapping?.label}</span>
      </div>
      {isSettingsPage && (
        <Settings
          className="cursor-pointer w-6 h-6 mr-2"
          onClick={() => router.push('/mypage/settings')}
        />
      )}
    </nav>
  )
}
