import type { Metadata } from 'next'
import pretendard from '@/utils/fonts'
import './globals.css'

import ReactQueryProviders from '@/hooks/useReactQuery.jsx'

export const metadata: Metadata = {
  title: 'DONGIBUYEO',
  description: '신한 해커톤은 역시 돈기부여',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard`}>
        <ReactQueryProviders>{children}</ReactQueryProviders>
      </body>
    </html>
  )
}
