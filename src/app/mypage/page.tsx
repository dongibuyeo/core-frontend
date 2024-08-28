'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Flag,
  MoneyBag,
  Sol,
  Pli,
  Lay,
  Moli,
} from '@/public/svg/index'
import ProfileImage from '@/components/ui/ProfileImage'
import SectionTitle from '@/components/ui/SectionTitle'
import MyChallengeStatusBar from '@/containters/mypage/MyChallengeStatusBar'
import AccountCard from '@/components/AccountCard'

const getProfileImage = (profileImageNumber: number) => {
  switch (profileImageNumber) {
    case 1:
      return <Sol />
    case 2:
      return <Pli />
    case 3:
      return <Lay className="h-[8.375rem]" />
    case 4:
      return <Moli />
    default:
      return <Sol />
  }
}

export default function Mypage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const accounts = [
    {
      account: '110-472-000000',
      balance: 210000,
      accountType: 'deposit' as 'deposit' | 'saving',
    },
    {
      account: '110-472-000000',
      balance: 70000,
      accountType: 'saving' as 'deposit' | 'saving',
    },
  ]

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return

    const { scrollLeft, clientWidth } = containerRef.current
    const scrollRatio = scrollLeft / clientWidth

    if (scrollRatio > currentIndex + 0.5) {
      setCurrentIndex(currentIndex + 1)
    } else if (scrollRatio < currentIndex - 0.5) {
      setCurrentIndex(currentIndex - 1)
    }
  }, [currentIndex])

  useEffect(() => {
    const container = containerRef.current

    container?.addEventListener('scroll', handleScroll)

    return () => {
      container?.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.clientWidth * currentIndex,
        behavior: 'smooth',
      })
    }
  }, [currentIndex])

  // 임시 프로필
  const profileImageNumber = 1
  const tempNickname = '강남건물주될거야'

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mt-8 mb-5">
          <ProfileImage
            imageUrl={getProfileImage(profileImageNumber)}
            className="w-32 h-32"
          />
        </div>
        <p className="text-center font-medium mb-10">{tempNickname}</p>
      </div>

      <div className="w-full flex flex-col">
        <div className="w-full mb-10">
          <div className="flex items-center justify-between mb-4">
            <SectionTitle icon={<Flag />} label="내 챌린지 현황" />
            <button
              type="button"
              className="flex items-center"
              onClick={() => {
                router.push('/target-path')
              }}
              aria-label="내 챌린지 현황으로 이동"
            >
              <ArrowRight />
            </button>
          </div>
          <MyChallengeStatusBar />
        </div>

        <div className="w-full overflow-hidden">
          <div className="mb-4">
            <SectionTitle icon={<MoneyBag />} label="내 계좌" />
          </div>
          <div
            ref={containerRef}
            className="flex overflow-x-auto space-x-2 snap-x snap-mandatory scrollbar-hide"
          >
            {accounts.map((account) => (
              <div
                key={account.account}
                className="w-full flex-shrink-0 snap-center"
              >
                <AccountCard
                  account={account.account}
                  balance={account.balance}
                  accountType={account.accountType}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-3">
            {accounts.map((account) => (
              <div
                key={account.account}
                className={`rounded-full ${
                  currentIndex === accounts.indexOf(account)
                    ? 'w-4 h-2 bg-_grey-200'
                    : 'w-2 h-2 bg-_grey-200/40'
                } mx-[.125rem] transition-all duration-300`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
