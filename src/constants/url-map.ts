type UrlMap = {
  path: string
  label?: string
  goBack?: boolean
  logo?: boolean
}

export const URL_WITHOUT_MENU = ['/', '/signup']

export const URL_LABEL_MAP: UrlMap[] = [
  {
    path: '/home',
    label: '홈',
    goBack: false,
    logo: true,
  },
  {
    path: '/signup',
    label: '회원가입',
    goBack: false,
    logo: false,
  },
  {
    path: '/challenge',
    label: '내 챌린지',
    goBack: true,
    logo: false,
  },
  {
    path: '/chat',
    label: '채팅',
    goBack: true,
    logo: false,
  },
  {
    path: '/mypage',
    label: '마이페이지',
    goBack: true,
    logo: false,
  },
]
