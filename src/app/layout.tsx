import type { Metadata } from 'next'
import pretendard from '@/utils/fonts'
import './globals.css'

import ReactQueryProviders from '@/hooks/useReactQuery'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Menubar from '@/components/Menubar'
import Container from '@/components/ui/Container'

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
      <body className={`${pretendard.variable} font-pretendard w-full h-auto`}>
        <ReactQueryProviders>
          <Container>
            <Navbar />
            {children}
            <Menubar />
          </Container>
        </ReactQueryProviders>
        <Toaster />
      </body>
    </html>
  )
}
