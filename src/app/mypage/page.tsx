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
import AccountEmptyCard from '@/containers/mypage/AccountEmptyCard'
import { Account, SavingAccount } from '@/types/account'

export default function Mypage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  let email
  if (typeof window !== 'undefined') email = localStorage.getItem('email')

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: !!email,
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

  const accounts = [challengeAccount, ...(savingsSevenAccounts || [])]
  const isAccount = (account: Account | SavingAccount): account is Account =>
    (account as Account).accountBalance !== undefined

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const { scrollLeft, clientWidth } = containerRef.current
      const newIdx = Math.round(scrollLeft / clientWidth)
      setCurrentIndex(newIdx)
    }

    const container = containerRef.current
    container?.addEventListener('scroll', handleScroll)

    return () => {
      container?.removeEventListener('scroll', handleScroll)
    }
  }, [currentIndex])

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
                router.push('/challenge/my')
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
            {accounts.map((account, index) => (
              <div
                key={account?.accountNo}
                className="w-full flex-shrink-0 snap-center"
                style={{ scrollSnapAlign: 'center' }}
              >
                {account ? (
                  <AccountCard
                    account={account?.accountNo || ''}
                    balance={
                      isAccount(account)
                        ? Number(account?.accountBalance) || 0
                        : Number(account?.totalBalance) || 0
                    }
                    accountType={index === 0 ? 'deposit' : 'saving'}
                  />
                ) : (
                  <AccountEmptyCard />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-3">
            {accounts.map((account, index) => (
              <div
                key={account?.accountNo}
                className={`rounded-full ${
                  currentIndex === index
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
