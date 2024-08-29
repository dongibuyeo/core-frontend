'use client'

import { useState, useRef, useEffect } from 'react'
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
import MyChallengeStatusBar from '@/containers/mypage/MyChallengeStatusBar'
import AccountCard from '@/components/AccountCard'
import Loader from '@/components/Loader'
import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from '@/services/mypage'
import { UserProfile } from '@/types/UserProfile'

const getProfileImage = (profileImageName: string) => {
  switch (profileImageName) {
    case 'Sol':
      return <Sol />
    case 'Pli':
      return <Pli />
    case 'Lay':
      return <Lay className="h-[8.375rem]" />
    case 'Moli':
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

  const {
    data: userProfile,
    isLoading,
    isError,
  } = useQuery<UserProfile>({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  })

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const { scrollLeft, clientWidth } = containerRef.current
      const scrollRatio = scrollLeft / clientWidth

      if (scrollRatio > currentIndex + 0.5) {
        setCurrentIndex(currentIndex + 1)
      } else if (scrollRatio < currentIndex - 0.5) {
        setCurrentIndex(currentIndex - 1)
      }
    }

    const container = containerRef.current

    container?.addEventListener('scroll', handleScroll)

    return () => {
      container?.removeEventListener('scroll', handleScroll)
    }
  }, [currentIndex])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.clientWidth * currentIndex,
        behavior: 'smooth',
      })
    }
  }, [currentIndex])

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div>에러 발생!</div> // 데이터 페칭 중 에러 발생한 경우
  }

  if (!userProfile) {
    return <div>데이터를 불러오지 못했습니다.</div> // 데이터가 없을 경우 표시할 메시지
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mt-8 mb-5">
          {userProfile && (
            <ProfileImage
              imageUrl={getProfileImage(userProfile.profileImage)}
              className="w-32 h-32"
            />
          )}
        </div>
        <p className="text-center font-medium mb-10">{userProfile.nickname}</p>
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
