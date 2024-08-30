type UrlMap = {
  path: string
  label?: string
  goBack?: boolean
  bg?: string
}

export const URL_WITHOUT_MENU = [
  '/signup',
  '/transfer',
  '/challenge',
  '/enroll',
  '/modals',
]

export const URL_WITHOUT_NAV = ['/push', '/home']

export const URL_LABEL_MAP: UrlMap[] = [
  {
    path: '/signup',
    label: '회원가입',
    goBack: false,
  },
  {
    path: '/challenge/list',
    label: ' ',
    goBack: true,
  },
  {
    path: '/challenge/my',
    label: ' ',
    goBack: true,
  },
  {
    path: '/challenge',
    label: '',
    goBack: true,
  },
  {
    path: '/chat',
    label: '채팅',
    goBack: true,
  },
  {
    path: '/recommendation',
    goBack: true,
  },
  {
    path: '/mypage/settings/profile',
    label: '프로필 설정',
    goBack: true,
  },
  {
    path: '/mypage/settings/notification',
    label: '푸시알림 설정',
    goBack: true,
  },
  {
    path: '/mypage/settings',
    label: '설정',
    goBack: true,
  },
  {
    path: '/mypage',
    label: '마이페이지',
    goBack: true,
  },
  {
    path: '/transfer',
    label: ' ',
    goBack: true,
  },
  {
    path: '/challenge/deposit',
    label: '예치금 등록',
    goBack: true,
    bg: 'bg-white',
  },
  { path: '/enroll', label: ' ', goBack: true },
]
