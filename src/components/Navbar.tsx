'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft } from '../../public/svg/index'

const URL_LABEL_MAP = [
  {
    path: '/home',
    label: '홈',
  },
  {
    path: '/challenge',
    label: '내 챌린지',
  },
  {
    path: '/chat',
    label: '채팅',
  },
  {
    path: '/mypage',
    label: '마이페이지',
  },
]

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const getCurrentLabel = () => {
    const currentMapping = URL_LABEL_MAP.find((mapping) =>
      pathname.includes(mapping.path),
    )
    return currentMapping ? currentMapping.label : ''
  }

  const currentLabel = getCurrentLabel()

  if (!currentLabel) return null

  return (
    <nav className=" fixed top-0 flex items-center h-[3.75rem] w-full max-w-96 px-[.625rem] space-x-[.625rem]">
      <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />
      <span>{currentLabel}</span>
    </nav>
  )
}
