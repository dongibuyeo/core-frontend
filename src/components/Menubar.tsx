'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Home, Challenge, Chat, Profile } from '@/public/svg/index'
import { useMenuState } from '@/hooks/useMenuState'

const getIconColor = (path: string, currentPath: string) =>
  currentPath.includes(path) ? '#0046FF' : '#D2D2D2'

const MenuDetails = [
  { path: 'home', component: Home, label: '홈' },
  { path: `challenge/my`, component: Challenge, label: '챌린지' },
  { path: 'chat', component: Chat, label: '채팅' },
  { path: 'mypage', component: Profile, label: '마이페이지' },
]

export default function Menubar() {
  const menuState = useMenuState()
  const router = useRouter()
  const pathname = usePathname()

  if (!menuState) return null

  return (
    <nav className="bg-white z-10 fixed bottom-0 left-0 flex items-center px-5 justify-between py-[.625rem] w-full">
      {MenuDetails.map(({ path, component: IconComponent, label }) => (
        <div
          key={path}
          role="presentation"
          className="flex flex-col items-center cursor-pointer"
          onClick={() => router.push(`/${path}`)}
        >
          <IconComponent fill={getIconColor(path, pathname)} />
          <span
            className="text-sm"
            style={{ color: getIconColor(path, pathname) }}
          >
            {label}
          </span>
        </div>
      ))}
    </nav>
  )
}
