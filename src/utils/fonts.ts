import localFont from 'next/font/local'

const pretendard = localFont({
  src: [
    {
      path: '../static/fonts/Pretendard-Regular.woff',
      weight: '400',
    },
    {
      path: '../static/fonts/Pretendard-Medium.woff',
      weight: '500',
    },
    {
      path: '../static/fonts/Pretendard-SemiBold.woff',
      weight: '600',
    },
    {
      path: '../static/fonts/Pretendard-Bold.woff',
      weight: '700',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
})

export default pretendard
