'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Flag, MoneyBag } from '@/public/svg/index'
import ProfileImage from '@/components/ui/ProfileImage'
import SectionTitle from '@/components/ui/SectionTitle'
import MyChallengeStatusBar from '@/containers/mypage/MyChallengeStatusBar'
import AccountCard from '@/components/AccountCard'
import { useQuery } from '@tanstack/react-query'
import { getChallengeStatusCount } from '@/services/mypage'
import { getUserInfo } from '@/services/auth'
import {
  getChallengeAccount,
  getSavingsSevenAccounts,
} from '@/services/account'

export default function Mypage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState(false)

  // 클라이언트에서만 localStorage 사용 가능 여부를 설정
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      setIsLocalStorageAvailable(true)
    }
  }, [])

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: !!localStorage.getItem('email'),
  })

  const { data: challengeAccount } = useQuery({
    queryKey: ['account', 'challenge'],
    queryFn: () => getChallengeAccount(userInfo?.memberId as string),
    enabled: !!userInfo?.memberId,
  })

  const { data: savingsSevenAccounts } = useQuery({
    queryKey: ['account', 'savingsSeven'],
    queryFn: () => getSavingsSevenAccounts(userInfo?.memberId as string),
    enabled: !!userInfo?.memberId,
  })

  const {
    data: challengeStatus = { SCHEDULED: 0, IN_PROGRESS: 0, COMPLETED: 0 },
  } = useQuery({
    queryKey: ['challengeStatus'],
    queryFn: () => getChallengeStatusCount(userInfo?.memberId || ''),
    enabled: !!userInfo,
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

  useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem('email', 'shinhanKim@dongibuyeo-test.com') // email 값을 새로운 값으로 설정
      console.log(
        'Updated email in local storage to:',
        'shinhanKim@dongibuyeo-test.com',
      )
    }
  }, [isLocalStorageAvailable])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mt-8 mb-5">
          {userInfo && (
            <ProfileImage
              profileImage={userInfo.profileImage}
              className="w-32 h-32"
            />
          )}
        </div>
        <p className="text-center font-medium mt-3 mb-10">
          {userInfo?.nickname}
        </p>
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
            <AccountCard
              account={challengeAccount?.accountNo || ''}
              balance={Number(challengeAccount?.accountBalance) || 0}
              accountType="deposit"
            />
          </div>
          <div className="w-full overflow-hidden mt-8">
            <div className="mb-4">
              <SectionTitle
                icon={<MoneyBag />}
                label="SAVINGS_SEVEN 적금 계좌"
              />
            </div>
            <div className="flex overflow-x-auto space-x-2 snap-x snap-mandatory scrollbar-hide">
              {savingsSevenAccounts?.map((account) => (
                <AccountCard
                  key={account.accountNo}
                  account={account.accountNo}
                  balance={Number(account.accountBalance) || 0}
                  accountType="saving"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
