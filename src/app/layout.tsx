import type { Metadata } from 'next'
import pretendard from '@/utils/fonts'
import './globals.css'

import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Menubar from '@/components/Menubar'
import Container from '@/components/ui/Container'
import Provider from '@/components/Provider'

export const metadata: Metadata = {
  title: 'DONGIBUYEO',
  description: '신한 해커톤은 역시 돈기부여',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard w-full h-auto`}>
        <Provider>
          <Container>
            <Navbar />
            {children}
            <Menubar />
          </Container>
        </Provider>
        <Toaster />
      </body>
    </html>
  )
}
