'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft } from '@/public/svg/index'
import { URL_LABEL_MAP } from '@/constants/url-map'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const getCurrentMapping = () => {
    const currentMapping = URL_LABEL_MAP.find((mapping) =>
      pathname.includes(mapping.path),
    )
    return currentMapping
  }

  const currentMapping = getCurrentMapping()

  if (!currentMapping?.label) return null

  return (
    <nav className=" fixed top-0 left-0 flex items-center h-[3.75rem] w-full max-w-96 px-[.625rem] space-x-[.625rem]">
      {currentMapping?.goBack && (
        <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />
      )}
      <span className="text-lg font-medium ml-[.625rem]">
        {currentMapping?.label}
      </span>
    </nav>
  )
}
