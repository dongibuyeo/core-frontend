'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, RedFlag, MoneyBag } from '@/public/svg/index'
import ProfileImage from '@/components/ui/ProfileImage'
import SectionTitle from '@/components/ui/SectionTitle'
import MyChallengeStatusBar from '@/containters/mypage/MyChallengeStatusBar'
import AccountCard from '@/components/AccountCard'

interface Props {
  profileImage: JSX.Element
  nickname: string | null
}

export default function Mypage({ profileImage, nickname }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

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

  // 임시 닉네임으로 "강남건물주될거야" 사용
  const tempNickname = '강남건물주될거야'

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mt-4 mb-3">
          <ProfileImage
            imageUrl={profileImage}
            className="w-[6.25rem] h-[6.25rem]"
          />
        </div>
        <p className="text-center font-medium mb-10">
          {nickname ?? tempNickname}
        </p>
      </div>

      <div className="w-full flex flex-col">
        <div className="w-full mb-10">
          <div className="flex items-center justify-between mb-4">
            <SectionTitle icon={<RedFlag />} label="내 챌린지 현황" />
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

        <div className="w-full mb-10 overflow-hidden">
          <div className="mb-4">
            <SectionTitle icon={<MoneyBag />} label="내 계좌" />
          </div>
          <div
            ref={containerRef}
            className="flex overflow-x-auto space-x-2 snap-x snap-mandatory no-scrollbar"
          >
            <div className="w-full flex-shrink-0 snap-center">
              <AccountCard
                account="110-472-000000"
                balance={210000}
                accountType="deposit"
              />
            </div>
            <div className="w-full flex-shrink-0 snap-center">
              <AccountCard
                account="110-472-000000"
                balance={70000}
                accountType="saving"
              />
            </div>
          </div>

          <div className="flex justify-center mt-3">
            <div
              className={`rounded-full ${
                currentIndex === 0
                  ? 'w-4 h-2 bg-_grey-200'
                  : 'w-2 h-2 bg-_grey-200/40'
              } mx-[.125rem] transition-all duration-300`}
            />
            <div
              className={`rounded-full ${
                currentIndex === 1
                  ? 'w-4 h-2 bg-_grey-200'
                  : 'w-2 h-2 bg-_grey-200/40'
              } mx-[.125rem] transition-all duration-300`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
