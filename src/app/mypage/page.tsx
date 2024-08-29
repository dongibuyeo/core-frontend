'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Flag, MoneyBag } from '@/public/svg/index'
import ProfileImage from '@/components/ui/ProfileImage'
import SectionTitle from '@/components/ui/SectionTitle'
import MyChallengeStatusBar from '@/containers/mypage/MyChallengeStatusBar'
import AccountCard from '@/components/AccountCard'
import Loader from '@/components/Loader'
import { useQuery } from '@tanstack/react-query'
import {
  getUserProfileByEmail,
  getChallengeAccountInfo,
  getChallengeStatusCount,
} from '@/services/mypage'
import { UserProfile } from '@/types/UserProfile'

export default function Mypage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const {
    data: userProfile,
    isLoading,
    isError,
  } = useQuery<UserProfile>({
    queryKey: ['userProfile'],
    queryFn: getUserProfileByEmail,
  })

  const { data: challengeAccount } = useQuery({
    queryKey: ['challengeAccount'],
    queryFn: () => getChallengeAccountInfo(userProfile?.memberId || ''),
    enabled: !!userProfile,
  })

  const {
    data: challengeStatus = { SCHEDULED: 0, IN_PROGRESS: 0, COMPLETED: 0 },
  } = useQuery({
    queryKey: ['challengeStatus'],
    queryFn: () => getChallengeStatusCount(userProfile?.memberId || ''),
    enabled: !!userProfile,
  })

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const { scrollLeft, clientWidth } = containerRef.current
      const scrollRatio = scrollLeft / clientWidth

      if (scrollRatio > currentIndex + 0.5) {
        setCurrentIndex((prevIndex) => prevIndex + 1)
      } else if (scrollRatio < currentIndex - 0.5) {
        setCurrentIndex((prevIndex) => prevIndex - 1)
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

  if (isError || !userProfile) {
    return <div>데이터를 불러오는 중 에러가 발생했습니다.</div>
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mt-8 mb-5">
          {userProfile && (
            <ProfileImage
              profileImage={userProfile.profileImage}
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
          {challengeStatus && (
            <MyChallengeStatusBar challengeStatus={challengeStatus} />
          )}
        </div>

        <div className="w-full overflow-hidden">
          <div className="mb-4">
            <SectionTitle icon={<MoneyBag />} label="내 계좌" />
          </div>
          <div
            ref={containerRef}
            className="flex overflow-x-auto space-x-2 snap-x snap-mandatory scrollbar-hide"
          >
            {challengeAccount?.map((account: any) => (
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
            {challengeAccount?.map((account: any) => (
              <div
                key={account.account}
                className={`rounded-full ${
                  currentIndex === challengeAccount.indexOf(account)
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
